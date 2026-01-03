import { forwardRef, type ReactNode } from 'react'

interface FullWidthSectionProps {
	children: ReactNode
	/**
	 * Maximum width of the content container
	 * @default "max-w-7xl"
	 */
	maxWidth?: string
	/**
	 * Background color class
	 * @default "bg-white"
	 */
	background?: string
	/**
	 * Padding classes
	 * @default "py-12 md:py-16"
	 */
	padding?: string
	/**
	 * Additional className for the section element
	 */
	className?: string
}

/**
 * A generic full-width section component that provides consistent styling.
 * Can accept a ref for scroll-triggered animations.
 */
export const FullWidthSection = forwardRef<HTMLElement, FullWidthSectionProps>(
	function FullWidthSection(
		{
			children,
			maxWidth = 'max-w-via-content',
			background = 'bg-via-surface',
			padding = 'py-section-md md:py-section-lg',
			className = '',
		},
		ref,
	) {
		return (
			<section
				ref={ref}
				className={`${background} ${padding} ${className}`.trim()}
			>
				<div className={`mx-auto ${maxWidth} px-content-x`}>{children}</div>
			</section>
		)
	},
)
