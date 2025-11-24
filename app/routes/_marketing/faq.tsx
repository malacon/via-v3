import { motion } from 'framer-motion'
import { Img } from 'openimg/react'
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

			return sentences.map((sentence, sentenceIndex) => {
				// Last sentence should have padding-bottom: 8
				const isLastSentence = sentenceIndex === sentences.length - 1
				const className = isLastSentence ? 'pb-8 md:pb-0' : 'pb-0'
				return (
					<motion.div
						key={sentenceIndex}
						className={`text-lg leading-relaxed text-black md:pl-4 md:text-base ${className}`}
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
				)
			})
		}

		// For JSX content, return as-is but wrapped
		return (
			<motion.div
				className="pb-8 text-lg leading-relaxed text-black md:pb-0 md:pl-4 md:text-base"
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
		<div className="mb-8 space-y-4 md:mb-4">
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
					className="my-4 border-t border-black pt-0"
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
		question: 'Who is Via for?',
		answer:
			'Via has something for everyone who wants to get involved, however, our primary purpose is to create an environment for a select group of hungry young adults who desire a deeper and more holistic educative experience before beginning or finishing a college degree or setting out on a career.',
	},
	{
		question: 'What are the ages of participants in Via?',
		answer:
			'Fellows applying to the 2025-2026 cohort should be between ages 18 and 22 by August of 2025.',
	},
	{
		question: 'Is Via co-ed?',
		answer:
			"Via has both a men's cohort and a women's cohort. Each cohort has their own house but the cohorts come together for most of Via's events.",
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
		question: 'How do I apply to Via?',
		answer: (
			<>
				The first step in Via's application process is requesting an
				application. Use the{' '}
				<Link to="/contact" className="underline hover:text-black">
					contact page here
				</Link>{' '}
				to share a bit about yourself and we'll take it from there.
			</>
		),
	},
	{
		question: 'When is the deadline to apply?',
		answer: (
			<>
				Via operates on a rolling admissions timeline. If a student is remotely
				interested in enrolling in Via, we recommend reaching out using the{' '}
				<Link to="/contact" className="underline hover:text-black">
					contact page here
				</Link>{' '}
				to request an application. Via's application process is designed to help
				applicants understand what Via has to offer on a deeper level, and to
				discern if Via is a good fit.
			</>
		),
	},
	{
		question: 'Does Via have a come and see or an open house?',
		answer: (
			<>
				Via doesn't have a specific day or weekend for interested Fellows to
				visit, but we welcome visitors starting in September. If you would like
				to visit, please reach out to{' '}
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
		question: 'How much does Via cost?',
		answer:
			"Via does not charge tuition. We believe that the experience of Via is so important that financial barriers should be removed as much as possible to allow students to participate in Via with minimal or no financial stress. The Fellows' only expenses are the normal personal expenses they have, in addition to their rent ($350/month if a Fellow is sharing a room, which most do). Fellows' food expenses are offset by several communal meals each week and the ability to meal prep.",
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
		question: 'What are the fruits of doing Via?',
		answer: (
			<div className="space-y-4 text-black">
				<p>
					Some of the more tangible fruits of formation in Via can be seen in
					the career plans of Fellows before doing Via and after doing Via.
				</p>
				<p>
					Rachel came into Via thinking she should study art at a university
					(but her top scholarship opportunity was at a university that taught
					only modern and secular art, neither of which she was particularly
					excited about) and left Via with a concrete plan for private training
					with a sacred artist who is now teaching her skills much more suited
					to her interests and with a training plan that will cost less money
					and take less time.
				</p>
				<p>
					Collin came into Via deadset on completing his nursing program in New
					Orleans and left Via with an unexpectedly generous scholarship to the
					Catholic University of America to study biology and philosophy and
					pursue medical school.
				</p>
				<p>
					It's not necessarily the case that these particular Fellows' new plans
					are better than their old plans, but the fact that their plans
					drastically changed throughout their time in Via shows that there were
					desires and opportunities that if not for Via would have likely gone
					unrealized. At the same time, our students sometimes leave Via with
					the same essential career plans that they came into Via with, but
					always with a greater confidence and a deeper understanding of how
					best to pursue those same future plans.
				</p>
				<p>
					That being said, the fruits of Via that we care the most about are
					those which we cannot fully observe nor engineer. Our primary hope for
					our participants is that our students finish Via zealous to live the
					life of a Christian disciple, in all its diverse forms. However, it is
					ultimately up to the Fellow to apply himself to the structures of Via
					in order to receive all that it has to offer--when this happens he can
					count on enjoying the extraordinary fruits normally received from Via.
				</p>
			</div>
		),
	},
] as const

export default function FAQ() {
	return (
		<div className="bg-white">
			{/* Full width top bar */}
			<div className="bg-brand-light-grey-blue h-[67px] w-full md:h-[119px]" />
			<div className="container3">
				<div
					className="px-4 pt-16 pb-4 md:min-w-[1200px] md:px-20"
					style={{ margin: '0 auto' }}
				>
					<motion.h1
						className="mb-6 font-serif text-5xl font-normal text-black md:text-6xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						Frequently Asked Questions
					</motion.h1>
					<motion.div
						className="mb-8 h-px w-full bg-black"
						variants={dividerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						transition={{ duration: 0.8, delay: 0.2 }}
					/>
				</div>

				<main className="ml-auto max-w-[940px] px-4 pb-16 md:px-20">
					<div>
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
			{/* Bottom Image */}
			<div className="relative h-[400px] w-full overflow-hidden md:h-[500px]">
				<Img
					src="/img/faq-books-glasses.jpg"
					alt="Books and glasses"
					width={1920}
					height={1080}
					fit="cover"
					className="h-full w-full object-cover"
				/>
			</div>
		</div>
	)
}
