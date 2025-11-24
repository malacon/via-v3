import HeroParallax from '#app/components/HeroParallax.tsx'
import { TestimonialSection } from '#app/components/testimonial-section.tsx'
import { type Route } from './+types/why-via.ts'

export const meta: Route.MetaFunction = () => [{ title: 'Why Via? | Via Nova' }]

export default function WhyVia() {
	return (
		<div className="bg-white">
			{/* Hero Section with Subtitle and Title */}
			<section className="relative z-10 bg-white py-12">
				<div className="mx-auto max-w-7xl px-4">
					<div className="text-center">
						<div className="flex flex-col-reverse md:flex-col">
							<p className="mb-8 font-serif text-xl text-gray-700 md:mb-4">
								freedom &nbsp;| &nbsp;mission &nbsp;| &nbsp;holiness
							</p>
							<h1 className="mb-4 font-serif text-5xl font-normal text-black md:mb-8 md:text-6xl">
								Why Via?
							</h1>
						</div>
						<div className="mx-auto max-w-4xl space-y-6 text-base leading-relaxed text-gray-700 md:text-lg">
							<p>
								A lot of people ask us why they should do Via, or why Via
								exists. We think this question can best be answered by those who
								have participated in our way of life. Below are a few Fellows'
								articulation of Via's purpose and merit.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Full-Width Banner Image */}
			<HeroParallax
				imageSrc="/img/why-via-hero.jpg"
				heightClass="h-[429px]"
				overlayClass="bg-gradient-to-t from-black/15 via-black/10 to-black/15"
			/>

			{/* Collin Stephenson Testimonial */}
			<TestimonialSection
				id="testimonials"
				name="Collin | Fellow, 2024 Cohort"
				firstImagePosition="left"
				images={[
					{
						src: '/img/testimonial-collin.jpg',
						alt: 'Collin Stephenson on mountain peak',
						width: 321,
						height: 445,
					},
				]}
				textSections={[
					<>
						<p>
							My single year with Via changed my life in dramatic ways. First
							and foremost, it increased my desire to have an intentional faith
							life&mdash;one that is disciplined, and with greater dedication to
							daily prayer.
						</p>
						<p>
							John Henry Newman said, "When you gain new knowledge from
							experiences, you have a shift in your moral center." While I was
							in Via and immersed in a variety of rich experiences, my natural
							moral impulses and intentions became better aligned with right
							reason and what is Good. This in turn brought unexpected color to
							my life, and led me to desire a life that is ordered chiefly
							towards the love of God.
						</p>
						<p>
							Via’s education and structured way of life resulted in what I can
							only describe as a monumental and transformative year for which
							I’m most grateful. Throughout the highs felt throughout the year
							there were also many challenges, but those challenges were the
							very means by which I was able to grow. Our day-to-day
							life&mdash;especially living in community&mdash;provided abundant
							opportunities to grow in virtue and to submit to God's will.
						</p>
					</>,
				]}
			/>

			{/* Ellen LeBlanc Testimonial */}
			<TestimonialSection
				name="Ellen | Fellow, 2024 Cohort"
				firstImagePosition="right"
				images={[
					{
						src: '/img/ellen.jpg',
						alt: 'Ellen and Rachel in front of mountain',
						width: 800,
						height: 600,
					},
					{
						src: '/img/testimonial-ellen-2.jpg',
						alt: 'Isaac and Anthony with guitars',
						width: 426,
						height: 325,
					},
				]}
				textSections={[
					<>
						<p>
							One of the main reasons I did Via was for the intellectual
							formation. I recognized the blessings of my classical education in
							high school, and I felt that such formation shouldn't end so
							early. I also wanted to be deeply challenged, and while I did
							experience intense academic challenges during my senior year of
							high school, I knew there was still more out there and I thought
							Via would be able to provide what I was looking for. Looking back
							on my year, Via either met my expectations or completely surpassed
							them.
						</p>
						<p>
							The studies in Via are a major feature of the life, though not all
							of it. Via's intellectual formation is not just about acquiring
							knowledge; it's about awakening wonder, cultivating wisdom, and
							seeking truth. We did not merely study ideas; we entered into a
							centuries-old conversation about what it means to live well, to be
							human, and to seek the good. Even though some of Via's curriculum
							consisted of works I had already studied in high school, I found
							that exploring these texts alongside the Fellows and with the
							assistance of our tutors was a once-in-a-lifetime experience.
							Seminars at Via teach us not only how to ask meaningful questions,
							discern falsehoods, and seek truth with humility, but also how to
							see how the texts we read speak to the soul and shape our journey
							toward sanctity. I found all of our readings to be constantly
							sharpening my capacity for reason and better equipping me to enter
							into the world not as a passive observer, but as an intentional,
							discerning follower of Christ.
						</p>
					</>,
					<>
						<p>
							Life in Via was demanding, as I had anticipated, but never to the
							point of misery. I was pleasantly surprised at how fulfilling and
							joyful things felt most of the time. Every difficult aspect was
							very clearly directed toward some good, and surrounded by people
							pursuing the same good things. Every part of me was challenged in
							Via: how I organized my days and used my time, as well as how I
							navigated and grew in my interior life.
						</p>
						<p>
							I think of Via as a kind of universal good, and I believe everyone
							could benefit from an experience like it. Not everyone is in a
							position to participate, but I don't see it as something that's
							only for a certain type of person who would particularly like it.
							To me, everyone should pursue something like Via insofar as
							everyone should strive to become more fully human and better
							formed by the best resources our tradition has to offer.
						</p>
					</>,
				]}
			/>

			{/* Isaac LeJeune Testimonial */}
			<TestimonialSection
				name="Isaac | Fellow, 2023 Cohort"
				firstImagePosition="right"
				images={[
					{
						src: '/img/testimonial-isaac-1.jpg',
						alt: 'Isaac and Anthony with guitars',
						width: 465,
						height: 312,
						containerWidth: 'w-full max-w-md md:max-w-lg',
					},
					{
						src: '/img/testimonial-isaac-2.jpg',
						alt: 'Isaac LeJeune with guitar',
						width: 351,
						height: 208,
						containerWidth: 'w-full max-w-2xs md:max-w-sm',
					},
				]}
				textSections={[
					<>
						<p>
							There are a lot of ways someone can expect to grow in Via. I found
							that what we did in Via helped me to love my faith and love
							learning about my faith in a significantly deeper way than I ever
							had before, which in turn fueled in me a new desire to share the
							faith with others. I experienced a similar growth from my
							intellectual life. As I was learning how best to live (whether it
							in our readings of Aristotle or sacred scripture), I developed
							greater discipline and intentionality in my daily habits.
						</p>
						<p>
							I believe the structures of prayer in Via were a major catalyst
							for all the growth the other Fellows and I experienced. Countless
							unspeakable graces come from being with our Lord, and Via's prayer
							regimen is very conducive to receiving such graces. In the way
							that a seedling grows from continuous careful nourishment,
							although one may not know exactly how or when the growth happens,
							so it is with prayer. I did not find there to be especially grand
							moments in prayer throughout my time in Via–though sometimes that
							may happen–rather the growth happened slowly and organically. As
							the year went on, I experienced a great deal of peace, a clearer
							view of reality, and greater intimacy with our Lord and His
							Church. My love for the Mass, the Sacrament of Penance, and my
							desire to follow our Lord's will tremendously increased while in
							Via, and it was definitely due in large part to the structured
							prayer time built into Via's schedule.
						</p>
					</>,
					<>
						<p>
							Via was an extremely fruitful experience for me. The saints attest
							to the fact that a vital component of growing in the spiritual
							life is consistency, and Via's way of life, being as full as it
							is, constantly called me to keep showing up even when I didn't
							feel like it and place my life in the Lord's hands. This process
							was enormously fruitful for my relationship with God and I
							continue to pull from it during my seminary formation today.
						</p>
					</>,
				]}
			/>

			{/* Sam LeBlanc Testimonial */}
			<TestimonialSection
				name="Sam | Fellow, 2023 Cohort"
				firstImagePosition="right"
				images={[
					{
						src: '/img/testimonial-sam.jpg',
						alt: 'Sam LeBlanc in kitchen',
						width: 337,
						height: 435,
						containerWidth: '',
						containerClassName: 'mask-shape-square',
						className:
							'mask-image-applied h-[435px] w-[337px] scale-x-[-1] overflow-hidden object-cover [object-position:var(--object-position)] [filter:var(--filter-effect-svg-url)]',
					},
				]}
				textSections={[
					<>
						<p>
							Via was the most fulfilling nine months I've ever had, and the
							fastest nine months of my life. Some of the experiences, like the
							presentations and the pilgrimages, brought me out of my comfort
							zone in a big way and taught me things about the world and myself
							I couldn't have learned otherwise.
						</p>
						<p>
							However, the most important thing Via taught me was that we are on
							this fundamentally earth to know, to love and to serve Jesus
							Christ. As much as I was told this in the past, I needed to learn
							this experientially. Features of life in Via, such as the fact
							that we were going to wake up and pray (no matter what happened
							the night before and no matter what opportunity might be occurring
							the next morning) and that we will close each day in prayer (no
							matter how late it is or how busy we are) taught me that a rich
							prayer life is not merely recommended or highly advised but
							essential for my relationship with God in a deeper way than
							anything I could have been told.
						</p>
						<p>
							My experience in Via showed me that forming habits of holiness and
							discipline is not only attainable, but also necessary to live a
							happy, well-ordered life, oriented to God and seeking His will.
						</p>
					</>,
				]}
			/>

			{/* Footer */}
			<footer className="border-t border-gray-200 bg-white py-6">
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
