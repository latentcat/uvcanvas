"use client"

import {UvcanvasLogoFull} from "@/components/Logos";
import {ThemeToggle} from "@/components/ThemeToggle";
import Link from "next/link";
import {clsx} from "clsx";
import {usePathname} from "next/navigation";
import { Popover, Transition } from '@headlessui/react'
import {Fragment} from "react";
import {ChevronDownIcon, Cross1Icon, ArrowTopRightIcon} from "@radix-ui/react-icons";


const headerLinks = [
  {
    name: "Docs",
    href: "/docs",
  },
  {
    name: "Components",
    href: "/docs/components",
  },
  {
    name: "GitHub",
    href: "https://github.com/latentcat/uvcanvas",
    target: "_blank",
  },
  {
    name: "Latent Cat",
    href: "https://latentcat.com",
    target: "_blank",
  },
]

interface HeaderLinkProps {
  name: string
  href: string
  target?: string
}


function MobileNavItem(props: HeaderLinkProps) {
  return (
    <li>
      <Popover.Button as={Link} href={props.href} target={props.target} className="py-1 font-bold text-xl flex items-center">
        {props.name}{props.target && <ArrowTopRightIcon className="w-5 h-5 ml-2"/>}
      </Popover.Button>
    </li>
  )
}

function MobileNavigation(
  props: React.ComponentPropsWithoutRef<typeof Popover>,
) {
  return (
    <Popover {...props}>
      <Popover.Button className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-black dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                <Cross1Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
              </Popover.Button>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Menu
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 text-base text-zinc-800 dark:text-zinc-200">
                {headerLinks.map((item, index) => (
                  <MobileNavItem key={index} {...item}></MobileNavItem>
                ))}
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

function NavItem(props: HeaderLinkProps) {
  let isActive = usePathname() === props.href

  return (
    <li>
      <Link
        href={props.href}
        target={props.target}
        className={clsx(
          'relative flex items-center px-3 py-2 transition',
          isActive
            ? 'text-black dark:text-white'
            : 'text-zinc-600 dark:text-zinc-400',
        )}
      >
        {props.name}{props.target && <ArrowTopRightIcon className="w-4 h-4 ml-1"/>}
      </Link>
    </li>
  )
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props}>
      <ul className="flex text-sm _font-medium text-zinc-800 dark:text-zinc-200">
        {headerLinks.map((item, index) => (
          <NavItem key={index} {...item}></NavItem>
        ))}
      </ul>
    </nav>
  )
}


export function Header() {
  return (
    <div className="fixed z-10 w-full bg-background h-14 flex items-center justify-between px-6 _lg:px-12 break-words">
      <Link href="/" className="p-2 -m-2">
        <UvcanvasLogoFull className="h-7"/>
      </Link>
      <div className="flex items-center">
        <MobileNavigation className="pointer-events-auto md:hidden" />
        <DesktopNavigation className="pointer-events-auto hidden md:block" />
        <div className="ml-4">
          <ThemeToggle />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-foreground/10 translate-y-[1px]" />
    </div>
  )
}

export function HeaderPadding() {
  return (
    <div className="h-14" />
  )
}