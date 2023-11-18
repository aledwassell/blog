import prisma from '@/db';
import {MotionDiv} from '@/lib/motion';
import {AiOutlineClose} from 'react-icons/ai';
import Image from 'next/image';
import Link from 'next/link';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '@/firebase/config';

type PhotoProps = {
  params: {id: string};
  searchParams: {
    src: string;
    title: string;
  };
};

async function getPhoto(id: string) {
  'use server';

  const photoRef = doc(db, 'photos', id);

  const photo = await getDoc(photoRef);

  if (photo.exists()) {
    return photo.data();
  } else {
    console.error(`No photo found with ID ${id}!`);
  }
}

export default async function Photo({params}: PhotoProps) {
  const photo = await getPhoto(params.id);

  return (
    photo && (
      <>
        <MotionDiv
          className="absolute -z-10 left-0 top-0 w-full h-full"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 0.4,
              transition: {
                delay: 0.2,
                duration: 2,
              },
            },
          }}
        >
          <Image
            src={photo.src}
            fill
            alt={photo.title}
            style={{objectFit: 'cover'}}
          />
        </MotionDiv>

        <div className="flex m-8">
          <MotionDiv
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              type: 'spring',
              delay: 1,
              stiffness: 260,
              damping: 20,
              duration: 1,
            }}
          >
            <Link href="/">
              <AiOutlineClose className="text-slate-600 h-12 w-12" />
            </Link>
          </MotionDiv>
        </div>

        <div className="grow flex justify-center items-center my-auto w-full">
          <MotionDiv
            className="flex flex-col gap-5"
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              type: 'spring',
              delay: 1.2,
              stiffness: 260,
              damping: 20,
              duration: 1,
            }}
          >
            <div className="flex justify-between w-full items-center">
              <h1 className="text-3xl">{photo.title}</h1>
              <h2 className="text-ml">{photo.year}</h2>
            </div>
            <Image
              src={photo.src}
              width="600"
              height="600"
              alt={photo.title}
              style={{objectFit: 'cover'}}
            />
          </MotionDiv>
        </div>
      </>
    )
  );
}
