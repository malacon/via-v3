import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { type Route } from './+types/faq.ts'

export const meta: Route.MetaFunction = () => [{ title: 'FAQ | Via Nova' }]

interface FAQItemProps {
	question: string
	answer: string | React.ReactNode
	isLast?: boolean
	index?: number
}

const faqVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
}

const dividerVariants = {
	hidden: { width: 0 },
	visible: { width: '100%' },
}

function FAQItem({
	question,
	answer,
	isLast = false,
	index = 0,
}: FAQItemProps) {
	// Helper function to parse text content into sentences
	const parseAnswerIntoSentences = (
		content: React.ReactNode,
	): React.ReactNode => {
		if (typeof content === 'string') {
			// Split by sentence endings (period, exclamation, question mark followed by space or end of string)
			const sentences = content
				.split(/(?<=[.!?])\s+/)
				.filter((sentence) => sentence.trim())
				.map((sentence) => sentence.trim())

			return sentences.map((sentence, sentenceIndex) => (
				<motion.div
					key={sentenceIndex}
					className="text-base leading-relaxed text-black"
					variants={faqVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-100px' }}
					transition={{
						duration: 0.6,
						delay: index * 0.1 + sentenceIndex * 0.05,
					}}
				>
					{sentence}
				</motion.div>
			))
		}

		// For JSX content, return as-is but wrapped
		return (
			<motion.div
				className="text-base leading-relaxed text-black"
				variants={faqVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6, delay: index * 0.1 }}
			>
				{answer}
			</motion.div>
		)
	}

	return (
		<div className="space-y-4">
			<motion.h3
				className="text-lg font-bold text-black"
				variants={faqVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: '-100px' }}
				transition={{ duration: 0.6, delay: index * 0.1 }}
			>
				{question}
			</motion.h3>
			{parseAnswerIntoSentences(answer)}
			{!isLast && (
				<motion.div
					className="border-t border-black pt-8"
					variants={dividerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}
				/>
			)}
		</div>
	)
}

const faqData = [
	{
		question: 'What are the ages of participants in Via?',
		answer:
			'Fellows applying to the 2025-2026 cohort should be between ages 18 and 22 by August of 2025.',
	},
	{
		question: 'Is Via co-ed?',
		answer:
			"Via has both a men's cohort and a women's cohort. Each cohort has their own house but the cohorts come together for most of the week's events.",
	},
	{
		question: 'Where is Via located?',
		answer:
			"Via's houses are in the heart of Cajun country: Lafayette, Louisiana.",
	},
	{
		question: 'What do Via Fellows study?',
		answer: (
			<>
				This{' '}
				<Link to="/curriculum" className="underline hover:text-black">
					link
				</Link>{' '}
				will allow you to view the syllabus for Via's core curriculum. Fellows
				have the opportunity to participate in other courses in addition to the
				core curriculum throughout the year as well. The content of these
				supplemental courses vary year by year. This fall 2025, the additional
				courses feature Dostoevsky, Virgil, Augustine, the idea of logos, and
				political theology.
			</>
		),
	},
	{
		question: 'How much does it cost?',
		answer: (
			<>
				Via does not charge tuition. We believe that the experience of Via is so
				important that financial barriers should be removed as much as possible
				to allow students to participate in Via with minimal to no financial
				stress. The experience of Via is a gift from the lay faithful of the
				Church aimed at equipping the future of the Church for a life of
				self-gift in turn. The Fellows' only expenses are the normal personal
				expenses they have, in addition to their rent ($350/month if a Fellow is
				sharing a room, which most do). Fellows' food expenses are also offset
				by several communal meals each week and the meal prep option. The meal
				prep option refers to the option each Fellow has to prepare meals for
				throughout the week each weekend using specific funds from a donation
				pool.
			</>
		),
	},
	{
		question: 'How does Via pay for all of this?',
		answer: (
			<>
				Via has been generously supported by the lay faithful. The Fellows'
				annual fundraising (a minimum of $7,000 per Fellow) covers about one
				third of Via's annual expenses. The remaining expenses are covered by a
				wide array of generous Catholics who support Via directly. We aim to
				keep Via free because we believe formation in Via is worth it.
				Additionally, Via's most important features don't cost much money. The
				most critical ingredients to making Via work are: young people hungry
				for a full life, some great books, and a team of good people willing to
				lend their talents and energy towards our mission. Most of the team that
				makes Via's formative experience happen, do so pro bono. It takes a
				village to do what we do, and in Louisiana we are blessed with an
				incredible village willing to make major sacrifices for non-earthly
				wages. In sum, Via is paid for by generous donations of the lay faithful
				and thanks to a slew of zealous people working for cheap or free.
			</>
		),
	},
	{
		question: 'Does Via have a come and see or an open house?',
		answer: (
			<>
				Via doesn't have a day or weekend for interested Fellows to visit, but
				we welcome visitors from September through March. If you would like to
				visit, please reach out to{' '}
				<a
					href="mailto:admissions@studyworkpray.org"
					className="underline hover:text-black"
				>
					admissions@studyworkpray.org
				</a>
				.
			</>
		),
	},
	{
		question: 'What does life after Via look like?',
		answer: (
			<div className="space-y-4 text-black">
				<p>
					Some of the more tangible fruits of formation in Via can be seen in
					the career plans of Fellows before doing Via and after doing Via.
					Rachel came into Via thinking she should study art at a university
					(but her top scholarship opportunity was at a university that taught
					only modern and secular art, neither of which she was particularly
					excited about) and left Via with a concrete plan for private training
					with a sacred artist who is now teaching her skills much more suited
					to her interests and with a training plan that will cost less money
					and take less time. Collin came into Via deadset on completing his
					nursing program in New Orleans and left Via with an unexpectedly
					generous scholarship to the Catholic University of America to study
					biology and philosophy and pursue medical school. It's not necessarily
					the case that these particular Fellows' new plans are better than
					their old plans, but the fact that their plans drastically changed
					throughout their time in Via shows what there were desires and
					opportunities that if not for Via would have been unrealized.
				</p>
				<p>
					This being said, the fruits of Via that we care the most about are
					those which we cannot precisely observe nor quantify, and certainly
					not engineer. In a word, we hope that life after Via looks like
					zealous Christian discipleship in all its shapes and flavors, but it
					is up to the Fellow to apply himself to the structures of Via in order
					to get all he can out of it--when this happens he can count on
					enjoying the fruits normally received from Via, namely greater clarity
					about their future and a deepened eagerness to pursue new goals.
					Sometimes, our students have the same essential career plans that they
					came into Via with, but with an invigorated spirit and a deeper
					understanding of how best to pursue their goals.
				</p>
			</div>
		),
	},
] as const

export default function FAQ() {
	return (
		<div className="bg-white">
			{/* Full width top bar */}
			<div
				className="h-[119px] w-full"
				style={{ backgroundColor: 'rgb(103, 116, 137)' }}
			/>
			<div className="min-w-[980px] px-4 pt-16" style={{ margin: '0 auto' }}>
				<motion.h1
					className="mb-6 font-serif text-5xl font-normal text-black md:text-6xl"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					Frequently Asked Questions
				</motion.h1>
				<motion.div
					className="mb-8 h-px bg-black"
					variants={dividerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}
				/>
			</div>

			<main className="min-w-[980px] px-4 pb-16" style={{ margin: '0 auto' }}>
				<div className="ml-auto w-[702px]">
					<div className="space-y-8">
						{faqData.map((faq, index) => (
							<FAQItem
								key={index}
								question={faq.question}
								answer={faq.answer}
								isLast={index === faqData.length - 1}
								index={index}
							/>
						))}
					</div>
				</div>
			</main>
		</div>
	)
}
