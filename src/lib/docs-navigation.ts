export interface NavGroup {
  title: string;
  links: Array<{
    title: string;
    href: string;
  }>;
}

export const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "All Components", href: "/docs/components" },
    ],
  },
  {
    title: "Components",
    links: [
      { title: "Test", href: "/docs/components/test" },
    ],
  },
];
