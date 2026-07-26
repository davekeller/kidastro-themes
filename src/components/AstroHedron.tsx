import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import { readPalette } from "../lib/palette";

/**
 * The floating header graphic from the kidastro portfolio, recreated without
 * three.js: a wireframe icosahedron that slowly tumbles, floats, follows the
 * pointer, and can be grabbed and spun (with momentum). Colors cycle through
 * the active theme's palette tokens (accent → primary → danger → warning →
 * success), so it stays token-driven like everything else.
 */

const PHI = (1 + Math.sqrt(5)) / 2;
const NORM = Math.hypot(1, PHI);

const VERTICES: [number, number, number][] = (
  [
    [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
    [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
    [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
  ] as [number, number, number][]
).map(([x, y, z]) => [x / NORM, y / NORM, z / NORM]);

// The 30 edges — every vertex pair at the icosahedron's edge length.
const EDGES: [number, number][] = [];
for (let i = 0; i < VERTICES.length; i++) {
  for (let j = i + 1; j < VERTICES.length; j++) {
    const [ax, ay, az] = VERTICES[i];
    const [bx, by, bz] = VERTICES[j];
    if (Math.hypot(ax - bx, ay - by, az - bz) < 1.2) EDGES.push([i, j]);
  }
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Particle {
  x: number;
  y: number;
  speed: number;
  sway: number;
  phase: number;
  size: number;
}

export function AstroHedron({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = readPalette(canvas);

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: Math.random(),
      speed: 0.02 + Math.random() * 0.05,
      sway: 6 + Math.random() * 18,
      phase: Math.random() * Math.PI * 2,
      size: 1 + Math.random() * 1.6,
    }));

    // Interaction state
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const dragRot = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const parallax = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      dragRot.y += dx * 0.008;
      dragRot.x += dy * 0.008;
      velocity.y = dx * 0.004;
      velocity.x = dy * 0.004;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
    };
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Color cycle — slow lerp through the theme palette
      const ct = t * 0.2;
      const idx = Math.floor(ct) % palette.length;
      const next = (idx + 1) % palette.length;
      const alpha = ct % 1;
      const r = Math.round(lerp(palette[idx].r, palette[next].r, alpha));
      const g = Math.round(lerp(palette[idx].g, palette[next].g, alpha));
      const b = Math.round(lerp(palette[idx].b, palette[next].b, alpha));
      const color = `rgb(${r}, ${g}, ${b})`;

      // Momentum + friction when released
      if (!dragging) {
        dragRot.x += velocity.x;
        dragRot.y += velocity.y;
        velocity.x *= 0.96;
        velocity.y *= 0.96;
      }

      // Gentle pointer parallax
      parallax.x += (mouse.x * 14 - parallax.x) * 0.05;
      parallax.y += (mouse.y * 10 - parallax.y) * 0.05;

      const rx = t * 0.15 + dragRot.x;
      const ry = t * 0.2 + dragRot.y;
      const bob = Math.sin(t * 0.9) * 8;

      const cx = width / 2 + parallax.x;
      const cy = height / 2 + parallax.y + bob;
      const radius = Math.min(width, height) * 0.36;

      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);

      const projected = VERTICES.map(([x, y, z]) => {
        // Rotate around X then Y
        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;
        const x2 = x * cosY + z1 * sinY;
        const z2 = -x * sinY + z1 * cosY;
        const persp = 3 / (3 - z2);
        return [cx + x2 * radius * persp, cy + y1 * radius * persp, z2] as const;
      });

      // Particles drifting down beneath everything
      for (const p of particles) {
        p.y += p.speed / 60;
        if (p.y > 1.05) {
          p.y = -0.05;
          p.x = Math.random();
        }
        const px = p.x * width + Math.sin(t * 0.6 + p.phase) * p.sway;
        const py = p.y * height;
        const fade = Math.sin(Math.min(Math.max(p.y, 0), 1) * Math.PI);
        ctx.globalAlpha = 0.45 * fade;
        ctx.fillStyle = color;
        ctx.fillRect(px, py, p.size, p.size);
      }
      ctx.globalAlpha = 1;

      // Wireframe — back edges dimmer for depth
      ctx.lineCap = "round";
      for (const [i, j] of EDGES) {
        const [x1, y1, z1] = projected[i];
        const [x2, y2, z2] = projected[j];
        const depth = (z1 + z2) / 2;
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.35 + ((depth + 1) / 2) * 0.5;
        ctx.lineWidth = 1.6 + ((depth + 1) / 2) * 1.4;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };
    // Paint the first frame synchronously — a hidden tab/pane never fires
    // requestAnimationFrame, which would leave the canvas blank until focus.
    draw(performance.now());

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("block h-full w-full cursor-grab touch-none active:cursor-grabbing", className)}
    />
  );
}
