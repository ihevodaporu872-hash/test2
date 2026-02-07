/**
 * Аналитика — провайдер-независимый модуль отслеживания событий.
 *
 * Подключение провайдера:
 *   import { setAnalyticsProvider } from '@/lib/analytics';
 *
 *   // Google Analytics 4
 *   setAnalyticsProvider((name, params) => {
 *     window.gtag?.('event', name, params);
 *   });
 *
 *   // Yandex.Metrika
 *   setAnalyticsProvider((name, params) => {
 *     window.ym?.(COUNTER_ID, 'reachGoal', name, params);
 *   });
 */

// --- Типы ---

export type AnalyticsEventName =
  | 'cta_click'
  | 'form_submit'
  | 'messenger_click'
  | 'portfolio_open'
  | 'page_view';

export interface AnalyticsEventParams {
  /** Уникальный идентификатор элемента, например "hero_primary_cta" */
  element_id?: string;
  /** Страница, на которой произошло событие */
  page?: string;
  /** Дополнительная метка */
  label?: string;
  /** Числовое значение (для конверсий) */
  value?: number;
  /** Произвольные параметры */
  [key: string]: string | number | boolean | undefined;
}

type AnalyticsProviderFn = (
  name: AnalyticsEventName,
  params: AnalyticsEventParams,
) => void;

// --- Провайдер ---

let _provider: AnalyticsProviderFn | null = null;

/**
 * Подключить провайдер аналитики (GA4, Яндекс.Метрика и т.д.).
 * Вызывать один раз при инициализации приложения.
 */
export function setAnalyticsProvider(fn: AnalyticsProviderFn) {
  _provider = fn;
}

// --- Базовая функция ---

function track(name: AnalyticsEventName, params: AnalyticsEventParams = {}) {
  // Автоматически добавляем текущую страницу
  const enrichedParams: AnalyticsEventParams = {
    page: typeof window !== 'undefined' ? window.location.pathname : undefined,
    ...params,
  };

  // Dev-режим: логируем в консоль
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log(`[analytics] ${name}`, enrichedParams);
  }

  // Отправляем в провайдер
  if (_provider) {
    try {
      _provider(name, enrichedParams);
    } catch {
      // Не ломаем приложение из-за аналитики
    }
  }
}

// --- Публичные функции (одна на событие) ---

/** Клик по CTA-кнопке (hero, footer, секции) */
export function trackCtaClick(elementId: string, label?: string) {
  track('cta_click', { element_id: elementId, label });
}

/** Отправка формы (контакт, заявка, подписка) */
export function trackFormSubmit(formId: string, label?: string) {
  track('form_submit', { element_id: formId, label });
}

/** Клик по мессенджеру (Telegram, WhatsApp, и т.д.) */
export function trackMessengerClick(messenger: string) {
  track('messenger_click', { element_id: messenger, label: messenger });
}

/** Открытие проекта из портфолио */
export function trackPortfolioOpen(projectSlug: string, projectTitle?: string) {
  track('portfolio_open', {
    element_id: projectSlug,
    label: projectTitle,
  });
}

/** Просмотр страницы (для SPA-навигации) */
export function trackPageView(path?: string) {
  track('page_view', {
    page: path || (typeof window !== 'undefined' ? window.location.pathname : undefined),
  });
}
