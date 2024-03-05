declare interface GradientOptions {
  el: HTMLCanvasElement;
  gradientColors: string[];
}

declare class MiniGL {
  gl: WebGLRenderingContext;
}

declare class Gradient {
  minigl: MiniGL;
  el: HTMLCanvasElement;
  gradientColors: string[];
  initGradient(options?: Partial<GradientOptions>);
  disconnect();
}

export default Gradient;
