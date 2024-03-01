import { HeaderPadding } from "@/components/Header";
import { DocsSidebarNav } from "@/components/docs/DocsSideNav";
import { navigation } from "@/lib/docs-navigation";
import React from "react";

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="relative w-full">
        <HeaderPadding />
        <div className="flex">
          <div className="w-72 p-6">
            <DocsSidebarNav items={navigation} />
          </div>
          <div className="grow">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
