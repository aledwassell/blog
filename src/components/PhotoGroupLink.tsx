import {MotionDiv} from '@/lib/motion';
import {cleanseString} from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import PhotoHoverEffect from './PhotoHoverEffect';

type PhotoGroupProps = {
  id: string;
  index: number;
  title: string;
  src: string;
};

export function PhotoGroupLink({id, index, title, src}: PhotoGroupProps) {
  return (
    <MotionDiv
      className="flex w-full aspect-video sm:w-1/2 sm:h-1/2 relative group"
      whileHover={{scale: 1}}
      whileTap={{scale: 0.95}}
      transition={{
        type: 'spring',
        ease: 'easeInOut',
        stiffness: 200,
        damping: 50,
      }}
    >
      <Link href={`#${cleanseString(title)}`}>
        <Image src={src} fill alt={title} style={{objectFit: 'cover'}} />
        <PhotoHoverEffect index={index}>
          <h1 className="m-4 text-2xl text-black bg-slate-50">{title}</h1>
        </PhotoHoverEffect>
      </Link>
    </MotionDiv>
  );
}
