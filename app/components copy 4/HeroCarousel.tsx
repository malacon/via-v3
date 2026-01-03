import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Img } from 'openimg/react'
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'

type HorizontalFocus = number | 'left' | 'center' | 'right'
type VerticalFocus = number | 'top' | 'center' | 'bottom'

export type Slide = {
	src: string // image URL
	heading?: string
	subheading?: string
	alt?: string // decorative? allow empty string if purely decorative
	focusX?: HorizontalFocus // Horizontal focus: number (0-100) for percentage, or 'left' | 'center' | 'right' - defaults to 'center'
	focusY?: VerticalFocus // Vertical focus: number (0-100) for percentage, or 'top' | 'center' | 'bottom' - defaults to 'center'
}

/**
 * Converts focusX and focusY values to a CSS object-position string
 */
function getObjectPosition(
	focusX?: HorizontalFocus,
	focusY?: VerticalFocus,
): string {
	const x = focusX ?? 'center'
	const y = focusY ?? 'center'

	const xValue = typeof x === 'number' ? `${x}%` : x
	const yValue = typeof y === 'number' ? `${y}%` : y

	// If both are center, just return 'center'
	if (xValue === 'center' && yValue === 'center') {
		return 'center'
	}

	return `${xValue} ${yValue}`
}

type HeroCarouselProps = {
	slides: Slide[]
	intervalMs?: number // default 6000
	heightClass?: string // e.g., "h-[80vh]" | "h-screen"
	overlayOpacity?: number // 0..1 black target on right (default 0.65)
	className?: string
	staticHeading?: string // If provided, this heading is always shown instead of slide-specific headings
	staticSubheading?: ReactNode // If provided, this subheading is always shown instead of slide-specific subheadings
	mobileSubheading?: ReactNode // Optional: Custom content for mobile grey section below carousel. If not provided and staticSubheading exists, will be used.
	mobileSubheadingBgColor?: string // Background color for mobile subheading section (default: "bg-gray-500")
}

export default function HeroCarousel({
	slides,
	intervalMs = 6000,
	heightClass = 'h-screen',
	overlayOpacity = 0.65,
	className = '',
	staticHeading,
	staticSubheading,
	mobileSubheading,
	mobileSubheadingBgColor = 'bg-via-primary',
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

	// Inline gradient style for left-side darkening panel
	// right -> left: never fully clear, maintain 15-20% minimum opacity
	// Ensure gradient goes from 0.15-0.2 minimum to target opacity
	const minOpacity = Math.max(0.15, overlayOpacity * 0.2)
	const gradient = `linear-gradient(to left, rgba(0,0,0,${minOpacity}) 0%, rgba(0,0,0,${overlayOpacity * 0.5}) 30%, rgba(0,0,0,${overlayOpacity}) 55%, rgba(0,0,0,${overlayOpacity}) 100%)`

	return (
		<>
			<section
				className={`relative w-full ${heightClass} overflow-hidden ${className} py-4`}
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
									: { duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }
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
								className="absolute inset-0 h-full w-full scale-x-[-1] object-cover"
								style={{
									objectPosition: getObjectPosition(
										current.focusX,
										current.focusY,
									),
								}}
							/>
						</motion.div>
					</AnimatePresence>

					{/* Right->Left gradient overlay that darkens the left half - static, doesn't fade - Hidden on mobile */}
					<div
						className="absolute inset-0 hidden md:block"
						style={{ backgroundImage: gradient }}
						aria-hidden
					/>
				</div>

				{/* Left-side content column - Hidden on mobile */}
				<div className="relative z-10 hidden h-full w-full md:block">
					<div className="px-content-x container3 mx-auto flex h-full w-full lg:pl-16!">
						{/* Text panel (left) */}
						<div className="flex w-full max-w-lg items-center">
							<div className="text-via-text-inverse w-full">
								{(staticHeading || current.heading) && (
									<h1 className="font-serif text-4xl leading-tight font-bold text-balance drop-shadow md:text-5xl">
										{staticHeading ?? current.heading}
									</h1>
								)}
								{(staticSubheading ?? current.subheading) && (
									<div className="font-body text-body-lg text-via-text-inverse mt-4 md:mt-6">
										{staticSubheading ?? <p>{current.subheading}</p>}
									</div>
								)}

								{/* Live region to announce slide changes for screen readers */}
								<p className="sr-only" aria-live="polite">
									Slide {index + 1} of {length}.
								</p>
							</div>
						</div>

						{/* Spacer / image side (right) */}
						<div className="grow" />
					</div>
				</div>

				{/* A subtle bottom gradient for legibility if content below overlaps */}
				<div
					className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent"
					aria-hidden
				/>
			</section>

			{/* Mobile-only text section below carousel */}
			{(mobileSubheading ?? staticSubheading) && (
				<div
					className={`${mobileSubheadingBgColor ?? 'bg-via-primary'} px-content-x font-body text-body-lg text-via-text-inverse py-8 md:hidden md:py-6`}
				>
					<div className="max-w-via-content mx-auto">
						{mobileSubheading ?? (
							<div className="font-body leading-relaxed">
								{typeof staticSubheading === 'string' ? (
									<p>{staticSubheading}</p>
								) : (
									staticSubheading
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</>
	)
}
