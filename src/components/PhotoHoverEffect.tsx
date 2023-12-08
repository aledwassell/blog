'use client';

import useWindowDimension from '@/hooks/useWindowDimension';
import {motion} from 'framer-motion';
import {platform} from 'os';

const br = {
  className: 'bottom-0 right-0',
  variants: {
    initial: {clipPath: 'polygon(100% 100%, 100% 100%, 100% 100%)'},
    animate: {clipPath: 'polygon(100% 100%, 100% 60%, 60% 100%)'},
    animateMobile: {clipPath: 'polygon(100% 100%, 100% 60%, 0% 100%)'},
  },
};

const bl = {
  className: 'bottom-0 left-0',
  variants: {
    initial: {clipPath: 'polygon(0% 100%, 0% 100%, 0% 100%)'},
    animate: {clipPath: 'polygon(0% 100%, 0% 60%, 40% 100%)'},
    animateMobile: {clipPath: 'polygon(0% 100%, 0% 60%, 100% 100%)'},
  },
};

const tl = {
  className: 'top-0 left-0',
  variants: {
    initial: {clipPath: 'polygon(0% 0%, 0% 0%, 0% 0%)'},
    animate: {clipPath: 'polygon(0% 0%, 0% 40%, 40% 0%)'},
    animateMobile: {clipPath: 'polygon(0% 0%, 0% 40%, 100% 0%)'},
  },
};

const tr = {
  className: 'top-0 right-0',
  variants: {
    initial: {clipPath: 'polygon(100% 0%, 100% 0%, 100% 0%)'},
    animate: {clipPath: 'polygon(100% 0%, 60% 0%, 100% 40%)'},
    animateMobile: {clipPath: 'polygon(100% 0%, 0% 0%, 100% 40%)'},
  },
};

const overlayByIndex = [br, bl, tr, tl];

export default function PhotoHoverEffect({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const {variants, className} = overlayByIndex[index];

  const isMobile = useWindowDimension().width < 640;

  return (
    <motion.div
      className="absolute flex justify-center items-center text-4xl w-full h-full z-30"
      initial="initial"
      animate={isMobile ? 'animateMobile' : 'initial'}
      whileHover="animate"
      whileTap={isMobile ? 'initial' : 'animate'}
    >
      <motion.div
        transition={{
          type: 'spring',
          delay: 0.1,
          ease: 'easeInOut',
          stiffness: 200,
          damping: 50,
        }}
        variants={variants}
        className="bg-black text-white w-full h-full"
      >
        <div className={`absolute ${className}`}>{children}</div>
      </motion.div>
    </motion.div>
  );
}
