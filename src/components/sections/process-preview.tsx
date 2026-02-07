"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  fadeInUp,
  staggerContainer,
  defaultTransition,
} from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "Знакомство и бриф",
    description:
      "Обсуждаем ваши пожелания, образ жизни и бюджет. Выезжаем на объект для замеров.",
  },
  {
    number: "02",
    title: "Концепция и планировка",
    description:
      "Разрабатываем варианты планировок, мудборд и палитру материалов.",
  },
  {
    number: "03",
    title: "Дизайн-проект",
    description:
      "3D-визуализации, полный комплект рабочих чертежей и спецификаций.",
  },
  {
    number: "04",
    title: "Реализация и надзор",
    description:
      "Контролируем строителей, решаем вопросы на месте, доводим до результата.",
  },
];

export function ProcessPreview() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            transition={defaultTransition}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Как мы работаем
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Четкий процесс с понятными этапами и результатами
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                transition={defaultTransition}
                className="relative"
              >
                <span className="font-heading text-5xl font-bold text-primary/15">
                  {step.number}
                </span>
                <h3 className="mt-2 font-semibold text-foreground text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeInUp}
            transition={defaultTransition}
            className="text-center mt-12"
          >
            <Button asChild variant="outline" size="lg">
              <Link href="/process">
                Подробнее о процессе
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
