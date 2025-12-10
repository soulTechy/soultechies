import React, { useRef, useEffect, useCallback, useMemo } from "react";

// Utility functions
const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

// Simplified animation without GSAP
const animateDot = (
  dot,
  pushX,
  pushY,
  resistance = 750,
  returnDuration = 1500
) => {
  const startTime = performance.now();
  const startX = dot.xOffset;
  const startY = dot.yOffset;

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / resistance, 1);

    // Ease out
    const eased = 1 - Math.pow(1 - t, 3);

    dot.xOffset = startX + (pushX - startX) * eased;
    dot.yOffset = startY + (pushY - startY) * eased;

    if (t < 1) {
      dot.animationFrame = requestAnimationFrame(animate);
    } else {
      // Return to original position
      returnToOrigin(dot, returnDuration);
    }
  };

  if (dot.animationFrame) cancelAnimationFrame(dot.animationFrame);
  dot.animationFrame = requestAnimationFrame(animate);
};

const returnToOrigin = (dot, duration) => {
  const startTime = performance.now();
  const startX = dot.xOffset;
  const startY = dot.yOffset;

  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const t = Math.min(elapsed / duration, 1);

    // Elastic ease out
    const eased =
      Math.pow(2, -10 * t) * Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3) + 1;

    dot.xOffset = startX * (1 - eased);
    dot.yOffset = startY * (1 - eased);

    if (t < 1) {
      dot.animationFrame = requestAnimationFrame(animate);
    } else {
      dot.xOffset = 0;
      dot.yOffset = 0;
      dot._inertiaApplied = false;
    }
  };

  if (dot.animationFrame) cancelAnimationFrame(dot.animationFrame);
  dot.animationFrame = requestAnimationFrame(animate);
};

const DotGrid = ({
  dotSize = 12,
  gap = 28,
  baseColor = "#ddd6fe",
  activeColor = "#8b5cf6",
  proximity = 120,
  speedTrigger = 100,
  shockRadius = 200,
  shockStrength = 4,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1500,
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;
    const p = new Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    if (!circlePath) return;

    let rafId;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, circlePath]);

  useEffect(() => {
    buildGrid();
    const handleResize = () => buildGrid();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e) => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvasRef.current.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          const pushX = (dot.cx - pr.x) * 0.3 + vx * 0.005;
          const pushY = (dot.cy - pr.y) * 0.3 + vy * 0.005;
          animateDot(dot, pushX, pushY, resistance, returnDuration);
        }
      }
    };

    const onClick = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          animateDot(dot, pushX, pushY, resistance, returnDuration);
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener("mousemove", throttledMove, { passive: true });
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", throttledMove);
      window.removeEventListener("click", onClick);
    };
  }, [
    maxSpeed,
    speedTrigger,
    proximity,
    resistance,
    returnDuration,
    shockRadius,
    shockStrength,
  ]);

  return (
    <div ref={wrapperRef} className="w-full h-full absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-slate-50 overflow-hidden flex items-center justify-center">
      {/* Interactive Dot Grid Background */}
      <DotGrid
        dotSize={8}
        gap={26}
        baseColor="#e3defa"
        activeColor="#8b5cf6"
        proximity={120}
        speedTrigger={100}
        shockRadius={200}
        shockStrength={4}
        resistance={750}
        returnDuration={1500}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div
          className="animate-fade-in opacity-0"
          style={{
            animationDelay: "300ms",
            animationFillMode: "forwards",
            animationDuration: "800ms",
          }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 tracking-tight">
            <span className="inline-block">Build.</span>{" "}
            <span className="inline-block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Transform.
            </span>{" "}
            <span className="inline-block">Innovate.</span>
          </h1>
        </div>

        <p
          className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8 animate-fade-in opacity-0"
          style={{
            animationDelay: "500ms",
            animationFillMode: "forwards",
            animationDuration: "800ms",
          }}
        >
          Your trusted partner for cutting-edge software solutions and tech
          mentorship
        </p>

        <div
          className="mt-12 flex gap-4 justify-center flex-wrap animate-fade-in opacity-0"
          style={{
            animationDelay: "700ms",
            animationFillMode: "forwards",
            animationDuration: "800ms",
          }}
        >
          <button className="px-8 py-4 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-all duration-300 shadow-lg shadow-violet-200 hover:scale-105">
            Get Started
          </button>
          <button className="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-all duration-300 border-2 border-slate-200 hover:scale-105">
            Learn More
          </button>
        </div>
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-20 right-20 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
