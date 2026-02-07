import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Журнал | Interior Studio",
  description:
    "Дизайн-вдохновение, тренды и истории из нашей студии.",
};

export default function JournalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div>
          <h1>Журнал</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
