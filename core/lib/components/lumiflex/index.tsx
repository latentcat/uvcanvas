"use client"

import styles from './styles.module.css'


import { Renderer, Camera, Transform, Box, Program, Mesh } from 'ogl';
import {useEffect, useRef, useState} from "react";




interface LumiflexProps {

}

export function Lumiflex(props: LumiflexProps) {

  const [isInit, setIsInit] = useState(false)
  const canvasDom = useRef<HTMLCanvasElement>(null)
  const ctnDom = useRef<HTMLDivElement>(null)

  useEffect(() => {

    if (isInit) {
      return
    } else {
      setIsInit(true)
    }

    const renderer = new Renderer({
      canvas: canvasDom.current!
    });
    const gl = renderer.gl;

    const camera = new Camera(gl);
    camera.position.z = 20;

    function resize() {
      const ctn = ctnDom.current!;
      console.log(ctn.offsetWidth)
      renderer.setSize(ctn.offsetWidth, ctn.offsetHeight);
      camera.perspective({
        aspect: gl.canvas.width / gl.canvas.height,
      });
    }
    window.addEventListener('resize', resize, false);
    resize();

    const scene = new Transform();

    const geometry = new Box(gl);

    const program = new Program(gl, {
      vertex: /* glsl */ `
            attribute vec3 position;

            uniform mat4 modelViewMatrix;
            uniform mat4 projectionMatrix;

            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
      fragment: /* glsl */ `
            void main() {
                gl_FragColor = vec4(1.0);
            }
        `,
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    requestAnimationFrame(update);
    function update() {
      requestAnimationFrame(update);

      mesh.rotation.y -= 0.01;
      mesh.rotation.x += 0.005;

      renderer.render({ scene, camera });
    }

  }, []);

  return (
    <div ref={ctnDom} className={styles.gradientCanvas} {...props}>
      <canvas ref={canvasDom} />
    </div>
  )
}