"use client";

import { Section } from "@/components/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItemData {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  title: string;
  description?: string;
  items: FAQItemData[];
  className?: string;
}

export function FAQAccordion({
  title,
  description,
  items,
  className,
}: FAQAccordionProps) {
  return (
    <Section className={className}>
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>

      <div className="max-w-3xl mx-auto" role="region" aria-label={title}>
        <Accordion type="single" collapsible className="w-full">
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-left text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
