"use server";

import { headers } from "next/headers";
import { leadFormSchema, type LeadFormData } from "@/lib/schemas/lead-form";
import { SERVICE_TYPES, BUDGET_RANGES } from "@/lib/schemas/lead-form";
import { sendTelegramNotification } from "@/lib/telegram";

// ---- Типизация ответа ----

export interface SubmitLeadResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// ---- Rate limiting (in-memory) ----

const rateLimitMap = new Map<string, number[]>();

const RATE_LIMIT_WINDOW_MS = 60_000; // 1 минута
const RATE_LIMIT_MAX = 3; // макс. 3 запроса в минуту

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];

  // Удаляем устаревшие записи
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);

  return false;
}

// Периодическая очистка (чтобы память не утекала)
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of rateLimitMap) {
      const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (recent.length === 0) {
        rateLimitMap.delete(ip);
      } else {
        rateLimitMap.set(ip, recent);
      }
    }
  }, 60_000);
}

// ---- Минимальное время на форме ----

const MIN_FORM_TIME_MS = 3_000; // 3 секунды

// ---- Server Action ----

export async function submitLead(
  formData: LeadFormData
): Promise<SubmitLeadResult> {
  try {
    // 1. Rate limiting по IP
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headersList.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      // Молча возвращаем "успех", чтобы не раскрывать механизм защиты
      return {
        success: true,
        message: "Спасибо! Мы свяжемся с вами в ближайшее время.",
      };
    }

    // 2. Honeypot — если поле заполнено, это бот
    if (formData._honeypot && formData._honeypot.length > 0) {
      // Молча возвращаем "успех"
      return {
        success: true,
        message: "Спасибо! Мы свяжемся с вами в ближайшее время.",
      };
    }

    // 3. Проверка времени заполнения формы
    if (formData._formLoadedAt) {
      const elapsed = Date.now() - formData._formLoadedAt;
      if (elapsed < MIN_FORM_TIME_MS) {
        // Слишком быстро — вероятно бот
        return {
          success: true,
          message: "Спасибо! Мы свяжемся с вами в ближайшее время.",
        };
      }
    }

    // 4. Валидация через Zod
    const parsed = leadFormSchema.safeParse(formData);

    if (!parsed.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) {
          fieldErrors[path] = [];
        }
        fieldErrors[path].push(issue.message);
      }

      return {
        success: false,
        message: "Пожалуйста, проверьте введённые данные.",
        errors: fieldErrors,
      };
    }

    const data = parsed.data;

    // 5. Человекопонятные labels для лога и Telegram
    const serviceLabel =
      SERVICE_TYPES.find((s) => s.value === data.serviceType)?.label ??
      data.serviceType;
    const budgetLabel =
      BUDGET_RANGES.find((b) => b.value === data.budgetRange)?.label ??
      data.budgetRange;

    // 6. Лог (временное хранилище)
    console.log("=== Новая заявка ===");
    console.log("Имя:", data.name);
    console.log("Телефон:", data.phone);
    console.log("Email:", data.email || "—");
    console.log("Услуга:", serviceLabel || "—");
    console.log("Бюджет:", budgetLabel || "—");
    console.log("Сообщение:", data.message || "—");
    console.log("Страница:", data.sourcePage || "—");
    console.log("Время:", new Date().toISOString());
    console.log("IP:", ip);
    console.log("====================");

    // 7. Отправка в Telegram (с graceful fallback)
    const telegramResult = await sendTelegramNotification({
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      serviceType: serviceLabel || undefined,
      message: data.message || undefined,
      budgetRange: budgetLabel || undefined,
      sourcePage: data.sourcePage || undefined,
    });

    if (!telegramResult.success) {
      console.warn(
        "[submitLead] Telegram уведомление не отправлено:",
        telegramResult.error
      );
      // НЕ возвращаем ошибку пользователю — заявка всё равно принята
    }

    // 8. TODO: сохранение в БД (Supabase / Postgres)

    return {
      success: true,
      message: "Спасибо! Мы свяжемся с вами в ближайшее время.",
    };
  } catch (error) {
    console.error("[submitLead] Непредвиденная ошибка:", error);
    return {
      success: false,
      message: "Произошла ошибка. Пожалуйста, попробуйте ещё раз.",
    };
  }
}
