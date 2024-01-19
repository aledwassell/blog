import { PhotoGallery } from './PhotoGallery';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';

async function getPhotos(id: string) {
	const photos = await getDocs(collection(db, 'photos', id, 'photos'));

	return photos.docs.map(doc => {
		const { title, src, year } = doc.data();

		return { id: doc.id, title, src, year };
	});
}

export async function PhotoGroupPage({ id, title }: { id: string; title: string }) {
	const photos = await getPhotos(id);

	return (
		<section
			id={id}
			className="relative h-screen w-full flex justify-center items-center overflow-y-hidden overflow-x-hidden bg-black snap-y snap-center text-white">
			{photos.length <= 0 && <span>No Photos to show...</span>}

			<div className="absolute z-20 flex justify-center items-center">{photos.length > 0 && <h1>{title}</h1>}</div>

			{photos.length > 0 && <PhotoGallery photos={photos}></PhotoGallery>}
		</section>
	);
}
