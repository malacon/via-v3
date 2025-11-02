import HeroCarousel from '#app/components/HeroCarousel.tsx'
import { type Route } from './+types/hero-carousel-demo.ts'

export const meta: Route.MetaFunction = () => [
	{ title: 'Hero Carousel Demo | Via Nova' },
	{
		name: 'description',
		content:
			'Auto-advancing hero carousel with fade and right-side gradient panel',
	},
]

const slides = [
	{
		src: '/img/hero-1.jpg',
		heading: 'Form and Function',
		subheading: 'A clean, accessible hero that tells your story.',
		alt: 'Via Nova community gathering',
	},
	{
		src: '/img/hero-2.jpg',
		heading: 'Fast & Elegant',
		subheading: 'Cross-fade transitions powered by Framer Motion.',
		alt: 'Via Nova event',
	},
	{
		src: '/img/hero-3.jpg',
		heading: 'Readable by Design',
		subheading: 'Right panel darkens with a smooth gradient.',
		alt: 'Via Nova community',
	},
	{
		src: '/img/hero-4.jpg',
		heading: 'Auto-Advancing',
		subheading: 'Pauses when tab is hidden, respects reduced motion.',
		alt: 'Hayes and Fellows in seminar',
	},
	{
		src: '/img/hero-5.jpg',
		heading: 'Fully Accessible',
		subheading: 'Screen reader friendly with live regions and ARIA labels.',
		alt: 'Fellows in seminar at Clear Creek lodge',
	},
]

export default function HeroCarouselDemo() {
	return (
		<main className="min-h-screen bg-neutral-900 text-white">
			<HeroCarousel
				slides={slides}
				intervalMs={6000}
				heightClass="h-[85vh]"
			/>

			<section className="prose prose-invert mx-auto max-w-3xl px-6 py-24">
				<h2>Below the Hero</h2>
				<p>
					Add your page content here to verify the full-width layout and how the
					hero transitions into the rest of the page. The carousel auto-advances
					without any navigation controls.
				</p>
				<div className="h-[120vh]" />
			</section>
		</main>
	)
}

