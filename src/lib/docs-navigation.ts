export interface NavGroup {
  title: string;
  links: Array<{
    title: string;
    href: string;
  }>;
}

export const navigation: Array<NavGroup> = [
  {
    title: "开始之前",
    links: [{ title: "文档缘起", href: "/preface/intro" }],
  },
];
