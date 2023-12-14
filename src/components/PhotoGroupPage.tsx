'use client';
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

function useParallax(value: MotionValue<number>, distance: number) {
	return useTransform(value, [0, 1], [-distance, distance]);
}

export function PhotoGroupPage({ id, index, title }: { id: string; index: number; title: string }) {
	const textRef = useRef(null);
	const y = useParallax(useScroll({ target: textRef }).scrollYProgress, 500);

	return (
		<section
			id={id}
			className={`relative flex justify-center items-center h-screen w-full bg-black snap-center`}>
			<div
				ref={textRef}
				className="relative flex flex-col overflow-hidden">
				<h1 className="text-4xl text-white">{title}</h1>
				<Image
					src="bwmp566tibvopv2vyp8i.jpg"
					width={400}
					height={600}
					alt={title}
					style={{ objectFit: 'cover' }}
				/>
			</div>
			<motion.div
				style={{ y }}
				className="absolute right-0 bottom-0 lg:right-1/4 lg:bottom-1/4 bg-black text-white p-4 max-w-xs">
				<h2 className="text-2xl pb-2">MOTION DIV</h2>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ultricies massa metus, non pellentesque ex vehicula nec. Maecenas lorem eros, sollicitudin lacinia elit a,
					viverra malesuada leo. Quisque consectetur mollis neque eget egestas.
				</p>
			</motion.div>
		</section>
	);
}
