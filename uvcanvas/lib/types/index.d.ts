declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.module.less" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.glsl" {
  const value: string;
  export default value;
}
