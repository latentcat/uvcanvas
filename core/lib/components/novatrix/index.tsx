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
    uniform vec3 uResolution;

    varying vec2 vUv;

    void main() {
    
        float mr = min(uResolution.x, uResolution.y);
        vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;
    
        float d = -uTime * 0.5;
        float a = 0.0;
        for (float i = 0.0; i < 8.0; ++i) {
            a += cos(i - d - a * uv.x);
            d += sin(uv.y * i + a);
        }
        d += uTime * 0.5;
        vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
        col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);
        gl_FragColor = vec4(col,1.0);
        
    }
`;

interface NovatrixProps {}

export function Novatrix(props: NovatrixProps) {
  const [isInit, setIsInit] = useState(false);
  const canvasDom = useRef<HTMLCanvasElement>(null);
  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInit) {
      console.log(234)
      return;
    } else {

      console.log(234)
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

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new Color(0.3, 0.2, 0.5) },
        uResolution: {
          value: new Color(
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height
          ),
        },
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
