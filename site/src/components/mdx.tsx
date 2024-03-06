import Link from "next/link";
import clsx from "clsx";

import { Feedback } from "@/components/Feedback";
// import { Heading } from '@/components/Heading'
import { Prose } from "@/components/Prose";

export const a = Link;
export const warning = Link;
export { Button } from "@/components/Button";
export { CodeGroup, Code as code, Pre as pre } from "@/components/Code";
export { Authors } from "@/components/ArticleAuthors";
export {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Accordion as AccordionUI } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
export * from "@/components/ComponentWrapper";
export * from "@/components/ComponentWrapperWithControl";
export * from "uvcanvas";

export const Accordion = function H2(
  props: React.ComponentPropsWithoutRef<typeof AccordionUI>,
) {
  const { className, ...rest } = props;
  return <AccordionUI className={cn("text-foreground", className)} {...rest} />;
};

export function wrapper({ children }: { children: React.ReactNode }) {
  return (
    <article className="flex h-full w-full flex-col items-center pb-10 pt-16 break-words">
      <Prose className="flex-auto w-full max-w-4xl">
        {children}
        <footer className="mx-auto mt-16 w-full">
          <Feedback />
        </footer>
      </Prose>
    </article>
  );
}

function InfoIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-zinc-500/20 bg-zinc-50/50 p-4 leading-6 text-zinc-900 dark:border-zinc-500/30 dark:bg-zinc-500/5 dark:text-zinc-200 dark:[--tw-prose-links-hover:theme(colors.zinc.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <InfoIcon className="mt-1 h-4 w-4 flex-none fill-zinc-500 stroke-white dark:fill-zinc-200/20 dark:stroke-zinc-200" />
      <div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 xl:max-w-none xl:grid-cols-2">
      {children}
    </div>
  );
}

export function Col({
  children,
  sticky = false,
}: {
  children: React.ReactNode;
  sticky?: boolean;
}) {
  return (
    <div
      className={clsx(
        "[&>:first-child]:mt-0 [&>:last-child]:mb-0",
        sticky && "xl:sticky xl:top-24",
      )}
    >
      {children}
    </div>
  );
}

export function Properties({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6">
      <ul
        role="list"
        className="m-0 max-w-[calc(theme(maxWidth.lg)-theme(spacing.8))] list-none divide-y divide-zinc-900/5 p-0 dark:divide-white/5"
      >
        {children}
      </ul>
    </div>
  );
}

export function Property({
  name,
  children,
  type,
}: {
  name: string;
  children: React.ReactNode;
  type?: string;
}) {
  return (
    <li className="m-0 px-0 py-4 first:pt-0 last:pb-0">
      <dl className="m-0 flex flex-wrap items-center gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        {type && (
          <>
            <dt className="sr-only">Type</dt>
            <dd className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
              {type}
            </dd>
          </>
        )}
        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0">
          {children}
        </dd>
      </dl>
    </li>
  );
}
