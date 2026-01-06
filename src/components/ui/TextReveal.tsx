import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  type?: 'char' | 'word';
  className?: string;
  delay?: number;
  duration?: number;
  as?: any; // Using any to avoid complex typing for now, ideally keyof JSX.IntrinsicElements
}

export const TextReveal = ({
  text,
  type = 'word',
  className = '',
  delay = 0,
  duration = 0.5,
  as: Component = 'span'
}: TextRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: type === 'char' ? 0.03 : 0.05,
        delayChildren: delay,
      },
    },
  };

  const item: Variants = {
    hidden: {
      y: 15,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  if (type === 'char') {
    const words = text.split(" ");
    return (
      <Component ref={ref} className={`inline ${className}`} aria-label={text}>
        <motion.span
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={container}
          aria-hidden="true"
          className="inline"
        >
          {words.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIdx) => (
                <span key={charIdx} className="inline-block overflow-hidden align-bottom">
                  <motion.span
                    variants={item}
                    className="inline-block"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
              {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </motion.span>
      </Component>
    );
  }

  return (
    <Component ref={ref} className={`inline ${className}`} aria-label={text}>
      <motion.span
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={container}
        aria-hidden="true"
        className="inline"
      >
        {text.split(" ").map((word, i) => (
          <span key={i} className="inline-block">
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span 
                variants={item} 
                className="inline-block"
                style={{ willChange: 'transform, opacity' }}
              >
                {word}
              </motion.span>
            </span>
            {i < text.split(" ").length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </motion.span>
    </Component>
  );
};
