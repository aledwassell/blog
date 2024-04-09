import { PhotoGallery } from './PhotoGallery';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Nav } from './Nav';

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
			<div className="absolute z-20 self-start my-4 ml-4 lg:ml-0 lg:my-11 w-full lg:w-4/5">
				<h1 className="text-2xl lg:text-4xl">{photos.length > 0 && title}</h1>
			</div>
			{photos.length > 0 && <PhotoGallery photos={photos}></PhotoGallery>}
			<div className="z-20 self-end w-full pl-4 py-2 lg:pl-0 lg:py-4 lg:w-4/5">
				<Nav />
			</div>
		</section>
	);
}
