import {padNumber} from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';

type PhotoItemProps = {
  id: string;
  title: string;
  number: number;
  src: string;
  year: string;
};

export function PhotoItem({id, title, src, number, year}: PhotoItemProps) {
  return (
    <Link
      href={{
        pathname: `/${id}`,
        query: {title},
      }}
      className="flex w-full sm:w-1/2 aspect-video relative group"
    >
      <Image src={src} fill alt={title} style={{objectFit: 'cover'}} />
      <div className="flex gap-2 w-full justify-between absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="bg-slate-50 mt-auto justify-self-end ml-4">
          / {padNumber(number)}
        </span>
        <div className="flex flex-col justify-between items-center gap-4 backdrop-invert p-4 mb-4">
          <h1 className="text-2xl bg-slate-50">{title}</h1>
          <span className="self-end bg-slate-50">{year}</span>
        </div>
      </div>
    </Link>
  );
}
