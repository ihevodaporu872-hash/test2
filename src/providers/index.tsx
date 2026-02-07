"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { SmoothScrollProvider } from "./smooth-scroll-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </ThemeProvider>
  );
}
