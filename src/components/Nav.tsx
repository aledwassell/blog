'use client';

import { useHash } from '@/Hooks/useHash';
import { NavItem } from '@/models';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Nav({ navItems }: { navItems: NavItem[] }) {
	const hash = useHash();
	const router = useRouter();

	if (typeof window !== 'undefined') {
		const windowHeight = window.innerHeight;

		const sections = navItems.map(navItem => document.getElementById(navItem.slug));

		document.addEventListener('scroll', () => {
			for (const section of sections) {
                const newHash = `#${section?.id}`;
                
				const rect = section?.getBoundingClientRect();
				const rectTop = Math.round(rect?.top || 0);
				const rectBottom = Math.round(rect?.bottom || 0);
				if (!rectTop && rectBottom <= windowHeight) {
					router.push(newHash);
				}
			}
		});
	}

	return (
		<ul className="flex flex-wrap gap-1 justify-around items-center lg:items-start lg:flex-col">
			{navItems.map(item => (
				<li key={item.slug}>
					<Link
						href={`#${item.slug}`}
						className={`${hash === item.slug ? 'text-emerald-400 font-bold' : ''} text-2xl lg:text-base group`}>
						{item.title}
					</Link>
				</li>
			))}
		</ul>
	);
}
