import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { PhotoGroupLink } from '@/components/PhotoGroupLink';
import { PhotoGroupPage } from '@/components/PhotoGroupPage';
import { NavItem } from '@/models';

async function getPhotoGroups() {
	'use server';

	const photos = await getDocs(collection(db, 'photos'));

	return photos.docs.map(doc => {
		const { title, src, year } = doc.data();

		return { id: doc.id, title, src, year };
	});
}

export default async function Home() {
	const photoGroups = await getPhotoGroups();

	const navItems: NavItem[] = await photoGroups.map(group => ({ slug: group.id, title: group.title }));

	return (
		<>
			<div className="h-screen snap-center">
				<header className="absolute z-10 top-0 left-0 flex justify-between items-center pt-6 md:pt-12 pl-4 md:pl-8">
					<h1 className="text-2xl text-white self-start bg-black md:bg-transparent">\ ALED WASSELL</h1>
				</header>
				<div className="flex flex-wrap h-full overflow-hidden">
					{photoGroups.map((group, index) => (
						<PhotoGroupLink
							key={group.id}
							{...group}
							index={index}
						/>
					))}
				</div>
			</div>

			{photoGroups.map(group => (
				<PhotoGroupPage
					id={group.id}
					key={group.id}
					title={group.title}
					navItems={navItems}></PhotoGroupPage>
			))}
		</>
	);
}
