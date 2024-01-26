'use client';

import * as React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import { Photo } from '@/models';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		};
	},
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

export function PhotoGallery({ photos }: { photos: Photo[] }) {
	const [[page, direction], setPage] = useState([0, 0]);

	const imageIndex = wrap(0, photos.length, page);

	const paginate = (newDirection: number) => {
		setPage([page + newDirection, newDirection]);
	};

	return (
		<>
			<AnimatePresence
				initial={false}
				custom={direction}>
				<motion.div
					className="absolute w-full h-full"
					key={page}
					custom={direction}
					variants={variants}
					initial="enter"
					animate="center"
					exit="exit"
					transition={{
						x: { type: 'spring', stiffness: 300, damping: 30 },
						opacity: { duration: 0.2 },
					}}
					drag="x"
					dragConstraints={{ left: 0, right: 0 }}
					dragElastic={1}
					onDragEnd={(e, { offset, velocity }) => {
						const swipe = swipePower(offset.x, velocity.x);

						if (swipe < -swipeConfidenceThreshold) {
							paginate(1);
						} else if (swipe > swipeConfidenceThreshold) {
							paginate(-1);
						}
					}}>
					<Image
						src={photos[imageIndex]?.src}
						alt={photos[imageIndex]?.title}
						fill
						sizes="100vw"
						style={{ objectFit: 'cover' }}
					/>
				</motion.div>
			</AnimatePresence>

			<div
				className="floating-carousel-button right-5 invisible lg:visible"
				onClick={() => paginate(1)}>
				<FontAwesomeIcon
					icon={faChevronRight}
					className="text-black"></FontAwesomeIcon>
			</div>

			<div
				className="floating-carousel-button left-5 invisible lg:visible"
				onClick={() => paginate(-1)}>
				<FontAwesomeIcon
					icon={faChevronLeft}
					className="text-black"></FontAwesomeIcon>
			</div>

			{/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 items-center text-emerald-400 text-sm">
				<span>swipe</span>
				<FontAwesomeIcon icon={faRightLeft}></FontAwesomeIcon>
			</div> */}
		</>
	);
}
