"use client";

import Link from "next/link";
import {
  AlertTriangle,
  Lightbulb,
  Check,
  Target,
  Rocket,
} from "lucide-react";

import { Section } from "@/components/layout/section";
import { CTASection } from "@/components/sections/cta-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { B2BPackage } from "../../../content/packages/b2b";

interface B2BProductPageProps {
  pkg: B2BPackage;
}

export function B2BProductPage({ pkg }: B2BProductPageProps) {
  return (
    <>
      {/* Problem Section */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center size-12 rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="size-6" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Проблема
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {pkg.problem}
          </p>
        </div>
      </Section>

      {/* Solution Section */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary">
              <Lightbulb className="size-6" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Решение
            </h2>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {pkg.solution}
          </p>
        </div>
      </Section>

      {/* What's Included */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Что входит в {pkg.title.toLowerCase()}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pkg.includes.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg border border-border bg-background"
              >
                <Check className="size-5 text-green-600 shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-muted-foreground">
            <span>
              <strong className="text-foreground">Стоимость:</strong>{" "}
              {pkg.price}
            </span>
            <span className="text-border">|</span>
            <span>
              <strong className="text-foreground">Срок:</strong>{" "}
              {pkg.duration}
            </span>
          </div>
        </div>
      </Section>

      {/* Result */}
      <Section className="bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center size-14 rounded-full bg-primary/10 text-primary mb-6">
            <Target className="size-7" />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">
            Результат
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {pkg.result}
          </p>
        </div>
      </Section>

      {/* Pilot Section */}
      {pkg.pilotAvailable && (
        <Section>
          <div className="max-w-3xl mx-auto">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center size-14 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <Rocket className="size-7" />
                </div>
                <Badge variant="default" className="w-fit mx-auto mb-2">
                  Пилотная программа
                </Badge>
                <CardTitle className="text-2xl">
                  Попробуйте на небольшом участке
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Начните с пилотного проекта с сокращённым объёмом. Оцените
                  качество работы, прежде чем масштабировать. Стоимость пилота
                  засчитывается в полный проект.
                </p>
                <div className="flex items-center justify-center gap-6">
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {pkg.pilotPrice}
                    </p>
                    <p className="text-xs text-muted-foreground">Стоимость</p>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div>
                    <p className="text-2xl font-bold text-primary">
                      {pkg.pilotDuration}
                    </p>
                    <p className="text-xs text-muted-foreground">Срок</p>
                  </div>
                </div>
                <Button asChild size="lg" className="mt-4">
                  <Link
                    href={`/contact?type=b2b&product=${pkg.id}&pilot=true`}
                  >
                    Запросить пилот
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Section>
      )}

      {/* CTA */}
      <CTASection
        title={pkg.cta}
        description="Оставьте заявку — подготовим индивидуальное коммерческое предложение для вашего объекта"
        buttonLabel="Запросить КП"
        buttonHref={`/contact?type=b2b&product=${pkg.id}`}
        variant="dark"
      />
    </>
  );
}
