"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import MixpanelAnalytics from "@/components/MixpanelAnalytics";

export function Providers({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MixpanelAnalytics />
      {children}
    </NextThemesProvider>
  )
}
