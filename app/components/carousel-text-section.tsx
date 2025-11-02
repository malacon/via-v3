import { motion, useInView } from 'framer-motion'
import { Img } from 'openimg/react'
import React, { useEffect, useRef, useState, type ReactNode } from 'react'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CarouselCounter,
	type CarouselApi,
} from '#app/components/ui/carousel.tsx'

interface CarouselTextSectionProps {
	id: string
	title: string
	images: string[]
	children: ReactNode
	carouselSide?: 'left' | 'right'
	imageAltPrefix?: string
	variant?: 'light' | 'dark'
	className?: string
	imageWidth?: number
	imageHeight?: number
	imageContainerHeight?: string
}

export function CarouselTextSection({
	id,
	title,
	images,
	children,
	carouselSide = 'right',
	imageAltPrefix,
	variant = 'light',
	className,
	imageWidth = 800,
	imageHeight = 1000,
	imageContainerHeight = '587px',
}: CarouselTextSectionProps) {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.3 })

	useEffect(() => {
		if (!api) return
		setCurrent(api.selectedScrollSnap() + 1)
		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [api])

	const altPrefix = imageAltPrefix || title.toLowerCase()

	const bgColor = variant === 'dark' ? 'bg-[#364153]' : 'bg-white'
	const titleColor = variant === 'dark' ? 'text-white' : 'text-gray-900'
	const textColor = variant === 'dark' ? 'text-white' : 'text-gray-700'
	const counterColor = variant === 'dark' ? 'text-white' : ''

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

	const childrenVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.2,
			},
		},
	}

	const childItemVariants = {
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

	const hasMultipleImages = images.length > 1

	// Render carousel and text in the correct order based on carouselSide
	const carouselElement = (
		<motion.div
			className="relative"
			style={{ height: imageContainerHeight }}
			variants={imageVariants}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
		>
			<Carousel
				setApi={setApi}
				opts={{
					align: 'start',
					loop: hasMultipleImages,
					dragFree: hasMultipleImages,
				}}
				className="h-full w-full"
			>
				<CarouselContent>
					{images.map((src, index) => (
						<CarouselItem key={index} className="pl-0">
							<div
								className="relative w-full overflow-hidden"
								style={{ height: imageContainerHeight }}
							>
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
				{hasMultipleImages && (
					<>
						<CarouselPrevious />
						<CarouselNext />
					</>
				)}
			</Carousel>
			{hasMultipleImages && (
				<CarouselCounter
					current={current}
					total={images.length}
					className={counterColor}
				/>
			)}
		</motion.div>
	)

	const textElement = (
		<div className="flex flex-col justify-center space-y-6">
			<motion.h2
				className={`font-serif text-4xl font-bold ${titleColor}`}
				variants={titleVariants}
				initial="hidden"
				animate={isInView ? 'visible' : 'hidden'}
			>
				{title}
			</motion.h2>
			<motion.div
				className={`space-y-4 text-lg leading-relaxed ${textColor}`}
				variants={childrenVariants}
				initial="hidden"
				animate={isInView ? 'visible' : 'hidden'}
			>
				{React.Children.toArray(children).map((child, index) => (
					<motion.div key={index} variants={childItemVariants}>
						{child}
					</motion.div>
				))}
			</motion.div>
		</div>
	)

	return (
		<section
			id={id}
			ref={ref}
			className={`relative z-10 scroll-mt-24 ${bgColor} py-16 ${className ?? ''}`}
		>
			<div className="mx-auto max-w-7xl px-4">
				<div
					className={`grid gap-12 ${
						carouselSide === 'left'
							? 'md:grid-cols-[45%_55%]'
							: 'md:grid-cols-[55%_45%]'
					}`}
				>
					{carouselSide === 'left' ? (
						<>
							{/* Carousel on left */}
							{carouselElement}
							{/* Text on right */}
							{textElement}
						</>
					) : (
						<>
							{/* Text on left */}
							{textElement}
							{/* Carousel on right */}
							{carouselElement}
						</>
					)}
				</div>
			</div>
		</section>
	)
}
