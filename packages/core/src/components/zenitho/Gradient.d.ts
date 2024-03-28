import { Mesh } from "ogl";

declare interface GradientOptions {
  el: HTMLCanvasElement;
  gradientColors: string[];
}

declare class MiniGL {
  render: () => void;
}

declare class Gradient {
  t: number;
  last: number;
  minigl: MiniGL;
  mesh: any;
  initGradient(options?: Partial<GradientOptions>);
}

export default Gradient;
