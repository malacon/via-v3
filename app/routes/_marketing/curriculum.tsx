import { motion } from 'framer-motion'
import { type Route } from './+types/curriculum.ts'
import { Img } from 'openimg/react'

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
			<div className="bg-brand-light-grey-blue h-[67px] w-full md:h-[119px]" />
			<div className="container3">
				<div
					className="px-4 pt-16 pb-8 md:min-w-[1200px]"
					style={{ margin: '0 auto' }}
				>
					<motion.h1
						className="mb-6 font-serif text-5xl font-normal text-black md:text-6xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						Core
						<br className="md:hidden" /> Curriculum
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

				<main className="max-w-[940px] px-4 pb-16">
					<div className="text-black">
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
								className="curriculum-title mb-4 text-xl font-bold"
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
								className="my-8 h-px bg-black"
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
								className="curriculum-title mb-4 text-xl font-bold"
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
									A. <em>Enuma Elish</em>
								</AnimatedListItem>
								<AnimatedListItem index={1}>
									B. <em>Epic of Gilgamesh</em>
								</AnimatedListItem>
								<AnimatedListItem index={2}>C. Genesis</AnimatedListItem>
							</ul>
							<motion.div
								className="my-8 h-px bg-black"
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
								className="curriculum-title mb-4 text-xl font-bold"
								variants={sectionVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: '-100px' }}
								transition={{ duration: 0.6 }}
							>
								III. Revelation: the Chosen People
							</motion.h2>
							<div className="grid grid-cols-1 gap-4 text-base md:grid-cols-2">
								<ul className="space-y-2">
									<AnimatedListItem index={0}>A. Exodus</AnimatedListItem>
									<AnimatedListItem index={1}>B. Job</AnimatedListItem>
									<AnimatedListItem index={2}>C. Psalms</AnimatedListItem>
								</ul>
								<ul className="space-y-2">
									<AnimatedListItem index={3}>D. Ecclesiastes</AnimatedListItem>
									<AnimatedListItem index={4}>E. Isaiah</AnimatedListItem>
									<AnimatedListItem index={5}>F. Maccabees</AnimatedListItem>
								</ul>
							</div>
							<motion.div
								className="my-8 h-px bg-black"
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
								className="curriculum-title mb-4 text-xl font-bold"
								variants={sectionVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: '-100px' }}
								transition={{ duration: 0.6 }}
							>
								IV. Natural Reason, from Poetry to Science: Greece
							</motion.h2>
							<div className="grid grid-cols-1 gap-4 text-base md:grid-cols-2">
								<ul className="space-y-3">
									<AnimatedListItem index={0}>
										A. Homer, <em>Iliad</em>
									</AnimatedListItem>
									<AnimatedListItem index={1}>
										B. Homer, <em>Odyssey</em>
									</AnimatedListItem>
									<AnimatedListItem index={2}>
										C. Plato
										<ul className="mt-2 ml-8 space-y-1">
											<AnimatedListItem index={0}>
												1. Euthyphro
											</AnimatedListItem>
											<AnimatedListItem index={1}>2. Apology</AnimatedListItem>
											<AnimatedListItem index={2}>3. Phaedo</AnimatedListItem>
										</ul>
									</AnimatedListItem>
								</ul>
								<ul className="space-y-3">
									<AnimatedListItem index={3}>
										D. Aristotle
										<ul className="mt-2 ml-8 space-y-1">
											<AnimatedListItem index={0}>
												1. <em>Physics</em>
											</AnimatedListItem>
											<AnimatedListItem index={1}>
												2. <em>Nicomachean Ethics</em>
											</AnimatedListItem>
											<AnimatedListItem index={2}>
												3. <em>Politics</em>
											</AnimatedListItem>
											<AnimatedListItem index={3}>
												4. <em>Metaphysics</em>
											</AnimatedListItem>
										</ul>
									</AnimatedListItem>
								</ul>
							</div>
							<motion.div
								className="my-8 h-px bg-black"
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
								className="curriculum-title mb-4 text-xl font-bold"
								variants={sectionVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: '-100px' }}
								transition={{ duration: 0.6 }}
							>
								V. Government of the Earthly City and the Pursuit of Happiness: Rome
							</motion.h2>
							<ul className="space-y-2 text-base">
								<AnimatedListItem index={0}>
									A. Plutarch, <em>Parallel Lives</em>
								</AnimatedListItem>
								<AnimatedListItem index={1}>
									B. Virgil, <em>Aeneid</em>
								</AnimatedListItem>
								<AnimatedListItem index={2}>
									C. Cicero, <em>Hortensius</em>
								</AnimatedListItem>
							</ul>
							<motion.div
								className="my-8 h-px bg-black"
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
								className="curriculum-title mb-4 text-xl font-bold"
								variants={sectionVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: '-100px' }}
								transition={{ duration: 0.6 }}
							>
								VI. Revelation: the Heavenly City
							</motion.h2>
							<ul className="space-y-4 text-base">
								<AnimatedListItem index={0}>
									A. The Gospel according to St. John
								</AnimatedListItem>
								<AnimatedListItem index={1}>
									B. Church Fathers
									<div className="mt-2 ml-8 grid grid-cols-1 gap-4 md:grid-cols-2">
										<ul className="space-y-4">
											<AnimatedListItem index={0}>
												1. On Sacred Tradition and its Authority
												<ul className="mt-1 ml-6 space-y-1">
													<AnimatedListItem index={0}>
														a. Irenaeus
													</AnimatedListItem>
													<AnimatedListItem index={1}>
														b. Basil
													</AnimatedListItem>
													<AnimatedListItem index={2}>
														c. Vincent of Lerin
													</AnimatedListItem>
												</ul>
											</AnimatedListItem>
											<AnimatedListItem index={1}>
												2. Nature of God
												<ul className="mt-1 ml-6 space-y-1">
													<AnimatedListItem index={0}>
														a. Irenaeus
													</AnimatedListItem>
													<AnimatedListItem index={1}>
														b. Clement of Alex.
													</AnimatedListItem>
													<AnimatedListItem index={2}>
														c. Basil
													</AnimatedListItem>
													<AnimatedListItem index={3}>
														d. Theophilus
													</AnimatedListItem>
													<AnimatedListItem index={4}>
														e. Athanasius
													</AnimatedListItem>
													<AnimatedListItem index={5}>
														f. Hilary
													</AnimatedListItem>
													<AnimatedListItem index={6}>
														g. Augustine
													</AnimatedListItem>
													<AnimatedListItem index={7}>
														h. Ambrose
													</AnimatedListItem>
													<AnimatedListItem index={8}>
														i. Augustine
													</AnimatedListItem>
													<AnimatedListItem index={9}>
														j. Clement of Alex.
													</AnimatedListItem>
													<AnimatedListItem index={10}>
														k. Tertullian
													</AnimatedListItem>
												</ul>
											</AnimatedListItem>
											<AnimatedListItem index={2}>
												3. Origins of Creation
												<ul className="mt-1 ml-6 space-y-1">
													<AnimatedListItem index={0}>
														a. Athanasius
													</AnimatedListItem>
													<AnimatedListItem index={1}>
														b. Theophilus of Antioch
													</AnimatedListItem>
													<AnimatedListItem index={2}>
														c. Irenaeus
													</AnimatedListItem>
												</ul>
											</AnimatedListItem>
										</ul>
										<ul className="space-y-4">
											<AnimatedListItem index={3}>
												4. The Curse of Sin
												<ul className="mt-1 ml-6 space-y-1">
													<AnimatedListItem index={0}>a. Leo</AnimatedListItem>
													<AnimatedListItem index={1}>
														b. Athanasius
													</AnimatedListItem>
													<AnimatedListItem index={2}>
														c. Cyprian
													</AnimatedListItem>
												</ul>
											</AnimatedListItem>
											<AnimatedListItem index={4}>
												5. Incarnation
												<ul className="mt-1 ml-6 space-y-1">
													<AnimatedListItem index={0}>
														a. St. Ignatius' Martyrdom
													</AnimatedListItem>
													<AnimatedListItem index={1}>
														b. Athanasius
													</AnimatedListItem>
													<AnimatedListItem index={2}>
														c. Ambrose
													</AnimatedListItem>
													<AnimatedListItem index={3}>d. Leo</AnimatedListItem>
													<AnimatedListItem index={4}>
														e. Vincent of Lerin
													</AnimatedListItem>
													<AnimatedListItem index={5}>
														f. St. John of Damascus
													</AnimatedListItem>
												</ul>
											</AnimatedListItem>
											<AnimatedListItem index={5}>
												6. New Sacrifice: Lifting the Curse
												<ul className="mt-1 ml-6 space-y-1">
													<AnimatedListItem index={0}>
														a. Justin Martyr
													</AnimatedListItem>
													<AnimatedListItem index={1}>
														b. Ambrose
													</AnimatedListItem>
													<AnimatedListItem index={2}>
														c. John Chrysostom
													</AnimatedListItem>
													<AnimatedListItem index={3}>
														d. Augustine
													</AnimatedListItem>
													<AnimatedListItem index={4}>
														e. Cyprian
													</AnimatedListItem>
													<AnimatedListItem index={5}>
														f. Hilary
													</AnimatedListItem>
													<AnimatedListItem index={6}>
														g. Basil
													</AnimatedListItem>
													<AnimatedListItem index={7}>
														h. Ignatius
													</AnimatedListItem>
													<AnimatedListItem index={8}>
														i. Gregory
													</AnimatedListItem>
												</ul>
											</AnimatedListItem>
										</ul>
									</div>
								</AnimatedListItem>
								<AnimatedListItem index={2}>
									C. Final Synthesis
									<ul className="mt-2 ml-8 space-y-3">
										<AnimatedListItem index={0}>
											1. St. Augustine, <em>City of God</em>
										</AnimatedListItem>
										<AnimatedListItem index={1}>
											2. St. Thomas Aquinas, <em>Summa Theologica</em>
										</AnimatedListItem>
										<AnimatedListItem index={2}>
											3. St. Anselm, <em>Proslogion</em>
										</AnimatedListItem>
									</ul>
								</AnimatedListItem>
							</ul>
						</motion.section>
					</div>
				</main>
			</div>
			<div className="relative h-[400px] w-full overflow-hidden md:h-[500px]">
				<Img
					src="/img/nic-book.jpg"
					alt="Nicomachean Ethics Book"
					width={1920}
					height={1080}
					fit="cover"
					className="h-full w-full object-cover"
				/>
			</div>
		</div>
	)
}
