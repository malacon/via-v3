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
}

interface TestimonialSectionProps {
	id?: string
	name: string
	images: TestimonialImage[]
	textSections: ReactNode[]
	firstImagePosition?: 'left' | 'right'
	variant?: 'light' | 'dark'
	className?: string
}

export function TestimonialSection({
	id,
	name,
	images,
	textSections,
	firstImagePosition = 'left',
	variant = 'light',
	className,
}: TestimonialSectionProps) {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.3 })

	const bgColor = variant === 'dark' ? 'bg-[#364153]' : 'bg-white'
	const titleColor = variant === 'dark' ? 'text-white' : 'text-gray-900'
	const textColor = variant === 'dark' ? 'text-white' : 'text-gray-800'

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

	// Determine image position for each image based on firstImagePosition
	const getImagePosition = (index: number): 'left' | 'right' => {
		if (firstImagePosition === 'left') {
			return index % 2 === 0 ? 'left' : 'right'
		} else {
			return index % 2 === 0 ? 'right' : 'left'
		}
	}

	// Render image with appropriate float positioning
	const renderImage = (image: TestimonialImage, position: 'left' | 'right') => {
		const floatClass =
			position === 'left' ? 'float-left mr-6' : 'float-right ml-6'
		const containerWidth = image.containerWidth || 'w-full max-w-md md:max-w-sm'
		const containerClassName = image.containerClassName || ''

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
				/>
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
					{/* First image and name section */}
					<div className="clear-both">
						{images.length > 0 &&
							images[0] &&
							renderImage(images[0], firstImagePosition)}
						<motion.h2
							className={`pb-6 font-serif text-4xl font-normal ${titleColor}`}
							variants={titleVariants}
							initial="hidden"
							animate={isInView ? 'visible' : 'hidden'}
						>
							{name}
						</motion.h2>
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

					{/* Additional image-text pairs */}
					{images.slice(1).map((image, index) => {
						const textIndex = index + 1
						const position = getImagePosition(index + 1)

						return (
							<div key={index} className="clear-both">
								{renderImage(image, position)}
								<motion.div
									className={`space-y-4 text-lg leading-[25px] font-thin ${textColor}`}
									variants={textVariants}
									initial="hidden"
									animate={isInView ? 'visible' : 'hidden'}
								>
									{textSections[textIndex]}
								</motion.div>
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
