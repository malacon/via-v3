import { CarouselTextSection } from '#app/components/carousel-text-section.tsx'
import HeroParallax from '#app/components/HeroParallax.tsx'
import { type Route } from './+types/life-in-via.ts'

export const meta: Route.MetaFunction = () => [
	{ title: 'Life In Via | Via Nova' },
]

// Image arrays for galleries
const intellectualImages = [
	'/img/intellectual-1.jpg',
	'/img/intellectual-2.jpg',
	'/img/intellectual-3.jpg',
]

const spiritualImages = [
	'/img/spiritual-1.jpg',
	'/img/spiritual-2.jpg',
	'/img/spiritual-3.jpg',
]

const serviceImages = [
	'/img/service-1.jpg',
	'/img/service-2.jpg',
	'/img/service-3.jpg',
]

const bottomLineImages = [
	'/img/bottomline-1.jpg',
	'/img/bottomline-2.jpg',
	'/img/bottomline-3.jpg',
]

export default function LifeInVia() {
	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId)
		if (element) {
			// Get the sticky nav element to calculate its height
			const stickyNav = document.querySelector('.sticky-nav')
			const navHeight = stickyNav ? stickyNav.getBoundingClientRect().height : 0
			const navTop = window.matchMedia('(min-width: 768px)').matches ? 64 : 73 // md:top-16 = 64px, top-[73px] = 73px
			const offset = navTop + navHeight + 20 // Add 20px padding

			const elementPosition =
				element.getBoundingClientRect().top + window.scrollY
			const offsetPosition = elementPosition - offset

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			})
		}
	}

	return (
		<div className="relative bg-white">
			{/* Hero Section */}
			<section className="relative z-10 bg-white py-12">
				<div className="mx-auto max-w-7xl px-4 text-center">
					<p className="mb-4 font-serif text-xl text-gray-700">
						study &nbsp;| &nbsp;work | &nbsp;pray
					</p>
					<h1 className="mb-6 font-serif text-5xl font-normal text-black md:text-[56px]">
						Life in Via
					</h1>
					<p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
						Below you can find the essential features of life in Via. <br />
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
			<nav className="sticky-nav sticky top-[73px] z-20 bg-[#364153] py-4 md:top-[105px]">
				<div className="max-w-8xl mx-auto px-4">
					<div className="flex flex-wrap items-center justify-center gap-4 md:gap-10">
						<button
							onClick={() => scrollToSection('intellectual-formation')}
							className="text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white transition-colors hover:text-gray-300"
						>
							Intellectual Formation
						</button>
						<button
							onClick={() => scrollToSection('spiritual-formation')}
							className="text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white transition-colors hover:text-gray-300"
						>
							Spiritual Formation
						</button>
						<button
							onClick={() => scrollToSection('external-support')}
							className="text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white transition-colors hover:text-gray-300"
						>
							External Support
						</button>
						<button
							onClick={() => scrollToSection('internal-support')}
							className="text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white transition-colors hover:text-gray-300"
						>
							Internal Support
						</button>
						<button
							onClick={() => scrollToSection('professional-formation')}
							className="text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white transition-colors hover:text-gray-300"
						>
							Professional Formation
						</button>
						<button
							onClick={() => scrollToSection('service-community')}
							className="text-center font-serif text-[18px] leading-[1.9em] font-normal tracking-[0.05em] text-white transition-colors hover:text-gray-300"
						>
							Service
						</button>
					</div>
				</div>
			</nav>

			{/* Intellectual Formation Section */}
			<CarouselTextSection
				id="intellectual-formation"
				title="Intellectual Formation"
				images={intellectualImages}
				carouselSide="left"
				imageAltPrefix="intellectual formation"
			>
				<p>
					Via Fellows study the ancient philosophical and spiritual tradition of
					the West under the tutelage of the best local instructors. Via's core
					curriculum consists of several seminars each week split into the
					following six sequences:
				</p>
				<div className="grid grid-cols-2 gap-2">
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
				images={spiritualImages}
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
				images={serviceImages}
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
				images={['/img/internal-support.jpg']}
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
				images={bottomLineImages}
				carouselSide="right"
				imageAltPrefix="bottom line"
				variant="dark"
			>
				<p>
					The essential purpose of all of Via's structures is to create an
					environment that helps young people to respond more zealously to the
					call to sanctity. No amount of programming can force the soul's free
					response to this calling, but we believe the features of life in Via
					allow our participants and those we serve to see more clearly the
					goodness and joy of the life of a disciple.
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
