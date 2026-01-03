import { motion, useInView } from 'framer-motion'
import { Img } from 'openimg/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from '#app/components/ui/carousel.tsx'

interface ProfileCarouselSectionProps {
	/**
	 * Background color class (e.g., "bg-heading", "bg-white")
	 */
	background: string
	/**
	 * Images to display in the carousel
	 */
	carouselImages: string[]
	/**
	 * Hero image for mobile view
	 */
	mobileHeroImage: {
		src: string
		alt: string
		width: number
		height: number
	}
	/**
	 * Title text
	 */
	title?: string
	/**
	 * Content to display in the text section (description, list, etc.)
	 */
	children: ReactNode
	/**
	 * Position of the carousel on desktop ("left" or "right")
	 * @default "right"
	 */
	carouselPosition?: 'left' | 'right'
	/**
	 * Alt text prefix for carousel images
	 * @default title in lowercase
	 */
	imageAltPrefix?: string
	/**
	 * Carousel image width
	 * @default 800
	 */
	imageWidth?: number
	/**
	 * Carousel image height
	 * @default 1000
	 */
	imageHeight?: number
	/**
	 * Carousel container height
	 * @default "626px"
	 */
	carouselHeight?: string
	/**
	 * Mobile hero image height
	 * @default "500px"
	 */
	mobileHeroHeight?: string
	/**
	 * Additional className for the section
	 */
	className?: string
	/**
	 * Text color class for desktop view
	 * @default "text-white"
	 */
	textColor?: string
	/**
	 * Overlay background color for mobile view
	 * @default "bg-header"
	 */
	overlayBackground?: string
}

// Animation variants
const titleVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
		},
	},
}

const textVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
		},
	},
}

const imageVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
		},
	},
}

export function ProfileCarouselSection({
	background,
	carouselImages,
	mobileHeroImage,
	title,
	children,
	carouselPosition = 'right',
	imageAltPrefix,
	imageWidth = 800,
	imageHeight = 1000,
	carouselHeight = '626px',
	mobileHeroHeight = '500px',
	className = '',
	textColor = 'text-white',
	overlayBackground = 'bg-header',
}: ProfileCarouselSectionProps) {
	const [api, setApi] = useState<CarouselApi>()
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.3 })

	useEffect(() => {
		if (!api) return
		api.on('select', () => {
			// Handle selection if needed
		})
	}, [api])

	const altPrefix = imageAltPrefix || title?.toLowerCase()

	// Mobile: Image at top, text below (similar to HeroCarousel pattern)
	const mobileView = (
		<>
			{/* Image at top */}
			<div
				className={`relative w-full md:hidden`}
				style={{ height: mobileHeroHeight }}
			>
				<motion.div
					variants={imageVariants}
					initial="hidden"
					animate={isInView ? 'visible' : 'hidden'}
				>
					<Img
						src={mobileHeroImage.src}
						alt={mobileHeroImage.alt}
						width={mobileHeroImage.width}
						height={mobileHeroImage.height}
						fit="cover"
						isAboveFold
						className="h-full w-full object-cover"
					/>
				</motion.div>
			</div>
			{/* Text section below image */}
			<motion.div
				className={`${overlayBackground} w-full px-6 py-6 md:py-8 ${textColor} md:hidden`}
				variants={textVariants}
				initial="hidden"
				animate={isInView ? 'visible' : 'hidden'}
			>
				<motion.h4
					className={`mb-4 font-serif text-2xl font-normal ${textColor} md:text-3xl`}
					variants={titleVariants}
					initial="hidden"
					animate={isInView ? 'visible' : 'hidden'}
				>
					{title}
				</motion.h4>
				<motion.div
					variants={textVariants}
					initial="hidden"
					animate={isInView ? 'visible' : 'hidden'}
				>
					{children}
				</motion.div>
			</motion.div>
		</>
	)

	// Desktop: Two column layout
	const carouselElement = (
		<motion.div
			className="flex w-[40%]"
			variants={imageVariants}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
		>
			<div className="relative w-full" style={{ height: carouselHeight }}>
				<Carousel
					setApi={setApi}
					opts={{
						align: 'start',
						loop: true,
						dragFree: true,
					}}
					className="h-full w-full"
				>
					<CarouselContent>
						{carouselImages.map((src, index) => (
							<CarouselItem key={index} className="pl-0">
								<div className="relative h-full w-full overflow-hidden">
									<Img
										src={src}
										alt={`${altPrefix} ${index + 1}`}
										width={imageWidth}
										height={imageHeight}
										fit="cover"
										className="h-full w-full object-cover"
									/>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious variant="ghost" />
					<CarouselNext variant="ghost" />
				</Carousel>
			</div>
		</motion.div>
	)

	const textElement = (
		// make inner divs be left
		<motion.div
			className={`ml-auto flex w-[45%] max-w-[750px] flex-col space-y-6 py-12 ${textColor} md:py-16`}
			variants={textVariants}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
		>
			{title && (
				<motion.h4
					className={`max-w-[580px] pr-[50px] font-serif text-3xl font-normal ${textColor}`}
					variants={title ? titleVariants : undefined}
					initial="hidden"
					animate={isInView ? 'visible' : 'hidden'}
				>
					{title}
				</motion.h4>
			)}
			<motion.div
				className="pr-[50px]"
				variants={textVariants}
				initial="hidden"
				animate={isInView ? 'visible' : 'hidden'}
			>
				{children}
			</motion.div>
		</motion.div>
	)

	return (
		<section ref={ref} className={`${background} relative ${className}`.trim()}>
			{mobileView}
			{/* Desktop: Two column layout */}
			<div className="hidden md:flex md:items-stretch">
				{carouselPosition === 'left' ? (
					<>
						{carouselElement}
						{textElement}
					</>
				) : (
					<>
						{textElement}
						{carouselElement}
					</>
				)}
			</div>
		</section>
	)
}
