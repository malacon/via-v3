import { useEffect, useState } from 'react'
import { FullWidthBannerLink } from '#app/components/full-width-banner-link.tsx'
import HeroCarousel from '#app/components/HeroCarousel.tsx'
import { Button } from '#app/components/ui/button.tsx'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	CarouselCounter,
	type CarouselApi,
} from '#app/components/ui/carousel.tsx'
import { type Route } from './+types/index.ts'

export const meta: Route.MetaFunction = () => [
	{ title: 'Via Nova' },
	{
		name: 'description',
		content:
			'Via Nova offers a live-in experience of holistic intellectual, professional, and spiritual formation for Catholics ages 18-22.',
	},
]

// Hero carousel slides - Updated per design notes
const heroSlides = [
	{
		src: '/img/hero-1.jpg',
		heading: 'Via Nova',
		subheading:
			'Offers a live-in experience of holistic intellectual, professional, and spiritual formation for young adults.',
		alt: 'Via Nova community gathering',
	},
	{
		src: '/img/hero-2.jpg',
		heading: 'A New Way',
		subheading:
			'Through a life of study, work, and prayer, we offer our participants a via nova, that is "a new way" of learning and living.',
		alt: 'Via Nova event',
	},
	{
		src: '/img/hero-3.jpg',
		heading: 'Life of Freedom',
		subheading: 'Better equipped for a life of freedom, mission, & holiness.',
		alt: 'Via Nova community',
	},
	{
		src: '/img/hero-4.jpg',
		heading: 'Study, Work, & Prayer',
		subheading:
			'Life in Via centers around the ancient formula of study, work, and prayer.',
		alt: 'Hayes and Fellows in seminar',
	},
	{
		src: '/img/hero-5.jpg',
		heading: 'Formation for Young Adults',
		subheading:
			'For Catholics ages 18-22 seeking a deeper understanding of their calling in life.',
		alt: 'Fellows in seminar at Clear Creek lodge',
	},
]

// Profile gallery images - Updated per design notes
// Removed: candle light praise music, Ellen and Rachel smiling, Fellows sitting at Mel's, Fr. Francisco with Sam and Anthony
// Added: Liliana with broom, Fellows on horses, (Girls Dropping Flowers on St Joseph - pending), (Rachel praying at Clear Creek - pending)
const profileImages = [
	'/img/profile-1.jpg', // Fr. Francisco with Fellows in seminar
	'/img/profile-2.jpg', // Peter playing guitar at poetry night
	'/img/profile-3.jpg', // Prayer at Fatima chapel
	'/img/profile-new-1.jpg', // Liliana beating runners with broom (NEW)
	'/img/profile-4.jpg', // Snow selfie girls
	'/img/profile-new-2.jpg', // Fellows on horses (NEW)
	'/img/profile-5.jpg', // Year 1 group shot
	'/img/profile-6.jpg', // Year 2 group shot
	'/img/profile-7.jpg', // FullSizeRender
]

export default function Index() {
	const [profileApi, setProfileApi] = useState<CarouselApi>()
	const [profileCurrent, setProfileCurrent] = useState(0)

	useEffect(() => {
		if (!profileApi) return
		setProfileCurrent(profileApi.selectedScrollSnap() + 1)
		profileApi.on('select', () => {
			setProfileCurrent(profileApi.selectedScrollSnap() + 1)
		})
	}, [profileApi])

	return (
		<div className="bg-white">
			{/* Hero Section with Carousel */}
			<HeroCarousel
				slides={heroSlides}
				intervalMs={6000}
				heightClass="h-[400px] md:h-[510px]"
				overlayOpacity={0.85}
				staticHeading=""
				staticSubheading={
					<div className="container">
						<p className="mb-3 w-[580px] text-left font-sans text-2xl leading-relaxed font-light tracking-[0.3px]">
							Via Nova offers a live-in experience of holistic intellectual,
							professional, and spiritual formation for young adults.
						</p>
						<p className="w-[580px] text-left font-sans text-2xl leading-relaxed font-light tracking-[0.3px]">
							Through a life of study, work, and prayer, we offer our
							participants a <em>via nova</em>, that is "a new way" of learning
							and living, such that our students and those we serve in our
							community may be better equipped for a life of freedom, mission, &
							holiness.
						</p>
					</div>
				}
			/>

			{/* Life in Via Section */}
			<section className="bg-white py-12 md:py-16">
				<div className="mx-auto max-w-7xl px-4 lg:max-w-[90rem]">
					<div className="grid gap-12 md:grid-cols-6 lg:grid-cols-9 lg:gap-4 xl:grid-cols-12 xl:gap-16">
						{/* Left Column - Large Heading with Varied Sizing */}
						<div className="col-span-6 col-start-1 flex flex-col justify-center text-right text-[40px] xl:col-span-4 xl:col-start-2">
							<div className="text-header font-serif leading-relaxed font-light">
								<p className="">Life in Via centers</p>
								<p className="">around the</p>
								<p className="">ancient formula</p>
								<p className="">
									of <span className="font-bold">study, work,</span>
								</p>
								<p className="">
									<span className="font-bold">& prayer.</span>
								</p>
							</div>
						</div>

						{/* Right Column - Detailed Descriptions */}
						<div className="col-span-6 flex flex-col justify-center gap-3 text-left xl:col-span-7">
							<div className="font-display text-header space-y-6 text-[25px] font-normal tracking-normal">
								<p>
									<span className="font-navigation">Studies</span> in Via
									consist of seminars featuring the ancient literary and
									philosophical traditions of Israel, Babylon, Greece, and early
									Christianity.
								</p>
								<p>
									<span className="font-navigation">Work</span> consists of
									apprenticeships with Catholic professionals dedicated to
									preparing participants for success in their respective
									careers.
								</p>
								<p>
									<span className="font-navigation">Prayer</span> consists of
									frequent time in silent prayer, spiritual reading, and the
									sacraments under the guidance of spiritual directors.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Profile of a Via Fellow Section */}
			<section className="bg-heading relative">
				{/* Mobile: Single image with overlay */}
				<div className="relative h-[500px] w-full md:hidden">
					<img
						src="/img/profile-hero.jpg"
						alt="Via Nova community"
						className="h-full w-full object-cover"
					/>
					<div className="bg-header absolute right-0 bottom-0 left-0 p-6 text-white">
						<h4 className="mb-4 font-serif text-2xl font-normal text-white md:text-3xl">
							Profile of a Via Fellow
						</h4>
						<p className="mb-4 text-base leading-relaxed md:text-xl">
							Via provides participants with a simple but very full life,
							experienced in a community of people who desire largely the same
							things, namely:
						</p>
						<ul className="space-y-1.5 text-sm leading-relaxed md:space-y-2 md:text-xl">
							<li>• Knowledge of oneself, the world, and God</li>
							<li>• Habits of order and self-mastery</li>
							<li>• Meaningful work in a potential career</li>
							<li>• An abiding love of God and neighbor</li>
							<li>• A capacity to pray & meditate</li>
							<li>• Freedom from vice and attachment</li>
							<li>• An ability to share the faith with confidence</li>
							<li>• A deepened understanding of one's calling in life</li>
						</ul>
					</div>
				</div>
				{/* Desktop: Two column layout */}
				<div className="hidden md:flex md:items-stretch">
					<div className="flex w-[60%] flex-col space-y-6 py-12 text-white md:py-16">
						<h4 className="ml-[30%] pr-[50px] font-serif text-3xl font-normal text-white">
							Profile of a Via Fellow
						</h4>
						<p className="ml-[30%] pr-[50px] text-xl leading-relaxed">
							Via provides participants with a simple but very full life,
							experienced in a community of people who desire largely the same
							things, namely:
						</p>
						<ul className="ml-[30%] space-y-2 pr-[50px] pl-2 text-xl leading-relaxed font-thin">
							<li>• Knowledge of oneself, the world, and God</li>
							<li>• Habits of order and self-mastery</li>
							<li>• Meaningful work in a potential career</li>
							<li>• An abiding love of God and neighbor</li>
							<li>• A capacity to pray & meditate</li>
							<li>• Freedom from vice and attachment</li>
							<li>• An ability to share the faith with confidence</li>
							<li>• A deepened understanding of one's calling in life</li>
						</ul>
					</div>
					<div className="flex w-[40%]">
						<div className="relative h-[626px] w-full">
							<Carousel
								setApi={setProfileApi}
								opts={{
									align: 'start',
									loop: true,
									dragFree: true,
								}}
								className="h-full w-full"
							>
								<CarouselContent>
									{profileImages.map((src, index) => (
										<CarouselItem key={index} className="pl-0">
											<div className="relative h-full w-full overflow-hidden">
												<img
													src={src}
													alt={`Intellectual formation ${index + 1}`}
													className="h-full w-full object-cover"
												/>
											</div>
										</CarouselItem>
									))}
								</CarouselContent>
								<CarouselPrevious variant="ghost" />
								<CarouselNext variant="ghost" />
							</Carousel>
							{/* <CarouselCounter
								current={profileCurrent}
								total={profileImages.length}
							/> */}
						</div>
					</div>
				</div>
			</section>

			{/* Learn More Section */}
			<FullWidthBannerLink to="/why-via">
				Learn more about Via from the Fellows and friends.
			</FullWidthBannerLink>

			{/* Keep Via Free Section */}
			<section className="bg-white py-12 md:py-16">
				<div className="mx-auto max-w-5xl px-4 text-center">
					<h4 className="mb-4 font-serif text-2xl font-normal tracking-widest text-gray-800 md:mb-6 md:text-3xl">
						Keep Via Free
					</h4>
					<blockquote className="mb-6 text-base leading-9 text-gray-800 md:mb-12 md:text-xl">
						We believe that the experience of Via is so important that financial
						barriers should be removed as much as possible to allow young people
						to participate in one life-changing year of formation. Help us keep
						Via free by making a gift today.
					</blockquote>
					<Button
						variant="default"
						size="wide"
						asChild
						className="md:bg-header md:hover:bg-header/90 mb-6 w-48 rounded-full bg-gray-400 px-0 py-4 text-base text-gray-800 hover:bg-gray-500 md:mb-8 md:py-4 md:text-lg md:text-white"
					>
						<a
							href="https://vianova.stellarwebsystems.com/donations/pool/79bdb7d4-264e-11ee-9cac-16118fddfe69"
							target="_blank"
							rel="noreferrer noopener"
						>
							Give Now
						</a>
					</Button>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-white py-6 md:py-8">
				<div className="mx-auto max-w-7xl px-4 text-center">
					<p className="text-xs text-gray-500 md:text-base md:text-gray-600">
						Via Nova is an independent 501(c)(3) organization. All donations are
						tax-deductible by law.
					</p>
				</div>
			</footer>
		</div>
	)
}
