import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { B2BProductPage } from "@/components/sections/b2b-product-page";
import { b2bPackages } from "../../../../../content/packages/b2b";

const pkg = b2bPackages.find((p) => p.id === "mop")!;

export const metadata: Metadata = {
  title: `${pkg.title} — дизайн входных групп и лобби`,
  description: `${pkg.subtitle}. ${pkg.solution} Пилотный проект для одного этажа доступен от 40 000 руб.`,
  alternates: {
    canonical: "/b2b/mop",
  },
  openGraph: {
    title: `${pkg.title} | INTERIOR STUDIO`,
    description: pkg.solution,
    images: ["/images/photo_7.jpg"],
  },
};

export default function MopPage() {
  return (
    <>
      <PageHeader
        title={pkg.title}
        description={pkg.subtitle}
        backgroundImage="/images/photo_7.jpg"
      />
      <B2BProductPage pkg={pkg} />
    </>
  );
}
