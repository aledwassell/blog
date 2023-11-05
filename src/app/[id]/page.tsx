import prisma from '@/db';
import {MotionDiv} from '@/lib/motion';
import {AiOutlineClose} from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';

type PhotoProps = {
  params: {id: string};
  searchParams: {
    src: string;
    title: string;
  };
};

function getPhoto(id: string) {
  return prisma.photo.findUnique({
    where: {
      id,
    },
  });
}

export default async function Photo({params}: PhotoProps) {
  const photo = await getPhoto(params.id);

  return (
    photo && (
      <div className="h-screen">
        <Link href="/">
          <AiOutlineClose className="absolute left-10 top-10 text-slate-600 z-10 h-12 w-12" />
        </Link>
        {/* <MotionDiv
            initial="visible"
            animate="hidden"
            variants={{
              visible: {
                opacity: 1,
              },
              hidden: {
                opacity: 0.4,
                transition: {
                  delay: 0.2,
                  duration: 0.8,
                },
              },
            }}
          > */}
        <Image
          className="absolute -z-10"
          src={photo.src}
          fill
          alt={photo.title}
          style={{objectFit: 'cover'}}
        />
        {/* </MotionDiv> */}
      </div>
    )
  );
}
