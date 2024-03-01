


export const componentList = [
  {
    name: "Lumiflex",
    id: "lumiflex",
    desc: "CSS Gradient",
  },
  {
    name: "Zenitho",
    id: "zenitho",
    desc: "",
  },
  {
    name: "Novatrix",
    id: "novatrix",
    desc: "",
  },
  {
    name: "Velustro",
    id: "velustro",
    desc: "",
  },
  {
    name: "Tranquiluxe",
    id: "tranquiluxe",
    desc: "",
  },
  {
    name: "Opulento",
    id: "opulento",
    desc: "",
  },
]


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
      { title: "Installation", href: "/docs/installation" },
      { title: "All Components", href: "/docs/components" },
    ],
  },
  {
    title: "Components",
    links: [
      ...componentList.map((item, index) => (
        {
          title: item.name,
          href: "/docs/components/" + item.id,
        }
      ))
    ],
  },
];

