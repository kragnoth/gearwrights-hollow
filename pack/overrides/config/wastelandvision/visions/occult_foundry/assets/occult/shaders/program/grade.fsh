#version 150

// "Occult Foundry" grade - lamplight and spirits.
//  - split toning: shadows lean cold slate-teal (spirit side), highlights lean warm brass (lamp side)
//  - greens and blues muted (Muted); reds, oranges and brass keep their colour
//  - a dark violet vignette and barely-there grain
// All tunables are uniforms in post/grade.json - edit and press F3+T.

uniform sampler2D DiffuseSampler;
uniform vec2 InSize;
uniform float Time;
uniform float Strength;
uniform vec3 Shadow;      // tint multiplied into the darks
uniform vec3 Highlight;   // tint multiplied into the lights
uniform float Split;      // how strong the split toning is (0..1)
uniform float Muted;      // desaturation of cool hues (0..1)
uniform float Vignette;   // vignette depth (0..1)
uniform float Grain;

in vec2 texCoord;
out vec4 fragColor;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec3 c = texture(DiffuseSampler, texCoord).rgb;
    float l = dot(c, vec3(0.299, 0.587, 0.114));

    // mute cool colours only: warmth (r over g/b) protects brass, copper, rust, fire
    float warm = clamp((c.r - max(c.g, c.b)) * 3.0 + 0.15, 0.0, 1.0);
    vec3 g = mix(c, vec3(l), Muted * (1.0 - warm));

    // split tone: darks -> Shadow, lights -> Highlight (luminance preserved)
    vec3 tint = mix(Shadow, Highlight, smoothstep(0.15, 0.75, l));
    vec3 toned = g * tint;
    float tl = dot(toned, vec3(0.299, 0.587, 0.114));
    toned *= l / max(tl, 1e-4);
    g = mix(g, toned, Split);

    // violet-black vignette
    vec2 d = texCoord - 0.5;
    float v = smoothstep(0.32, 0.95, length(d) * 1.3);
    g = mix(g, g * vec3(0.62, 0.58, 0.70), v * Vignette);

    float n = hash(floor(texCoord * InSize) + vec2(floor(Time * 24.0) * 17.0, floor(Time * 24.0) * 31.0)) - 0.5;
    g += n * Grain;

    fragColor = vec4(clamp(mix(c, g, Strength), 0.0, 1.0), 1.0);
}
