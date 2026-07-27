import { useEffect, useRef } from "react";
import { readPalette } from "../lib/palette";

/**
 * The portfolio's aurora curtains, ported: five soft blurred bands waving
 * across the top of the page. Colors sample the same drifting gradient as
 * the .color-bar element so the aurora matches the color passing overhead.
 */
export function NorthernLights() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = readPalette(canvas);

    // Resizing clears the bitmap, so a static (reduced-motion) canvas has to be
    // repainted afterwards or it would stay blank for the rest of the session.
    let afterResize = () => {};
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 600;
      afterResize();
    };
    resize();
    window.addEventListener("resize", resize);

    // Sync with the top bar's drifting gradient (.color-bar). Its tile is
    // (background-size / 100) viewports wide and slides (that - 1) tile widths
    // per animation cycle, so sampling the tile at a viewport fraction gives
    // the exact color passing overhead at any moment.
    const bar = document.querySelector(".color-bar");
    const barStyle = bar ? getComputedStyle(bar) : null;
    const barDurationMs = (parseFloat(barStyle?.animationDuration ?? "") || 50) * 1000;
    const barTileViewports = (parseFloat(barStyle?.backgroundSize ?? "") || 400) / 100;
    const barTilesPerCycle = barTileViewports - 1;
    let barAnim: Animation | null = null;

    let time = 0;

    const barPhase = () => {
      if (!barAnim) barAnim = bar?.getAnimations()[0] ?? null;
      const t = typeof barAnim?.currentTime === "number" ? barAnim.currentTime : time * 1000;
      return ((t / barDurationMs) * barTilesPerCycle) % 1;
    };

    const barColorAt = (u: number) => {
      const raw = barPhase() + u / barTileViewports;
      const f = Number.isFinite(raw) ? ((raw % 1) + 1) % 1 : 0;
      const seg = f * palette.length;
      const i = Math.floor(seg) % palette.length;
      const a = palette[i];
      const b = palette[(i + 1) % palette.length];
      const k = seg - Math.floor(seg);
      return {
        r: a.r + (b.r - a.r) * k,
        g: a.g + (b.g - a.g) * k,
        b: a.b + (b.b - a.b) * k,
      };
    };

    const numAuroras = 5;
    const auroras = Array.from({ length: numAuroras }, (_, i) => ({
      baseX: canvas.width * ((i + Math.random()) / numAuroras),
      phaseOffset: Math.random() * Math.PI * 2,
      baseLength: 0.5 + Math.random() * 0.5,
      topWidth: canvas.width * (0.35 + Math.random() * 0.45),
      speedMultiplier: 0.05 + Math.random() * 0.18,
      driftSpeed: 0.15 + Math.random() * 0.35,
      waveFrequency: 0.004 + Math.random() * 0.009,
      waveAmplitude: 30 + Math.random() * 90,
      taperStyle: Math.random(),
      diffuseRate: 0.25 + Math.random() * 0.65,
    }));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const aurora of auroras) {
        const {
          phaseOffset,
          speedMultiplier,
          topWidth,
          waveFrequency,
          waveAmplitude,
          driftSpeed,
          taperStyle,
          diffuseRate,
        } = aurora;
        const waveTime = time * speedMultiplier;

        const pulseLength =
          aurora.baseLength * (0.7 + Math.sin(waveTime * 0.5 + phaseOffset) * 0.3);
        const auroraHeight = canvas.height * pulseLength;

        const drift = Math.sin(waveTime * driftSpeed + phaseOffset) * (canvas.width * 0.35);
        const secondaryDrift =
          Math.sin(waveTime * driftSpeed * 0.7 + phaseOffset * 2) * (canvas.width * 0.1);
        const centerX = aurora.baseX + drift + secondaryDrift;

        const u = canvas.width > 0 ? Math.min(1, Math.max(0, centerX / canvas.width)) : 0;
        const color = barColorAt(u);

        const pulse = 0.07 + Math.sin(waveTime * 0.4 + phaseOffset) * 0.03;

        const gradient = ctx.createLinearGradient(0, -100, 0, auroraHeight + 100);
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${pulse * 0.8})`);
        gradient.addColorStop(0.1, `rgba(${color.r}, ${color.g}, ${color.b}, ${pulse})`);
        gradient.addColorStop(0.35, `rgba(${color.r}, ${color.g}, ${color.b}, ${pulse * 0.5})`);
        gradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${pulse * 0.2})`);
        gradient.addColorStop(0.85, `rgba(${color.r}, ${color.g}, ${color.b}, ${pulse * 0.05})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();

        const topY = -100;

        const getWaveX = (y: number, side: number) => {
          const travelingWave = Math.sin(y * waveFrequency - waveTime * 2 + phaseOffset + side);
          const secondaryWave =
            Math.sin(y * waveFrequency * 2.5 - waveTime * 1.5 + phaseOffset * 1.5 + side) * 0.3;
          const progress = Math.max(0, (y - topY) / (auroraHeight - topY));
          const diffuseAmplitude = waveAmplitude * (1 + progress * diffuseRate);
          return (travelingWave + secondaryWave) * diffuseAmplitude;
        };

        const getWidth = (y: number) => {
          const progress = Math.max(0, (y - topY) / (auroraHeight - topY));
          const taperCurve =
            taperStyle < 0.33
              ? 1 - progress * 0.8
              : taperStyle < 0.66
                ? 1 - progress * progress * 0.9
                : 1 - Math.sqrt(progress) * 0.85;
          const diffusion = 1 + progress * diffuseRate * 0.5;
          return topWidth * 0.5 * taperCurve * diffusion;
        };

        ctx.moveTo(centerX - getWidth(topY) + getWaveX(topY, 0), topY);
        for (let y = topY; y <= auroraHeight + 50; y += 12) {
          const width = getWidth(Math.min(y, auroraHeight));
          ctx.lineTo(centerX - width + getWaveX(y, 0), y);
        }
        const bottomY = auroraHeight + 50;
        ctx.lineTo(centerX + getWaveX(bottomY, 0.5), bottomY);
        for (let y = auroraHeight + 50; y >= topY; y -= 12) {
          const width = getWidth(Math.min(y, auroraHeight));
          ctx.lineTo(centerX + width + getWaveX(y, 1), y);
        }
        ctx.closePath();
        ctx.fill();
      }

      time += 0.015;
      if (!reducedMotion) raf = requestAnimationFrame(draw);
    };
    draw();
    if (reducedMotion) afterResize = draw;

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 w-full"
      style={{ height: "600px", filter: "blur(30px)", opacity: 0.9 }}
    />
  );
}
