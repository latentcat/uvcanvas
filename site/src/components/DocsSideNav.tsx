"use client";

import { NavGroup } from "@/lib/docs-navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface DocsSidebarNavProps {
  items: NavGroup[];
  onClick?: () => void;
}

export function DocsSidebarNav({ items, onClick }: DocsSidebarNavProps) {
  const pathname = usePathname();

  return items.length ? (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="pb-4">
          <h4 className="mb-1 rounded-md _px-2 py-1 text-sm font-semibold">
            {item.title}
          </h4>
          {item.links.length && (
            <DocsSidebarNavItems
              items={item.links}
              pathname={pathname}
              onClick={onClick}
            />
          )}
        </div>
      ))}
    </div>
  ) : null;
}

interface DocsSidebarNavItemsProps {
  items: NavGroup["links"];
  pathname: string | null;
  onClick?: () => void;
}

export function DocsSidebarNavItems({
  items,
  pathname,
  onClick,
}: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max text-sm space-y-[2px]">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          onClick={onClick}
          className={cn(
            "group flex w-full items-center rounded-md border border-transparent px-3 py-0.5 hover:bg-accent",
            pathname === item.href
              ? "font-medium text-foreground bg-accent"
              : "text-muted-foreground",
          )}
        >
          {item.title}
        </Link>
      ))}
    </div>
  ) : null;
}
