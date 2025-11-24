import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FullWidthBannerLink } from '#app/components/full-width-banner-link.tsx'
import { FullWidthSection } from '#app/components/full-width-section.tsx'
import HeroCarousel from '#app/components/HeroCarousel.tsx'
import { ProfileCarouselSection } from '#app/components/profile-carousel-section.tsx'
import { Button } from '#app/components/ui/button.tsx'
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

export default function Index() {
	const lifeInViaRef = useRef(null)
	const keepViaFreeRef = useRef(null)

	const lifeInViaInView = useInView(lifeInViaRef, { once: true, amount: 0.3 })
	const keepViaFreeInView = useInView(keepViaFreeRef, {
		once: true,
		amount: 0.3,
	})

	return (
		<div className="bg-white">
			{/* Hero Section with Carousel */}
			<HeroCarousel
				slides={heroSlides}
				intervalMs={6000}
				heightClass="h-[236px] md:h-[510px]"
				overlayOpacity={0.85}
				staticHeading=""
				staticSubheading={
					<div className="container mx-auto max-w-7xl">
						<p className="mx-auto mb-3 max-w-[580px] text-left font-sans text-2xl leading-relaxed font-light tracking-[0.3px]">
							Via Nova offers a live-in experience of holistic intellectual,
							professional, and spiritual formation for young adults.
						</p>
						<p className="mx-auto max-w-[580px] text-left font-sans text-2xl leading-relaxed font-light tracking-[0.3px]">
							Through a life of study, work, and prayer, we offer our
							participants a <em>via nova</em>, that is "a new way" of learning
							and living, such that our students and our community may be better
							equipped for a life of freedom, mission, & holiness.
						</p>
					</div>
				}
				mobileSubheading={
					<>
						<p className="mb-3 font-sans leading-relaxed font-light">
							Via Nova offers a live-in experience of holistic intellectual,
							professional, and spiritual formation for Catholics ages 18-22.
						</p>
						<p className="font-sans leading-relaxed font-light">
							Through a life of study, work, and prayer, we offer participants a{' '}
							<em>via nova</em>, that is "a new way" of learning and living,
							such that our students and our community may be better equipped
							for a life of freedom, mission, and holiness.
						</p>
					</>
				}
				mobileSubheadingBgColor="bg-gray-500"
			/>

			{/* Life in Via Section */}
			<FullWidthSection
				ref={lifeInViaRef}
				maxWidth="max-w-7xl lg:max-w-[90rem]"
			>
				{/* Mobile Layout */}
				<div className="px-4 py-3 md:hidden">
					<motion.h2
						className="text-header mb-4 text-center font-serif text-2xl leading-relaxed font-light"
						variants={titleVariants}
						initial="hidden"
						animate={lifeInViaInView ? 'visible' : 'hidden'}
					>
						Life in Via centers
						<br /> around the
						<br /> ancient formula
						<br /> of{' '}
						<span className="font-bold">
							study, work,
							<br /> & prayer.
						</span>
					</motion.h2>
					<div className="text-header font-display space-y-4 px-4 text-center text-lg leading-relaxed font-normal tracking-normal">
						<motion.p
							variants={textVariants}
							initial="hidden"
							animate={lifeInViaInView ? 'visible' : 'hidden'}
						>
							<span className="font-navigation">Studies</span> in Via consist of
							seminars featuring the ancient literary and philosophical
							traditions of Israel, Babylon, Greece, and early Christianity.
						</motion.p>
						<motion.p
							variants={textVariants}
							initial="hidden"
							animate={lifeInViaInView ? 'visible' : 'hidden'}
						>
							<span className="font-navigation">Work</span> consists of
							apprenticeships with Catholic professionals dedicated to preparing
							participants for success in their respective careers.
						</motion.p>
						<motion.p
							variants={textVariants}
							initial="hidden"
							animate={lifeInViaInView ? 'visible' : 'hidden'}
						>
							<span className="font-navigation">Prayer</span> consists of
							frequent time in silent prayer, spiritual reading, and the
							sacraments under the guidance of spiritual directors.
						</motion.p>
					</div>
				</div>
				{/* Desktop Layout */}
				<div className="hidden grid-cols-6 gap-12 md:grid lg:grid-cols-9 lg:gap-4 xl:grid-cols-12 xl:gap-16">
					{/* Left Column - Large Heading with Varied Sizing */}
					<div className="col-span-6 col-start-1 flex flex-col justify-center text-right text-[40px] xl:col-span-4 xl:col-start-2">
						<div className="text-header font-serif leading-relaxed font-light">
							<motion.p
								variants={titleVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
							>
								Life in Via centers
							</motion.p>
							<motion.p
								variants={titleVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
							>
								around the
							</motion.p>
							<motion.p
								variants={titleVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
							>
								ancient formula
							</motion.p>
							<motion.p
								variants={titleVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
							>
								of <span className="font-bold">study, work,</span>
							</motion.p>
							<motion.p
								variants={titleVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
							>
								<span className="font-bold">& prayer.</span>
							</motion.p>
						</div>
					</div>

					{/* Right Column - Detailed Descriptions */}
					<div className="col-span-6 flex flex-col justify-center gap-3 text-left xl:col-span-7">
						<div className="font-display text-header space-y-6 text-[25px] font-normal tracking-normal">
							<motion.p
								variants={textVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
							>
								<span className="font-navigation">Studies</span> in Via consist
								of seminars featuring the ancient literary and philosophical
								traditions of Israel, Babylon, Greece, and early Christianity.
							</motion.p>
							<motion.p
								variants={textVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
							>
								<span className="font-navigation">Work</span> consists of
								apprenticeships with Catholic professionals dedicated to
								preparing participants for success in their respective careers.
							</motion.p>
							<motion.p
								variants={textVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
							>
								<span className="font-navigation">Prayer</span> consists of
								frequent time in silent prayer, spiritual reading, and the
								sacraments under the guidance of spiritual directors.
							</motion.p>
						</div>
					</div>
				</div>
			</FullWidthSection>

			{/* Profile of a Via Fellow Section */}
			<ProfileCarouselSection
				background="bg-heading"
				carouselImages={profileImages}
				mobileHeroHeight="236"
				mobileHeroImage={{
					src: '/img/profile-hero.jpg',
					alt: 'Via Nova community',
					width: 1200,
					height: 800,
				}}
				title="Profile of a Via Fellow"
				carouselPosition="right"
				imageAltPrefix="Intellectual formation"
			>
				<div className="mx-auto px-0">
					<p className="mb-4 text-lg leading-relaxed md:text-xl">
						Via provides participants with a simple but very full life,
						experienced in a community of people who desire largely the same
						things, namely:
					</p>
					<ul className="list-disc space-y-1.5 pl-6 text-base leading-relaxed md:space-y-2 md:text-xl">
						<li>Knowledge of oneself, the world, and God</li>
						<li>Habits of order and self-mastery</li>
						<li>Meaningful work in a potential career</li>
						<li>An abiding love of God and neighbor</li>
						<li>A capacity to pray & meditate</li>
						<li>Freedom from vice and attachment</li>
						<li>An ability to share the faith with confidence</li>
						<li>A deepened understanding of one's calling in life</li>
					</ul>
				</div>
			</ProfileCarouselSection>

			{/* Learn More Section */}
			<FullWidthBannerLink to="/why-via">
				Learn more about Via from the Fellows and friends.
			</FullWidthBannerLink>

			{/* Keep Via Free Section */}
			<FullWidthSection ref={keepViaFreeRef} maxWidth="max-w-5xl">
				<div className="text-center">
					<motion.h4
						className="mb-4 font-serif text-2xl font-normal tracking-widest text-gray-800 md:mb-6 md:text-3xl"
						variants={titleVariants}
						initial="hidden"
						animate={keepViaFreeInView ? 'visible' : 'hidden'}
					>
						Keep Via Free
					</motion.h4>
					<motion.blockquote
						className="mb-6 text-base leading-9 text-gray-800 md:mb-12 md:text-xl"
						variants={textVariants}
						initial="hidden"
						animate={keepViaFreeInView ? 'visible' : 'hidden'}
					>
						We believe that the experience of Via is so important that financial
						barriers should be removed as much as possible to allow young people
						to participate in one life-changing year of formation. Help us keep
						Via free by making a gift today.
					</motion.blockquote>
					<motion.div
						variants={textVariants}
						initial="hidden"
						animate={keepViaFreeInView ? 'visible' : 'hidden'}
					>
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
					</motion.div>
				</div>
			</FullWidthSection>

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
