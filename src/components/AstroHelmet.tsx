import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import { readPalette } from "../lib/palette";

/**
 * The geometric astronaut helmet from the portfolio's /games page, ported off
 * three.js onto a plain canvas: a latitude/longitude "fishbowl" wireframe with
 * a circular porthole face ring (double rim + bolt ticks), visor glint, brow
 * seam, side comm pods, and a flared, bolted suit collar. Lines only — one
 * weight, no fills. Steady y-spin with a gentle wobble, grab-to-spin with
 * momentum, pointer drift, and the shared palette color cycle.
 */

type V3 = { x: number; y: number; z: number };

const v = (x: number, y: number, z: number): V3 => ({ x, y, z });
const add = (a: V3, b: V3): V3 => v(a.x + b.x, a.y + b.y, a.z + b.z);
const scale = (a: V3, s: number): V3 => v(a.x * s, a.y * s, a.z * s);
const addScaled = (a: V3, b: V3, s: number): V3 => add(a, scale(b, s));
const dot = (a: V3, b: V3) => a.x * b.x + a.y * b.y + a.z * b.z;
const cross = (a: V3, b: V3): V3 =>
  v(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
const length = (a: V3) => Math.hypot(a.x, a.y, a.z);
const normalize = (a: V3): V3 => scale(a, 1 / (length(a) || 1));
const angleTo = (a: V3, b: V3) =>
  Math.acos(Math.min(1, Math.max(-1, dot(a, b) / ((length(a) * length(b)) || 1))));

/** Spherical interpolation between two unit vectors. */
function slerp(a: V3, b: V3, t: number): V3 {
  const omega = angleTo(a, b);
  const so = Math.sin(omega);
  if (so < 1e-6) return a;
  return add(
    scale(a, Math.sin((1 - t) * omega) / so),
    scale(b, Math.sin(t * omega) / so)
  );
}

// ---- Geometry constants (verbatim from the portfolio) ----
const R = 3.2; // sphere radius
const NECK_Y = -2.0; // sphere is cut below this plane (deep bowl)
const PORT_TILT = (6 * Math.PI) / 180; // port axis tilted slightly above equator
const PORT_R = (38 * Math.PI) / 180; // angular radius of the face port
const RIM_GAP = (3.5 * Math.PI) / 180; // outer seal ring sits this far outside
const PROUD = 1.012; // rims/discs drawn just proud of the sphere

const PORT_AXIS = v(0, Math.sin(PORT_TILT), Math.cos(PORT_TILT));

// Direction on the unit sphere at azimuth `az` around +y from the front (+z)
// and elevation `el` above the equator.
function dir(az: number, el: number): V3 {
  const ce = Math.cos(el);
  return v(ce * Math.sin(az), Math.sin(el), ce * Math.cos(az));
}

// Ring of segment pairs around `axis` at angular radius `theta`, on a sphere
// of radius r. Appends pairs to pts; returns the sampled points.
function ring(pts: V3[], axis: V3, theta: number, r: number, seg: number): V3[] {
  let u = v(0, 1, 0);
  if (Math.abs(axis.y) > 0.9) u = v(1, 0, 0);
  const a = normalize(cross(axis, u));
  const b = normalize(cross(axis, a));
  const ct = Math.cos(theta);
  const st = Math.sin(theta);
  const samples: V3[] = [];
  for (let i = 0; i <= seg; i++) {
    const al = (i / seg) * Math.PI * 2;
    samples.push(
      scale(addScaled(addScaled(scale(axis, ct), a, Math.cos(al) * st), b, Math.sin(al) * st), r)
    );
  }
  for (let i = 0; i < seg; i++) pts.push(samples[i], samples[i + 1]);
  return samples;
}

function buildHelmet(): V3[] {
  const pts: V3[] = [];

  // Keep globe lines out of the face port (with a little clearance) and
  // above the neck cut.
  const inPort = (d: V3) => angleTo(d, PORT_AXIS) < PORT_R + 0.03;
  const elMin = Math.asin(NECK_Y / R);

  // Parallels (latitude rings).
  const parallels = [-25, -5, 15, 35, 55, 75].map((d) => (d * Math.PI) / 180);
  const SEG = 72;
  for (const el of parallels) {
    for (let i = 0; i < SEG; i++) {
      const a0 = (i / SEG) * Math.PI * 2;
      const a1 = ((i + 1) / SEG) * Math.PI * 2;
      const mid = dir((a0 + a1) / 2, el);
      if (inPort(mid)) continue;
      pts.push(scale(dir(a0, el), R), scale(dir(a1, el), R));
    }
  }

  // Meridians (longitude arcs), pole to neck cut.
  const MER = 12;
  const ESEG = 36;
  const elTop = (86 * Math.PI) / 180;
  for (let m = 0; m < MER; m++) {
    const az = (m / MER) * Math.PI * 2;
    for (let i = 0; i < ESEG; i++) {
      const e0 = elMin + (i / ESEG) * (elTop - elMin);
      const e1 = elMin + ((i + 1) / ESEG) * (elTop - elMin);
      const mid = dir(az, (e0 + e1) / 2);
      if (inPort(mid)) continue;
      pts.push(scale(dir(az, e0), R), scale(dir(az, e1), R));
    }
  }

  // Face port: double rim + bolt ticks between the rings, like a hatch seal.
  const rimIn = ring(pts, PORT_AXIS, PORT_R, R * PROUD, 64);
  const rimOut = ring(pts, PORT_AXIS, PORT_R + RIM_GAP, R * PROUD, 64);
  for (let i = 0; i < 8; i++) {
    const idx = Math.round((i / 8) * 64);
    pts.push(rimIn[idx], rimOut[idx]);
  }

  // Visor glint: one diagonal arc across the port, upper-right to lower-left.
  {
    const p1 = normalize(rimIn[Math.round((205 / 360) * 64)]);
    const p2 = normalize(rimIn[Math.round((45 / 360) * 64)]);
    const GS = 10;
    let prev = p1;
    for (let i = 1; i <= GS; i++) {
      const cur = slerp(p1, p2, i / GS);
      pts.push(scale(prev, R * PROUD), scale(cur, R * PROUD));
      prev = cur;
    }
  }

  // Brow ridge: a partial seam arc over the top of the port.
  {
    const theta = PORT_R + (7 * Math.PI) / 180;
    const arc: V3[] = [];
    ring(arc, PORT_AXIS, theta, R * PROUD, 64);
    // ring() pushes segment pairs; keep only the top span (α ≈ 200°–340°,
    // where 270° is straight up in the port's basis).
    for (let i = 0; i < 64; i++) {
      const aDeg = (i / 64) * 360;
      if (aDeg >= 200 && aDeg <= 340) pts.push(arc[i * 2], arc[i * 2 + 1]);
    }
  }

  // Ear pods: chunky rounded-rect comm pods with vent slats, one per side.
  for (const side of [1, -1]) {
    const s = normalize(v(side, 0.06, 0));
    const t1 = normalize(addScaled(v(0, 1, 0), s, -s.y)); // up along pod
    const t2 = normalize(cross(s, t1)); // fore/aft
    const center = scale(s, R * 1.05);
    const at = (x: number, y: number) => addScaled(addScaled(center, t2, x), t1, y);
    // Rounded-rect outline (half-width 0.38, half-height 0.6, corner 0.16).
    const hw = 0.38;
    const hh = 0.6;
    const cr = 0.16;
    const corners = [
      { cx: hw - cr, cy: hh - cr, a0: 0 },
      { cx: -(hw - cr), cy: hh - cr, a0: Math.PI / 2 },
      { cx: -(hw - cr), cy: -(hh - cr), a0: Math.PI },
      { cx: hw - cr, cy: -(hh - cr), a0: (3 * Math.PI) / 2 },
    ];
    const loop: V3[] = [];
    for (const c of corners) {
      for (let i = 0; i <= 4; i++) {
        const a = c.a0 + (i / 4) * (Math.PI / 2);
        loop.push(at(c.cx + Math.cos(a) * cr, c.cy + Math.sin(a) * cr));
      }
    }
    for (let i = 0; i < loop.length; i++) pts.push(loop[i], loop[(i + 1) % loop.length]);
    // Vent slats.
    for (const x of [-0.16, 0, 0.16]) pts.push(at(x, -0.42), at(x, 0.42));
  }

  // Neck stack: the bowl's cut edge, a segmented collar, then a wider locking
  // ring with dense radial ticks — plus angled side tabs off the flange.
  const rBase = Math.sqrt(R * R - NECK_Y * NECK_Y);
  const C_Y = NECK_Y - 0.35;
  const rCollar = rBase * 1.05;
  const FL_Y = NECK_Y - 0.78;
  const rFlange = rBase * 1.18;
  const N = 48;
  const collar = (y: number, r: number) => {
    for (let i = 0; i < N; i++) {
      const a0 = (i / N) * Math.PI * 2;
      const a1 = ((i + 1) / N) * Math.PI * 2;
      pts.push(v(Math.cos(a0) * r, y, Math.sin(a0) * r), v(Math.cos(a1) * r, y, Math.sin(a1) * r));
    }
  };
  collar(NECK_Y, rBase);
  collar(C_Y, rCollar);
  collar(FL_Y, rFlange);
  // Sparse struts: bowl edge → collar.
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    pts.push(
      v(Math.cos(a) * rBase, NECK_Y, Math.sin(a) * rBase),
      v(Math.cos(a) * rCollar, C_Y, Math.sin(a) * rCollar)
    );
  }
  // Dense locking ticks: collar → flange.
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    pts.push(
      v(Math.cos(a) * rCollar, C_Y, Math.sin(a) * rCollar),
      v(Math.cos(a) * rFlange, FL_Y, Math.sin(a) * rFlange)
    );
  }
  // Angled clasp tabs: two short parallel diagonals off each side of the
  // flange, kicking down and outward.
  for (const az of [(28 * Math.PI) / 180, (152 * Math.PI) / 180]) {
    for (const off of [0, (10 * Math.PI) / 180]) {
      const a = az + off;
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      pts.push(
        v(cos * rFlange, FL_Y, sin * rFlange),
        v(cos * (rFlange + 0.34), FL_Y - 0.3, sin * (rFlange + 0.34))
      );
    }
  }

  return pts;
}

const HELMET_POINTS = buildHelmet();

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function AstroHelmet({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = readPalette(canvas);

    // Measure from the element's own box. Setting canvas.width clears the
    // bitmap, so every resize must be followed by a render — otherwise a
    // static (reduced-motion) canvas would stay blank after a window resize.
    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (!width || !height) return false;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };

    // Interaction state — same feel as AstroHedron
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const dragRot = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const parallax = { x: 0, y: 0 };
    let autoYOffset = 0;

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

    const render = (now: number) => {
      if (!width || !height) return;
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      // Shared palette cross-fade
      const ct = t * 0.2;
      const idx = Math.floor(ct) % palette.length;
      const next = (idx + 1) % palette.length;
      const alpha = ct % 1;
      const r = Math.round(lerp(palette[idx].r, palette[next].r, alpha));
      const g = Math.round(lerp(palette[idx].g, palette[next].g, alpha));
      const b = Math.round(lerp(palette[idx].b, palette[next].b, alpha));

      if (dragging) {
        // Freeze the steady spin while grabbed
        autoYOffset = t * 0.25;
      } else {
        dragRot.x += velocity.x;
        dragRot.y += velocity.y;
        velocity.x *= 0.96;
        velocity.y *= 0.96;
      }

      parallax.x += (mouse.x * 12 - parallax.x) * 0.05;
      parallax.y += (mouse.y * 8 - parallax.y) * 0.05;

      // Steady y-spin + gentle x wobble (keeps the helmet upright, unlike the
      // gallery hedron's full tumble). Drag still spins both axes freely.
      const rx = Math.sin(t * 0.5) * 0.15 + dragRot.x;
      const ry = t * 0.25 - autoYOffset + dragRot.y;
      const bob = Math.sin(t * 0.9) * 7;

      const cx = width / 2 + parallax.x;
      const cy = height / 2 + parallax.y + bob - height * 0.02;
      // The model spans ~3.3 units from center to the crown / collar edge, and
      // near-side points magnify by up to ~1.2 under the perspective divide,
      // so fit against ~8 units of vertical extent plus breathing room.
      const k = Math.min(width, height) / 12.5;

      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);

      ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.globalAlpha = 0.85;
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.beginPath();
      for (let i = 0; i < HELMET_POINTS.length; i += 2) {
        const pa = HELMET_POINTS[i];
        const pb = HELMET_POINTS[i + 1];
        // Rotate X then Y, then perspective-project (camera at z = 10)
        let y1 = pa.y * cosX - pa.z * sinX;
        let z1 = pa.y * sinX + pa.z * cosX;
        let x2 = pa.x * cosY + z1 * sinY;
        let z2 = -pa.x * sinY + z1 * cosY;
        let persp = 10 / (10 - z2);
        const ax = cx + x2 * k * persp;
        const ay = cy - y1 * k * persp;

        y1 = pb.y * cosX - pb.z * sinX;
        z1 = pb.y * sinX + pb.z * cosX;
        x2 = pb.x * cosY + z1 * sinY;
        z2 = -pb.x * sinY + z1 * cosY;
        persp = 10 / (10 - z2);
        const bx = cx + x2 * k * persp;
        const by = cy - y1 * k * persp;

        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      render(now);
      raf = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (raf || reducedMotion) return;
      raf = requestAnimationFrame(loop);
    };

    // Paint the first frame synchronously: a hidden tab never fires
    // requestAnimationFrame, which would otherwise leave the canvas blank.
    if (resize()) render(performance.now());
    startLoop();

    // Re-measure and repaint whenever the element's box changes — covers the
    // initial 0×0 layout pass, window resizes, and reduced-motion clears.
    const observer = new ResizeObserver(() => {
      if (resize()) render(performance.now());
    });
    observer.observe(canvas);

    // Browsers throttle rAF in background tabs; resume on return.
    const onVisibility = () => {
      if (!document.hidden) startLoop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "block h-full w-full cursor-grab touch-none select-none active:cursor-grabbing",
        className
      )}
    />
  );
}
