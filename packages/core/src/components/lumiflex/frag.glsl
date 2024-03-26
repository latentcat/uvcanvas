
precision highp float;

uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;

void main() {
    gl_FragColor.rgb = 0.5 + 0.3 * cos(vUv.xyx + uTime) + uColor;
    gl_FragColor.a = 1.0;
}