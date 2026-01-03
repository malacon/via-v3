type HeroFixedCssProps = {
	imageSrc: string
	heading?: string
	subheading?: string
	heightClass?: string // e.g., "h-[80vh]" or "h-screen"
	overlayClass?: string // e.g., "bg-black/40"
}

/**
 * Pure-CSS fallback hero component using `background-attachment: fixed`.
 *
 * Note: `background-attachment: fixed` may be unreliable on iOS Safari.
 * Prefer `HeroParallax` component for cross-platform consistency.
 *
 * @example
 * ```tsx
 * <HeroFixedCss
 *   imageSrc="/hero.jpg"
 *   heading="Fixed Background Hero"
 *   heightClass="h-screen"
 * />
 * ```
 */
export function HeroFixedCss({
	imageSrc,
	heading = 'Fixed-Background Hero',
	subheading,
	heightClass = 'h-[80vh]',
	overlayClass = 'bg-black/40',
}: HeroFixedCssProps) {
	return (
		<section
			className={`relative ${heightClass} bg-fixed bg-cover bg-center bg-no-repeat`}
			style={{ backgroundImage: `url(${imageSrc})` }}
			aria-label="CSS fixed-background hero"
		>
			<div className={`absolute inset-0 ${overlayClass}`} aria-hidden />

			<div className="relative z-10 flex h-full items-center justify-center">
				<div className="px-6 text-center text-white">
					<h1 className="text-5xl font-bold drop-shadow md:text-6xl">
						{heading}
					</h1>
					{subheading && (
						<p className="mt-4 max-w-2xl text-lg drop-shadow md:text-2xl md:leading-relaxed">
							{subheading}
						</p>
					)}
				</div>
			</div>
		</section>
	)
}

