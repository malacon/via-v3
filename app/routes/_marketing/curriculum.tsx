import { motion } from 'framer-motion'
import { type Route } from './+types/curriculum.ts'

export const meta: Route.MetaFunction = () => [
	{ title: 'Curriculum | Via Nova' },
]

const sectionVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
}

const dividerVariants = {
	hidden: { width: 0 },
	visible: { width: '100%' },
}

const listItemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
}

interface AnimatedListItemProps {
	children: React.ReactNode
	index: number
	className?: string
}

function AnimatedListItem({
	children,
	index,
	className = '',
}: AnimatedListItemProps) {
	return (
		<motion.li
			className={className}
			variants={listItemVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, margin: '-100px' }}
			transition={{ duration: 0.6, delay: index * 0.05 }}
		>
			{children}
		</motion.li>
	)
}

export default function Curriculum() {
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
					Core Curriculum
				</motion.h1>
				<motion.div
					className="mb-8 h-px bg-gray-900"
					variants={dividerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.2 }}
				/>
			</div>

			<main className="min-w-[980px] px-4 pb-16" style={{ margin: '0 auto' }}>
				<div className="ml-auto w-[702px]">
					{/* Section I */}
					<motion.section
						className="mb-12"
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.6 }}
					>
						<motion.h2
							className="mb-4 text-xl font-bold"
							variants={sectionVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-100px' }}
							transition={{ duration: 0.6 }}
						>
							I. Introduction to Dialectic
						</motion.h2>
						<ul className="space-y-2 text-base">
							<AnimatedListItem index={0}>
								A. Plato, <em>Republic</em>
							</AnimatedListItem>
						</ul>
						<motion.div
							className="my-8 h-px bg-gray-900"
							variants={dividerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.2 }}
						/>
					</motion.section>

					{/* Section II */}
					<motion.section
						className="mb-12"
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.6 }}
					>
						<motion.h2
							className="mb-4 text-xl font-bold"
							variants={sectionVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-100px' }}
							transition={{ duration: 0.6 }}
						>
							II. Origin: Myths and Revelation
						</motion.h2>
						<ul className="space-y-2 text-base">
							<AnimatedListItem index={0}>
								A. Selections from <em>Emma Fish</em>
							</AnimatedListItem>
							<AnimatedListItem index={1}>
								B. <em>Epic of Gilgamesh</em>
							</AnimatedListItem>
							<AnimatedListItem index={2}>
								C. Genesis, books 1-50 (all)
							</AnimatedListItem>
						</ul>
						<motion.div
							className="my-8 h-px bg-gray-900"
							variants={dividerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.2 }}
						/>
					</motion.section>

					{/* Section III */}
					<motion.section
						className="mb-12"
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.6 }}
					>
						<motion.h2
							className="mb-4 text-xl font-bold"
							variants={sectionVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-100px' }}
							transition={{ duration: 0.6 }}
						>
							III. Revelation: The Chosen People
						</motion.h2>
						<div className="grid grid-cols-1 gap-4 text-base md:grid-cols-2">
							<ul className="space-y-2">
								<AnimatedListItem index={0}>
									A. Exodus, books 1-40 (all)
								</AnimatedListItem>
								<AnimatedListItem index={1}>
									B. Job, books 1-2, 38-42
								</AnimatedListItem>
								<AnimatedListItem index={2}>
									C. Psalms, selections
								</AnimatedListItem>
							</ul>
							<ul className="space-y-2">
								<AnimatedListItem index={3}>
									D. Ecclesiastes, 1-12 (all)
								</AnimatedListItem>
								<AnimatedListItem index={4}>
									E. Isaiah, selections
								</AnimatedListItem>
								<AnimatedListItem index={5}>
									F. Maccabees, selections
								</AnimatedListItem>
							</ul>
						</div>
						<motion.div
							className="my-8 h-px bg-gray-900"
							variants={dividerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.2 }}
						/>
					</motion.section>

					{/* Section IV */}
					<motion.section
						className="mb-12"
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.6 }}
					>
						<motion.h2
							className="mb-4 text-xl font-bold"
							variants={sectionVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-100px' }}
							transition={{ duration: 0.6 }}
						>
							IV. Natural Reason from poetry to science
						</motion.h2>
						<ul className="space-y-3 text-base">
							<AnimatedListItem index={0}>
								A. Homer, <em>Iliad</em>, book 1, and selections
							</AnimatedListItem>
							<AnimatedListItem index={1}>
								B. Homer, <em>Odyssey</em>, complete
							</AnimatedListItem>
							<AnimatedListItem index={2}>
								C. Plato,
								<ul className="mt-2 ml-8 space-y-1">
									<AnimatedListItem index={0}>
										a. Euthyphro, 9c - 11b (Authority and Persuasion in Morals)
									</AnimatedListItem>
									<AnimatedListItem index={1}>
										b. Apology, selections (Standing by Truth, and its
										Consequences)
									</AnimatedListItem>
									<AnimatedListItem index={2}>
										c. Phaedo, 96a - 97e (Causation: natural philosophy and
										reductionism)
									</AnimatedListItem>
								</ul>
							</AnimatedListItem>
							<AnimatedListItem index={3}>
								D. Aristotle,
								<ul className="mt-2 ml-8 space-y-1">
									<AnimatedListItem index={0}>
										a. <em>Physics</em>, 1.1, 2.3 (Causation: four causes)
									</AnimatedListItem>
									<AnimatedListItem index={1}>
										b. <em>Nicomachean Ethics</em>, Book 1, selections from 2-7,
										Books 8-10 (The Good Life)
									</AnimatedListItem>
									<AnimatedListItem index={2}>
										c. <em>Politics</em>, Book 1, chps. 1-2, selections from
										book 2-6, book VII chp 1-3, selections from the remainder
										(The Good City)
									</AnimatedListItem>
									<AnimatedListItem index={3}>
										d. <em>Metaphysics</em>, selections (Knowing and Being)
									</AnimatedListItem>
								</ul>
							</AnimatedListItem>
						</ul>
						<motion.div
							className="my-8 h-px bg-gray-900"
							variants={dividerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.2 }}
						/>
					</motion.section>

					{/* Section V */}
					<motion.section
						className="mb-12"
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.6 }}
					>
						<motion.h2
							className="mb-4 text-xl font-bold"
							variants={sectionVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-100px' }}
							transition={{ duration: 0.6 }}
						>
							V. Natural Reason and Government of the Earthly City or the
							Pursuit of Happiness
						</motion.h2>
						<ul className="space-y-2 text-base">
							<AnimatedListItem index={0}>
								A. Plutarch, <em>Parallel Lives</em>, selections from Alexander,
								and Numa Pompilius
							</AnimatedListItem>
							<AnimatedListItem index={1}>
								B. Virgil, <em>Aeneid</em>, books 1-4
							</AnimatedListItem>
							<AnimatedListItem index={2}>
								C. Cicero, Hortensius, selections
							</AnimatedListItem>
						</ul>
						<motion.div
							className="my-8 h-px bg-gray-900"
							variants={dividerVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.2 }}
						/>
					</motion.section>

					{/* Section VI */}
					<motion.section
						className="mb-12"
						variants={sectionVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: '-100px' }}
						transition={{ duration: 0.6 }}
					>
						<motion.h2
							className="mb-4 text-xl font-bold"
							variants={sectionVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: '-100px' }}
							transition={{ duration: 0.6 }}
						>
							VI. Natural Reason and Government of the Earthly City or the
							Pursuit of Happiness
						</motion.h2>
						<ul className="space-y-4 text-base">
							<AnimatedListItem index={0}>
								A. The Gospel according to St. John, complete
							</AnimatedListItem>
							<AnimatedListItem index={1}>
								B. Church Fathers, selections (willis, 1966)
								<ul className="mt-2 ml-8 space-y-4">
									<AnimatedListItem index={0}>
										1. On Sacred Tradition and its Authority
										<ul className="mt-1 ml-6 space-y-1">
											<AnimatedListItem index={0}>
												a. Irenaeus, 199
											</AnimatedListItem>
											<AnimatedListItem index={1}>
												b. Basil, 203
											</AnimatedListItem>
											<AnimatedListItem index={2}>
												c. Vincent of Lerin, 207
											</AnimatedListItem>
										</ul>
									</AnimatedListItem>
									<AnimatedListItem index={1}>
										2. God
										<ul className="mt-1 ml-6 space-y-1">
											<AnimatedListItem index={0}>
												a. Irenaeus, 218, 219
											</AnimatedListItem>
											<AnimatedListItem index={1}>
												b. Clement of Alexandria, 221
											</AnimatedListItem>
											<AnimatedListItem index={2}>
												c. Basil, 226
											</AnimatedListItem>
											<AnimatedListItem index={3}>
												d. Theophilus, 230
											</AnimatedListItem>
											<AnimatedListItem index={4}>
												e. Athanasius, 235
											</AnimatedListItem>
											<AnimatedListItem index={5}>
												f. Hilary, 251
											</AnimatedListItem>
											<AnimatedListItem index={6}>
												g. Augustine, 256
											</AnimatedListItem>
											<AnimatedListItem index={7}>
												h. Ambrose, 274
											</AnimatedListItem>
											<AnimatedListItem index={8}>
												i. Augustine, 282
											</AnimatedListItem>
											<AnimatedListItem index={9}>
												j. Clement of Alexandria, 290
											</AnimatedListItem>
											<AnimatedListItem index={10}>
												k. Tertullian, 330, 331
											</AnimatedListItem>
										</ul>
									</AnimatedListItem>
									<AnimatedListItem index={2}>
										3. Creation
										<ul className="mt-1 ml-6 space-y-1">
											<AnimatedListItem index={0}>
												a. Athanasius, 444
											</AnimatedListItem>
											<AnimatedListItem index={1}>
												b. Theophilus of Antioch, 447
											</AnimatedListItem>
											<AnimatedListItem index={2}>
												c. Irenaeus, 448, 207
											</AnimatedListItem>
										</ul>
									</AnimatedListItem>
								</ul>
							</AnimatedListItem>
							<AnimatedListItem index={2}>
								C. Final Synthesis
								<ul className="mt-2 ml-8 space-y-3">
									<AnimatedListItem index={0}>
										1. St. Augustine, <em>City of God</em>, books 5, 8, 12, 17,
										18
									</AnimatedListItem>
									<AnimatedListItem index={1}>
										2. St. Thomas Aquinas, <em>Summa Theologica</em>, 1.13.11 (I
										am that I am)
									</AnimatedListItem>
									<AnimatedListItem index={2}>
										3. St. Anslem, <em>Proslogion</em>, 2 and 3
									</AnimatedListItem>
									<AnimatedListItem index={3}>
										4. Sin
										<ul className="mt-1 ml-6 space-y-1">
											<AnimatedListItem index={0}>a. Leo, 496</AnimatedListItem>
											<AnimatedListItem index={1}>
												b. Athanasius, 508
											</AnimatedListItem>
											<AnimatedListItem index={2}>
												c. Cyprian, 499, 523
											</AnimatedListItem>
										</ul>
									</AnimatedListItem>
									<AnimatedListItem index={4}>
										5. Incarnation
										<ul className="mt-1 ml-6 space-y-1">
											<AnimatedListItem index={0}>
												a. Martyrdom of St. Ignatius, 673
											</AnimatedListItem>
											<AnimatedListItem index={1}>
												b. Athanasius, 692, 701
											</AnimatedListItem>
											<AnimatedListItem index={2}>
												c. Ambrose, 698
											</AnimatedListItem>
											<AnimatedListItem index={3}>
												d. Leo, 699, 700, 738
											</AnimatedListItem>
											<AnimatedListItem index={4}>
												e. Vincent of Lerin, 705, 706
											</AnimatedListItem>
											<AnimatedListItem index={5}>
												f. St. John of Damascus, 716
											</AnimatedListItem>
										</ul>
									</AnimatedListItem>
									<AnimatedListItem index={5}>
										6. New Sacrifices (Lifting the curse)
										<ul className="mt-1 ml-6 space-y-1">
											<AnimatedListItem index={0}>
												a. Justin Martyr, 772
											</AnimatedListItem>
											<AnimatedListItem index={1}>
												b. Ambrose, 769, 865
											</AnimatedListItem>
											<AnimatedListItem index={2}>
												c. John Chrysostom, 864, 903
											</AnimatedListItem>
											<AnimatedListItem index={3}>
												d. Augustine, 866, 867
											</AnimatedListItem>
											<AnimatedListItem index={4}>
												e. Cyprian, 870, 894
											</AnimatedListItem>
											<AnimatedListItem index={5}>
												f. Hilary, 871
											</AnimatedListItem>
											<AnimatedListItem index={6}>
												g. Basil, 872
											</AnimatedListItem>
											<AnimatedListItem index={7}>
												h. Ignatius, 876
											</AnimatedListItem>
											<AnimatedListItem index={8}>
												i. Gregory, 904
											</AnimatedListItem>
										</ul>
									</AnimatedListItem>
								</ul>
							</AnimatedListItem>
						</ul>
					</motion.section>
				</div>
			</main>
		</div>
	)
}
