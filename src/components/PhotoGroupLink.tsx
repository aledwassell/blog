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
		<MotionDiv
			className="flex w-full sm:w-1/2 sm:h-1/2 relative group"
			whileHover={{ scale: 1 }}
			whileTap={{ scale: 0.95 }}
			transition={{
				type: 'spring',
				ease: 'easeInOut',
				stiffness: 200,
				damping: 50,
			}}>
			<Link href={`#${id}`}>
				<Image
					src={src}
					fill
					alt={title}
					style={{ objectFit: 'cover' }}
				/>
				<PhotoHoverEffect index={index}>
					<h1 className="m-4 text-2xl text-black bg-slate-50">{title}</h1>
				</PhotoHoverEffect>
			</Link>
		</MotionDiv>
	);
}
