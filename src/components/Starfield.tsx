import { useEffect, useRef } from "react";
import { readPalette, type RGB } from "../lib/palette";

/**
 * The portfolio's starfield, ported: drifting twinkling stars plus the
 * occasional shooting star, colored from the active theme's palette tokens.
 */

interface Star {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: RGB;
}

interface ShootingStar {
  x: number;
  y: number;
  len: number;
  speed: number;
  angle: number;
  opacity: number;
  size: number;
  color: RGB;
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = readPalette(canvas);
    const pick = () => palette[Math.floor(Math.random() * palette.length)];

    // Resizing clears the bitmap, so a static (reduced-motion) canvas has to be
    // repainted afterwards or it would stay blank for the rest of the session.
    let afterResize = () => {};
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      afterResize();
    };
    resize();
    window.addEventListener("resize", resize);

    const stars: Star[] = Array.from({ length: 320 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05,
      opacity: Math.random() * 0.4 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      color: pick(),
    }));

    const shootingStars: ShootingStar[] = [];

    const createShootingStar = () => {
      const direction = Math.random();
      let angle: number;
      let startX: number;
      if (direction < 0.33) {
        angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
        startX = Math.random() * canvas.width * 0.3;
      } else if (direction < 0.66) {
        angle = (3 * Math.PI) / 4 + (Math.random() - 0.5) * 0.5;
        startX = canvas.width * 0.7 + Math.random() * canvas.width * 0.3;
      } else {
        angle = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
        startX = Math.random() * canvas.width;
      }
      shootingStars.push({
        x: startX,
        y: Math.random() * canvas.height * 0.3,
        len: Math.random() * 80 + 40,
        speed: Math.random() * 10 + 7,
        angle,
        opacity: 1,
        size: Math.random() * 1 + 1.5,
        color: pick(),
      });
    };

    const spawnTimer = setTimeout(createShootingStar, 1000);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let lastShootingStarTime = Date.now();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
        const { r, g, b } = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.opacity * twinkle})`;
        ctx.fill();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        const x2 = s.x + Math.cos(s.angle) * s.len;
        const y2 = s.y + Math.sin(s.angle) * s.len;
        const { r, g, b } = s.color;

        const gradient = ctx.createLinearGradient(s.x, s.y, x2, y2);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${s.opacity})`);
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x2, y2, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${s.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
        ctx.fill();
        ctx.shadowBlur = 0;

        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.opacity -= 0.01;
        if (s.opacity <= 0 || s.x > canvas.width || s.y > canvas.height) {
          shootingStars.splice(i, 1);
        }
      }

      const now = Date.now();
      if (now - lastShootingStarTime > 4000 && Math.random() > 0.985) {
        createShootingStar();
        lastShootingStarTime = now;
      }

      if (!reducedMotion) raf = requestAnimationFrame(animate);
    };
    animate();
    if (reducedMotion) afterResize = animate;

    return () => {
      clearTimeout(spawnTimer);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-full w-full"
    />
  );
}
