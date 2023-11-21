'use client';

import {ImageLoaderProps} from 'next/image';
import {normalizeSrc} from './utils';

export default function customImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const params = [
    'f_auto',
    'c_limit',
    'w_' + width,
    'q_' + (quality || 'auto'),
  ];
  return `https://res.cloudinary.com/${
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }/image/upload/${params.join(',')}/${normalizeSrc(src)}`;
}
