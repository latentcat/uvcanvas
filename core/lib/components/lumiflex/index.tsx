"use client"

import styles from './styles.module.css'


import { Renderer, Camera, Transform, Box, Program, Mesh } from 'ogl';
import {useEffect, useRef, useState} from "react";




interface LumiflexProps {

}

export function Lumiflex(props: LumiflexProps) {

  const [isInit, setIsInit] = useState(false)
  const canvasDom = useRef<HTMLCanvasElement>(null)

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
      renderer.setSize(window.innerWidth, window.innerHeight);
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

      mesh.rotation.y -= 0.04;
      mesh.rotation.x += 0.03;

      renderer.render({ scene, camera });
    }

  }, []);

  return (
    <div className={`${styles.gradientCanvas}`} {...props}>
      <canvas ref={canvasDom} />
    </div>
  )
}