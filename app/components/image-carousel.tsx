import { Card } from '#app/components/ui/card.tsx'
import {
	Carousel,
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
	return (
		<section className="bg-background flex flex-col space-y-4 pt-8 md:px-20 md:pb-8">
			<Carousel
				opts={{
					loop: true,
					align: 'center',
				}}
				className="w-full"
			>
				<CarouselContent className="-ml-1">
					{images.map((image) => (
						<CarouselItem
							key={image}
							className="basis-10/12 pl-1 sm:basis-1/2 md:basis-1/2 lg:basis-1/4 xl:basis-1/5"
						>
							<div className="p-1">
								<Card className="h-[370px] overflow-hidden">
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
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</section>
	)
}
