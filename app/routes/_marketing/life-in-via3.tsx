import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { CarouselTextSection } from '#app/components copy 4/carousel-text-section.tsx'
import HeroParallax from '#app/components copy 4/HeroParallax.tsx'
import { Button } from '#app/components copy 4/ui/button.tsx'
import { type Route } from './+types/life-in-via.ts'

export const meta: Route.MetaFunction = () => [
	{ title: 'Life In Via | Via Nova' },
]

// Images - per Luke's 11/1 notes: static images only, no galleries
const intellectualImage = '/img/intellectual-1.jpg'
const spiritualImage = '/img/spiritual-1.jpg'
const serviceImage = '/img/service-lundi-gras.jpg' // Updated per design notes
const bottomLineImage = '/img/bottomline-1.jpg'

const navSections = [
	{ id: 'intellectual-formation', label: 'Intellectual Formation' },
	{ id: 'spiritual-formation', label: 'Spiritual Formation' },
	{ id: 'service-community', label: 'Service & Community' },
	{ id: 'retreats-pilgrimages', label: 'Retreats & Pilgrimages' },
	{ id: 'external-support', label: 'External Support' },
	{ id: 'internal-support', label: 'Internal Support' },
	{ id: 'professional-formation', label: 'Professional Formation' },
] as const

export default function LifeInVia() {
	const [activeSection, setActiveSection] = useState<string>('')
	const observerRef = useRef<IntersectionObserver | null>(null)

	useEffect(() => {
		// Set up intersection observer for active nav highlighting
		observerRef.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id)
					}
				})
			},
			{
				rootMargin: '-150px 0px -50% 0px',
				threshold: 0,
			},
		)

		// Observe all sections
		navSections.forEach((section) => {
			const element = document.getElementById(section.id)
			if (element) {
				observerRef.current?.observe(element)
			}
		})

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect()
			}
		}
	}, [])

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId)
		if (element) {
			// Get the sticky nav to calculate offset
			const stickyNav = document.querySelector('.sticky-nav')

			if (!stickyNav) {
				// Fallback if sticky nav not found
				element.scrollIntoView({ behavior: 'smooth', block: 'start' })
				return
			}

			// Get the sticky nav's CSS top value (73px mobile, 105px desktop)
			const computedStyle = window.getComputedStyle(stickyNav)
			const navTop =
				parseFloat(computedStyle.top) ||
				(window.matchMedia('(min-width: 768px)').matches ? 105 : 73)
			const navHeight = stickyNav.getBoundingClientRect().height

			// On mobile, the image appears first (254px tall), so we need to account for it
			// to position the text content below the sticky nav
			const isMobile = window.matchMedia('(max-width: 767px)').matches
			const mobileImageHeight = isMobile ? 254 : 0

			// Calculate where the element currently is relative to viewport
			const elementTop = element.getBoundingClientRect().top

			// We want the text content (which is mobileImageHeight down from section top on mobile)
			// to be positioned right below the sticky nav
			// Current text position = elementTop + mobileImageHeight
			// Target text position = navTop + navHeight
			// Scroll amount = current text position - target text position
			const scrollAmount = elementTop + mobileImageHeight - (navTop + navHeight)

			// Scroll from current position
			window.scrollBy({
				top: scrollAmount,
				behavior: 'smooth',
			})
		}
	}

	return (
		<div className="relative bg-white" style={{ scrollBehavior: 'smooth' }}>
			{/* Hero Section - Enhanced */}
			<section className="relative z-10 bg-white">
				{/* Hero Background Image Section */}
				<div className="relative">
					<HeroParallax
						imageSrc="/img/life-in-via-hero.jpg"
						heightClass="h-[318px] md:h-[450px]"
						overlayClass="bg-gradient-to-t from-black/50 via-black/20 to-transparent"
					/>
					{/* Hero Content Overlay */}
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="mx-auto max-w-7xl px-4 text-center">
							<h1 className="mb-4 font-serif text-3xl font-semibold text-white drop-shadow-lg md:mb-6 md:text-5xl">
								Life in Via
							</h1>
							<p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-neutral-100 drop-shadow-md md:text-xl">
								A year of intensive intellectual, spiritual, and professional
								formation within a close-knit community dedicated to prayer,
								study, service, and the pursuit of holiness.
							</p>
							<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
								<Button
									asChild
									className="rounded-full bg-amber-700 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-amber-800 hover:shadow-xl"
								>
									<Link to="/apply">Apply to Via</Link>
								</Button>
								<Button
									asChild
									variant="outline"
									className="rounded-full border-2 border-white bg-white/10 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/20"
								>
									<Link to="/contact">Contact the Team</Link>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Sticky In-Page Navigation - Enhanced */}
			<nav className="sticky-nav border-brand-dark-blue/20 bg-brand-dark-blue/95 sticky top-[73px] z-30 border-b shadow-lg backdrop-blur-sm md:top-[105px]">
				<div className="mx-auto max-w-7xl px-4">
					<div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-3 md:gap-x-6 md:py-4">
						{navSections.map((section) => {
							const isActive = activeSection === section.id
							return (
								<button
									key={section.id}
									onClick={() => scrollToSection(section.id)}
									className={`relative cursor-pointer rounded-md px-4 py-2 text-center text-sm font-medium tracking-wide whitespace-nowrap text-white transition-all duration-200 hover:bg-white/10 hover:text-amber-300 hover:underline md:px-5 md:py-2.5 md:text-base ${
										isActive
											? 'bg-white/10 font-semibold text-amber-300 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-amber-300'
											: ''
									}`}
								>
									{section.label}
								</button>
							)
						})}
					</div>
				</div>
			</nav>

			{/* Intellectual Formation Section */}
			<CarouselTextSection
				id="intellectual-formation"
				title="Intellectual Formation"
				images={[intellectualImage]}
				carouselSide="left"
				imageAltPrefix="intellectual formation"
				className="scroll-mt-24"
			>
				<p className="mb-6 text-lg leading-relaxed font-medium text-neutral-700 md:text-xl">
					Fellows engage in rigorous study of the Western philosophical and
					spiritual tradition through weekly seminars, presentations, and
					discussions led by exceptional local instructors.
				</p>
				<p className="mb-6 text-base leading-relaxed text-gray-700 md:leading-7">
					Via Fellows study the ancient philosophical and spiritual tradition of
					the West under the tutelage of the best local instructors. Via's core
					curriculum consists of several seminars each week split into the
					following six sequences:
				</p>
				<ul className="my-6 list-inside list-disc space-y-2.5 text-base leading-relaxed text-gray-700 md:leading-7">
					<li>I. Introduction to Dialectic</li>
					<li>II. Origin: Myths and Revelation</li>
					<li>III. The Chosen People: Israel</li>
					<li>IV. From Poetry to Science: Greece</li>
					<li>V. The Pursuit of Happiness: Rome</li>
					<li>VI. City of God: Church Fathers</li>
				</ul>
				<p className="mb-4 text-base leading-relaxed text-gray-700 md:leading-7">
					Each sequence concludes with a presentation from the Fellows. The
					purpose of the presentations is to deepen Fellows' understanding of
					each sequence's subject matter and to allow Fellows to fulfill the
					responsibility that comes with the privilege of education, namely to
					put the fruits of one's learning at the service of one's community.
				</p>
				<p className="mb-4 text-base leading-relaxed text-gray-700 md:leading-7">
					Via's seminars and talks are for more than just the Fellows. Dozens of
					friends beyond the cohort participate in Via's intellectual formation
					by enrolling in our weekly seminars, and our discussions and lectures
					are always open to the public.
				</p>
				<p className="mb-4 text-base leading-relaxed text-gray-700 md:leading-7">
					In addition to the seminars, Fellows attend and host regular retreats,
					pilgrimages, lectures, and discussions to supplement their seminar
					formation.
				</p>
				<p className="mb-8 text-base leading-relaxed text-gray-700 md:leading-7">
					The purpose of the Fellows' intellectual formation is to deepen
					Fellows' knowledge of one's self and the world, and ultimately to more
					deeply know and love God.
				</p>
				<div className="mt-8">
					<Link
						to="/curriculum"
						className="inline-flex items-center gap-2 text-base font-medium text-amber-700 transition hover:text-amber-800 hover:underline"
					>
						Read more about our curriculum
						<span aria-hidden="true">→</span>
					</Link>
				</div>
			</CarouselTextSection>

			{/* Spiritual Formation Section */}
			<CarouselTextSection
				id="spiritual-formation"
				title="Spiritual Formation"
				images={[spiritualImage]}
				carouselSide="right"
				imageAltPrefix="spiritual formation"
				className="scroll-mt-24"
			>
				<p className="mb-6 text-lg leading-relaxed font-medium text-neutral-700 md:text-xl">
					Daily prayer, Mass, and spiritual practices form the foundation of
					each Fellow's journey toward holiness, creating space for encounter
					with Christ and the cultivation of lifelong habits of prayer and
					peace.
				</p>
				<p className="mb-4 text-base leading-relaxed text-gray-700 md:leading-7">
					Fellows spend at least one hour in silent prayer with Christ in the
					Blessed Sacrament each day, attend holy Mass, pray Compline, and
					devote time to meditation and spiritual reading.
				</p>
				<p className="mb-4 text-base leading-relaxed text-gray-700 md:leading-7">
					While Fellows have specific times set aside exclusively for prayer,
					they are encouraged to take seriously the exhortation of St. Paul to
					pray without ceasing. Occasional pilgrimages and retreats also
					supplement the Fellows' regular spiritual practices.
				</p>
				<p className="mb-4 text-base leading-relaxed text-gray-700 md:leading-7">
					Fellows spend Friday mornings in silence to allow for an additional
					opportunity for focused prayer through meditation, spiritual reading,
					exercise, house chores, etc.
				</p>
				<p className="mb-8 text-base leading-relaxed text-gray-700 md:leading-7">
					The purpose of the Fellows' prayer regimen is to create opportunities
					for Fellows to more effortlessly lift the mind to God and to form
					lifelong habits of prayer and peace.
				</p>
				<div className="mt-8">
					<Link
						to="/contact"
						className="inline-flex items-center gap-2 text-base font-medium text-amber-700 transition hover:text-amber-800 hover:underline"
					>
						Learn more about our spiritual practices
						<span aria-hidden="true">→</span>
					</Link>
				</div>
			</CarouselTextSection>

			{/* Service & Community Section */}
			<CarouselTextSection
				id="service-community"
				title="Service & Community"
				images={[serviceImage]}
				carouselSide="left"
				imageAltPrefix="service & community"
				className="scroll-mt-24"
			>
				<p className="mb-6 text-lg leading-relaxed font-medium text-neutral-700 md:text-xl">
					Through neighborhood visits, community events, and shared
					responsibilities, Fellows serve both their local community and one
					another, creating spaces for meaningful recreation and liturgical
					celebration.
				</p>
				<p className="mb-6 text-base leading-relaxed text-gray-700 md:leading-7">
					Fellows devote a set amount of time each week to pray and visit with
					friends in the neighborhood, particularly those suffering
					homelessness.
				</p>
				<div className="mb-6">
					<h3 className="mb-3 text-base font-semibold text-gray-900 md:text-lg">
						Internal Responsibilities
					</h3>
					<p className="mb-3 text-base leading-relaxed text-gray-700 md:leading-7">
						Fellows have individual responsibilities in order to assist with the
						internal communal life of Via such as:
					</p>
					<ul className="list-inside list-disc space-y-2.5 text-base leading-relaxed text-gray-700 md:leading-7">
						<li>Preparing for events</li>
						<li>Tracking budgets</li>
						<li>Property maintenance</li>
						<li>Cooking</li>
					</ul>
				</div>
				<div className="mb-6">
					<h3 className="mb-3 text-base font-semibold text-gray-900 md:text-lg">
						Community Events
					</h3>
					<p className="mb-3 text-base leading-relaxed text-gray-700 md:leading-7">
						Fellows also serve the wider community by hosting events throughout
						the year, such as:
					</p>
					<ul className="list-inside list-disc space-y-2.5 text-base leading-relaxed text-gray-700 md:leading-7">
						<li>Poetry nights</li>
						<li>Lectures</li>
						<li>Jam sessions</li>
						<li>Discussions</li>
						<li>Courir de Lundi Gras</li>
						<li>Feast day balls</li>
						<li>Fall Jamboree</li>
					</ul>
				</div>
				<p className="mb-8 text-base leading-relaxed text-gray-700 md:leading-7">
					The Fellows host events to give people of all ages an experience of
					meaningful recreation and to help the community observe the Church's
					liturgical calendar.
				</p>
			</CarouselTextSection>

			{/* Retreats & Pilgrimages Section */}
			<CarouselTextSection
				id="retreats-pilgrimages"
				title="Retreats & Pilgrimages"
				images={['/img/retreats-pilgrimages.jpg']}
				carouselSide="right"
				imageAltPrefix="retreats and pilgrimages"
				className="scroll-mt-24"
			>
				<p className="mb-6 text-lg leading-relaxed font-medium text-neutral-700 md:text-xl">
					Extended time in silence, prayer, and study during retreats, combined
					with journeys to holy sites and cultural landmarks, deepen Fellows'
					appreciation for the Church's rich heritage.
				</p>
				<p className="mb-6 text-base leading-relaxed text-gray-700 md:leading-7">
					Retreats in Via serve as an opportunity for devoting more time to
					silence, prayer, liturgy, and deeper study of particular topics in the
					moral and spiritual order.
				</p>
				<div className="mb-6">
					<h3 className="mb-3 text-base font-semibold text-gray-900 md:text-lg">
						Retreat Topics
					</h3>
					<p className="mb-3 text-base leading-relaxed text-gray-700 md:leading-7">
						Conferences and discussions on Via's retreats are normally led by
						teachers and clergy from the wider community and feature topics such
						as:
					</p>
					<ul className="list-inside list-disc space-y-2.5 text-base leading-relaxed text-gray-700 md:leading-7">
						<li>Catholic culture</li>
						<li>Secularization</li>
						<li>The monastic tradition</li>
						<li>The intellectual life</li>
					</ul>
				</div>
				<div className="mb-6">
					<h3 className="mb-3 text-base font-semibold text-gray-900 md:text-lg">
						Pilgrimage Features
					</h3>
					<p className="mb-3 text-base leading-relaxed text-gray-700 md:leading-7">
						While Via's pilgrimages vary in content and location, a few features
						of Via's pilgrimages include:
					</p>
					<ul className="list-inside list-disc space-y-2.5 text-base leading-relaxed text-gray-700 md:leading-7">
						<li>Hiking</li>
						<li>Street evangelization</li>
						<li>Visiting holy sites</li>
						<li>Live music performances</li>
					</ul>
				</div>
				<p className="mb-8 text-base leading-relaxed text-gray-700 md:leading-7">
					The Fellows' international spring pilgrimage focuses especially on
					deepening appreciation of the Church's cultural and historical
					heritage.
				</p>
			</CarouselTextSection>

			{/* External Support Section */}
			<CarouselTextSection
				id="external-support"
				title="External Support"
				images={['/img/external-support-alt.jpg']}
				carouselSide="left"
				imageAltPrefix="external support"
				imageHeight={383}
				imageWidth={475}
				imageContainerHeight="587px"
				className="scroll-mt-24"
			>
				<p className="mb-6 text-lg leading-relaxed font-medium text-neutral-700 md:text-xl">
					Monthly formation team meetings, spiritual direction, and mentorship
					provide personalized guidance for each Fellow's growth in all areas of
					life.
				</p>
				<p className="mb-6 text-base leading-relaxed text-gray-700 md:leading-7">
					Each Fellow has a formation team which he or she meets with each
					month. Formation meetings are focused on various topics including:
				</p>
				<ul className="mb-6 list-inside list-disc space-y-2.5 text-base leading-relaxed text-gray-700 md:leading-7">
					<li>Career decisions</li>
					<li>Community life</li>
					<li>Personal challenges</li>
					<li>Financials</li>
					<li>Vocational guidance</li>
				</ul>
				<p className="mb-8 text-base leading-relaxed text-gray-700 md:leading-7">
					In addition to formation team meetings, Fellows meet with a spiritual
					director and select mentors in the community throughout the year.
				</p>
			</CarouselTextSection>

			{/* Internal Support Section */}
			<CarouselTextSection
				id="internal-support"
				title="Internal Support"
				images={['/img/internal-support-music-room.jpg']}
				carouselSide="right"
				imageAltPrefix="internal support"
				imageHeight={383}
				className="scroll-mt-24"
			>
				<p className="mb-6 text-lg leading-relaxed font-medium text-neutral-700 md:text-xl">
					Regular check-ins with housemates and cohort leaders foster radical
					humility, self-knowledge, and conscientiousness within the community.
				</p>
				<p className="mb-6 text-base leading-relaxed text-gray-700 md:leading-7">
					Fellows have intentional check-ins with their housemates every two
					weeks to self-assess and to offer feedback to each other. These
					check-ins are an opportunity for radical humility and honesty, and
					yield manifold fruits, particularly in self-knowledge and
					conscientiousness.
				</p>
				<p className="mb-8 text-base leading-relaxed text-gray-700 md:leading-7">
					Fellows also meet with their cohort leader monthly to discuss future
					plans, community life, goals, challenges, etc., as well as the
					director of Via as necessary.
				</p>
			</CarouselTextSection>

			{/* Professional Formation Section */}
			<CarouselTextSection
				id="professional-formation"
				title="Professional Formation"
				images={['/img/professional-formation.jpg']}
				carouselSide="left"
				imageAltPrefix="professional formation"
				className="scroll-mt-24"
			>
				<p className="mb-6 text-lg leading-relaxed font-medium text-neutral-700 md:text-xl">
					Two days per week of meaningful work with community organizations
					allows Fellows to explore career paths, gain professional experience,
					and contribute to the common good.
				</p>
				<p className="mb-4 text-base leading-relaxed text-gray-700 md:leading-7">
					Fellows work for organizations in the community for two days each
					week. Fellows are partnered with different organizations based on
					their career aspirations and personal interests.
				</p>
				<p className="mb-4 text-base leading-relaxed text-gray-700 md:leading-7">
					In addition to their work partnerships, Fellows are encouraged to seek
					mentorship and sometimes internships with professionals in the
					community in order to test their sense of calling to fields they may
					wish to pursue as a career.
				</p>
				<p className="mb-4 text-base leading-relaxed text-gray-700 md:leading-7">
					The Fellows' employers–who are typically leaders in their organization
					and are always active Catholics–understand that their employment of a
					Via Fellow is in part for the Fellow's personal development, while
					still expecting the Fellow to serve the organization with no less
					dedication than any other employee.
				</p>
				<p className="mb-8 text-base leading-relaxed text-gray-700 md:leading-7">
					The purpose of the Fellows' employment is to understand the
					inner-workings of a professional environment they are discerning as a
					potential career, and to contribute meaningfully to their employer's
					organization and to the common good.
				</p>
				<div className="mt-8">
					<Link
						to="/contact"
						className="inline-flex items-center gap-2 text-base font-medium text-amber-700 transition hover:text-amber-800 hover:underline"
					>
						Talk to a current Fellow
						<span aria-hidden="true">→</span>
					</Link>
				</div>
			</CarouselTextSection>

			{/* Bottom Line Section */}
			<CarouselTextSection
				id="bottom-line"
				title="Bottom Line"
				images={[bottomLineImage]}
				carouselSide="right"
				imageAltPrefix="bottom line"
				variant="dark"
				className="scroll-mt-24"
			>
				<div className="mx-auto max-w-3xl">
					<p className="text-base leading-relaxed text-white md:text-lg md:leading-relaxed">
						The essential purpose of all of Via's structures is to create an
						environment that helps young people to respond more zealously to the
						call to sanctity. No amount of programming can force the soul's free
						response to this calling, but we believe Via's structures allow our
						participants and those we serve to discover the profound joy of the
						life of a disciple.
					</p>
				</div>
			</CarouselTextSection>

			{/* Footer - Enhanced */}
			<footer className="relative z-20 border-t-2 border-gray-300 bg-white py-12 md:py-16">
				<div className="mx-auto max-w-7xl px-4">
					<div className="grid gap-10 md:grid-cols-3 md:gap-12">
						{/* Mission */}
						<div>
							<h3 className="mb-4 font-serif text-2xl font-semibold text-gray-900">
								Via Nova
							</h3>
							<p className="text-sm leading-relaxed text-neutral-500">
								A year of intensive formation for Catholics ages 18-22,
								integrating intellectual, spiritual, and professional growth
								within a vibrant community.
							</p>
						</div>

						{/* Navigation */}
						<div>
							<h4 className="mb-4 text-lg font-semibold text-gray-900">
								Quick Links
							</h4>
							<nav className="flex flex-col space-y-3">
								<Link
									to="/why-via"
									className="text-sm text-neutral-500 transition hover:text-gray-900 hover:underline"
								>
									Why Via?
								</Link>
								<Link
									to="/curriculum"
									className="text-sm text-neutral-500 transition hover:text-gray-900 hover:underline"
								>
									Curriculum
								</Link>
								<Link
									to="/apply"
									className="text-sm text-neutral-500 transition hover:text-gray-900 hover:underline"
								>
									Apply
								</Link>
								<Link
									to="/contact"
									className="text-sm text-neutral-500 transition hover:text-gray-900 hover:underline"
								>
									Contact
								</Link>
							</nav>
						</div>

						{/* Contact & Legal */}
						<div>
							<h4 className="mb-4 text-lg font-semibold text-gray-900">
								Contact
							</h4>
							<div className="space-y-3">
								<p className="text-sm text-neutral-500">
									<a
										href="mailto:admissions@studyworkpray.org"
										className="transition hover:text-gray-900 hover:underline"
									>
										admissions@studyworkpray.org
									</a>
								</p>
								<p className="pt-4 text-xs leading-relaxed text-neutral-400">
									Via Nova is an independent 501(c)(3) organization. All
									donations are tax-deductible by law.
								</p>
							</div>
						</div>
					</div>
					<div className="mt-12 border-t border-gray-300 pt-8 text-center">
						<p className="text-xs text-neutral-400">
							© {new Date().getFullYear()} Via Nova. All rights reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
