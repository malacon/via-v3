import { motion, useInView } from 'framer-motion'
import { Img } from 'openimg/react'
import { useRef } from 'react'
import { FullWidthBannerLink } from '#app/components/full-width-banner-link.tsx'
import { FullWidthSection } from '#app/components/full-width-section.tsx'
import HeroCarousel, { type Slide } from '#app/components/HeroCarousel.tsx'
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

// Profile gallery images - Updated per design notes
// Removed: candle light praise music, Ellen and Rachel smiling, Fellows sitting at Mel's, Fr. Francisco with Sam and Anthony
// Added: Liliana with broom, Fellows on horses, Girls Dropping Flowers on St Joseph, Rachel praying at Clear Creek
const profileImages = [
	// '/img/profile-1.jpg', // Fr. Francisco with Fellows in seminar
	'/img/profile-2.jpg', // Peter playing guitar at poetry night
	'/img/profile-3.jpg', // Prayer at Fatima chapel
	'/img/profile-liliana-broom.jpg', // Liliana beating runners with broom
	'/img/profile-4.jpg', // Snow selfie girls
	'/img/profile-fellows-horses.jpg', // Fellows on horses
	'/img/profile-girls-flowers.jpg', // Girls Dropping Flowers on St Joseph
	'/img/profile-rachel-praying.jpg', // Rachel praying at Clear Creek
	// '/img/profile-5.jpg', // Year 1 group shot
	'/img/profile-6.jpg', // Year 2 group shot
	// '/img/profile-7.jpg', // FullSizeRender
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
				intervalMs={8000}
				heightClass="h-[236px] md:h-[510px]"
				overlayOpacity={0.7}
				staticHeading=""
				staticSubheading={
					<div className="container3 mx-auto">
						<p className="mx-auto ml-0 max-w-[580px] pl-0 text-left font-sans text-3xl leading-relaxed font-light tracking-[0.3px] md:text-3xl lg:text-3xl">
							Via Nova offers a 10-month, live-in experience of intensive
							intellectual, professional, and spiritual formation for Catholics
							ages 18-22.
						</p>
					</div>
				}
				mobileSubheading={
					<p className="font-sans text-2xl leading-relaxed font-light md:text-3xl">
						Via Nova offers a 10-month, live-in experience of intensive
						intellectual, professional, and spiritual formation for Catholics
						ages 18-22.
					</p>
				}
				mobileSubheadingBgColor="bg-gray-500"
			/>

			{/* Second Paragraph Section - Full Width, White Background */}
			<FullWidthSection background="bg-white" padding="py-12 md:py-16">
				<motion.p
					className="mx-auto max-w-7xl text-center font-sans text-2xl leading-relaxed font-light tracking-[0.3px] md:text-3xl lg:text-4xl"
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

			{/* Life in Via Section - Three Columns with Images */}
			<FullWidthSection
				ref={lifeInViaRef}
				maxWidth="max-w-7xl lg:max-w-[120rem]"
				background="bg-heading"
				className="py-0"
				padding="py-0"
			>
				{/* Layout - Five Columns: Text, Picture, Text, Picture, Text */}
				{/* Mobile/Tablet: Vertical stack maintaining order */}
				{/* Desktop: Horizontal 5-column layout with full-height images */}
				<div className="px-4 py-8 md:py-0">
					<div className="grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-5 md:gap-4 lg:gap-6">
						{/* 1. Study Text Column */}
						<div className="flex flex-col md:col-span-1">
							<motion.div
								variants={textVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
								className="flex h-full flex-col justify-start py-16 text-left"
							>
								<p className="font-display text-lg leading-relaxed font-normal tracking-normal text-white md:text-base lg:text-2xl">
									<span className="font-sans text-xl font-bold md:text-2xl lg:text-3xl">
										Study
									</span>{' '}
									in Via consists of seminars on the ancient spiritual and
									philosophical traditions of Israel, Greece, and the early
									Church.
								</p>
							</motion.div>
						</div>

						{/* 2. Study Image Column - Full Height, No Padding */}
						<div className="flex flex-col md:col-span-1">
							<motion.div
								variants={textVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
								className="relative h-full min-h-[300px] w-full overflow-hidden md:min-h-full"
							>
								<Img
									src="/img/life-in-via-study.jpg"
									alt="Seminar with LU and Fellows"
									width={800}
									height={600}
									fit="cover"
									className="h-full w-full object-cover"
								/>
							</motion.div>
						</div>

						{/* 3. Work Text Column */}
						<div className="flex flex-col md:col-span-1">
							<motion.div
								variants={textVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
								className="flex h-full flex-col justify-start py-16 text-left"
							>
								<p className="font-display text-lg leading-relaxed font-normal tracking-normal text-white md:text-base lg:text-2xl">
									<span className="font-sans text-xl font-bold md:text-2xl lg:text-3xl">
										Work
									</span>{' '}
									takes the form of apprenticeships with Catholic professionals
									dedicated to preparing Via Fellows for success in their
									respective careers.
								</p>
							</motion.div>
						</div>

						{/* 4. Prayer Image Column - Full Height, No Padding */}
						<div className="flex flex-col md:col-span-1">
							<motion.div
								variants={textVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
								className="relative h-full min-h-[300px] w-full overflow-hidden md:min-h-full"
							>
								<Img
									src="/img/life-in-via-prayer.jpg"
									alt="Anthony and AnnAyrisse praying"
									width={800}
									height={600}
									fit="cover"
									className="h-full w-full object-cover"
								/>
							</motion.div>
						</div>

						{/* 5. Prayer Text Column */}
						<div className="flex flex-col md:col-span-1">
							<motion.div
								variants={textVariants}
								initial="hidden"
								animate={lifeInViaInView ? 'visible' : 'hidden'}
								className="flex h-full flex-col justify-start py-16 text-left"
							>
								<p className="font-display text-lg leading-relaxed font-normal tracking-normal text-white md:text-base lg:text-2xl">
									<span className="font-sans text-xl font-bold md:text-2xl lg:text-3xl">
										Prayer
									</span>{' '}
									entails frequent time with Christ in the Eucharist and
									intentional silence, fostering sustained recollection amid a
									full schedule.
								</p>
							</motion.div>
						</div>
					</div>
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
				<div className="relative hidden min-h-[600px] overflow-hidden py-12 md:block md:py-16">
					<Img
						src="/img/mountain-isaac-anthony.jpg"
						alt="Isaac hoisting Anthony on mountain"
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
									className="mb-6 text-xl leading-relaxed md:text-2xl"
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
									className="mb-6 text-xl leading-relaxed md:text-2xl"
									variants={textVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
								>
									We believe that such an experience is enormously beneficial,
									such that an additional stage of formation should be inserted
									into the traditional sequence of young adults' formation, so
									as to help the future of the Church better live in the world
									but not of it.
								</motion.p>
								<motion.p
									className="mb-6 text-xl leading-relaxed md:text-2xl"
									variants={textVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
								>
									Via provides participants with a simple but very full life,
									experienced in a community of people who desire largely the
									same things, namely...
								</motion.p>
								<motion.ul
									variants={textVariants}
									initial="hidden"
									whileInView="visible"
									viewport={{ once: true }}
									className="list-disc space-y-1.5 pl-6 text-xl leading-relaxed md:space-y-2 md:text-2xl"
								>
									<li>Knowledge of oneself, the world, and God</li>
									<li>Habits of order and self-mastery</li>
									<li>Meaningful work in a potential career</li>
									<li>An abiding love of God and neighbor</li>
									<li>A capacity to pray & meditate</li>
									<li>Freedom from vice and attachment</li>
									<li>An ability to share the faith with confidence</li>
									<li>A deepened understanding of one's calling in life</li>
								</motion.ul>
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
