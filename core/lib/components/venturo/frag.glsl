#version 300 es

precision highp float;

uniform float uTime;
uniform vec3 uColor;

in vec2 vUv;
out vec4 fragColor;
// Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}


// Version 3 ( possibly the fastest version, using a mix instead of a ternary operator ):

/* ** ColorStop Point data structure for the COLOR_RAMP macro
color -> the color of the color stop
position -> position of the color stop on the color ramp -> [0, 1]
*/
struct ColorStop {
    vec3 color;
    float position;
};

/* ** COLOR_RAMP macro by Arya Ross -> based on Blender's ColorRamp Node in the shading tab
ColorStop[?] colors -> array of color stops that can have any length
float factor -> the position that you want to know the color of -> [0, 1]
vec3 finalColor -> the final color based on the factor

Line 5 Of The Macro:
// possibly is bad for performance
index = isInBetween ? i : index; \

Taken From: https://stackoverflow.com/a/26219603/19561482
index = int(mix(float(index), float(i), float(isInBetween))); \
*/
#define COLOR_RAMP(colors, factor, finalColor) { \
    int index = 0; \
    for(int i = 0; i < colors.length() - 1; i++){ \
       ColorStop currentColor = colors[i]; \
       bool isInBetween = currentColor.position <= factor; \
       index = int(mix(float(index), float(i), float(isInBetween))); \
    } \
    ColorStop currentColor = colors[index]; \
    ColorStop nextColor = colors[index + 1]; \
    float range = nextColor.position - currentColor.position; \
    float lerpFactor = (factor - currentColor.position) / range; \
    finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
} \


void main() {

    ColorStop colors[3];

    colors[0] = ColorStop(vec3( 58.0 / 255.0,  41.0 / 255.0, 255.0 / 255.0), 0.0);
    colors[1] = ColorStop(vec3(255.0 / 255.0, 148.0 / 255.0, 180.0 / 255.0), 0.5);
    colors[2] = ColorStop(vec3(255.0 / 255.0,  50.0 / 255.0,  50.0 / 255.0), 1.0);

    vec3 rampColor;
    COLOR_RAMP(colors, vUv.x, rampColor);

    float height = snoise(vec2(vUv.x * 2.0 + uTime * 0.2, uTime * 0.5)) * 0.5;
//    height = pow(height + 1.0, 1.5) - 1.0;
    height = exp(height);
    height = (vUv.y * 2.0 - height + 0.2);
//    height = smoothstep(0.0, 1.0, height);
    //    height = pow(height, 1.5);
    fragColor.rgb = 0.0 + 0.6 * height * rampColor + vec3(0.0);
    fragColor.a = 1.0;
}