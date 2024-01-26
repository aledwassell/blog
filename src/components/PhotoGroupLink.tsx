import { MotionDiv } from '@/lib/motion';
import Image from 'next/image';
import Link from 'next/link';
import PhotoHoverEffect from './PhotoHoverEffect';
import { Photo } from '@/models';

interface PhotoGroupProps extends Photo {
	index: number;
}

export function PhotoGroupLink({ id, index, title, src }: PhotoGroupProps) {
	return (
		<Link
			href={`#${id}`}
			className="flex w-full sm:w-1/2 sm:h-1/2 relative group">
			<MotionDiv
				className="relative h-full w-full"
				transition={{
					type: 'spring',
					ease: 'easeInOut',
					stiffness: 200,
					damping: 50,
				}}>
				<Image
					src={src}
					fill
					alt={title}
					sizes="(max-width: 375px) 384w, (max-width: 640px) 640w, (max-width: 750px) 384w, (max-width: 1200px) 640w, (max-width: 1920px) 828w, (max-width: 2048px) 1200w, 3840w"
					style={{ objectFit: 'cover' }}
				/>
				<PhotoHoverEffect index={index}>
					<h1 className="m-4 text-2xl text-black bg-slate-50">{title}</h1>
				</PhotoHoverEffect>
			</MotionDiv>
		</Link>
	);
}
