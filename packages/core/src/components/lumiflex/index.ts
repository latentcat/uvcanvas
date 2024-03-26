import { Color, Mesh, Program, Triangle } from "ogl";
import vert from "./vert.glsl";
import frag from "./frag.glsl";
import { Timer } from "@/lib/UVComponent/CommonMixin";
import createUVComponentClass from "@/lib/UVComponent";

export type LumiflexState = Timer;

const Lumiflex = createUVComponentClass({
  defaultStates: {} as LumiflexState,
  setup: ({ glContext: { gl } }) => {
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(0.3, 0.2, 0.5) },
      },
    });
    const mesh = new Mesh(gl, {
      geometry,
      program,
    });

    return {
      geometry,
      program,
      mesh,
    };
  },
  render({ states, glContext }) {
    const { time, speed = 1.0 } = states;
    const { program, mesh, renderer } = glContext;
    program.uniforms.uTime.value = time * speed * 0.1;
    renderer.render({ scene: mesh });
  },
});

export { Lumiflex };
