import { PhotoGallery } from './PhotoGallery';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { Nav } from './Nav';
import { NavItem } from '@/models';

async function getPhotos(id: string) {
	const photos = await getDocs(collection(db, 'photos', id, 'photos'));

	return photos.docs.map(doc => {
		const { title, src, year } = doc.data();

		return { id: doc.id, title, src, year };
	});
}

export async function PhotoGroupPage({ id, title, navItems }: { id: string; title: string; navItems: NavItem[] }) {
	const photos = await getPhotos(id);

	return (
		<section
			id={id}
			className="relative h-screen w-full flex flex-col items-center overflow-y-hidden overflow-x-hidden bg-black snap-y snap-center text-white">
			{photos.length <= 0 && <span>No Photos to show...</span>}
			<div className="z-20 p-4 lg:ml-0 lg:mt-12 w-full lg:w-4/5">
				<h1 className="text-4xl">{photos.length > 0 && title}</h1>
			</div>
			<div className="relative flex-1 w-full lg:w-4/5 flex justify-center items-center">{photos.length > 0 && <PhotoGallery photos={photos}></PhotoGallery>}</div>
			<div className="z-20 w-full p-4 lg:pl-0 lg:pb-12 lg:w-4/5">
				<Nav navItems={navItems} />
			</div>
		</section>
	);
}
