import { FLICKR_API_KEY, FLICKR_USER_ID } from '$env/static/private';

export const prerender = true;

interface FlickrPhoto {
	id: string;
	title: string;
	description: { _content: string };
	datetaken: string;
	url_m: string;
	height_m: number;
	width_m: number;
}

export async function load() {
	const url = `https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${FLICKR_API_KEY}&user_id=${encodeURIComponent(FLICKR_USER_ID)}&format=json&nojsoncallback=1&extras=url_m,title,description,date_taken&per_page=20`;

	const res = await fetch(url);
	const data = await res.json();

	const photos = data.photos.photo.map((p: FlickrPhoto) => ({
		id: p.id,
		title: p.title,
		description: p.description._content,
		dateTaken: p.datetaken,
		url: p.url_m,
		width: p.width_m,
		height: p.height_m
	}));

	return { photos };
}
