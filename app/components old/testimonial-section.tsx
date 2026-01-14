import { motion, useInView } from 'framer-motion'
import { Img } from 'openimg/react'
import React, { useRef, type ReactNode } from 'react'

interface TestimonialImage {
	src: string
	alt: string
	width: number
	height: number
	containerWidth?: string
	containerHeight?: string
	containerClassName?: string
	className?: string
	cropX?: number | string // Offset from left (pixels or percentage like "20%")
	cropY?: number | string // Offset from top (pixels or percentage like "30%")
	objectPosition?: string // CSS object-position value (focal point, e.g., "center", "top left", "20% 30%")
}

interface TestimonialHeadshot {
	src: string
	alt: string
	width: number
	height: number
	size?: string // e.g., 'w-32 h-32' or 'w-40 h-40'
	cropX?: number | string // Offset from left (pixels or percentage like "20%")
	cropY?: number | string // Offset from top (pixels or percentage like "30%")
	objectPosition?: string // CSS object-position value (focal point, e.g., "center", "top left", "20% 30%")
}

interface TestimonialSectionProps {
	id?: string
	name: string
	headshot?: TestimonialHeadshot
	headshotColor?: string // Color for the circle when no headshot is provided
	images: TestimonialImage[]
	textSections: ReactNode[]
	variant?: 'light' | 'dark'
	className?: string
}

export function TestimonialSection({
	id,
	name,
	headshot,
	headshotColor,
	images,
	textSections,
	variant = 'light',
	className,
}: TestimonialSectionProps) {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.3 })

	const bgColor = variant === 'dark' ? 'bg-[#364153]' : 'bg-white'
	const titleColor = variant === 'dark' ? 'text-white' : 'text-gray-900'
	const textColor = variant === 'dark' ? 'text-white' : 'text-gray-800'
	const defaultHeadshotColor =
		headshotColor || (variant === 'dark' ? '#4a5568' : '#e5e7eb')

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

	// Determine image position for each image after headshot
	// Images alternate: right, left, right, left...
	const getImagePosition = (index: number): 'left' | 'right' => {
		return index % 2 === 0 ? 'right' : 'left'
	}

	// Calculate object-position from cropX, cropY, and objectPosition
	const getObjectPosition = (
		cropX?: number | string,
		cropY?: number | string,
		objectPosition?: string,
	): string => {
		// If objectPosition is explicitly provided, use it
		if (objectPosition) {
			return objectPosition
		}

		// Otherwise, calculate from cropX and cropY
		const x = cropX
			? typeof cropX === 'number'
				? `${cropX}px`
				: cropX
			: 'center'
		const y = cropY
			? typeof cropY === 'number'
				? `${cropY}px`
				: cropY
			: 'center'

		// If both are provided, combine them
		if (cropX && cropY) {
			return `${x} ${y}`
		}
		// If only one is provided, use center for the other
		if (cropX) {
			return `${x} center`
		}
		if (cropY) {
			return `center ${y}`
		}

		// Default to center
		return 'center'
	}

	// Render image with appropriate float positioning
	const renderImage = (image: TestimonialImage, position: 'left' | 'right') => {
		const floatClass =
			position === 'left' ? 'float-left mr-6' : 'float-right ml-6'
		const containerWidth = image.containerWidth || 'w-full max-w-md md:max-w-sm'
		const containerClassName = image.containerClassName || ''
		const objectPosition = getObjectPosition(
			image.cropX,
			image.cropY,
			image.objectPosition,
		)

		return (
			<motion.div
				className={`${floatClass} mb-6 ${containerWidth} ${containerClassName}`}
				variants={imageVariants}
				initial="hidden"
				animate={isInView ? 'visible' : 'hidden'}
			>
				<Img
					src={image.src}
					alt={image.alt}
					width={image.width}
					height={image.height}
					fit="cover"
					className={image.className || 'w-full object-cover'}
					style={{
						objectPosition: objectPosition,
					}}
				/>
			</motion.div>
		)
	}

	// Render headshot with circular shape and text wrapping
	// Always renders a circle - either with image or colored background
	const renderHeadshot = () => {
		const headshotSize = headshot?.size || 'w-32 h-32 md:w-60 md:h-60'
		const objectPosition = headshot
			? getObjectPosition(
					headshot.cropX,
					headshot.cropY,
					headshot.objectPosition,
				)
			: 'center'

		return (
			<motion.div
				className={`float-left mr-3 shrink-0 overflow-hidden rounded-full bg-neutral-200 ${headshotSize}`}
				style={{
					shapeOutside: `polygon(100% 50%,97.55% 65.45%,90.45% 79.39%,79.39% 90.45%,65.45% 97.55%,50% 100%,34.55% 97.55%,20.61% 90.45%,9.55% 79.39%,2.45% 65.45%,0% 50%,2.45% 34.55%,9.55% 20.61%,20.61% 9.55%,34.55% 2.45%,50% 0%,65.45% 2.45%,79.39% 9.55%,90.45% 20.61%,97.55% 34.55%)`,
					// .polygon {
					// 	width: 200px; /* adjust to control the size */
					// 	aspect-ratio: 1;
					// 	clip-path: polygon(100% 50%,97.55% 65.45%,90.45% 79.39%,79.39% 90.45%,65.45% 97.55%,50% 100%,34.55% 97.55%,20.61% 90.45%,9.55% 79.39%,2.45% 65.45%,0% 50%,2.45% 34.55%,9.55% 20.61%,20.61% 9.55%,34.55% 2.45%,50% 0%,65.45% 2.45%,79.39% 9.55%,90.45% 20.61%,97.55% 34.55%);
					// }
					shapeMargin: '0.075rem',
					backgroundColor: headshot ? undefined : defaultHeadshotColor,
				}}
				variants={imageVariants}
				initial="hidden"
				animate={isInView ? 'visible' : 'hidden'}
			>
				{headshot ? (
					<Img
						src={headshot.src}
						alt={headshot.alt}
						width={headshot.width}
						height={headshot.height}
						fit="cover"
						className="h-full w-full object-cover"
						style={{
							objectPosition: objectPosition,
						}}
					/>
				) : (
					<div className="h-full w-full" aria-hidden="true" />
				)}
			</motion.div>
		)
	}

	return (
		<section
			id={id}
			ref={ref}
			className={`relative z-10 ${bgColor} py-8 ${className ?? ''}`}
		>
			<div className="mx-auto max-w-6xl px-4">
				<div className="space-y-6">
					{/* Headshot, name, first image, and first text section */}
					<div className="clear-both">
						{renderHeadshot()}
						{/* Header text at the top, inline with headshot */}
						<motion.h2
							className={`mb-4 inline-block font-sans text-4xl font-normal ${titleColor}`}
							variants={titleVariants}
							initial="hidden"
							animate={isInView ? 'visible' : 'hidden'}
						>
							{name}
						</motion.h2>
						{/* First image floated right, aligned with first paragraph */}
						{images.length > 0 &&
							images[0] &&
							(() => {
								const firstImage = images[0]
								const containerWidth =
									firstImage.containerWidth || 'w-full max-w-md md:max-w-sm'
								const containerClassName = firstImage.containerClassName || ''
								const objectPosition = getObjectPosition(
									firstImage.cropX,
									firstImage.cropY,
									firstImage.objectPosition,
								)
								return (
									<motion.div
										className={`float-right mb-6 ml-6 ${containerWidth} ${containerClassName}`}
										variants={imageVariants}
										initial="hidden"
										animate={isInView ? 'visible' : 'hidden'}
									>
										<Img
											src={firstImage.src}
											alt={firstImage.alt}
											width={firstImage.width}
											height={firstImage.height}
											fit="cover"
											className={firstImage.className || 'w-full object-cover'}
											style={{
												objectPosition: objectPosition,
											}}
										/>
									</motion.div>
								)
							})()}
						{/* Body text wraps around headshot */}
						{textSections.length > 0 && (
							<motion.div
								className={`space-y-4 text-lg leading-[25px] font-thin ${textColor}`}
								variants={textVariants}
								initial="hidden"
								animate={isInView ? 'visible' : 'hidden'}
							>
								{textSections[0]}
							</motion.div>
						)}
					</div>

					{/* Additional image-text pairs (starting from second image) */}
					{images.slice(1).map((image, index) => {
						const textIndex = index + 1
						const position = getImagePosition(index + 1)

						return (
							<div key={index + 1} className="clear-both">
								{renderImage(image, position)}
								{textSections[textIndex] && (
									<motion.div
										className={`space-y-4 text-lg leading-[25px] font-thin ${textColor}`}
										variants={textVariants}
										initial="hidden"
										animate={isInView ? 'visible' : 'hidden'}
									>
										{textSections[textIndex]}
									</motion.div>
								)}
							</div>
						)
					})}

					{/* Clear both at the end */}
					<div className="clear-both" />
				</div>
			</div>
		</section>
	)
}
