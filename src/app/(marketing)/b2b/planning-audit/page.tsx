import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { B2BProductPage } from "@/components/sections/b2b-product-page";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { b2bPackages } from "../../../../../content/packages/b2b";

const pkg = b2bPackages.find((p) => p.id === "planning-audit")!;

export const metadata: Metadata = {
  title: `${pkg.title} — оптимизация типовых планировок`,
  description: `${pkg.subtitle}. ${pkg.solution} Пилотный аудит одного типового этажа от 25 000 руб.`,
  alternates: {
    canonical: "/b2b/planning-audit",
  },
  openGraph: {
    title: `${pkg.title} | INTERIOR STUDIO`,
    description: pkg.solution,
    images: ["/images/photo_10.jpg"],
  },
};

export default function PlanningAuditPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "B2B", href: "/b2b" },
          { name: "Планировочный аудит", href: "/b2b/planning-audit" },
        ]}
      />
      <PageHeader
        title={pkg.title}
        description={pkg.subtitle}
        backgroundImage="/images/photo_10.jpg"
      />
      <B2BProductPage pkg={pkg} />
    </>
  );
}
