import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import {
	CarouselTextSection,
	CarouselTextDoubleSection,
	CarouselImagelessTextSection,
} from '#app/components/carousel-text-section.tsx'
import HeroParallax from '#app/components/HeroParallax.tsx'
import { type Route } from './+types/life-in-via.ts'

export const meta: Route.MetaFunction = () => [
	{ title: 'Life In Via | Via Nova' },
]

// Images - per Luke's 11/1 notes: static images only, no galleries
const intellectualImage = '/img/study-group4.webp'
const spiritualImage = '/img/life-via-prayer.webp'
const serviceImage = '/img/service-lundi-gras.webp' // Updated per design notes
const bottomLineImage = '/img/bottomline-1.jpg'

const sectionIds = [
	'intellectual-formation',
	'professional-formation',
	'spiritual-formation',
	'service-community',
	'retreats-pilgrimages',
	'external-support',
	'internal-support',
] as const

export default function LifeInVia() {
	const [activeSection, setActiveSection] = useState<string>('')

	useEffect(() => {
		const handleScroll = () => {
			const stickyNav = document.querySelector('.sticky-nav')
			if (!stickyNav) return

			const navTop =
				parseFloat(window.getComputedStyle(stickyNav).top) ||
				(window.matchMedia('(min-width: 768px)').matches ? 105 : 73)
			const navHeight = stickyNav.getBoundingClientRect().height
			const offset = navTop + navHeight + 20 // Add some padding for better UX

			// Find which section is currently in view
			for (let i = sectionIds.length - 1; i >= 0; i--) {
				const sectionId = sectionIds[i]
				if (!sectionId) continue

				const section = document.getElementById(sectionId)
				if (section) {
					const rect = section.getBoundingClientRect()
					// Check if section top is above or at the offset point
					if (rect.top <= offset) {
						setActiveSection(sectionId)
						return
					}
				}
			}
			// If no section is found, default to first one
			if (sectionIds[0]) {
				setActiveSection(sectionIds[0])
			}
		}

		// Set initial active section
		handleScroll()

		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
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
			const mobileImageHeight =
				isMobile && sectionId !== 'internal-support' ? 254 : 0

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
		<div className="relative bg-white">
			{/* Hero Section */}
			<section className="relative z-10 bg-white py-12">
				<div className="mx-auto max-w-7xl px-4 text-center">
					<div className="flex flex-col">
						<h1 className="order-1 mb-4 font-serif text-5xl font-normal text-black md:order-2 md:mb-6 md:text-[56px]">
							Life in Via
						</h1>
						{/* <p className="order-2 mb-6 font-serif text-lg text-gray-700 md:order-1 md:mb-4 md:text-xl">
							study &nbsp;| &nbsp;work | &nbsp;pray
						</p> */}
					</div>
				</div>
			</section>

			{/* Hero Background Image Section */}
			<HeroParallax
				imageSrc="/img/life-in-via-hero.jpg"
				heightClass="h-[318px]"
				overlayClass="bg-gradient-to-t from-black/30 to-transparent"
			/>

			{/* Sticky In-Page Navigation */}
			<nav className="sticky-nav bg-brand-dark-blue top-[73px] z-20 py-4 md:sticky md:top-[85px]">
				<div className="max-w-8xl mx-auto px-4">
					<div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:flex-wrap md:space-y-0 md:space-x-10">
						<button
							onClick={() => scrollToSection('intellectual-formation')}
							className={`sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white ${
								activeSection === 'intellectual-formation' ? 'active' : ''
							}`}
						>
							Intellectual Formation
						</button>
						<button
							onClick={() => scrollToSection('professional-formation')}
							className={`sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white ${
								activeSection === 'professional-formation' ? 'active' : ''
							}`}
						>
							Professional Formation
						</button>
						<button
							onClick={() => scrollToSection('spiritual-formation')}
							className={`sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white ${
								activeSection === 'spiritual-formation' ? 'active' : ''
							}`}
						>
							Spiritual Formation
						</button>
						<button
							onClick={() => scrollToSection('service-community')}
							className={`sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white ${
								activeSection === 'service-community' ? 'active' : ''
							}`}
						>
							Service & Community
						</button>
						<button
							onClick={() => scrollToSection('retreats-pilgrimages')}
							className={`sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white ${
								activeSection === 'retreats-pilgrimages' ? 'active' : ''
							}`}
						>
							Retreats & Pilgrimages
						</button>
						<button
							onClick={() => scrollToSection('external-support')}
							className={`sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white ${
								activeSection === 'external-support' ? 'active' : ''
							}`}
						>
							External Support
						</button>
						<button
							onClick={() => scrollToSection('internal-support')}
							className={`sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white ${
								activeSection === 'internal-support' ? 'active' : ''
							}`}
						>
							Internal Support
						</button>
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
				imageWidth={2200}
				imageHeight={1792}
				imageContainerHeight="700px"
			>
				<p className="">
					Via's core curriculum consists of five seminars each week featuring
					the spiritual and philosophical traditions of ancient Israel, Greece,
					and Christianity. In addition to the core curriculum, Fellows have the
					opportunity to take optional weekly seminars on various topics ranging
					from Russian literature to modern biology, which friends in the wider
					community are also able to enroll in.
				</p>
				<p>
					The core curriculum's six sections are detailed on the{' '}
					<Link to="/curriculum" className="text-brand-primary hover:underline">
						curriculum page
					</Link>
					. Each section concludes with a presentation from the Fellows which
					aims to deepen the Fellows’ understanding of the seminar’s subject
					matter and to allow each Fellow to fulfill the responsibility that
					comes with the privilege of education, namely to put the fruits of
					one's learning at the service of one's community.
				</p>
				<p>
					The Fellows’ intellectual formation also occurs through the many talks
					and discussions Via hosts throughout the year. Various speakers come
					from across the country to give talks at the Via House, and topics
					range from existentialism to hunting.
				</p>
				<p>
					Via's seminars, presentations, and lectures are for more than just the
					Fellows. Many friends from the community participate in Via's
					intellectual formation by enrolling in our weekly seminars, and our
					presentations and lectures are always open to the public.
				</p>
				<p>
					The purpose of the Fellows' intellectual formation is to deepen
					Fellows' knowledge of one's self and the world, and ultimately to more
					deeply know and love God.
				</p>
			</CarouselTextSection>

			{/* Professional Formation Section */}
			<CarouselTextSection
				id="professional-formation"
				title="Professional Formation"
				images={['/img/ultrasound.webp']}
				carouselSide="right"
				imageAltPrefix="professional formation"
				imageWidth={1920}
				imageHeight={2208}
				imageContainerHeight="500px"
			>
				<p>
					Fellows work for organizations in the community for two days each
					week. Fellows are partnered with different organizations based on
					their career aspirations and personal interests.
				</p>
				<p>
					In addition to their work partnerships, Fellows pursue mentorship with
					professionals in the community in order to test their sense of calling
					to fields they may wish to pursue as a career.
				</p>
				<p>
					The Fellows’ employers understand that their employment of a Via
					Fellow is for the Fellow’s personal formation, while still treating
					the Fellow with the same type of expectation as every other employee.
					Via’s professional partners are typically leaders in their
					organization and are always active Catholics.
				</p>
				<p>
					The purpose of the Fellows’ employment is to understand the
					inner-workings of a professional environment they are discerning as a
					potential career, and to contribute meaningfully to their employer’s
					organization and to the common good.
				</p>
			</CarouselTextSection>

			{/* Spiritual Formation Section */}
			<CarouselTextSection
				id="spiritual-formation"
				title="Spiritual Formation"
				images={[spiritualImage]}
				carouselSide="left"
				imageAltPrefix="spiritual formation"
				imageWidth={1536}
				imageHeight={2048}
				imageContainerHeight="420px"
			>
				<p>
					Fellows spend at least one hour in silent prayer with Christ in the
					Blessed Sacrament each day, attend holy Mass, pray Compline, and
					devote time to meditation and spiritual reading.
				</p>
				<p>
					While Fellows have specific times set aside exclusively for prayer,
					they are encouraged to take seriously the exhortation of St. Paul to
					pray without ceasing. Occasional pilgrimages and retreats also
					supplement the Fellows’ regular spiritual practices.
				</p>
				<p>
					Fellows spend Friday mornings in silence to allow for an additional
					opportunity for focused prayer through meditation, spiritual reading,
					exercise, house chores, etc.
				</p>
				<p>
					The purpose of the Fellows’ prayer regimen is to create opportunities
					for Fellows to more effortlessly lift the mind to God and to form
					lifelong habits of prayer and peace.
				</p>
			</CarouselTextSection>

			{/* Service & Community Section */}
			<CarouselTextSection
				id="service-community"
				title="Service & Community"
				images={[serviceImage]}
				carouselSide="right"
				imageAltPrefix="service & community"
				imageWidth={1200}
				imageHeight={715}
				imageContainerHeight="540px"
			>
				<p>
					Fellows have various responsibilities in order to assist with the
					internal communal life of Via and serve the wider community. These
					responsibilities include preparing for events, monitoring expenses,
					property management, cooking, etc.
				</p>
				<p>
					Fellows devote a set amount of time each week to visit with friends in
					the neighborhood, particularly those suffering homelessness,
					remembering our Lord’s admonition that what is done to the least of
					these is done to Him.
				</p>
				<p>
					Fellows also serve the wider community by hosting events throughout
					the year, such as poetry nights, lectures, jam sessions, discussions,
					etc., as well as several major events including our{' '}
					<a
						href="https://www.youtube.com/watch?v=b0_8MiwsjFY"
						target="_blank"
						rel="noreferrer noopener"
						className="text-brand-primary hover:underline"
					>
						Courir de Lundi Gras
					</a>
					, feast day balls, and the Fall Jamboree.
				</p>
				<p>
					Internally, the Fellows’ service aims to make Via institutionally
					harmonious and smooth, and externally, to build the kingdom of God by
					providing experiences of meaningful recreation and formation and to
					help the community observe the Church’s liturgical calendar.
				</p>
			</CarouselTextSection>

			{/* Retreats & Pilgrimages Section */}
			<CarouselTextSection
				id="retreats-pilgrimages"
				title="Retreats & Pilgrimages"
				images={['/img/retreats-pilgrimages.webp']}
				carouselSide="left"
				imageAltPrefix="retreats and pilgrimages"
				imageWidth={1079}
				imageHeight={1600}
				imageContainerHeight="440px"
			>
				<p>
					Retreats in Via serve as an opportunity for devoting more time to
					silence, prayer, liturgy, and deeper study of particular topics in the
					moral and spiritual order.
				</p>
				<p>
					Conferences and discussions on Via's retreats are normally led by
					teachers and clergy from the wider community and feature topics such
					as Catholic culture, secularization, the monastic tradition, the
					intellectual life, etc.
				</p>
				<p>
					While Via's pilgrimages vary in content and location, a few features
					of Via's pilgrimages include hiking, street evangelization, visiting
					holy sites, live music performances, etc.
				</p>
				<p>
					The Fellows' international spring pilgrimage focuses especially on
					deepening appreciation of the Church's cultural and historical
					heritage.
				</p>
			</CarouselTextSection>

			{/* External and Internal Support Sections */}
			<CarouselTextDoubleSection
				id="external-support"
				title="External Support"
				secondaryId="internal-support"
				images={['/img/internal-support-music-room.webp']}
				carouselSide="right"
				imageAltPrefix="external and internal support"
				imageWidth={1200}
				imageHeight={900}
				imageContainerHeight="683px"
				secondaryTitle="Internal Support"
				children={
					<>
						<p>
							Each Fellow has a formation team which he or she meets with each
							month. Formation meetings are focused on various topics including
							career decisions, community life, personal challenges, financials,
							vocational guidance, etc.
						</p>
						<p>
							In addition to formation team meetings, Fellows meet with a
							spiritual director and select mentors in the community throughout
							the year.
						</p>
					</>
				}
				secondaryChildren={
					<>
						<p>
							Fellows have intentional check-ins with their housemates every two
							weeks to self-assess and to offer feedback to each other. These
							check-ins are an opportunity for radical humility and honesty, and
							yield manifold fruits, particularly in self-knowledge and
							conscientiousness.
						</p>
						<p>
							Fellows also meet with their cohort leader monthly to discuss
							future plans, community life, goals, challenges, etc., as well as
							the director of Via as necessary.
						</p>
					</>
				}
			></CarouselTextDoubleSection>

			{/* External Support Section */}
			{/* <CarouselTextSection
				id="external-support"
				title="External Support"
				images={['/img/sunroom.jpg']}
				carouselSide="right"
				imageAltPrefix="external support"
				imageHeight={383}
				imageWidth={675}
				imageContainerHeight="283px"
			>
				<p>
					Each Fellow has a formation team which he or she meets with each
					month. Formation meetings are focused on various topics including
					career decisions, community life, personal challenges, financials,
					vocational guidance, etc.
				</p>
				<p>
					In addition to formation team meetings, Fellows meet with a spiritual
					director and select mentors in the community throughout the year.
				</p>
			</CarouselTextSection> */}

			{/* Internal Support Section */}
			{/* <CarouselTextSection
				id="internal-support"
				title="Internal Support"
				images={['/img/internal-support-music-room.jpg']}
				carouselSide="left"
				imageAltPrefix="internal support"
				imageWidth={875}
				imageContainerHeight="283px"
			>
				<p>
					Fellows have intentional check-ins with their housemates every two
					weeks to self-assess and to offer feedback to each other. These
					check-ins are an opportunity for radical humility and honesty, and
					yield manifold fruits, particularly in self-knowledge and
					conscientiousness.
				</p>
				<p>
					Fellows also meet with their cohort leader monthly to discuss future
					plans, community life, goals, challenges, etc., as well as the
					director of Via as necessary.
				</p>
			</CarouselTextSection> */}

			{/* Bottom Line Section */}
			<CarouselImagelessTextSection
				id="bottom-line"
				title="Bottomline"
				images={[bottomLineImage]}
				carouselSide="right"
				imageAltPrefix="bottom line"
				variant="dark"
			>
				<p>
					The essential purpose of all of Via’s structures is to create an
					environment that helps young people to respond more zealously to the
					call to sanctity. No amount of programming can force the soul’s free
					response to this calling. However, we have witnessed this formative
					environment lead to profound transformation in our participants over
					and over again such that we know with utmost confidence that if a
					young person chooses to lean into the structures of this formation, it
					works.
				</p>
			</CarouselImagelessTextSection>

			{/* Footer */}
			{/* <footer className="border-t border-gray-200 bg-white py-8">
				<div className="mx-auto max-w-7xl px-4 text-center">
					<p className="text-base text-gray-600">
						Via Nova is an independent 501(c)(3) organization. All donations are
						tax-deductible by law.
					</p>
				</div>
			</footer> */}
		</div>
	)
}
