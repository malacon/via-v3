import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Img } from 'openimg/react'
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'

type Slide = {
	src: string // image URL
	heading?: string
	subheading?: string
	alt?: string // decorative? allow empty string if purely decorative
}

type HeroCarouselProps = {
	slides: Slide[]
	intervalMs?: number // default 6000
	heightClass?: string // e.g., "h-[80vh]" | "h-screen"
	overlayOpacity?: number // 0..1 black target on right (default 0.65)
	className?: string
	staticHeading?: string // If provided, this heading is always shown instead of slide-specific headings
	staticSubheading?: ReactNode // If provided, this subheading is always shown instead of slide-specific subheadings
}

export default function HeroCarousel({
	slides,
	intervalMs = 6000,
	heightClass = 'h-screen',
	overlayOpacity = 0.65,
	className = '',
	staticHeading,
	staticSubheading,
}: HeroCarouselProps) {
	const [index, setIndex] = useState(0)
	const reduced = useReducedMotion()

	// Guard: need at least one slide
	const safeSlides = useMemo(
		() =>
			slides.length
				? slides
				: [
						{
							src: '/img/hero-1.jpg',
							heading: 'Add slides[]',
							subheading: 'This is a placeholder slide.',
							alt: '',
						},
					],
		[slides],
	)

	const length = safeSlides.length
	const current = safeSlides[index] ?? { src: '', alt: '' }

	// Auto-advance with visibility awareness
	const timerRef = useRef<number | null>(null)

	const clearTimer = () => {
		if (timerRef.current) {
			window.clearInterval(timerRef.current)
			timerRef.current = null
		}
	}

	const startTimer = () => {
		if (timerRef.current || length <= 1) return
		timerRef.current = window.setInterval(() => {
			setIndex((i) => (i + 1) % length)
		}, intervalMs) as unknown as number
	}

	useEffect(() => {
		const handleVisibility = () => {
			if (document.hidden) {
				clearTimer()
			} else {
				startTimer()
			}
		}

		startTimer()
		document.addEventListener('visibilitychange', handleVisibility)

		return () => {
			clearTimer()
			document.removeEventListener('visibilitychange', handleVisibility)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [intervalMs, length])

	// Variants for fade cross-fade
	const fade = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	}

	// Inline gradient style for right-side darkening panel
	// left -> right: transparent to rgba(0,0,0,overlayOpacity)
	const gradient = `linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,${overlayOpacity}) 55%, rgba(0,0,0,${overlayOpacity}) 100%)`

	return (
		<section
			className={`relative w-full ${heightClass} overflow-hidden ${className}`}
			role="region"
			aria-label="Hero image carousel"
		>
			{/* Slides as absolutely positioned layers to cross-fade */}
			<div className="absolute inset-0">
				<AnimatePresence mode="sync">
					<motion.div
						key={current?.src + index} // key on index to trigger transition
						variants={fade}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={
							reduced
								? { duration: 0 }
								: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }
						}
						className="will-change-opacity absolute inset-0"
						aria-hidden={current.alt ? undefined : true}
					>
						{/* Background image layer */}
						<Img
							src={current.src}
							alt={current.alt || ''}
							width={1920}
							height={1080}
							fit="cover"
							isAboveFold
							className="absolute inset-0 h-full w-full object-cover"
						/>
					</motion.div>
				</AnimatePresence>

				{/* Left->Right gradient overlay that darkens the right half - static, doesn't fade */}
				<div
					className="absolute inset-0"
					style={{ backgroundImage: gradient }}
					aria-hidden
				/>
			</div>

			{/* Right-side content column */}
			<div className="relative z-10 h-full w-full">
				<div className="flex h-full w-full">
					{/* Spacer / image side (left) */}
					<div className="grow" />

					{/* Text panel (right) */}
					<div className="flex w-full max-w-[720px] items-center px-6 py-10 md:max-w-[640px] md:px-10 md:py-16 lg:max-w-[720px] xl:max-w-[800px]">
						<div className="w-full text-right text-white">
							{(staticHeading || current.heading) && (
								<h1 className="text-4xl font-bold drop-shadow md:text-5xl lg:text-6xl">
									{staticHeading ?? current.heading}
								</h1>
							)}
							{(staticSubheading ?? current.subheading) && (
								<div className="mt-4 text-lg opacity-90 md:mt-6 md:text-2xl md:leading-relaxed">
									{staticSubheading ?? <p>{current.subheading}</p>}
								</div>
							)}

							{/* Live region to announce slide changes for screen readers */}
							<p className="sr-only" aria-live="polite">
								Slide {index + 1} of {length}.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* A subtle bottom gradient for legibility if content below overlaps */}
			<div
				className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent"
				aria-hidden
			/>
		</section>
	)
}
