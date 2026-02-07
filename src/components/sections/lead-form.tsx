"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const leadFormSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Минимум 10 символов"),
});

type LeadFormData = z.infer<typeof leadFormSchema>;

interface LeadFormProps {
  title: string;
  description?: string;
  submitLabel?: string;
  onSubmit?: (data: LeadFormData) => void;
  className?: string;
}

export function LeadForm({
  title,
  description,
  submitLabel = "Отправить заявку",
  onSubmit,
  className,
}: LeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>();

  const handleFormSubmit = (data: LeadFormData) => {
    // Validate with zod
    const result = leadFormSchema.safeParse(data);
    if (!result.success) return;

    onSubmit?.(result.data);
    reset();
  };

  return (
    <Section className={className}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                placeholder="Ваше имя"
                {...register("name", { required: "Обязательное поле" })}
                aria-invalid={!!errors.name}
                className={cn(errors.name && "border-destructive")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email", { required: "Обязательное поле" })}
                aria-invalid={!!errors.email}
                className={cn(errors.email && "border-destructive")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              {...register("phone")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Сообщение *</Label>
            <Textarea
              id="message"
              placeholder="Расскажите о вашем проекте..."
              rows={5}
              {...register("message", { required: "Обязательное поле" })}
              aria-invalid={!!errors.message}
              className={cn(errors.message && "border-destructive")}
            />
            {errors.message && (
              <p className="text-xs text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Отправка..." : submitLabel}
          </Button>
        </form>
      </div>
    </Section>
  );
}
