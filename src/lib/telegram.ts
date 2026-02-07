/**
 * Отправка уведомления о новой заявке в Telegram.
 *
 * Требуемые переменные окружения:
 *   TELEGRAM_BOT_TOKEN — токен Telegram-бота
 *   TELEGRAM_CHAT_ID   — ID чата или группы для уведомлений
 */

interface LeadNotification {
  name: string;
  phone: string;
  email?: string;
  serviceType?: string;
  message?: string;
  budgetRange?: string;
  sourcePage?: string;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatMessage(lead: LeadNotification): string {
  const timestamp = new Date().toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const lines: string[] = [
    `<b>Новая заявка с сайта</b>`,
    ``,
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    `<b>Телефон:</b> ${escapeHtml(lead.phone)}`,
  ];

  if (lead.email) {
    lines.push(`<b>Email:</b> ${escapeHtml(lead.email)}`);
  }

  if (lead.serviceType) {
    lines.push(`<b>Услуга:</b> ${escapeHtml(lead.serviceType)}`);
  }

  if (lead.budgetRange) {
    lines.push(`<b>Бюджет:</b> ${escapeHtml(lead.budgetRange)}`);
  }

  if (lead.message) {
    lines.push(`<b>Сообщение:</b> ${escapeHtml(lead.message)}`);
  }

  if (lead.sourcePage) {
    lines.push(`<b>Страница:</b> ${escapeHtml(lead.sourcePage)}`);
  }

  lines.push(``, `<i>${timestamp} (МСК)</i>`);

  return lines.join("\n");
}

export async function sendTelegramNotification(
  lead: LeadNotification
): Promise<{ success: boolean; error?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn(
      "[Telegram] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы. Уведомление пропущено."
    );
    return { success: false, error: "Telegram not configured" };
  }

  const text = formatMessage(lead);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    if (!response.ok) {
      const body = await response.text();
      console.error("[Telegram] Ошибка отправки:", response.status, body);
      return { success: false, error: `HTTP ${response.status}` };
    }

    console.log("[Telegram] Уведомление отправлено успешно");
    return { success: true };
  } catch (error) {
    console.error("[Telegram] Ошибка сети:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
