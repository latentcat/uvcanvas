import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import React from "react";
import { useEffect, useRef } from "react";
import vert from "./vert.glsl";
import frag from "./frag.glsl";
import { CommonProps, ControlProps, TimeProps } from "../../types/CommonProps";

export interface LumiflexProps extends CommonProps, TimeProps, ControlProps {}

export function Lumiflex(props: LumiflexProps) {
  const propsRef = useRef<LumiflexProps>(props);
  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    propsRef.current = props;
  });

  useEffect(() => {
    if (!ctnDom.current) {
      return;
    }

    const ctn = ctnDom.current;
    const renderer = new Renderer();
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    function resize() {
      if (ctn == null) {
        return;
      }

      const scale = 1;
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
    }
    window.addEventListener("resize", resize, false);
    resize();

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(0.3, 0.2, 0.5) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    let animateId: number;

    animateId = requestAnimationFrame(update);

    function update(t: number) {
      animateId = requestAnimationFrame(update);

      const { time: time = t * 0.01, speed = 1.0 } = propsRef.current;

      program.uniforms.uTime.value = time * speed * 0.1;

      renderer.render({ scene: mesh });
    }

    ctn.appendChild(gl.canvas);
    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
      ctn.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={ctnDom}
      style={{
        width: "100%",
        height: "100%",
      }}
      {...props}
    />
  );
}
