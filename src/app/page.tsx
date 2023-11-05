import Link from 'next/link';
import prisma from '../db';
import {PhotoItem} from '@/components/PhotoItem';

function getPhotos() {
  return prisma.photo.findMany();
}

export default async function Home() {
  const photos = await getPhotos();

  return (
    <>
      <header className="flex justify-between items-center py-12 px-8">
        <h1 className="text-2xl">\ ALED WASSELL</h1>
        <Link href="/new" className="button">
          New
        </Link>
      </header>

      <div className="flex flex-wrap">
        {photos.map((photo, index) => (
          <PhotoItem key={photo.id} {...photo} number={index + 1} />
        ))}
      </div>

      <footer className="flex justify-between items-center py-24 px-8">
        <div></div>
        <span>aled wassell \ copyright {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
