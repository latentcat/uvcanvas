#version 300 es

precision highp float;

uniform float uTime;     // Time variable for animations
uniform vec3 uColor;     // Base color (optional)

in vec2 vUv;             // UV coordinates from the vertex shader

out vec4 fragColor;      // Output color for the fragment

// Color Ramp Macro
struct ColorStop {
    vec3 color;
    float position;
};

#define COLOR_RAMP(colors, factor, finalColor) { \
    int index = 0; \
    for (int i = 0; i < colors.length() - 1; i++) { \
        ColorStop currentColor = colors[i]; \
        bool isInBetween = currentColor.position <= factor; \
        index = int(mix(float(index), float(i), float(isInBetween))); \
    } \
    ColorStop currentColor = colors[index]; \
    ColorStop nextColor = colors[index + 1]; \
    float range = nextColor.position - currentColor.position; \
    float lerpFactor = (factor - currentColor.position) / range; \
    finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
    // Define color stops for a retro rainbow effect
    ColorStop colors[3];
    colors[0] = ColorStop(vec3(80.0 / 255.0, 180.0 / 255.0, 80.0 / 255.0), 0.0);  // Balanced Lime Green
    colors[1] = ColorStop(vec3(0.0 / 255.0, 180.0 / 255.0, 150.0 / 255.0), 0.5);  // Balanced Turquoise
    colors[2] = ColorStop(vec3(0.0 / 255.0, 140.0 / 255.0, 180.0 / 255.0), 1.0);  // Balanced Ocean Blue

    vec3 rampColor;
    COLOR_RAMP(colors, vUv.x, rampColor);

    float height = (vUv.y * 2.0);

    // Moving scanlines, with subtle dimming effect using cosine
    float scanline = 0.75 + 0.25 * sin((vUv.y * 200.0) + uTime * 3.0);  // Lower intensity for dimming effect

    // Final color blending with noise, color ramp, and moving scanline effects
    fragColor.rgb = scanline * rampColor * (height + vec3(0.0));
    fragColor.a = 1.0;
}
