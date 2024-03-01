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
          <div className="fixed top-0 hidden md:block h-full w-72 p-6">
            <HeaderPadding />
            <DocsSidebarNav items={navigation} />
          </div>
          <div className="md:pl-72 xl:pr-72 grow">
            <div className="px-6 lg:px-12">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
