import HeroParallax from '#app/components/HeroParallax.tsx'
import { type Route } from './+types/parallax-demo.ts'

export const meta: Route.MetaFunction = () => [
	{ title: 'Parallax Demo | Via Nova' },
	{ name: 'description', content: 'Fixed-background parallax hero demo' },
]

export default function ParallaxDemoRoute() {
	return (
		<main className="min-h-screen">
			<HeroParallax
				imageSrc="/img/life-in-via-hero.jpg"
				heading="Stunning Backdrop"
				subheading="Scroll to see the background subtly lag behind the page"
				heightClass="h-screen"
			/>

			{/* Tall content to enable scrolling */}
			<section className="mx-auto max-w-3xl px-6 py-24">
				<h2 className="mb-6 font-serif text-4xl font-bold text-gray-900">
					Content Section
				</h2>
				<div className="space-y-4 text-lg leading-relaxed text-gray-700">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						potenti. Proin id ex vitae nisl fermentum finibus. Pellentesque
						habitant morbi tristique senectus et netus et malesuada fames ac
						turpis egestas. Sed vel efficitur nisi, id vulputate leo. Integer
						convallis, lorem vitae tempor posuere, nisl nunc commodo dui, sed
						interdum eros massa at nunc.
					</p>
					<p>
						Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
						posuere cubilia curae; Mauris consectetur, arcu eget vestibulum
						aliquet, lacus leo venenatis velit, id tincidunt sapien ante sed
						metus. Nulla facilisi. Donec eget risus euismod, tincidunt leo a,
						lacinia sem.
					</p>
					<p>
						Phasellus ut leo at metus consectetur ultrices. Vivamus euismod
						faucibus eros, ut porta quam tincidunt id. Quisque et sapien
						pharetra, convallis magna ut, consequat ante. Curabitur eu ipsum
						vitae metus gravida consectetur.
					</p>
					<p>
						Aliquam erat volutpat. Integer nec velit ut nisl consequat
						vestibulum. Sed non nunc a leo blandit volutpat. Nam euismod, nisi
						sed efficitur tincidunt, est justo volutpat quam, vel hendrerit
						magna purus vel lorem.
					</p>
					<p>
						Suspendisse potenti. Sed at eros efficitur, vehicula mauris a,
						feugiat metus. Nulla facilisi. Donec at mauris eu erat tincidunt
						aliquam. Sed ut lacus vel magna mattis tincidunt. In hac habitasse
						platea dictumst.
					</p>
				</div>

				{/* Spacer to enable scrolling */}
				<div className="h-[200vh]" />
			</section>
		</main>
	)
}

