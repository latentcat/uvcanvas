#version 300 es

precision highp float;

in vec2 position;

out vec2 vUv;

void main() {
    vUv = position * 0.5 + 0.5; 
    gl_Position = vec4(position, 0.0, 1.0);  
}
