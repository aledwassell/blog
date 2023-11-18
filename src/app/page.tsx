import Link from 'next/link';
import {PhotoItem} from '@/components/PhotoItem';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '@/firebase/config';

async function getPhotos() {
  'use server';

  const photos = await getDocs(collection(db, 'photos'));

  return photos.docs.map((doc) => {
    const {title, src, year} = doc.data();

    return {id: doc.id, title, src, year};
  });
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
