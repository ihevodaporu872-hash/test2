import { z } from "zod";

// ---- Константы ----

export const SERVICE_TYPES = [
  { value: "concept-planning", label: "Концепция + Планировка" },
  { value: "full-project", label: "Полный дизайн-проект" },
  { value: "supervision", label: "Авторский надзор" },
  { value: "full-cycle", label: "Полный цикл" },
  { value: "other", label: "Другое / не знаю" },
] as const;

export const BUDGET_RANGES = [
  { value: "under-100k", label: "До 100 000 руб." },
  { value: "100k-200k", label: "100 000 — 200 000 руб." },
  { value: "200k-500k", label: "200 000 — 500 000 руб." },
  { value: "over-500k", label: "Более 500 000 руб." },
  { value: "unknown", label: "Пока не определился" },
] as const;

export type ServiceTypeValue = (typeof SERVICE_TYPES)[number]["value"];
export type BudgetRangeValue = (typeof BUDGET_RANGES)[number]["value"];

// ---- Zod-схема ----

const phoneRegex = /^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Имя слишком длинное"),
  phone: z
    .string()
    .min(1, "Телефон обязателен")
    .regex(phoneRegex, "Введите телефон в формате +7 (XXX) XXX-XX-XX"),
  email: z
    .string()
    .email("Введите корректный email")
    .optional()
    .or(z.literal("")),
  serviceType: z.string().optional().or(z.literal("")),
  message: z.string().max(2000, "Сообщение слишком длинное").optional().or(z.literal("")),
  budgetRange: z.string().optional().or(z.literal("")),
  sourcePage: z.string().optional(),

  // Антиспам-поля (не отображаются пользователю)
  _honeypot: z.string().max(0, "Спам-проверка не пройдена").optional(),
  _formLoadedAt: z.number().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

// Тип для данных, которые отправляются на сервер (без антиспам-полей визуально)
export type LeadFormSubmitData = Omit<LeadFormData, "_honeypot" | "_formLoadedAt">;
