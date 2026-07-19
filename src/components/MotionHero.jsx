import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, BufferGeometry, BufferAttribute, ShaderMaterial, AdditiveBlending, Color } from "three";

const PARTICLE_COUNT = 3500;
const FIELD_SIZE = 80;

const particleVertexShader = `
  attribute float size;
  attribute vec3 customColor;
  attribute float phase;
  varying vec3 vColor;
  varying float vPhase;
  uniform float uTime;
  uniform float uProgress;
  uniform float uExplodeAmt;
  uniform float uHoverIntensity;
  uniform vec2 uMouse;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vColor = customColor;
    vPhase = phase;

    vec3 pos = position;

    float drift = snoise(vec3(pos * 0.02 + uTime * 0.05, 100.0)) * 0.8;
    pos.y += drift * (1.0 - uExplodeAmt * 0.5);

    vec2 toMouse = uMouse - pos.xz * 0.1;
    float mouseDist = length(toMouse);
    float mouseForce = smoothstep(0.0, 30.0, 30.0 - mouseDist) * uHoverIntensity;
    pos.xz += toMouse * mouseForce * 0.5;

    pos += normalize(pos) * uExplodeAmt * 25.0 * phase;

    pos.y += sin(pos.x * 0.5 + uProgress * 6.28 + phase * 6.28) * 2.0 * uProgress;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vPhase;
  uniform float uTime;
  uniform float uExplodeAmt;

  void main() {
    float dist = length(gl_PointCoord - 0.5);
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    float core = 1.0 - smoothstep(0.0, 0.3, dist);
    float pulse = 1.0 + sin(uTime * 8.0 + vPhase * 6.28) * 0.15 * uExplodeAmt;
    vec3 color = vColor * pulse;
    float finalAlpha = alpha * core * (0.6 + 0.4 * (1.0 - uExplodeAmt));
    gl_FragColor = vec4(color, finalAlpha);
  }
`;

function ParticleField({ scrollProgress, explodeAmt, hoverIntensity, mouse }) {
  const { size: _size } = useThree();
  const geometryRef = useRef(null);
  const materialRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const geometry = new BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const phases = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const radius = FIELD_SIZE * Math.pow(Math.random(), 0.6);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.cos(phi);
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      sizes[i] = 0.8 + Math.random() * 1.2;
      phases[i] = Math.random();

      const heightNorm = (positions[i3 + 1] + FIELD_SIZE) / (FIELD_SIZE * 2);
      const color = new Color().setHSL(0.55, 0.8, 0.5 + heightNorm * 0.4);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("size", new BufferAttribute(sizes, 1));
    geometry.setAttribute("customColor", new BufferAttribute(colors, 3));
    geometry.setAttribute("phase", new BufferAttribute(phases, 1));

    geometryRef.current = geometry;
    setIsReady(true);
    return () => geometry.dispose();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const material = new ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uExplodeAmt: { value: 0 },
        uHoverIntensity: { value: 0 },
        uMouse: { value: { x: 0, y: 0 } },
      },
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      vertexColors: true,
    });
    materialRef.current = material;
    return () => material.dispose();
  }, [isReady]);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    materialRef.current.uniforms.uProgress.value = scrollProgress;
    materialRef.current.uniforms.uExplodeAmt.value = explodeAmt;
    materialRef.current.uniforms.uHoverIntensity.value = hoverIntensity;
    materialRef.current.uniforms.uMouse.value.x = mouse.x;
    materialRef.current.uniforms.uMouse.value.y = mouse.y;
  });

  return isReady ? <Points geometry={geometryRef.current} material={materialRef.current} /> : null;
}

export function MotionHeroCanvas({ 
  scrollProgress = 0, 
  explodeAmt = 0, 
  hoverIntensity = 0, 
  mouse = { x: 0, y: 0 } 
}) {
  return (
    <Canvas
      className="hero-canvas absolute inset-0 -z-10"
      camera={{ position: [0, 0, 60], fov: 45 }}
      gl={{ 
        antialias: true, 
        alpha: true,
        preserveDrawingBuffer: false,
      }}
      frameloop="always"
    >
      <color attach="background" args={["#030303", 0]} />
      <ParticleField
        scrollProgress={scrollProgress}
        explodeAmt={explodeAmt}
        hoverIntensity={hoverIntensity}
        mouse={mouse}
      />
    </Canvas>
  );
}

export function MotionHero() {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [deviceTier, setDeviceTier] = useState("high");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [explodeAmt] = useState(0);
  const [hoverIntensity] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Scroll progress from native scroll (Lenis will smooth this)
  useEffect(() => {
    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(window.scrollY / maxScroll, 1));
    };
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Device tier detection
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) {
      setDeviceTier("low");
      return;
    }
    
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "";
    const isMobile = /mobile|android|iphone|ipad/i.test(navigator.userAgent);
    const isLowEnd = /intel|adreno|mali.*4[0-9]|mali.*5[0-9]|videocore/i.test(renderer);
    
    if (isMobile || isLowEnd) {
      setDeviceTier("low");
    } else {
      setDeviceTier("high");
    }
  }, []);

  // Prefers reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Mouse position
  useEffect(() => {
    const handleMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 80,
        y: (e.clientY / window.innerHeight - 0.5) * 80,
      });
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (reduceMotion || deviceTier === "low") {
    return (
      <div 
        className="relative min-h-[100dvh] w-full"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 15% 15%, rgba(99,179,237,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 85% 25%, rgba(99,179,237,0.05) 0%, transparent 60%), #030303",
        }}
        role="img"
        aria-label="Hero background - reduced motion mode"
      />
    );
  }

  return (
    <MotionHeroCanvas
      scrollProgress={scrollProgress}
      explodeAmt={explodeAmt}
      hoverIntensity={hoverIntensity}
      mouse={mouse}
    />
  );
}

export default MotionHero;