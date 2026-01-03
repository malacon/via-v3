import { motion, useInView } from 'framer-motion'
import { Img } from 'openimg/react'
import { useRef } from 'react'
import { FullWidthBannerLink } from '#app/components copy 3/full-width-banner-link.tsx'
import HeroCarousel, {
	type Slide,
} from '#app/components copy 3/HeroCarousel.tsx'
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
		src: '/img/mountain-isaac-anthony.jpg', // Poetry Night (focus on the table)
		heading: 'A Year of Holistic Formation',
		subheading: 'Better equipped for a life of freedom, mission, & holiness.',
		alt: 'Isaac hoisting Anthony on mountain',
		focusY: 40,
		focusX: 'center',
		flipY: true,
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
		<div className="bg-via-surface">
			{/* Hero Section with Carousel - Using semantic design system tokens */}
			<HeroCarousel
				slides={heroSlides}
				intervalMs={8000}
				heightClass="h-[236px] md:h-[510px]"
				overlayOpacity={0.6}
				staticHeading="A year of intensive formation in study, work, & prayer."
				staticSubheading={
					<div className="max-w-via-content px-content-x mx-auto">
						<div className="max-w-md text-left">
							<p className="font-body text-body-lg text-via-text-inverse mt-4 max-w-md">
								Via Nova offers a 10-month, live-in experience of intellectual,
								professional, & spiritual formation for Catholics ages 18-22.
							</p>
							<div className="mt-8 flex flex-wrap gap-4">
								<a
									href="#apply"
									className="inline-flex items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-amber-800 focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:outline-none md:text-base"
								>
									Apply Now
								</a>
								<a
									href="/why-via"
									className="inline-flex items-center justify-center rounded-full border border-white/70 bg-transparent px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:outline-none md:text-base"
								>
									Learn More
								</a>
							</div>
						</div>
					</div>
				}
				mobileSubheading={
					<div>
						<p className="font-body text-body-lg text-via-text-inverse mb-6">
							Via Nova offers a 10-month, live-in experience of intellectual,
							professional, & spiritual formation for Catholics ages 18-22.
						</p>
						<div className="flex flex-wrap gap-4">
							<a
								href="#apply"
								className="inline-flex items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-amber-800 focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:outline-none md:text-base"
							>
								Apply Now
							</a>
							<a
								href="/why-via"
								className="inline-flex items-center justify-center rounded-full border border-white/70 bg-transparent px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:outline-none md:text-base"
							>
								Learn More
							</a>
						</div>
					</div>
				}
				mobileSubheadingBgColor="bg-via-primary"
			/>

			{/* Mission Paragraph Section - Using semantic design system tokens */}
			<section className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8 md:py-16">
				<motion.p
					className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-slate-800 md:text-2xl md:leading-loose"
					variants={textVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					Through the ancient formula of <b>study</b>, <b>work</b>, and{' '}
					<b>prayer</b>, we provide participants a via nova, that is "a new way"
					of forming life-changing habits, acquiring practical knowledge, and
					ultimately enjoying a life of freedom and mission.
				</motion.p>
			</section>

			{/* Life in Via Section - Using semantic design system tokens */}
			<section
				ref={lifeInViaRef}
				className="bg-via-primary-soft text-via-text-inverse py-16 md:py-24"
			>
				<div className="mx-auto max-w-6xl px-4 md:px-8">
					<div className="grid gap-8 md:grid-cols-3">
						{/* Study Card */}
						<motion.div
							variants={textVariants}
							initial="hidden"
							animate={lifeInViaInView ? 'visible' : 'hidden'}
							className="flex flex-col gap-4 rounded-xl border-t-4 border-slate-500 bg-white p-6 shadow-md"
						>
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
								<Img
									src="/img/life-in-via-study.jpg"
									alt="Seminar with LU and Fellows"
									width={800}
									height={600}
									fit="cover"
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="flex flex-1 flex-col">
								<h3 className="mb-2 text-xl font-semibold text-slate-900">
									Study
								</h3>
								<p className="font-sans text-sm leading-relaxed text-slate-700">
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
							className="flex flex-col gap-4 rounded-xl border-t-4 border-slate-500 bg-white p-6 shadow-md"
						>
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
								<Img
									src="/img/life-in-via-prayer.jpg"
									alt="Work apprenticeship"
									width={800}
									height={600}
									fit="cover"
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="flex flex-1 flex-col">
								<h3 className="mb-2 text-xl font-semibold text-slate-900">
									Work
								</h3>
								<p className="font-sans text-sm leading-relaxed text-slate-700">
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
							className="flex flex-col gap-4 rounded-xl border-t-4 border-slate-500 bg-white p-6 shadow-md"
						>
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
								<Img
									src="/img/life-in-via-prayer.jpg"
									alt="Anthony and AnnAyrisse praying"
									width={800}
									height={600}
									fit="cover"
									className="h-full w-full object-cover"
								/>
							</div>
							<div className="flex flex-1 flex-col">
								<h3 className="mb-2 text-xl font-semibold text-slate-900">
									Prayer
								</h3>
								<p className="font-sans text-sm leading-relaxed text-slate-700">
									Entails frequent time with Christ in the Eucharist and
									intentional silence, fostering sustained recollection amid a
									full schedule.
								</p>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* "Via was born" Section - Using semantic design system tokens */}
			<section className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8 md:py-24">
				<motion.h2
					className="mx-auto max-w-2xl font-serif text-3xl leading-snug font-semibold text-slate-900 md:text-4xl"
					variants={titleVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					Via was born out of the conviction that every Catholic would be
					profoundly well-served by having one year of holistic formation.
				</motion.h2>
			</section>

			{/* Mission/Benefits Section - Using semantic design system tokens */}
			<section className="bg-gray-100 py-16 md:py-24">
				<div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:px-8">
					{/* Left Column: Mission Story */}
					<div className="space-y-8">
						<motion.h3
							className="mb-2 font-serif text-xl font-semibold text-slate-900 md:text-2xl"
							variants={titleVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							An Integrated Life
						</motion.h3>
						<motion.p
							className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-slate-800 md:text-lg md:leading-loose"
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
							className="mt-8 mb-2 font-serif text-xl font-semibold text-slate-900 md:text-2xl"
							variants={titleVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							Why This Year Matters
						</motion.h3>
						<motion.p
							className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-slate-800 md:text-lg md:leading-loose"
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
							className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-slate-800 md:text-lg md:leading-loose"
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
							className="mb-2 font-serif text-xl font-semibold text-slate-900 md:text-2xl"
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
							className="list-inside list-disc space-y-2 font-sans text-base leading-relaxed text-slate-800 md:text-lg"
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

			{/* Fellows Banner - Using semantic design system tokens */}
			<section className="bg-via-primary text-via-text-inverse py-5 md:py-6">
				<div className="mx-auto max-w-6xl px-4 text-center md:px-8">
					<FullWidthBannerLink to="/why-via">
						<span className="font-sans text-lg font-semibold tracking-wide text-white transition hover:text-amber-400 md:text-xl">
							Learn more about Via from the Fellows.
						</span>
					</FullWidthBannerLink>
				</div>
			</section>

			{/* Keep Via Free Section - Using semantic design system tokens */}
			<section ref={keepViaFreeRef} className="bg-via-bg py-16 md:py-24">
				<div className="mx-auto flex max-w-6xl justify-center px-4 md:px-8">
					<motion.div
						variants={textVariants}
						initial="hidden"
						animate={keepViaFreeInView ? 'visible' : 'hidden'}
						className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white px-6 py-8 text-center shadow-md md:px-10 md:py-10"
					>
						<motion.h2
							className="mb-4 font-serif text-3xl leading-snug font-semibold text-slate-900 md:text-4xl"
							variants={titleVariants}
							initial="hidden"
							animate={keepViaFreeInView ? 'visible' : 'hidden'}
						>
							Keep Via Free
						</motion.h2>
						<motion.p
							className="mx-auto mb-6 max-w-xl font-sans text-base leading-relaxed text-slate-700 md:text-lg"
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
							<a
								href="https://vianova.stellarwebsystems.com/donations/pool/79bdb7d4-264e-11ee-9cac-16118fddfe69"
								target="_blank"
								rel="noreferrer noopener"
								className="mb-6 inline-flex w-full max-w-xs items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-amber-800 focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 focus:outline-none md:w-auto md:text-base"
							>
								Give Now
							</a>
							<p className="mt-4 font-sans text-sm leading-relaxed text-slate-600">
								Via Nova is a 501(c)(3); gifts are tax-deductible.
							</p>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Footer - Using semantic design system tokens */}
			<footer className="bg-via-surface py-10 md:py-12">
				<div className="mx-auto max-w-6xl px-4 text-center md:px-8">
					<p className="font-sans text-xs leading-relaxed text-slate-400 md:text-sm">
						Via Nova is an independent 501(c)(3) organization. All donations are
						tax-deductible by law.
					</p>
				</div>
			</footer>
		</div>
	)
}
