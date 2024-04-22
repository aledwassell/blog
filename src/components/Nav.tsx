'use client';

import { useHash } from '@/Hooks/useHash';
import { NavItem } from '@/models';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { scroll } from 'framer-motion/dom';

export function Nav({ navItems }: { navItems: NavItem[] }) {
	const hash = useHash();
	const router = useRouter();

	if (typeof window !== 'undefined') {
		const sections = navItems.map(navItem => document.getElementById(navItem.slug));

		scroll(
			() => {
				const currentSectionId = sections.filter(section => section?.getBoundingClientRect().top === 0)[0]?.id;

				if (currentSectionId && currentSectionId != hash) router.push(`#${currentSectionId}`);
			},
			{ axis: 'y' }
		);
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
