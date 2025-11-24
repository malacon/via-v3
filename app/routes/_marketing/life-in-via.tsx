import { CarouselTextSection } from '#app/components/carousel-text-section.tsx'
import HeroParallax from '#app/components/HeroParallax.tsx'
import { type Route } from './+types/life-in-via.ts'

export const meta: Route.MetaFunction = () => [
	{ title: 'Life In Via | Via Nova' },
]

// Images - per Luke's 11/1 notes: static images only, no galleries
const intellectualImage = '/img/intellectual-1.jpg'
const spiritualImage = '/img/spiritual-1.jpg'
const serviceImage = '/img/service-lundi-gras.jpg' // Updated per design notes
const bottomLineImage = '/img/bottomline-1.jpg'

export default function LifeInVia() {
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
		<div className="relative bg-white">
			{/* Hero Section */}
			<section className="relative z-10 bg-white py-12">
				<div className="mx-auto max-w-7xl px-4 text-center">
					<div className="flex flex-col">
						<h1 className="order-1 mb-4 font-serif text-5xl font-normal text-black md:order-2 md:mb-6 md:text-[56px]">
							Life in Via
						</h1>
						<p className="order-2 mb-6 font-serif text-lg text-gray-700 md:order-1 md:mb-4 md:text-xl">
							study &nbsp;| &nbsp;work | &nbsp;pray
						</p>
					</div>
					<p className="mx-auto max-w-3xl text-lg leading-loose text-gray-700 md:leading-relaxed">
						Below you can find the essential features of life in Via.{' '}
						<br className="hidden md:block" />
						These categories don't do justice to the experience of Via but
						here's the gist.
					</p>
				</div>
			</section>

			{/* Hero Background Image Section */}
			<HeroParallax
				imageSrc="/img/life-in-via-hero.jpg"
				heightClass="h-[423px]"
				overlayClass="bg-gradient-to-t from-black/30 to-transparent"
			/>

			{/* Sticky In-Page Navigation */}
			<nav className="sticky-nav bg-brand-dark-blue top-[73px] z-20 py-4 md:sticky md:top-[105px]">
				<div className="max-w-8xl mx-auto px-4">
					<div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:flex-wrap md:space-y-0 md:space-x-10">
						<button
							onClick={() => scrollToSection('intellectual-formation')}
							className="sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white"
						>
							Intellectual Formation
						</button>
						<button
							onClick={() => scrollToSection('spiritual-formation')}
							className="sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white"
						>
							Spiritual Formation
						</button>
						<button
							onClick={() => scrollToSection('service-community')}
							className="sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white"
						>
							Service & Community
						</button>
						<button
							onClick={() => scrollToSection('retreats-pilgrimages')}
							className="sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white"
						>
							Retreats & Pilgrimages
						</button>
						<button
							onClick={() => scrollToSection('external-support')}
							className="sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white"
						>
							External Support
						</button>
						<button
							onClick={() => scrollToSection('internal-support')}
							className="sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white"
						>
							Internal Support
						</button>
						<button
							onClick={() => scrollToSection('professional-formation')}
							className="sticky-nav-link cursor-pointer text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white"
						>
							Professional Formation
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
			>
				<p>
					Via Fellows study the ancient philosophical and spiritual tradition of
					the West under the tutelage of the best local instructors. Via's core
					curriculum consists of several seminars each week split into the
					following six sequences:
				</p>
				<div className="grid grid-cols-1 gap-2 md:grid-cols-2">
					<p>I. Introduction to Dialectic</p>
					<p>II. Origin: Myths and Revelation</p>
					<p>III. The Chosen People: Israel</p>
					<p>IV. From Poetry to Science: Greece</p>
					<p>V. The Pursuit of Happiness: Rome</p>
					<p>VI. City of God: Church Fathers</p>
				</div>
				<p>
					Each sequence concludes with a presentation from the Fellows. The
					purpose of the presentations is to deepen Fellows' understanding of
					each sequence's subject matter and to allow Fellows to fulfill the
					responsibility that comes with the privilege of education, namely to
					put the fruits of one's learning at the service of one's community.
				</p>
				<p>
					Via's seminars and talks are for more than just the Fellows. Dozens of
					friends beyond the cohort participate in Via's intellectual formation
					by enrolling in our weekly seminars, and our discussions and lectures
					are always open to the public.
				</p>
				<p>
					In addition to the seminars, Fellows attend and host regular retreats,
					pilgrimages, lectures, and discussions to supplement their seminar
					formation.
				</p>
				<p>
					The purpose of the Fellows' intellectual formation is to deepen
					Fellows' knowledge of one's self and the world, and ultimately to more
					deeply know and love God.
				</p>
			</CarouselTextSection>

			{/* Spiritual Formation Section */}
			<CarouselTextSection
				id="spiritual-formation"
				title="Spiritual Formation"
				images={[spiritualImage]}
				carouselSide="right"
				imageAltPrefix="spiritual formation"
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
					supplement the Fellows' regular spiritual practices.
				</p>
				<p>
					Fellows spend Friday mornings in silence to allow for an additional
					opportunity for focused prayer through meditation, spiritual reading,
					exercise, house chores, etc.
				</p>
				<p>
					The purpose of the Fellows' prayer regimen is to create opportunities
					for Fellows to more effortlessly lift the mind to God and to form
					lifelong habits of prayer and peace.
				</p>
			</CarouselTextSection>

			{/* Service & Community Section */}
			<CarouselTextSection
				id="service-community"
				title="Service & Community"
				images={[serviceImage]}
				carouselSide="left"
				imageAltPrefix="service & community"
			>
				<p>
					Fellows devote a set amount of time each week to pray and visit with
					friends in the neighborhood, particularly those suffering
					homelessness.
				</p>
				<p>
					Fellows have individual responsibilities in order to assist with the
					internal communal life of Via such as preparing for events, tracking
					budgets, property maintenance, cooking, etc.
				</p>
				<p>
					Fellows also serve the wider community by hosting events throughout
					the year, such as poetry nights, lectures, jam sessions, discussions,
					etc., as well as several major events including our Courir de Lundi
					Gras, feast day balls, and the Fall Jamboree.
				</p>
				<p>
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

			{/* External Support Section */}
			<CarouselTextSection
				id="external-support"
				title="External Support"
				images={['/img/external-support-alt.jpg']}
				carouselSide="left"
				imageAltPrefix="external support"
				imageHeight={383}
				imageWidth={475}
				imageContainerHeight="383px"
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
			</CarouselTextSection>

			{/* Internal Support Section */}
			<CarouselTextSection
				id="internal-support"
				title="Internal Support"
				images={['/img/internal-support-music-room.jpg']}
				carouselSide="right"
				imageAltPrefix="internal support"
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
			</CarouselTextSection>

			{/* Professional Formation Section */}
			<CarouselTextSection
				id="professional-formation"
				title="Professional Formation"
				images={['/img/professional-formation.jpg']}
				carouselSide="left"
				imageAltPrefix="professional formation"
			>
				<p>
					Fellows work for organizations in the community for two days each
					week. Fellows are partnered with different organizations based on
					their career aspirations and personal interests.
				</p>
				<p>
					In addition to their work partnerships, Fellows are encouraged to seek
					mentorship and sometimes internships with professionals in the
					community in order to test their sense of calling to fields they may
					wish to pursue as a career.
				</p>
				<p>
					The Fellows' employers–who are typically leaders in their organization
					and are always active Catholics–understand that their employment of a
					Via Fellow is in part for the Fellow's personal development, while
					still expecting the Fellow to serve the organization with no less
					dedication than any other employee.
				</p>
				<p>
					The purpose of the Fellows' employment is to understand the
					inner-workings of a professional environment they are discerning as a
					potential career, and to contribute meaningfully to their employer's
					organization and to the common good.
				</p>
			</CarouselTextSection>

			{/* Bottom Line Section */}
			<CarouselTextSection
				id="bottom-line"
				title="Bottom Line"
				images={[bottomLineImage]}
				carouselSide="right"
				imageAltPrefix="bottom line"
				variant="dark"
			>
				<p>
					The essential purpose of all of Via's structures is to create an
					environment that helps young people to respond more zealously to the
					call to sanctity. No amount of programming can force the soul's free
					response to this calling, but we believe Via's structures allow our
					participants and those we serve to discover the profound joy of the
					life of a disciple.
				</p>
			</CarouselTextSection>

			{/* Footer */}
			<footer className="border-t border-gray-200 bg-white py-8">
				<div className="mx-auto max-w-7xl px-4 text-center">
					<p className="text-base text-gray-600">
						Via Nova is an independent 501(c)(3) organization. All donations are
						tax-deductible by law.
					</p>
				</div>
			</footer>
		</div>
	)
}
