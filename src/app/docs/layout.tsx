import { HeaderPadding } from "@/components/Header";
import React from "react";

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="relative w-full">
        <HeaderPadding />
        <div>
          <div>navigation</div>
          <div>{children}</div>
        </div>
      </div>
    </main>
  );
}
