export interface NavGroup {
  title: string;
  links: Array<{
    title: string;
    href: string;
  }>;
}

export const navigation: NavGroup[] = [
  {
    title: "开始之前",
    links: [
      { title: "文档缘起", href: "/preface/intro1" },
      { title: "文档缘起", href: "/preface/intro2" },
    ],
  },
  {
    title: "test",
    links: [
      { title: "test1", href: "/preface/intro1" },
      { title: "test2", href: "/preface/intro2" },
    ],
  },
];
