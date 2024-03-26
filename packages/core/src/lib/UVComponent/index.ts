import { OGLRenderingContext, Renderer } from "ogl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyValues = Record<string, any>;

export type UVComponentStates<States extends AnyValues> = {
  time: DOMHighResTimeStamp;
} & States;

export type UVComponentGLContext<SetupContext extends AnyValues = AnyValues> = {
  renderer: Renderer;
  gl: OGLRenderingContext;
} & SetupContext;

export type UVComponentKernel<
  States extends AnyValues,
  SetupContext extends AnyValues,
> = {
  defaultStates: States;
  setup(context: { glContext: UVComponentGLContext }): SetupContext;
  render(context: {
    glContext: UVComponentGLContext<SetupContext>;
    states: UVComponentStates<States>;
  }): void;
  dispose?(context: { glContext: UVComponentGLContext<SetupContext> }): void;
};

export type UVComponentOptions<States extends AnyValues> = {
  target: HTMLElement | (() => HTMLElement);
  initialStates?: Partial<States>;
};

export type UVComponentClass<
  States extends AnyValues,
  SetupContext extends AnyValues,
> = new (
  options: UVComponentOptions<States>,
) => UVComponent<States, SetupContext>;

export type UVComponent<
  States extends AnyValues,
  SetupContext extends AnyValues,
> = {
  states: States;
  glContext: UVComponentGLContext<SetupContext>;
  container?: HTMLElement;
  play: () => void;
  stop: () => void;
  dispose: () => void;
  setState: (newState: Partial<States>) => void;
};

export default function createUVComponentClass<
  States extends AnyValues,
  SetupContext extends AnyValues = AnyValues,
>(
  kernel: UVComponentKernel<States, SetupContext>,
): UVComponentClass<States, SetupContext> {
  return class {
    states: States;
    glContext: UVComponentGLContext<SetupContext>;
    container?: HTMLElement;

    private animateId?: number;

    constructor(options: UVComponentOptions<States>) {
      const { target, initialStates } = options;

      const renderer = new Renderer();
      const gl = renderer.gl;
      const setupContext = kernel.setup?.({
        glContext: {
          gl,
          renderer,
        },
      });

      this.states = {
        ...kernel.defaultStates,
        ...(initialStates || {}),
      };
      this.glContext = {
        gl,
        renderer,
        ...setupContext,
      };
      gl.clearColor(1, 1, 1, 1);

      if (typeof target === "function") {
        this.container = target();
      } else {
        this.container = target;
      }

      window.addEventListener("resize", this.fitSize.bind(this));
      this.fitSize();
      this.container.appendChild(gl.canvas);
    }

    dispose() {
      kernel.dispose?.({
        glContext: this.glContext,
      });
      this.stop();
      this.container?.removeChild(this.glContext.gl.canvas);
      this.glContext.gl.getExtension("WEBGL_lose_context")?.loseContext();
      window.removeEventListener("resize", this.fitSize.bind(this));
    }

    play() {
      this.animateId = requestAnimationFrame(this.onTick.bind(this));
    }

    stop() {
      if (this.animateId) {
        cancelAnimationFrame(this.animateId);
      }
    }

    setState(states: Partial<States>) {
      this.states = {
        ...this.states,
        ...states,
      };
    }

    private onTick(time: DOMHighResTimeStamp) {
      const noUndefinedStates = Object.fromEntries(
        Object.entries(this.states).filter(([, value]) => value !== undefined),
      ) as States;

      kernel.render({
        glContext: this.glContext,
        states: {
          time: time * 0.01,
          ...noUndefinedStates,
        },
      });
      this.animateId = requestAnimationFrame(this.onTick.bind(this));
    }

    private fitSize() {
      if (this.container) {
        const scale = 1;
        this.glContext.renderer.setSize(
          this.container.offsetWidth * scale,
          this.container.offsetHeight * scale,
        );
      }
    }
  };
}
