import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useVelocity } from 'framer-motion';

const squareCharset = '01[]{}<>/\\=+*';
const circleCharset = 'oxoO0@#*+:.';
const triangleCharset = '/\\<>^v|-_=+*:';

const buildSeededFrame = (charset: string, length: number, seed: number) => {
  let value = seed;

  return Array.from({ length }, () => {
    value = (value * 9301 + 49297) % 233280;
    return charset[Math.floor((value / 233280) * charset.length)];
  }).join('');
};

const toRows = (text: string, rowLength: number) =>
  text.match(new RegExp(`.{1,${rowLength}}`, 'g')) ?? [text];

const mutateFrame = (frame: string, charset: string, intensity: number, seed: number) => {
  const chars = frame.split('');
  const swaps = Math.max(1, Math.round(chars.length * intensity));
  let value = seed;

  for (let index = 0; index < swaps; index += 1) {
    value = (value * 9301 + 49297) % 233280;
    const charIndex = Math.floor((value / 233280) * chars.length);
    value = (value * 9301 + 49297) % 233280;
    chars[charIndex] = charset[Math.floor((value / 233280) * charset.length)];
  }

  return chars.join('');
};

function useVelocityDrivenAscii(charset: string, seed: number) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothedVelocity = useSpring(scrollVelocity, {
    damping: 24,
    stiffness: 150,
    mass: 0.2,
  });

  const baseFrame = useMemo(() => buildSeededFrame(charset, 528, seed), [charset, seed]);
  const [frame, setFrame] = useState(baseFrame);
  const velocityRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const seedRef = useRef(seed);
  const lastTickRef = useRef(0);

  useEffect(() => {
    setFrame(baseFrame);
  }, [baseFrame]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    return smoothedVelocity.on('change', (latest) => {
      velocityRef.current = Math.abs(latest);
    });
  }, [prefersReducedMotion, smoothedVelocity]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const tick = (time: number) => {
      const velocity = velocityRef.current;
      const normalized = Math.min(1, velocity / 2200);

      if (normalized > 0.015) {
        const interval = 80 - normalized * 62;
        if (time - lastTickRef.current >= interval) {
          lastTickRef.current = time;
          seedRef.current += 7;
          setFrame((current) =>
            mutateFrame(current, charset, 0.03 + normalized * 0.17, seedRef.current),
          );
        }
      } else if (time - lastTickRef.current >= 260) {
        lastTickRef.current = time;
        seedRef.current += 3;
        setFrame((current) => mutateFrame(current, charset, 0.006, seedRef.current));
      }

      animationRef.current = window.requestAnimationFrame(tick);
    };

    animationRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [charset, prefersReducedMotion]);

  return useMemo(() => toRows(frame, 22), [frame]);
}

export default function AsciiBadgePair() {
  const squareRows = useVelocityDrivenAscii(squareCharset, 11);
  const circleRows = useVelocityDrivenAscii(circleCharset, 29);
  const triangleRows = useVelocityDrivenAscii(triangleCharset, 53);

  return (
    <div className="ascii-badges" aria-hidden="true">
      <div className="ascii-badge ascii-badge--square">
        <pre>{squareRows.join('\n')}</pre>
      </div>
      <div className="ascii-badge ascii-badge--circle">
        <pre>{circleRows.join('\n')}</pre>
      </div>
      <div className="ascii-badge ascii-badge--triangle">
        <pre>{triangleRows.join('\n')}</pre>
      </div>
    </div>
  );
}
