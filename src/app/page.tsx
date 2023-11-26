import {PhotoItem} from '@/components/PhotoItem';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '@/firebase/config';
import {PhotoGroupLink} from '@/components/PhotoGroupLink';
import {cleanseString} from '@/utils/utils';
import {PhotoGroupPage} from '@/components/PhotoGroupPage';

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
      <div className="h-screen snap-center">
        <header className="absolute z-10 top-0 left-0 flex justify-between items-center py-12 px-8">
          <h1 className="text-2xl text-white self-start">\ ALED WASSELL</h1>
        </header>
        <div className="flex flex-wrap h-full overflow-hidden">
          {photos.map((photo) => (
            <PhotoGroupLink key={photo.id} {...photo} />
          ))}
        </div>
      </div>

      {photos.map((photo, index) => (
        <PhotoGroupPage
          id={cleanseString(photo.title)}
          key={photo.id}
          index={index}
          title={photo.title}
        ></PhotoGroupPage>
      ))}

      <footer className="flex justify-between items-center py-24 px-8 snap-end">
        <div></div>
        <span>aled wassell \ copyright {new Date().getFullYear()}</span>
      </footer>
    </>
  );
}
