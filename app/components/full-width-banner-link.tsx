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
			className={`bg-button-banner relative z-10 block px-6 py-6 text-center transition-opacity hover:opacity-80 md:px-0 ${className ?? ''}`}
		>
			<p className="font-serif text-2xl text-gray-100">{children}</p>
		</Link>
	)
}
