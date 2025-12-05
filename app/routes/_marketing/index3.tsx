import { motion, useInView } from 'framer-motion'
import { Img } from 'openimg/react'
import { useRef } from 'react'
import { FullWidthBannerLink } from '#app/components copy 3/full-width-banner-link.tsx'
import { FullWidthSection } from '#app/components copy 3/full-width-section.tsx'
import HeroCarousel, {
	type Slide,
} from '#app/components copy 3/HeroCarousel.tsx'
import { Button } from '#app/components copy 3/ui/button.tsx'
import { type Route } from './+types/index3.ts'

export const meta: Route.MetaFunction = () => [
	{ title: 'Via Nova' },
	{
		name: 'description',
		content:
			'Via Nova offers a live-in experience of holistic intellectual, professional, and spiritual formation for Catholics ages 18-22.',
	},
]

// Hero carousel slides - Updated per Luke's 11/1 notes: only 3 images
// 1) dancing, 2) John teaching (whiteboard centered), 3) Max/Lili sitting outside (flipped)
const heroSlides: Slide[] = [
	{
		src: '/img/hero-dancing.jpg', // IMG_3998.jpeg from _EventsDances
		heading: 'Via Nova',
		subheading:
			'Offers a live-in experience of holistic intellectual, professional, and spiritual formation for young adults.',
		alt: 'Dancing at Via Nova event',
		focusY: 'center',
		focusX: 'center',
		// focusX and focusY default to 'center' if not specified
		// Examples:
		// focusX: 'center' | 'left' | 'right' | 30 (percentage 0-100)
		// focusY: 'center' | 'top' | 'bottom' | 40 (percentage 0-100)
	},
	{
		src: '/img/hero-teaching.jpg', // VIA-30.HayesAndFellowsSmilingSeminar.JPG
		heading: 'A New Way',
		subheading:
			'Through a life of study, work, and prayer, we offer our participants a via nova, that is "a new way" of learning and living.',
		alt: 'John teaching with whiteboard',
		focusY: 'top',
		focusX: 'center',
		// focusX: 'center', // Center horizontally
		// focusY: 'center', // Center vertically
	},
	{
		src: '/img/poetry-night.jpg', // Poetry Night (focus on the table)
		heading: 'Life of Freedom',
		subheading: 'Better equipped for a life of freedom, mission, & holiness.',
		alt: 'Fellows sitting outside',
		focusY: 40,
		focusX: 'center',
	},
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
			{/* Hero Section with Carousel - Refined typography, spacing, and brand CTAs */}
			<HeroCarousel
				slides={heroSlides}
				intervalMs={8000}
				heightClass="h-[236px] md:h-[510px]"
				overlayOpacity={0.5}
				staticHeading="A Year of Catholic Formation in Study, Work, and Prayer"
				staticSubheading={
					<div className="container3 mx-auto">
						<div className="mx-auto ml-0 max-w-[580px] pl-0 text-left">
							<p className="mb-8 font-sans text-xl leading-[1.7] font-light tracking-[0.3px] text-white md:text-2xl lg:text-2xl">
								Via Nova offers a 10-month, live-in experience of intensive
								intellectual, professional, and spiritual formation for
								Catholics ages 18-22.
							</p>
							<div className="flex flex-col gap-4 sm:flex-row">
								<Button
									variant="default"
									size="lg"
									asChild
									className="bg-brand-dark-blue hover:bg-brand-dark-blue/90 px-8 py-6 text-base font-semibold text-white transition-all hover:shadow-lg md:px-10 md:py-6"
								>
									<a href="#apply">Apply Now</a>
								</Button>
								<Button
									variant="outline"
									size="lg"
									asChild
									className="border-brand-dark-blue hover:bg-brand-dark-blue/20 border-2 bg-transparent px-8 py-6 text-base font-semibold text-white transition-all md:px-10 md:py-6"
								>
									<a href="/why-via">Learn More</a>
								</Button>
							</div>
						</div>
					</div>
				}
				mobileSubheading={
					<div>
						<p className="mb-6 font-sans text-2xl leading-[1.7] font-light md:text-3xl">
							Via Nova offers a 10-month, live-in experience of intensive
							intellectual, professional, and spiritual formation for Catholics
							ages 18-22.
						</p>
						<div className="flex flex-col gap-3">
							<Button
								variant="default"
								size="lg"
								asChild
								className="bg-brand-dark-blue hover:bg-brand-dark-blue/90 px-8 py-6 text-base font-semibold text-white transition-all hover:shadow-lg"
							>
								<a href="#apply">Apply Now</a>
							</Button>
							<Button
								variant="outline"
								size="lg"
								asChild
								className="border-brand-dark-blue hover:bg-brand-dark-blue/20 border-2 bg-transparent px-8 py-6 text-base font-semibold text-white transition-all"
							>
								<a href="/why-via">Learn More</a>
							</Button>
						</div>
					</div>
				}
				mobileSubheadingBgColor="bg-gray-600"
			/>

			{/* Mission Paragraph Section - Constrained width, center-aligned, improved line-height */}
			<FullWidthSection background="bg-white" padding="py-16 md:py-20 lg:py-24">
				<motion.p
					className="mx-auto max-w-3xl text-center font-sans text-lg leading-[1.75] font-light tracking-[0.3px] text-gray-800 md:text-xl lg:text-xl"
					variants={textVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					Through the ancient formula of study, work, and prayer, we offer
					participants a <em>via nova</em>, that is "a new way" of forming
					life-changing habits, acquiring practical knowledge, and ultimately
					enjoying a life of freedom and mission.
				</motion.p>
			</FullWidthSection>

			{/* Life in Via Section - Softened dark background, refined card styling */}
			<FullWidthSection
				ref={lifeInViaRef}
				maxWidth="max-w-7xl"
				background="bg-heading"
				padding="py-16 md:py-20 lg:py-24"
			>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
					{/* Study Card */}
					<motion.div
						variants={textVariants}
						initial="hidden"
						animate={lifeInViaInView ? 'visible' : 'hidden'}
						className="flex flex-col overflow-hidden rounded-lg border border-white/20 bg-white/5 shadow-lg backdrop-blur-sm"
					>
						<div className="relative h-64 w-full overflow-hidden md:h-72">
							<Img
								src="/img/life-in-via-study.jpg"
								alt="Seminar with LU and Fellows"
								width={800}
								height={600}
								fit="cover"
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex flex-1 flex-col px-6 py-8">
							<h3 className="mb-3 font-sans text-2xl font-bold text-white md:text-3xl">
								Study
							</h3>
							<p className="flex-1 font-sans text-base leading-relaxed text-white/90 md:text-lg">
								Via consists of seminars on the ancient spiritual and
								philosophical traditions of Israel, Greece, and the early
								Church.
							</p>
						</div>
					</motion.div>

					{/* Work Card */}
					<motion.div
						variants={textVariants}
						initial="hidden"
						animate={lifeInViaInView ? 'visible' : 'hidden'}
						className="flex flex-col overflow-hidden rounded-lg border border-white/20 bg-white/5 shadow-lg backdrop-blur-sm"
					>
						<div className="relative h-64 w-full overflow-hidden md:h-72">
							<Img
								src="/img/life-in-via-prayer.jpg"
								alt="Work apprenticeship"
								width={800}
								height={600}
								fit="cover"
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex flex-1 flex-col px-6 py-8">
							<h3 className="mb-3 font-sans text-2xl font-bold text-white md:text-3xl">
								Work
							</h3>
							<p className="flex-1 font-sans text-base leading-relaxed text-white/90 md:text-lg">
								Takes the form of apprenticeships with Catholic professionals
								dedicated to preparing Via Fellows for success in their
								respective careers.
							</p>
						</div>
					</motion.div>

					{/* Prayer Card */}
					<motion.div
						variants={textVariants}
						initial="hidden"
						animate={lifeInViaInView ? 'visible' : 'hidden'}
						className="flex flex-col overflow-hidden rounded-lg border border-white/20 bg-white/5 shadow-lg backdrop-blur-sm"
					>
						<div className="relative h-64 w-full overflow-hidden md:h-72">
							<Img
								src="/img/life-in-via-prayer.jpg"
								alt="Anthony and AnnAyrisse praying"
								width={800}
								height={600}
								fit="cover"
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex flex-1 flex-col px-6 py-8">
							<h3 className="mb-3 font-sans text-2xl font-bold text-white md:text-3xl">
								Prayer
							</h3>
							<p className="flex-1 font-sans text-base leading-relaxed text-white/90 md:text-lg">
								Entails frequent time with Christ in the Eucharist and
								intentional silence, fostering sustained recollection amid a
								full schedule.
							</p>
						</div>
					</motion.div>
				</div>
			</FullWidthSection>

			{/* "Via was born" Section - Refined H2 with optimal line length and spacing */}
			<FullWidthSection background="bg-white" padding="py-16 md:py-20 lg:py-24">
				<div className="mx-auto max-w-3xl">
					<motion.h2
						className="text-center font-serif text-3xl leading-[1.3] font-normal text-gray-900 md:text-4xl lg:text-5xl"
						variants={titleVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						Via was born out of the conviction that every Catholic would be
						profoundly well-served by having one year of holistic formation.
					</motion.h2>
				</div>
			</FullWidthSection>

			{/* Mission/Benefits Section - Balanced two-column layout with refined spacing */}
			<FullWidthSection
				background="bg-gray-50"
				padding="py-16 md:py-20 lg:py-24"
			>
				<div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
					{/* Left Column: Mission Story */}
					<div className="space-y-8">
						<motion.h3
							className="font-serif text-2xl font-normal text-gray-900 md:text-3xl"
							variants={titleVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							An Integrated Life
						</motion.h3>
						<motion.p
							className="text-base leading-[1.75] text-gray-700 md:text-lg"
							variants={textVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							Our students experience an integrated life aimed at freeing their
							minds from the world's illusions and realizing the invitation to
							fulfill the summons of the Lord to know, love, and serve Him.
						</motion.p>
						<motion.h3
							className="font-serif text-2xl font-normal text-gray-900 md:text-3xl"
							variants={titleVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							Why This Year Matters
						</motion.h3>
						<motion.p
							className="text-base leading-[1.75] text-gray-700 md:text-lg"
							variants={textVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							We believe that such an experience is enormously beneficial, such
							that an additional stage of formation should be inserted into the
							traditional sequence of young adults' formation, so as to help the
							future of the Church better live in the world but not of it.
						</motion.p>
						<motion.p
							className="text-base leading-[1.75] text-gray-700 md:text-lg"
							variants={textVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							Via provides participants with a simple but very full life,
							experienced in a community of people who desire largely the same
							things.
						</motion.p>
					</div>

					{/* Right Column: Benefits List */}
					<div>
						<motion.h3
							className="mb-8 font-serif text-2xl font-normal text-gray-900 md:text-3xl"
							variants={titleVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							What Via Offers
						</motion.h3>
						<motion.ul
							variants={textVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							className="space-y-4 text-base leading-[1.75] text-gray-700 md:text-lg"
						>
							<li className="flex items-start">
								<span className="text-brand-dark-blue mt-1 mr-3">•</span>
								<span>Knowledge of oneself, the world, and God</span>
							</li>
							<li className="flex items-start">
								<span className="text-brand-dark-blue mt-1 mr-3">•</span>
								<span>Habits of order and self-mastery</span>
							</li>
							<li className="flex items-start">
								<span className="text-brand-dark-blue mt-1 mr-3">•</span>
								<span>Meaningful work in a potential career</span>
							</li>
							<li className="flex items-start">
								<span className="text-brand-dark-blue mt-1 mr-3">•</span>
								<span>An abiding love of God and neighbor</span>
							</li>
							<li className="flex items-start">
								<span className="text-brand-dark-blue mt-1 mr-3">•</span>
								<span>A capacity to pray & meditate</span>
							</li>
							<li className="flex items-start">
								<span className="text-brand-dark-blue mt-1 mr-3">•</span>
								<span>Freedom from vice and attachment</span>
							</li>
							<li className="flex items-start">
								<span className="text-brand-dark-blue mt-1 mr-3">•</span>
								<span>An ability to share the faith with confidence</span>
							</li>
							<li className="flex items-start">
								<span className="text-brand-dark-blue mt-1 mr-3">•</span>
								<span>A deepened understanding of one's calling in life</span>
							</li>
						</motion.ul>
					</div>
				</div>
			</FullWidthSection>

			{/* Profile of a Via Fellow Section */}
			{/* <ProfileCarouselSection
				background="bg-heading"
				carouselImages={profileImages}
				mobileHeroHeight="236"
				mobileHeroImage={{
					src: '/img/profile-hero.jpg',
					alt: 'Via Nova community',
					width: 1200,
					height: 800,
				}}
				// title="Profile of a Via Fellow"
				carouselPosition="right"
				imageAltPrefix="Profile of a Via Fellow"
			>
				<div className="mx-auto px-0">
					<p className="mb-4 text-lg leading-relaxed md:text-xl">
						Via provides participants with a simple but very full life,
						experienced in a community of people who desire largely the same
						things, namely...
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
			</ProfileCarouselSection> */}

			{/* Fellows Banner - Enhanced as prominent secondary CTA */}
			<div className="mx-auto max-w-7xl px-4">
				<FullWidthBannerLink to="/why-via">
					Learn more about Via from the Fellows.
				</FullWidthBannerLink>
			</div>

			{/* Keep Via Free Section - Refined card with consistent button styling and spacing */}
			<FullWidthSection
				ref={keepViaFreeRef}
				maxWidth="max-w-4xl"
				background="bg-white"
				padding="py-16 md:py-20 lg:py-24"
			>
				<motion.div
					variants={textVariants}
					initial="hidden"
					animate={keepViaFreeInView ? 'visible' : 'hidden'}
					className="mx-auto rounded-lg border border-gray-200 bg-gray-50 px-8 py-12 shadow-md md:px-12 md:py-16"
				>
					<div className="text-center">
						<motion.h2
							className="mb-4 font-serif text-3xl font-normal text-gray-900 md:mb-6 md:text-4xl"
							variants={titleVariants}
							initial="hidden"
							animate={keepViaFreeInView ? 'visible' : 'hidden'}
						>
							Keep Via Free
						</motion.h2>
						<motion.p
							className="mb-8 text-base leading-[1.75] text-gray-700 md:mb-10 md:text-lg"
							variants={textVariants}
							initial="hidden"
							animate={keepViaFreeInView ? 'visible' : 'hidden'}
						>
							We believe the experience of Via is too important to let financial
							barriers stand in the way. Help us keep Via free for the Fellows
							by making a gift today.
						</motion.p>
						<motion.div
							variants={textVariants}
							initial="hidden"
							animate={keepViaFreeInView ? 'visible' : 'hidden'}
							className="flex flex-col items-center"
						>
							<Button
								variant="default"
								size="lg"
								asChild
								className="bg-brand-dark-blue hover:bg-brand-dark-blue/90 mb-6 w-full max-w-xs px-10 py-6 text-base font-semibold text-white transition-all hover:shadow-lg md:w-auto md:px-12 md:py-6"
							>
								<a
									href="https://vianova.stellarwebsystems.com/donations/pool/79bdb7d4-264e-11ee-9cac-16118fddfe69"
									target="_blank"
									rel="noreferrer noopener"
								>
									Give Now
								</a>
							</Button>
							<p className="text-sm leading-relaxed text-gray-500 md:text-base">
								Via Nova is a 501(c)(3); gifts are tax-deductible.
							</p>
						</motion.div>
					</div>
				</motion.div>
			</FullWidthSection>

			{/* Footer - Increased padding for better spacing */}
			<footer className="bg-white py-8 md:py-12">
				<div className="mx-auto max-w-7xl px-4 text-center">
					<p className="text-sm leading-relaxed text-gray-500 md:text-base md:text-gray-600">
						Via Nova is an independent 501(c)(3) organization. All donations are
						tax-deductible by law.
					</p>
				</div>
			</footer>
		</div>
	)
}
