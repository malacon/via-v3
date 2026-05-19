import { useEffect, useState } from 'react'
import { Card } from '#app/components/ui/card.tsx'
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '#app/components/ui/carousel.tsx'

const images = [
	'/img/contact-5.jpg',
	'/img/contact-1.jpg',
	'/img/contact-2.jpg',
	'/img/contact-3.png',
	'/img/contact-4.jpg',
	'/img/contact-6.jpg',
	'/img/contact-7.jpg',
	'/img/contact-8.jpg',
	'/img/contact-9.jpg',
	'/img/contact-10.jpg',
	'/img/contact-11.jpg',
	'/img/contact-12.jpg',
	'/img/contact-13.jpg',
	'/img/contact-14.jpg',
]

export default function ImageCarousel() {
	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [snapCount, setSnapCount] = useState(0)

	useEffect(() => {
		if (!api) return

		const updateCarouselState = () => {
			setCurrent(api.selectedScrollSnap())
			setSnapCount(api.scrollSnapList().length)
		}

		updateCarouselState()
		api.on('select', updateCarouselState)
		api.on('reInit', updateCarouselState)

		return () => {
			api.off('select', updateCarouselState)
			api.off('reInit', updateCarouselState)
		}
	}, [api])

	return (
		<section className="bg-background flex flex-col space-y-4 overflow-hidden pt-8 md:px-20 md:pb-8">
			<Carousel
				setApi={setApi}
				opts={{
					loop: true,
					align: 'start',
				}}
				className="group relative w-full"
			>
				<CarouselContent className="-ml-3 pr-[12vw] md:-ml-4 md:pr-[8vw]">
					{images.map((image) => (
						<CarouselItem
							key={image}
							className="basis-10/12 pl-3 sm:basis-7/12 md:basis-5/12 md:pl-4 lg:basis-[30%] xl:basis-[24%]"
						>
							<div className="p-1">
								<Card className="h-[370px] overflow-hidden rounded-xl shadow-sm">
									<img
										src={image}
										alt=""
										className="h-full w-full object-cover"
										loading="lazy"
									/>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white via-white/80 to-transparent md:w-24" />
				<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white via-white/80 to-transparent md:w-24" />
				<CarouselPrevious className="left-3 opacity-100 drop-shadow-lg md:left-6" />
				<CarouselNext className="right-3 opacity-100 drop-shadow-lg md:right-6" />
			</Carousel>
			<div className="flex justify-center gap-2" aria-label="Carousel position">
				{Array.from({ length: snapCount }).map((_, index) => (
					<button
						key={index}
						type="button"
						className={`h-2 rounded-full transition-all ${
							current === index ? 'w-6 bg-black' : 'w-2 bg-gray-300'
						}`}
						onClick={() => api?.scrollTo(index)}
						aria-label={`Go to carousel slide ${index + 1}`}
					/>
				))}
			</div>
		</section>
	)
}
