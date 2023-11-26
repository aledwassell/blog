import {MotionDiv} from '@/lib/motion';
import {cleanseString} from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';

type PhotoGroupProps = {
  id: string;
  title: string;
  src: string;
};

export function PhotoGroupLink({id, title, src}: PhotoGroupProps) {
  return (
    <MotionDiv
      className="flex w-full aspect-video sm:w-1/2 sm:h-1/2 relative group"
      whileHover={{scale: 1.01}}
      whileTap={{scale: 0.95}}
      transition={{type: 'spring', stiffness: 200, damping: 17}}
    >
      <Link href={`#${cleanseString(title)}`}>
        <Image src={src} fill alt={title} style={{objectFit: 'cover'}} />
        <div className="flex gap-2 w-full justify-between absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-full flex justify-end gap-4 p-4 mb-4">
            <h1 className="text-2xl bg-slate-50">{title}</h1>
          </div>
        </div>
      </Link>
    </MotionDiv>
  );
}
