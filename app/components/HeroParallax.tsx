import { motion, useScroll, useTransform } from 'framer-motion'
import { Img } from 'openimg/react'
import { useRef } from 'react'

type HeroParallaxProps = {
	imageSrc: string
	heading?: string
	subheading?: string
	heightClass?: string // e.g., "h-[80vh]" or "h-screen"
	overlayClass?: string // e.g., "bg-black/40"
}

export default function HeroParallax({
	imageSrc,
	heading,
	subheading,
	heightClass = 'h-[80vh]',
	overlayClass = 'bg-black/40',
}: HeroParallaxProps) {
	const sectionRef = useRef<HTMLDivElement>(null)

	// Track scroll relative to the section to create a gentle parallax
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end start'],
	})

	// Move background slightly slower than scroll (negative == opposite/lag)
	// Clamp keeps values in range for smoother behavior
	const y = useTransform(scrollYProgress, [0, 1], ['0px', '-120px'], {
		clamp: true,
	})

	// Reduced motion: disable transforms via a CSS class (handled in tailwind.css)

	return (
		<section
			ref={sectionRef}
			className={`relative hidden ${heightClass} overflow-hidden md:block`}
			aria-label="Parallax hero"
		>
			{/* Fixed viewport layer behind content - stays pinned to viewport */}
			<motion.div
				// Use fixed so it stays "stuck" to the viewport; behind content frame
				className="pointer-events-none fixed top-0 left-0 hidden h-screen w-screen will-change-transform md:block"
				style={{
					y, // disabled by reduced-motion CSS below
					zIndex: 1,
				}}
				aria-hidden
				data-parallax-bg
			>
				<Img
					src={imageSrc}
					alt=""
					width={1920}
					height={1080}
					fit="cover"
					isAboveFold
					className="h-full w-full object-cover"
				/>
			</motion.div>

			{/* Optional overlay to increase text contrast */}
			<div
				className={`absolute inset-0 z-0 hidden ${overlayClass} md:block`}
				aria-hidden
			/>

			{/* Foreground frame acts like the window through which we see the fixed bg */}
			{(heading || subheading) && (
				<div className="relative z-[2] flex h-full flex-col items-center justify-center px-6 text-center text-white">
					{heading && (
						<h1 className="text-5xl font-bold drop-shadow-lg md:text-6xl">
							{heading}
						</h1>
					)}
					{subheading && (
						<p className="mt-4 max-w-2xl text-lg drop-shadow md:text-2xl md:leading-relaxed">
							{subheading}
						</p>
					)}
				</div>
			)}
		</section>
	)
}
