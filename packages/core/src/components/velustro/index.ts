import createUVComponentClass from "@/lib/UVComponent";
import { Color, Mesh, Program, Triangle } from "ogl";
import vert from "./vert.glsl";
import frag from "./frag.glsl";

const Velustro = createUVComponentClass({
  defaultStates: {},
  setup: ({ glContext: { gl } }) => {
    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(0.3, 0.2, 0.5) },
        uResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height,
          ),
        },
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
    const { time } = states;
    const { program, mesh, renderer } = glContext;
    program.uniforms.uTime.value = time * 0.1;
    renderer.render({ scene: mesh });
  },
});

export { Velustro };
