import { Color, Mesh, Program, Triangle } from "ogl";
import React from "react";
import vert from "./vert.glsl";
import frag from "./frag.glsl";
import { CommonProps, ControlProps, TimeProps } from "../../types/CommonProps";
import { useOgl } from "../../hooks";

export interface LumiflexProps extends CommonProps, TimeProps, ControlProps {}

export function Lumiflex(props: LumiflexProps) {
    const containerRef = useOgl({
        props,
        init: ({ gl }) => {
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

            return { geometry, program, mesh };
        },
        render: ({ time: t, props, program, renderer, mesh }) => {
            const { time: time = t * 0.01, speed = 1.0 } = props.current;
            program.uniforms.uTime.value = time * speed * 0.1;
            renderer.render({ scene: mesh });
        },
        resize: ({ renderer, container }) => {
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        },
        destroy: ({ gl }) => {
            gl.getExtension("WEBGL_lose_context")?.loseContext();
        },
    });

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "100%",
            }}
            {...props}
        />
    );
}
