import React from 'react'
import { flushSync } from 'react-dom'
import {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from '#app/components/ui/carousel.tsx'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Card, CardContent } from './ui/card'

const board = [
	{
		name: 'Luke Ungarino',
		title: 'Director',
		image: '/img/board/luke.v2.jpg',
		quote:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		name: 'Jacob Troutman',
		title: 'Director of Finance',
		affiliation: 'Via Nova',
		image: '/img/board/jacob.troutman.jpg',
		quote:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		name: 'John Lindsley',
		title: 'Lead Tutor',
		affiliation: 'Via Nova',
		image: '/img/board/john.lindsley.jpg',
		quote:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		name: 'Lorena Ebenroth',
		title: "Women's Cohort Leader",
		affiliation: 'Via Nova',
		image: '/img/board/lorena.ebenroth.jpg',
		quote:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		name: 'Sam Pitre',
		title: 'Employer',
		affiliation: 'St. Joseph the Worker Handyman',
		image: '/img/board/sam.pitre.jpg',
		quote:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		name: 'Dr. John Anderson',
		title: 'Employer',
		affiliation: 'OncoLogics',
		image: '/img/board/john.anderson.jpg',
		quote:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		name: 'Dr. Cory Hayes',
		title: 'Tutor',
		affiliation: 'John Paul the Great Academy',
		image: '/img/board/corey.hayes.jpg',
	},
	{
		name: 'Jay Toups',
		title: 'Employer',
		affiliation: 'High Performance Teams',
		image: '/img/board/jay.toups.jpg',
		quote:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		name: 'Dr. Damon Cudihy',
		title: 'Employer',
		affiliation: 'Acadiana OBGYN',
		image: '/img/board/damon.cudihy.jpg',
		quote:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		name: 'Fr. Josh Guillory',
		title: 'Tutor',
		affiliation: 'St. Patrick Catholic Church',
		image: '/img/board/josh.guillory.jpg',
		quote:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		name: 'Blair Piras',
		title: 'Employer',
		affiliation: 'Blair Barlow Art',
		image: '/img/board/blair.piras.jpg',
		quote:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
]

const TWEEN_FACTOR = 3.2
const numberWithinRange = (number: number, min: number, max: number): number =>
	Math.min(Math.max(number, min), max)

export default function EmployeeCarousel() {
	const [api, setApi] = React.useState<CarouselApi>()
	const [, setCurrent] = React.useState(0)
	const [, setCount] = React.useState(0)
	const [tweenValues, setTweenValues] = React.useState<number[]>([])

	const onScroll = React.useCallback(() => {
		if (!api) return

		const engine = api.internalEngine()
		const scrollProgress = api.scrollProgress()

		const styles = api.scrollSnapList().map((scrollSnap, index) => {
			let diffToTarget = scrollSnap - scrollProgress

			if (engine.options.loop) {
				engine.slideLooper.loopPoints.forEach((loopItem: any) => {
					const target = loopItem.target()
					if (index === loopItem.index && target !== 0) {
						const sign = Math.sign(target)
						if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
						if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
					}
				})
			}
			const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR)
			return numberWithinRange(tweenValue, 0, 1)
		})
		setTweenValues(styles)
	}, [api, setTweenValues])

	React.useEffect(() => {
		if (!api) {
			return
		}

		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap() + 1)

		api.on('select', () => {
			console.log('current')
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [api])

	React.useEffect(() => {
		if (!api) {
			return
		}
		onScroll()
		api.on('scroll', () => {
			flushSync(() => onScroll())
		})
		api.on('reInit', onScroll)
	}, [api, onScroll])

	return (
		<section className="bg-background flex flex-col space-y-4 pt-8 md:px-20 md:pb-8">
			<Carousel
				setApi={setApi}
				opts={{
					loop: true,
					align: 'center',
				}}
				className="w-full"
			>
				<CarouselContent
					className="-ml-1"
					role="list"
					aria-label="Via Nova team"
				>
					{board.map(({ image, name, title, affiliation }, index) => (
						<CarouselItem
							style={{
								...(tweenValues.length && { opacity: tweenValues[index] }),
							}}
							key={image}
							role="listitem"
							className="basis-10/12 pl-1 md:basis-5/12 lg:basis-3/12"
						>
							<div className="p-1">
								<Card className="h-[400px] bg-slate-700">
									<CardContent className="flex items-center justify-center p-6 pt-12 text-white">
										{/* <p className="before:content-['] text-xl font-light leading-8">
												{quote}
											</p> */}
										<div className="flex flex-col place-items-start justify-center gap-4 pb-4">
											<div className="flex w-full flex-col place-items-center">
												<Avatar className="h-48 w-48">
													<AvatarImage
														src={image}
														alt={name}
														loading="lazy"
														decoding="async"
													/>
													<AvatarFallback>tn</AvatarFallback>
												</Avatar>
											</div>
											<div className="flex w-full flex-col pt-4 text-center">
												<p className="text-center text-2xl">{name}</p>
												<p className="text-center text-base">{title}</p>
												{affiliation ? (
													<p className="mt-1 text-center text-sm text-white/80">
														{affiliation}
													</p>
												) : null}
											</div>
										</div>
									</CardContent>
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
