import { FLICKR_API_KEY, FLICKR_USER_ID, YOUTUBE_API_KEY } from '$env/static/private';

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

interface YouTubePlaylistItem {
	snippet: {
		title: string;
		description: string;
		publishedAt: string;
		thumbnails: { high: { url: string } };
		resourceId: { videoId: string };
	};
}

export type BlogItem =
	| {
			type: 'photo';
			id: string;
			title: string;
			description: string;
			date: string;
			url: string;
			width: number;
			height: number;
	  }
	| {
			type: 'video';
			id: string;
			title: string;
			description: string;
			date: string;
			videoId: string;
			thumbnailUrl: string;
	  }
	| {
			type: 'track';
			id: string;
			title: string;
			date: string;
			trackUrl: string;
			artworkUrl: string;
	  };

function extractTag(xml: string, tag: string): string {
	const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
	return match ? match[1].trim() : '';
}

function extractAttr(xml: string, tag: string, attr: string): string {
	const match = xml.match(new RegExp(`<${tag}[^>]+${attr}="([^"]*)"[^>]*>`));
	return match ? match[1] : '';
}

export async function load() {
	const [flickrRes, channelRes, soundcloudRes] = await Promise.all([
		fetch(
			`https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${FLICKR_API_KEY}&user_id=${encodeURIComponent(FLICKR_USER_ID)}&format=json&nojsoncallback=1&extras=url_m,title,description,date_taken&per_page=20`
		),
		fetch(
			`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=albatrosspiano&key=${YOUTUBE_API_KEY}`
		),
		fetch('https://feeds.soundcloud.com/users/soundcloud:users:60934003/sounds.rss')
	]);

	const flickrData = await flickrRes.json();
	const channelData = await channelRes.json();
	const soundcloudXml = await soundcloudRes.text();

	const uploadsPlaylistId = channelData.items[0].contentDetails.relatedPlaylists.uploads;

	const videosRes = await fetch(
		`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=20&key=${YOUTUBE_API_KEY}`
	);
	const videosData = await videosRes.json();

	const photos: BlogItem[] = flickrData.photos.photo.map((p: FlickrPhoto) => ({
		type: 'photo' as const,
		id: p.id,
		title: p.title,
		description: p.description._content,
		date: p.datetaken,
		url: p.url_m,
		width: p.width_m,
		height: p.height_m
	}));

	const videos: BlogItem[] = videosData.items.map((v: YouTubePlaylistItem) => ({
		type: 'video' as const,
		id: v.snippet.resourceId.videoId,
		title: v.snippet.title,
		description: v.snippet.description,
		date: v.snippet.publishedAt,
		videoId: v.snippet.resourceId.videoId,
		thumbnailUrl: v.snippet.thumbnails.high.url
	}));

	const itemMatches = soundcloudXml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
	const tracks: BlogItem[] = itemMatches.map((item) => {
		const guid = extractTag(item, 'guid');
		return {
			type: 'track' as const,
			id: guid.split('/').pop() ?? guid,
			title: extractTag(item, 'title'),
			date: extractTag(item, 'pubDate'),
			trackUrl: extractTag(item, 'link'),
			artworkUrl: extractAttr(item, 'itunes:image', 'href')
		};
	});

	const items = [...photos, ...videos, ...tracks].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);

	return { items };
}
