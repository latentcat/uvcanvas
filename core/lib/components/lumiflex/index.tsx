import styles from "./styles.module.css";

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import React from "react";
import { useEffect, useRef, useState } from "react";

const vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec2 position;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`;

const fragment = /* glsl */ `
    precision highp float;

    uniform float uTime;
    uniform vec3 uColor;

    varying vec2 vUv;

    void main() {
        gl_FragColor.rgb = 0.5 + 0.3 * cos(vUv.xyx + uTime) + uColor;
        gl_FragColor.a = 1.0;
    }
`;

interface LumiflexProps {}

export function Lumiflex(props: LumiflexProps) {
  const [isInit, setIsInit] = useState(false);
  const canvasDom = useRef<HTMLCanvasElement>(null);
  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInit) {
      return;
    } else {
      setIsInit(true);
    }

    const renderer = new Renderer({
      canvas: canvasDom.current!,
    });
    const gl = renderer.gl;
    gl.clearColor(1, 1, 1, 1);

    function resize() {
      const ctn = ctnDom.current!;
      const scale = 1;
      // camera.perspective({
      //   aspect: gl.canvas.width / gl.canvas.height,
      // });
      renderer.setSize(ctn.offsetWidth * scale, ctn.offsetHeight * scale);
    }
    window.addEventListener("resize", resize, false);
    resize();

    // Rather than using a plane (two triangles) to cover the viewport here is a
    // triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
    // Excess will be out of the viewport.

    //         position                uv
    //      (-1, 3)                  (0, 2)
    //         |\                      |\
    //         |__\(1, 1)              |__\(1, 1)
    //         |__|_\                  |__|_\
    //   (-1, -1)   (3, -1)        (0, 0)   (2, 0)

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(0.3, 0.2, 0.5) },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    requestAnimationFrame(update);
    function update(t: number) {
      requestAnimationFrame(update);

      program.uniforms.uTime.value = t * 0.001;

      // Don't need a camera if camera uniforms aren't required
      renderer.render({ scene: mesh });
    }
  }, []);

  return (
    <div
      ref={ctnDom}
      className={styles.gradientCanvas}
      style={{
        width: "100%",
        height: "100%",
      }}
      {...props}
    >
      <canvas
        ref={canvasDom}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
