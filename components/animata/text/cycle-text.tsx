'use client';
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CycleTextProps {
  words: string[];
  locale: string;
  localePlur: string;
  text: string;
}

export default function CycleText({ words, locale, localePlur, text }: CycleTextProps) {
  const [index, setIndex] = useState(0);
  const total = words.length;
  const wordRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState('auto');
  let plur = localePlur;

  // Calculate the maximum width needed
  useEffect(() => {
    if (wordRef.current) {
      const maxWidth = Math.max(...words.map(word => {
        wordRef.current!.textContent = word;
        return wordRef.current!.getBoundingClientRect().width;
      }));
      setWidth(`${maxWidth}px`);
    }
  }, [words]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 4000);
    return () => clearInterval(interval);
  }, [total]);

  if (locale === 'en' && !words[index].endsWith('s')) {
    plur = `${plur}s`;
  }

  if (locale === 'es' && words[index].endsWith('s')) {
    plur = `${plur}s`;
  }

  const [beforeText, afterText] = text.replace('pluralized', plur).split('itemType');

  return (
    <div className="mt-4 sm:mt-16 text-xl font-light text-pretty sm:text-3xl text-secondary-content">
      {/* Hidden element for measurement */}
      <div ref={wordRef} className="absolute invisible font-bold">{words[0]}</div>

      {beforeText} (
      <span className="inline-flex justify-center" style={{ width }}>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={`words_${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="inline-block font-bold text-center"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      ){afterText}
    </div>
  );
}