import styles from "./styles.module.css";

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import React from "react";
import { useEffect, useRef, useState } from "react";
import vert from "./vert.glsl"
import frag from "./frag.glsl"


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

      program.uniforms.uTime.value = t * 0.001;

      // Don't need a camera if camera uniforms aren't required
      renderer.render({ scene: mesh });
    }

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener("resize", resize);
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
