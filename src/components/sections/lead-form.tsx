"use client";

import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  leadFormSchema,
  SERVICE_TYPES,
  BUDGET_RANGES,
  type LeadFormData,
} from "@/lib/schemas/lead-form";
import { submitLead, type SubmitLeadResult } from "@/app/actions/submit-lead";

// ---- UX-состояния ----

type FormState = "idle" | "submitting" | "success" | "error";

// ---- Props ----

interface LeadFormProps {
  title?: string;
  description?: string;
  submitLabel?: string;
  sourcePage?: string;
  className?: string;
  /** Компактный вариант (меньше полей) */
  compact?: boolean;
}

export function LeadForm({
  title = "Обсудить проект",
  description = "Оставьте заявку — мы свяжемся с вами в течение рабочего дня",
  submitLabel = "Отправить заявку",
  sourcePage = "",
  className,
  compact = false,
}: LeadFormProps) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const formLoadedAt = useRef(Date.now());

  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      message: "",
      budgetRange: "",
      sourcePage,
      _honeypot: "",
      _formLoadedAt: formLoadedAt.current,
    },
  });

  // Обновляем timestamp при монтировании
  useEffect(() => {
    formLoadedAt.current = Date.now();
  }, []);

  const onSubmit = async (data: LeadFormData) => {
    setFormState("submitting");
    setServerMessage("");

    // Передаём актуальный timestamp
    data._formLoadedAt = formLoadedAt.current;
    data.sourcePage = sourcePage || (typeof window !== "undefined" ? window.location.pathname : "");

    try {
      const result: SubmitLeadResult = await submitLead(data);

      if (result.success) {
        setFormState("success");
        setServerMessage(result.message);
        reset();
      } else {
        setFormState("error");
        setServerMessage(result.message);

        // Устанавливаем серверные ошибки на поля
        if (result.errors) {
          for (const [field, messages] of Object.entries(result.errors)) {
            if (field in data) {
              setError(field as keyof LeadFormData, {
                type: "server",
                message: messages[0],
              });
            }
          }
        }
      }
    } catch {
      setFormState("error");
      setServerMessage("Произошла ошибка соединения. Попробуйте ещё раз.");
    }
  };

  const handleRetry = () => {
    setFormState("idle");
    setServerMessage("");
    formLoadedAt.current = Date.now();
  };

  // ---- Рендер: Состояние «Успех» ----

  if (formState === "success") {
    return (
      <Section className={className}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
            <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Заявка отправлена!
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {serverMessage ||
              "Спасибо! Мы свяжемся с вами в ближайшее время."}
          </p>
          <Button variant="outline" onClick={handleRetry}>
            Отправить ещё одну заявку
          </Button>
        </div>
      </Section>
    );
  }

  // ---- Рендер: Форма (idle / submitting / error) ----

  return (
    <Section className={className}>
      <div className="max-w-2xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-muted-foreground">{description}</p>
          )}
        </div>

        {/* Ошибка от сервера */}
        {formState === "error" && serverMessage && (
          <div role="alert" className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="size-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{serverMessage}</p>
              <button
                type="button"
                onClick={handleRetry}
                className="mt-1 underline underline-offset-2 hover:no-underline"
              >
                Попробовать снова
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Honeypot — скрытое поле для ботов */}
          <div className="absolute opacity-0 -z-10 pointer-events-none" aria-hidden="true">
            <label htmlFor="lead_website">Сайт</label>
            <input
              id="lead_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("_honeypot")}
            />
          </div>

          {/* Скрытый timestamp */}
          <input type="hidden" {...register("_formLoadedAt", { valueAsNumber: true })} />
          <input type="hidden" {...register("sourcePage")} />

          {/* Имя + Телефон */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lead-name">
                Имя <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lead-name"
                placeholder="Ваше имя"
                autoComplete="name"
                disabled={formState === "submitting"}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "lead-name-error" : undefined}
                className={cn(errors.name && "border-destructive")}
                {...register("name")}
              />
              {errors.name && (
                <p id="lead-name-error" role="alert" className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lead-phone">
                Телефон <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lead-phone"
                type="tel"
                placeholder="+7 (999) 123-45-67"
                autoComplete="tel"
                disabled={formState === "submitting"}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "lead-phone-error" : undefined}
                className={cn(errors.phone && "border-destructive")}
                {...register("phone")}
              />
              {errors.phone && (
                <p id="lead-phone-error" role="alert" className="text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="lead-email">Email</Label>
            <Input
              id="lead-email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              disabled={formState === "submitting"}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "lead-email-error" : undefined}
              className={cn(errors.email && "border-destructive")}
              {...register("email")}
            />
            {errors.email && (
              <p id="lead-email-error" role="alert" className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Услуга + Бюджет (не показываем в compact-режиме) */}
          {!compact && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lead-service">Интересующая услуга</Label>
                <Controller
                  name="serviceType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                      disabled={formState === "submitting"}
                    >
                      <SelectTrigger id="lead-service" className="w-full">
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_TYPES.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lead-budget">Бюджет</Label>
                <Controller
                  name="budgetRange"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                      disabled={formState === "submitting"}
                    >
                      <SelectTrigger id="lead-budget" className="w-full">
                        <SelectValue placeholder="Укажите бюджет" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUDGET_RANGES.map((budget) => (
                          <SelectItem key={budget.value} value={budget.value}>
                            {budget.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          )}

          {/* Сообщение */}
          {!compact && (
            <div className="space-y-2">
              <Label htmlFor="lead-message">Сообщение</Label>
              <Textarea
                id="lead-message"
                placeholder="Расскажите о вашем проекте: площадь, пожелания, сроки..."
                rows={4}
                disabled={formState === "submitting"}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "lead-message-error" : undefined}
                className={cn(errors.message && "border-destructive")}
                {...register("message")}
              />
              {errors.message && (
                <p id="lead-message-error" role="alert" className="text-xs text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>
          )}

          {/* Кнопка отправки */}
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={formState === "submitting"}
          >
            {formState === "submitting" ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Отправка...
              </>
            ) : (
              <>
                <Send className="size-4 mr-2" />
                {submitLabel}
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Нажимая кнопку, вы соглашаетесь с{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
              политикой конфиденциальности
            </a>
          </p>
        </form>
      </div>
    </Section>
  );
}
