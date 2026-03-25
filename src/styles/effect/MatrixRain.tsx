import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MatrixRainProps {
  /** Opacity of the whole canvas overlay (0–1). Default 0.18 */
  opacity?: number;
  /** Font size in px. Default 14 */
  fontSize?: number;
  /** Colour of the characters. Default '#6dffb3' (neon-green) */
  color?: string;
  /** Characters to use. Default: latin + katakana mix */
  chars?: string;
  className?: string;
}

const DEFAULT_CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}';

export const MatrixRain: React.FC<MatrixRainProps> = ({
  opacity = 0.18,
  fontSize = 14,
  color = '#6dffb3',
  chars = DEFAULT_CHARS,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let columns = 0;
    let drops: number[] = [];

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () =>
        Math.floor(Math.random() * -(canvas.height / fontSize))
      );
    };

    init();

    const charArray = chars.split('');
    const tick = { value: 0 };

    const draw = () => {
      // Semi-transparent black overlay for the trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const y = drops[i] * fontSize;
        const x = i * fontSize;

        // Bright white leading char
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillText(char, x, y);

        // Body chars in the chosen color with varying alpha
        const alpha = Math.random() * 0.6 + 0.3;
        ctx.fillStyle = color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
        if (!color.startsWith('rgba')) {
          // convert hex to rgba
          const r = parseInt(color.slice(1, 3), 16);
          const g = parseInt(color.slice(3, 5), 16);
          const b = parseInt(color.slice(5, 7), 16);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        }
        ctx.fillText(char, x, y - fontSize);

        // Reset to top when off-screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // Drive the animation via GSAP ticker for smooth frame rate control
    const onTick = () => {
      tick.value++;
      if (tick.value % 2 === 0) draw(); // draw every 2 frames ≈ 30fps feel
    };

    gsap.ticker.add(onTick);

    // Responsive resize
    const resizeObserver = new ResizeObserver(() => {
      init();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    resizeObserver.observe(canvas);

    return () => {
      gsap.ticker.remove(onTick);
      resizeObserver.disconnect();
      if (animRef.current) animRef.current.kill();
    };
  }, [fontSize, color, chars]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      style={{ opacity, mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
};
