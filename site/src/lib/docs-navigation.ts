import {
  Placeholder,
} from "@/components/ReexportComponents";
import React from "react";

export interface ComponentItemProps {
  name: string;
  id: string;
  desc: string;
  component: React.ComponentType;
}

export const componentList: ComponentItemProps[] = [
  {
    name: "Lumiflex",
    id: "lumiflex",
    desc: "Gradient shader",
    component: React.lazy(() => import("@/components/registry/Lumiflex")),
  },
  {
    name: "Zenitho",
    id: "zenitho",
    desc: "Shader from Stripe",
    component: React.lazy(() => import("@/components/registry/Zenitho")),
  },
  {
    name: "Novatrix",
    id: "novatrix",
    desc: "Fork from Shadertoy",
    component: React.lazy(() => import("@/components/registry/Novatrix")),
  },
  {
    name: "Velustro",
    id: "velustro",
    desc: "Fork from Shadertoy",
    component: React.lazy(() => import("@/components/registry/Velustro")),
  },
  {
    name: "Tranquiluxe",
    id: "tranquiluxe",
    desc: "Fork from Shadertoy",
    component: React.lazy(() => import("@/components/registry/Transquiluxe")),
  },
  {
    name: "Opulento",
    id: "opulento",
    desc: "Fork from Shadertoy",
    component: React.lazy(() => import("@/components/registry/Opulento")),
  },
  // {
  //   name: "Serenex",
  //   id: "serenex",
  //   desc: "Placeholder",
  //   component: Placeholder,
  // },
  // {
  //   name: "Venturo",
  //   id: "venturo",
  //   desc: "Placeholder",
  //   component: Placeholder,
  // },
  // {
  //   name: "Quilluxe",
  //   id: "quilluxe",
  //   desc: "Placeholder",
  //   component: Placeholder,
  // },
  // {
  //   name: "Artiflexa",
  //   id: "artiflexa",
  //   desc: "Placeholder",
  //   component: Placeholder,
  // },
  // {
  //   name: "Luminastra",
  //   id: "luminastra",
  //   desc: "Placeholder",
  //   component: Placeholder,
  // },
  // {
  //   name: "Grandeurio",
  //   id: "grandeurio",
  //   desc: "Placeholder",
  //   component: Placeholder,
  // },
];

export interface NavGroup {
  title: string;
  links: Array<{
    title: string;
    href: string;
    tag?: string
  }>;
}

export const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "All Components", href: "/docs/components" },
      { title: "Contributing", href: "/docs/contributing" },
      { title: "Changelog", href: "/docs/changelog" },
    ],
  },
  {
    title: "General",
    links: [
      { title: "<Slides />", href: "/docs/components/slides", tag: "beta" },
    ],
  },
  {
    title: "Canvas",
    links: [
      ...componentList.map((item, index) => ({
        title: "<" + item.name + " />",
        href: "/docs/components/" + item.id,
      })),
    ],
  },
];
