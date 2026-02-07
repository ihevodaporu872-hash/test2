import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "FAQ | Interior Studio",
  description:
    "Часто задаваемые вопросы о наших услугах дизайна интерьера, процессе и ценах.",
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div>
          <h1>FAQ</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
