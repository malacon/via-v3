import { Img } from 'openimg/react'
import { type Route } from './+types/via.ts'

export const meta: Route.MetaFunction = () => [{ title: 'Via Nova' }]

export default function Via() {
	return (
		<div className="bg-white">
			{/* Header/Navigation Bar */}
			<header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
					<a href="/" className="flex items-center gap-3">
						<img
							src="/img/via-logo-cropped.png"
							alt="Via Nova logo"
							className="w-auto"
							width="324"
							height="81"
						/>
					</a>
					<nav className="font-navigation hidden items-center gap-8 text-base tracking-wider text-gray-700 md:flex">
						<a
							href="#"
							className="transition-colors hover:text-[color:var(--color-brand-primary-hover)] hover:underline"
						>
							Life In VIA
						</a>
						<a
							href="#"
							className="transition-colors hover:text-[color:var(--color-brand-primary-hover)] hover:underline"
						>
							Why VIA?
						</a>
						<a
							href="#"
							className="transition-colors hover:text-[color:var(--color-brand-primary-hover)] hover:underline"
						>
							Curriculum
						</a>
						<a
							href="#"
							className="transition-colors hover:text-[color:var(--color-brand-primary-hover)] hover:underline"
						>
							FAQ
						</a>
						<a
							href="#"
							className="transition-colors hover:text-[color:var(--color-brand-primary-hover)] hover:underline"
						>
							Our Team
						</a>
						<a
							href="#"
							className="transition-colors hover:text-[color:var(--color-brand-primary-hover)] hover:underline"
						>
							Contact
						</a>
						<a
							href="https://vianova.stellarwebsystems.com/donations/pool/79bdb7d4-264e-11ee-9cac-16118fddfe69"
							target="_blank"
							rel="noreferrer noopener"
							className="transition-colors hover:text-[color:var(--color-brand-primary-hover)] hover:underline"
						>
							GIVE
						</a>
					</nav>
					<button className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-[color:var(--color-brand-primary)] focus:outline-none md:hidden">
						<span className="sr-only">Open menu</span>
						<svg className="h-6 w-6" fill="none" stroke="currentColor">
							<path d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>
			</header>

			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gray-900">
				<div className="absolute inset-0 h-full w-full">
					<Img
						src="/2aa532_8cf969a8c37f4d958ef55d4053dcf93f~mv2.jpg"
						alt=""
						width={1920}
						height={1080}
						fit="cover"
						className="h-full w-full object-cover opacity-40"
					/>
					<div className="absolute inset-0 bg-black/50" />
				</div>
				<div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 lg:py-36">
					<div className="space-y-6 text-center text-white">
						<h1 className="font-serif text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
							Via Nova offers a live-in experience of holistic intellectual,
							professional, and spiritual formation for Catholics ages 18-22.
						</h1>
						<p className="mx-auto max-w-3xl font-sans text-lg leading-relaxed text-gray-100">
							Through a life of study, work, and prayer, we offer participants a
							via nova, that is "a new way" of learning and living, such that
							our students may be better equipped for a life of freedom,
							mission, and holiness.
						</p>
					</div>
				</div>
			</section>

			{/* Intro / Philosophy */}
			<section className="bg-gray-50 py-16">
				<div className="mx-auto w-full max-w-[996px] space-y-6 px-4 text-gray-700">
					<p className="font-serif text-lg">
						Our students experience an integrated life aimed at freeing their
						minds from the world's illusions and realizing the invitation to
						fulfill our Lord's summons to know, love, and serve Him.
					</p>
					<p className="font-serif text-lg">
						We believe that such an experience is enormously beneficial… Via
						exists because we believe everyone would be profoundly well-served
						by one year of extraordinary formation before launching into the
						real world.
					</p>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="bg-white py-16">
				<div className="mx-auto w-full max-w-[996px] px-4">
					<div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
						<figure className="flex flex-col items-center">
							<blockquote className="mb-4 font-serif text-base text-gray-700 italic">
								"The greatest failure of the Church after the Second Vatican
								Council is the formation of lay people... I applaud Via for
								taking up this work."
							</blockquote>
							<figcaption className="font-sans font-bold text-gray-800">
								Archbishop Hughes · Thomistic Institute
							</figcaption>
						</figure>
						<figure className="flex flex-col items-center">
							<blockquote className="mb-4 font-serif text-base text-gray-700 italic">
								"Testimonials provide a sense of what it's like to work with
								you... Lorem ipsum dolor sit amet, consectetur adipiscing."
							</blockquote>
							<figcaption className="font-sans font-bold text-gray-800">
								Abbot Anderson · Clear Creek Abbey
							</figcaption>
						</figure>
						<figure className="flex flex-col items-center">
							<blockquote className="mb-4 font-serif text-base text-gray-700 italic">
								"Testimonials provide a sense of what it's like to work with
								you... Lorem ipsum dolor sit amet, consectetur adipiscing elit."
							</blockquote>
							<figcaption className="font-sans font-bold text-gray-800">
								Father Pine · Thomistic Institute
							</figcaption>
						</figure>
						<figure className="flex flex-col items-center">
							<blockquote className="mb-4 font-serif text-base text-gray-700 italic">
								"Testimonials provide a sense of what it's like to work with
								you... Lorem ipsum dolor sit amet, consectetur adipiscing."
							</blockquote>
							<figcaption className="font-sans font-bold text-gray-800">
								Name Here · Thomistic Institute
							</figcaption>
						</figure>
					</div>
				</div>
			</section>

			{/* Profile of a VIA Fellow - Dark Background */}
			<section className="bg-gray-800 py-20">
				<div className="mx-auto max-w-6xl gap-12 px-4 py-16 lg:grid lg:grid-cols-2 lg:items-center">
					<div className="space-y-6 text-white lg:pr-8">
						<h2 className="font-sans text-3xl font-bold">
							Profile of a VIA Fellow
						</h2>
						<p className="font-serif text-base">
							This life of study, work, and prayer aims to provide participants
							with a simple but very full life, experienced in a community of
							people who desire largely the same things, namely:
						</p>
						<ul className="space-y-4 pl-6 font-serif text-base marker:list-disc marker:text-white">
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
					<div className="mt-8 space-y-4 lg:mt-0">
						<Img
							src="/2aa532_35186cef25b7464681e8b861bd860489~mv2.jpg"
							alt=""
							width={800}
							height={600}
							fit="cover"
							className="h-auto w-full rounded-md object-cover shadow-lg"
						/>
						<Img
							src="/2aa532_ccc37c52482344ca92b601281b26157e~mv2.jpeg"
							alt=""
							width={800}
							height={600}
							fit="cover"
							className="h-auto w-full rounded-md object-cover shadow-lg"
						/>
					</div>
				</div>
			</section>

			{/* Fellow Newsletters Section */}
			<section className="bg-white py-16">
				<div className="mx-auto w-full max-w-[996px] px-4">
					<h2 className="mb-6 text-center font-sans text-3xl font-bold text-gray-800">
						Fellow Newsletters
					</h2>
					<p className="mb-12 text-center font-serif text-lg text-gray-700">
						Every semester, fellows create newsletters to detail their
						experience and communicate with friends and family.
					</p>
					<div className="grid gap-6 sm:grid-cols-3">
						{/* Newsletter cards */}
						<div className="text-center">
							<Img
								src="/2aa532_8c2404f747e24465b2853f617ce5fbb8~mv2.jpg"
								alt=""
								width={400}
								height={600}
								fit="cover"
								className="mb-4 rounded-md object-cover shadow-md"
							/>
							<h3 className="mb-2 font-bold text-gray-800">
								SPRING NEWSLETTER
							</h3>
							<p className="mb-2 text-sm text-gray-600 italic">
								Dear friends and family,
							</p>
							<p className="text-sm text-gray-700">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit...
							</p>
						</div>
						<div className="text-center">
							<Img
								src="/2aa532_8c2404f747e24465b2853f617ce5fbb8~mv2.jpg"
								alt=""
								width={400}
								height={600}
								fit="cover"
								className="mb-4 rounded-md object-cover shadow-md"
							/>
							<h3 className="mb-2 font-bold text-gray-800">
								SPRING NEWSLETTER
							</h3>
							<p className="mb-2 text-sm text-gray-600 italic">
								Dear friends and family,
							</p>
							<p className="text-sm text-gray-700">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit...
							</p>
						</div>
						<div className="text-center">
							<Img
								src="/2aa532_8c2404f747e24465b2853f617ce5fbb8~mv2.jpg"
								alt=""
								width={400}
								height={600}
								fit="cover"
								className="mb-4 rounded-md object-cover shadow-md"
							/>
							<h3 className="mb-2 font-bold text-gray-800">
								SPRING NEWSLETTER
							</h3>
							<p className="mb-2 text-sm text-gray-600 italic">
								Dear friends and family,
							</p>
							<p className="text-sm text-gray-700">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit...
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Learn more about Via Section */}
			<section className="bg-gray-800 py-12">
				<div className="mx-auto max-w-4xl px-4 text-center">
					<p className="font-serif text-lg text-white">
						Learn more about Via from testimonies of people who have experienced
						it firsthand.
					</p>
				</div>
			</section>

			{/* Donate / Footer */}
			<footer className="border-t border-gray-200 bg-white py-16">
				<div className="mx-auto max-w-5xl space-y-8 px-4 text-center">
					<h2 className="font-sans text-3xl font-semibold tracking-wider text-gray-800">
						Keep VIA Free
					</h2>
					<p className="mx-auto max-w-2xl font-serif text-lg leading-relaxed text-gray-700">
						Help us keep Via free by making a gift today.
					</p>
					<a
						href="https://vianova.stellarwebsystems.com/donations/pool/79bdb7d4-264e-11ee-9cac-16118fddfe69"
						target="_blank"
						rel="noreferrer noopener"
						className="font-base py-`5 inline-block rounded-full bg-[#364153] px-10 font-serif tracking-wider text-white opacity-50 transition-all ease-linear hover:bg-[#32415842] hover:text-black hover:opacity-100"
					>
						Give Now
					</a>
					<div className="space-y-2">
						<p className="font-serif text-sm text-gray-600">
							Checks can be mailed to 300 Cleveland St., Lafayette, LA 70501
						</p>
						<p className="font-serif text-sm text-gray-600">
							Via Nova is an independent 501(c)(3) organization. All donations
							are tax-deductible by law.
						</p>
					</div>
				</div>
			</footer>
		</div>
	)
}
