import { animate } from 'framer-motion'
import { type ReactNode } from 'react'
import { Link, useLocation } from 'react-router'

interface FullWidthBannerLinkProps {
	to: string
	children: ReactNode
	className?: string
}

export function FullWidthBannerLink({
	to,
	children,
	className,
}: FullWidthBannerLinkProps) {
	const location = useLocation()

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		// Only handle anchor links (starting with #)
		if (to.startsWith('#')) {
			e.preventDefault()

			const hash = to.slice(1)
			const element = document.getElementById(hash)

			if (element) {
				// Calculate header height dynamically
				const header = document.querySelector('header')
				const headerHeight = header ? header.getBoundingClientRect().height : 0

				// Add extra padding for breathing room (16px = 1rem)
				const offset = headerHeight - 16

				const elementPosition = element.getBoundingClientRect().top
				const offsetPosition = elementPosition + window.pageYOffset - offset

				// Use framer-motion for smooth scrolling
				animate(window.scrollY, offsetPosition, {
					duration: 0.6,
					ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth motion
					onUpdate: (latest) => {
						window.scrollTo(0, latest)
					},
				})

				// Update URL without causing a navigation
				window.history.pushState(
					{},
					'',
					`${location.pathname}${location.search}${to}`,
				)
			}
		}
	}

	return (
		<Link
			to={to}
			onClick={handleClick}
			className={`bg-brand-navy hover:bg-opacity-90 focus:ring-offset-brand-navy relative z-10 block cursor-pointer px-6 py-8 text-center transition-all hover:scale-[1.02] hover:shadow-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none active:scale-[0.98] md:px-0 md:py-10 ${className ?? ''}`}
		>
			<p className="font-serif text-2xl leading-relaxed text-white underline decoration-white/30 decoration-2 underline-offset-4 transition-all hover:decoration-white/60 md:text-3xl">
				{children}
			</p>
		</Link>
	)
}
