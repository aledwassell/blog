'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const useHash = () => {
	const params = useParams();
	const [hash, setHash] = useState('');

	useEffect(() => {
		const currentHash = window.location.hash.replace('#', '');
		setHash(currentHash);
	}, [params]);

	return hash;
};

export function Nav() {
	const pathname = usePathname();
	const hash = useHash();

	const navItems = [
		{ slug: '#london', label: 'London' },
		{ slug: '#scotland', label: 'Scotland' },
		{ slug: '#street', label: 'Street' },
		{ slug: '#tokyo-japan', label: 'Tokyo / Japan' },
	];
	return (
		<ul>
			{navItems.map(item => (
				<li key={item.slug}>
					<Link
						className={`${`#${hash}` === item.slug ? 'text-emerald-400 text-lg font-bold' : ''}`}
						href={`/${item.slug}`}>
						{item.label}
					</Link>
				</li>
			))}
		</ul>
	);
}
