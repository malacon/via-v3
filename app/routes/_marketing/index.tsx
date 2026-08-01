import { motion, useInView } from 'framer-motion'
import { Img } from 'openimg/react'
import { useRef } from 'react'
import { Link } from 'react-router'
import EmployeeCarousel from '#app/components/employee-carosel.tsx'
import { FullWidthBannerLink } from '#app/components/full-width-banner-link.tsx'
import { FullWidthSection } from '#app/components/full-width-section.tsx'
import HeroCarousel, { type Slide } from '#app/components/HeroCarousel.tsx'
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

// Hero carousel slides - Updated per Luke's 11/1 notes: only 3 images
// 1) dancing, 2) John teaching (whiteboard centered), 3) Max/Lili sitting outside (flipped)
const heroSlides: Slide[] = [
	{
		src: '/img/mountain-isaac-anthony-flip.jpg', // Poetry Night (focus on the table)
		heading: 'Isaac hoisting Anthony on mountain',
		subheading: '',
		alt: 'Isaac hoisting Anthony on mountain',
		focusY: 70,
		focusX: 'center',
	},
	{
		src: '/img/life-in-via-luke.png', // VIA-30.HayesAndFellowsSmilingSeminar.JPG
		heading: 'A New Way',
		subheading:
			'Through a life of study, work, and prayer, we offer our participants a via nova, that is "a new way" of learning and living.',
		alt: 'John teaching with whiteboard',
		focusY: 65,
		focusX: 'center',
		// focusX: 'center', // Center horizontally
		// focusY: 'center', // Center vertically
	},
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
			{/* Hero Section with Carousel - Enhanced with better overlay and CTAs */}
			<HeroCarousel
				slides={heroSlides}
				intervalMs={8000}
				heightClass="h-[236px] md:h-[510px]"
				overlayOpacity={0.5}
				staticHeading="A year of holistic formation in study, work, & prayer."
				staticSubheading={
					<div className="container3 mx-auto !px-0">
						<div className="ml-0 max-w-[580px] px-0 pl-0 text-left">
							<p className="mb-6 font-sans text-xl leading-relaxed font-light tracking-[0.3px] text-white md:text-2xl lg:text-2xl">
								Via Nova offers a 10-month, live-in experience of intellectual,
								professional, & spiritual formation for Catholics ages 18-22.
							</p>
							<div className="flex flex-col gap-4 sm:flex-row">
								<Button
									variant="default"
									size="lg"
									asChild
									className="bg-white text-gray-900 hover:bg-gray-100"
								>
									<Link to="/contact" reloadDocument>
										Apply Now
									</Link>
								</Button>
								<Button
									variant="outline"
									size="lg"
									asChild
									className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
								>
									<Link to="/why-via">Learn More</Link>
								</Button>
							</div>
						</div>
					</div>
				}
				mobileSubheading={
					<div>
						<p className="mb-4 font-sans text-2xl leading-relaxed font-light md:text-3xl">
							Via Nova offers a 10-month, live-in experience of intellectual,
							professional, & spiritual formation for Catholics ages 18-22.
						</p>
						<div className="flex flex-col gap-3">
							<Button
								variant="default"
								size="lg"
								asChild
								className="bg-white text-gray-900 hover:bg-gray-100"
							>
								<Link to="/contact" reloadDocument>
									Apply Now
								</Link>
							</Button>
							<Button
								variant="outline"
								size="lg"
								asChild
								className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
							>
								<a href="/why-via">Learn More</a>
							</Button>
						</div>
					</div>
				}
				mobileSubheadingBgColor="bg-gray-600"
			/>

			{/* Second Paragraph Section - Full Width, White Background */}
			<FullWidthSection background="bg-white" padding="py-12 md:py-16 lg:py-20">
				<motion.p
					className="mx-auto max-w-4xl text-left font-sans text-lg leading-relaxed font-light tracking-[0.3px] text-gray-800 md:text-xl lg:text-2xl"
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

			{/* Life in Via Section - Redesigned as clean three-column grid with cards */}
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
								src="/img/hero-teaching.jpg"
								alt="Seminar with LU and Fellows"
								width={800}
								height={600}
								fit="cover"
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex flex-1 flex-col px-6 py-8">
							<p className="flex-1 font-sans text-lg leading-relaxed text-white/90 md:text-xl">
								<span className="mb-3 font-sans text-xl font-bold text-white md:text-2xl">
									Study
								</span>{' '}
								in Via consists of seminars on the ancient spiritual and
								philosophical traditions of Israel, Greece, and the early
								Church, under the guidance of master teachers.
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
							<p className="flex-1 font-sans text-lg leading-relaxed text-white/90 md:text-xl">
								<span className="mb-3 font-sans text-xl font-bold text-white md:text-2xl">
									Work
								</span>{' '}
								takes the form of paid apprenticeships with Catholic
								professionals dedicated to preparing Via Fellows for success in
								their respective careers.
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
								src="/img/anthony-praying.jpg"
								alt="Anthony and AnnAyrisse praying"
								width={800}
								height={600}
								fit="cover"
								className="h-full w-full object-cover"
							/>
						</div>
						<div className="flex flex-1 flex-col px-6 py-8">
							<p className="flex-1 font-sans text-lg leading-relaxed text-white/90 md:text-xl">
								<span className="mb-3 font-sans text-xl font-bold text-white md:text-2xl">
									Prayer
								</span>{' '}
								entails a robust regimen of sacraments & prayer, fostering
								sustained recollection and frequent opportunities to beg divine
								assistance.
							</p>
						</div>
					</motion.div>
				</div>
			</FullWidthSection>

			{/* Mountain Pic Section with Text Overlay */}
			<section>
				{/* Mobile: Image at top */}
				<div className="relative h-[267px] overflow-hidden md:hidden">
					<Img
						src="/img/mountain-isaac-anthony.jpg"
						alt="Isaac hoisting Anthony on mountain"
						width={1920}
						height={1080}
						fit="cover"
						isAboveFold
						className="h-full w-full object-cover"
					/>
				</div>

				{/* Mobile: Text below on white background */}
				<div className="bg-white px-4 py-8 md:hidden">
					<div className="mx-auto max-w-3xl">
						<motion.p
							className="mb-6 text-xl leading-relaxed"
							variants={textVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							Via was born out of the conviction that everyone would be
							profoundly well-served by having one densely compact year of the
							extraordinary formation that we all wish we had before launching
							into the real world.
						</motion.p>
						<motion.p
							className="mb-6 text-xl leading-relaxed"
							variants={textVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							Our students experience an integrated life aimed at freeing their
							minds from the world's illusions and realizing the invitation to
							fulfill the summons of the Lord to know, love, and serve Him.
						</motion.p>
						<motion.p
							className="text-xl leading-relaxed"
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
					</div>
				</div>

				<FullWidthSection background="bg-white" padding="py-12 md:py-16">
					<motion.p
						className="mx-auto max-w-7xl text-center font-sans text-2xl leading-relaxed font-light tracking-[0.3px] md:text-3xl lg:text-4xl"
						variants={textVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						Via was born out of the conviction that every Catholic would be
						profoundly well-served by having one year of holistic formation.
					</motion.p>
				</FullWidthSection>

				{/* Desktop: Image with overlay and text */}
				<div className="relative hidden min-h-[600px] overflow-hidden py-12 md:block md:py-36">
					<Img
						src="/img/hike-group.jpg"
						alt="Group hiking"
						width={1920}
						height={1080}
						fit="cover"
						isAboveFold
						className="absolute inset-0 h-full w-full object-cover"
					/>
					{/* Gradient overlay - dark on left (for text) to light on right - never fully clear, maintain 15-20% minimum */}
					<div
						className="absolute inset-0"
						style={{
							backgroundImage:
								'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.325) 70%, rgba(0,0,0,0.15) 100%)',
						}}
					/>
					{/* Text overlay */}
					<div className="relative z-10 flex min-h-[600px] items-center">
						<div className="container3 mx-auto px-4 md:px-0">
							<div className="max-w-2xl text-white">
								{/* <motion.p
									className="mb-6 text-xl leading-relaxed md:text-2xl"
									variants={textVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
								>
									Via was born out of the conviction that every Catholic would
									be profoundly well-served by having one year of holistic
									formation.
								</motion.p> */}
								<motion.p
									className="mb-6 text-xl leading-relaxed md:text-3xl"
									variants={textVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
								>
									Our students experience an integrated life aimed at freeing
									their minds from the world's illusions and realizing the
									invitation to fulfill the summons of the Lord to know, love,
									and serve Him.
								</motion.p>
								<motion.p
									className="mb-6 text-xl leading-relaxed md:text-3xl"
									variants={textVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
								>
									Because we have found this experience to be enormously
									beneficial, we believe a new stage should be added to the
									traditional sequence of young adults' formation—a stage of
									holistic education that equips the future of the Church for a
									life of order, holiness, and the frontlines of evangelization.
								</motion.p>
							</div>
						</div>
					</div>
				</div>
			</section>

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

			{/* Learn More Section */}
			<FullWidthBannerLink to="/why-via">
				Learn more about Via from the Fellows.
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
						We believe the experience of Via is too important to let financial
						barriers stand in the way. Help us keep Via free for the Fellows by
						making a gift today.
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
							className="give-now-button transition:opacity bg-brand-dark-blue mb-6 w-64 rounded-full px-0 py-5 text-lg ease-linear hover:opacity-80 md:mb-8 md:w-72 md:py-6 md:text-xl"
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

			<EmployeeCarousel />

			{/* Footer */}
			{/* <footer className="bg-white py-6 md:py-8">
				<div className="mx-auto max-w-7xl px-4 text-center">
					<p className="text-xs text-gray-500 md:text-base md:text-gray-600">
						Via Nova is an independent 501(c)(3) organization. All donations are
						tax-deductible by law.
					</p>
				</div>
			</footer> */}
		</div>
	)
}
