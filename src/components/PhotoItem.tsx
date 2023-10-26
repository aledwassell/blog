'use client';

import Image from 'next/image';

type PhotoItemProps = {
  id: string;
  title: string;
  number: number;
  src: string;
  width: number;
  height: number;
  year: string;
};

export function PhotoItem({
  id,
  title,
  src,
  width,
  height,
  number,
  year,
}: PhotoItemProps) {
  return (
    <div className="flex flex-col">
      <Image
        src={src}
        width={width}
        height={height}
        alt={title}
        className="rounded drop-shadow-2xl mb-8"
      />
      <div className="flex justify-between items-center">
        <span className="text-slate-400">/ {padNumber(number)}</span>
        <h1 className="text-2xl">{title}</h1>
      </div>
      <span className="text-slate-400 self-end">{year}</span>
    </div>
  );
}

function padNumber(value: number): string {
  if (value > 10) return value.toString();

  const stringValue = value.toString();
  return stringValue.padStart(2, '0');
}
