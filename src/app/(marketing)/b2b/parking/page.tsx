import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { B2BProductPage } from "@/components/sections/b2b-product-page";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { b2bPackages } from "../../../../../content/packages/b2b";

const pkg = b2bPackages.find((p) => p.id === "parking")!;

export const metadata: Metadata = {
  title: `${pkg.title} — навигация, безопасность, зонирование`,
  description: `${pkg.subtitle}. ${pkg.solution} Пилотный проект для одного уровня доступен от 35 000 руб.`,
  alternates: {
    canonical: "/b2b/parking",
  },
  openGraph: {
    title: `${pkg.title} | INTERIOR STUDIO`,
    description: pkg.solution,
    images: ["/images/photo_9.jpg"],
  },
};

export default function ParkingPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Главная", href: "/" },
          { name: "B2B", href: "/b2b" },
          { name: "Дизайн паркинга", href: "/b2b/parking" },
        ]}
      />
      <PageHeader
        title={pkg.title}
        description={pkg.subtitle}
        backgroundImage="/images/photo_9.jpg"
      />
      <B2BProductPage pkg={pkg} />
    </>
  );
}
