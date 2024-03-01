"use client";

import { NavGroup } from "@/lib/docs-navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface DocsSidebarNavProps {
  items: NavGroup[];
}

export function DocsSidebarNav({ items }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item.links.length && (
            <DocsSidebarNavItems items={item.links} pathname={pathname} />
          )}
        </div>
      ))}
    </div>
  ) : null;
}

interface DocsSidebarNavItemsProps {
  items: NavGroup["links"];
  pathname: string | null;
}

export function DocsSidebarNavItems({
  items,
  pathname,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
            pathname === item.href
              ? "font-medium text-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </div>
  ) : null;
}
