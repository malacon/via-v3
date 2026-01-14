import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

type HeroParallaxProps = {
	imageSrc: string
	heading?: string
	subheading?: string
	heightClass?: string
	overlayClass?: string
	objectPosition?: string // e.g., "center 70%", "center top"
}

export default function HeroParallax({
	imageSrc,
	heading,
	subheading,
	heightClass = 'h-[80vh]',
	overlayClass = 'bg-black/40',
	objectPosition = 'center center',
}: HeroParallaxProps) {
	const sectionRef = useRef<HTMLDivElement>(null)

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start start', 'end start'],
	})

	const y = useTransform(scrollYProgress, [0, 1], ['0px', '-120px'], {
		clamp: true,
	})

	return (
		<section
			ref={sectionRef}
			className={`relative hidden ${heightClass} overflow-hidden md:block`}
			aria-label="Parallax hero"
		>
			<motion.div
				className="pointer-events-none fixed top-0 left-0 hidden h-screen w-screen will-change-transform md:block"
				style={{
					y,
					zIndex: 1,
				}}
				aria-hidden
				data-parallax-bg
			>
				<img
					src={imageSrc}
					alt=""
					className="h-full w-full object-cover"
					style={{ objectPosition }}
				/>
			</motion.div>

			<div
				className={`absolute inset-0 z-0 hidden ${overlayClass} md:block`}
				aria-hidden
			/>

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
