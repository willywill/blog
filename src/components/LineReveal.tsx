import {
  Fragment,
  type ElementType,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type LineRevealProps = {
  as?: ElementType;
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
};

type MeasuredWord = {
  text: string;
  top: number;
};

const splitWords = (text: string) =>
  text
    .trim()
    .split(/\s+/)
    .filter(Boolean);

const groupIntoLines = (words: MeasuredWord[]) => {
  const lines: string[] = [];
  let currentTop: number | null = null;
  let currentLine: string[] = [];

  words.forEach((word) => {
    if (currentTop === null || Math.abs(word.top - currentTop) < 2) {
      currentTop ??= word.top;
      currentLine.push(word.text);
      return;
    }

    lines.push(currentLine.join(' '));
    currentLine = [word.text];
    currentTop = word.top;
  });

  if (currentLine.length > 0) {
    lines.push(currentLine.join(' '));
  }

  return lines;
};

export default function LineReveal({
  as: Tag = 'div',
  text,
  className,
  delay = 0,
  stagger = 0.075,
  duration = 0.62,
}: LineRevealProps) {
  const words = useMemo(() => splitWords(text), [text]);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const [lines, setLines] = useState<string[]>([text]);
  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timeoutId = window.setTimeout(() => {
      setIsReady(true);
    }, 24);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setLines([text]);
      return;
    }

    const node = measureRef.current;
    if (!node) return;

    const measure = () => {
      const measuredWords = Array.from(node.querySelectorAll<HTMLElement>('[data-word]')).map(
        (wordNode) => ({
          text: wordNode.dataset.word ?? '',
          top: wordNode.offsetTop,
        }),
      );

      if (measuredWords.length === 0) {
        setLines([text]);
        return;
      }

      setLines(groupIntoLines(measuredWords));
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(node);
    window.addEventListener('resize', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [prefersReducedMotion, text]);

  const animatedLines: ReactNode = lines.map((line, index) => (
    <span className="line-reveal__clip" key={`${line}-${index}`}>
      <motion.span
        className="line-reveal__line"
        initial={prefersReducedMotion ? false : { y: '115%' }}
        animate={prefersReducedMotion || isReady ? { y: '0%' } : { y: '115%' }}
        transition={{
          duration,
          delay: delay + index * stagger,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {line}
      </motion.span>
    </span>
  ));

  return (
    <Tag className={className}>
      <span className="line-reveal line-reveal--root" aria-label={text}>
        {animatedLines}
        <span ref={measureRef} className="line-reveal__measure" aria-hidden="true">
          {words.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <span data-word={word}>{word}</span>
              {index < words.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </span>
      </span>
    </Tag>
  );
}
