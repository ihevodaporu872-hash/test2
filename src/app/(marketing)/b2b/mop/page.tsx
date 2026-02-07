import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { B2BProductPage } from "@/components/sections/b2b-product-page";
import { b2bPackages } from "../../../../../content/packages/b2b";

const pkg = b2bPackages.find((p) => p.id === "mop")!;

export const metadata: Metadata = {
  title: `${pkg.title} | Interior Studio`,
  description: pkg.solution,
  openGraph: {
    title: `${pkg.title} — ${pkg.subtitle} | Interior Studio`,
    description: pkg.solution,
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
