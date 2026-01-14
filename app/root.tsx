import { AnimatePresence, animate, motion } from 'framer-motion'
import { OpenImgContextProvider } from 'openimg/react'
import { useEffect, useRef, useState } from 'react'
import {
	data,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useLocation,
	useMatches,
} from 'react-router'
import { HoneypotProvider } from 'remix-utils/honeypot/react'
import { type Route } from './+types/root.ts'
import appleTouchIconAssetUrl from './assets/favicons/apple-touch-icon.png'
import faviconAssetUrl from './assets/favicons/favicon.svg'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import { EpicProgress } from './components/progress-bar.tsx'
import { SearchBar } from './components/search-bar.tsx'
import { useToast } from './components/toaster.tsx'
import { Button } from './components/ui/button.tsx'
import { Icon, href as iconsHref } from './components/ui/icon.tsx'
import { EpicToaster } from './components/ui/sonner.tsx'
import { UserDropdown } from './components/user-dropdown.tsx'
import {
	ThemeSwitch,
	useOptionalTheme,
	useTheme,
} from './routes/resources/theme-switch.tsx'
import tailwindStyleSheetUrl from './styles/tailwind.css?url'
import { getUserId, logout } from './utils/auth.server.ts'
import { ClientHintCheck, getHints } from './utils/client-hints.tsx'
import { prisma } from './utils/db.server.ts'
import { getEnv } from './utils/env.server.ts'
import { pipeHeaders } from './utils/headers.server.ts'
import { honeypot } from './utils/honeypot.server.ts'
import { combineHeaders, getDomainUrl, getImgSrc } from './utils/misc.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import { type Theme, getTheme } from './utils/theme.server.ts'
import { makeTimings, time } from './utils/timing.server.ts'
import { getToast } from './utils/toast.server.ts'
import { useOptionalUser } from './utils/user.ts'

export const links: Route.LinksFunction = () => {
	return [
		// Preload svg sprite as a resource to avoid render blocking
		{ rel: 'preload', href: iconsHref, as: 'image' },
		{
			rel: 'icon',
			href: '/favicon.ico',
			sizes: '48x48',
		},
		{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
		{ rel: 'apple-touch-icon', href: appleTouchIconAssetUrl },
		{
			rel: 'manifest',
			href: '/site.webmanifest',
			crossOrigin: 'use-credentials',
		} as const, // necessary to make typescript happy
		{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
	].filter(Boolean)
}

export const meta: Route.MetaFunction = ({ data }) => {
	return [
		{ title: data ? 'Epic Notes' : 'Error | Epic Notes' },
		{ name: 'description', content: `Your own captain's log` },
	]
}

export async function loader({ request }: Route.LoaderArgs) {
	const timings = makeTimings('root loader')
	const userId = await time(() => getUserId(request), {
		timings,
		type: 'getUserId',
		desc: 'getUserId in root',
	})

	const user = userId
		? await time(
				() =>
					prisma.user.findUnique({
						select: {
							id: true,
							name: true,
							username: true,
							image: { select: { objectKey: true } },
							roles: {
								select: {
									name: true,
									permissions: {
										select: { entity: true, action: true, access: true },
									},
								},
							},
						},
						where: { id: userId },
					}),
				{ timings, type: 'find user', desc: 'find user in root' },
			)
		: null
	if (userId && !user) {
		console.info('something weird happened')
		// something weird happened... The user is authenticated but we can't find
		// them in the database. Maybe they were deleted? Let's log them out.
		await logout({ request, redirectTo: '/' })
	}
	const { toast, headers: toastHeaders } = await getToast(request)
	const honeyProps = await honeypot.getInputProps()

	return data(
		{
			user,
			requestInfo: {
				hints: getHints(request),
				origin: getDomainUrl(request),
				path: new URL(request.url).pathname,
				userPrefs: {
					theme: getTheme(request),
				},
			},
			ENV: getEnv(),
			toast,
			honeyProps,
		},
		{
			headers: combineHeaders(
				{ 'Server-Timing': timings.toString() },
				toastHeaders,
			),
		},
	)
}

export const headers: Route.HeadersFunction = pipeHeaders

function Document({
	children,
	nonce,
	env = {},
}: {
	children: React.ReactNode
	nonce: string
	theme?: Theme
	env?: Record<string, string | undefined>
}) {
	const allowIndexing = env.ALLOW_INDEXING !== 'false'
	return (
		<html lang="en" className={`light h-full overflow-x-hidden`}>
			<head suppressHydrationWarning>
				<ClientHintCheck nonce={nonce} />
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				{allowIndexing ? null : (
					<meta name="robots" content="noindex, nofollow" />
				)}
				<Links />
			</head>
			<body className="bg-background text-foreground">
				{children}
				<script
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(env)}`,
					}}
				/>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
			</body>
		</html>
	)
}

export function Layout({ children }: { children: React.ReactNode }) {
	// if there was an error running the loader, data could be missing
	const data = useLoaderData<typeof loader | null>()
	const nonce = useNonce()
	const theme = useOptionalTheme()
	return (
		<Document nonce={nonce} theme={theme} env={data?.ENV}>
			{children}
		</Document>
	)
}

function App() {
	const data = useLoaderData<typeof loader>()
	const user = useOptionalUser()
	const theme = useTheme()
	const matches = useMatches()
	const location = useLocation()
	const isOnSearchPage = matches.find((m) => m.id === 'routes/users/index')
	const searchBar = isOnSearchPage ? null : <SearchBar status="idle" />
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [showScrollToTop, setShowScrollToTop] = useState(false)
	useToast(data.toast)

	const scrollToHashRef = useRef<string | null>(null)
	const initialPathnameRef = useRef<string | null>(null)

	// Handle smooth scrolling for anchor links
	useEffect(() => {
		const scrollToHash = (hash: string, smooth = true) => {
			const element = document.getElementById(hash.slice(1))
			if (!element) return

			const header = document.querySelector('header')
			const headerHeight = header ? header.getBoundingClientRect().height : 0
			const offset = headerHeight - 16 // Match the offset used in FullWidthBannerLink

			const elementPosition = element.getBoundingClientRect().top
			const offsetPosition = elementPosition + window.pageYOffset - offset

			if (smooth) {
				animate(window.scrollY, offsetPosition, {
					duration: 0.6,
					ease: [0.25, 0.1, 0.25, 1],
					onUpdate: (latest) => {
						window.scrollTo(0, latest)
					},
				})
			} else {
				window.scrollTo(0, offsetPosition)
			}
		}

		// Track if this is the initial page load
		const isInitialLoad = initialPathnameRef.current === null

		// Handle initial hash on page load - immediately adjust position to account for header
		if (location.hash && isInitialLoad) {
			initialPathnameRef.current = location.pathname
			scrollToHashRef.current = location.hash

			// Immediately correct the scroll position (browser may have already scrolled)
			// Use requestAnimationFrame to ensure DOM is fully rendered
			requestAnimationFrame(() => {
				scrollToHash(location.hash, false)
			})
		} else if (location.pathname !== initialPathnameRef.current) {
			// Reset when navigating to a new page
			initialPathnameRef.current = location.pathname
			if (location.hash) {
				scrollToHashRef.current = location.hash
				requestAnimationFrame(() => {
					scrollToHash(location.hash, false)
				})
			}
		}

		// Handle hash changes after initial load (back/forward navigation or clicks)
		const handleHashChange = () => {
			if (location.hash && scrollToHashRef.current !== location.hash) {
				scrollToHashRef.current = location.hash
				scrollToHash(location.hash, true)
			}
		}

		// Listen for hash changes
		window.addEventListener('hashchange', handleHashChange)

		return () => {
			window.removeEventListener('hashchange', handleHashChange)
		}
	}, [location.hash, location.pathname])

	// Handle scroll-to-top button visibility
	useEffect(() => {
		const handleScroll = () => {
			setShowScrollToTop(window.scrollY > 300)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToTop = () => {
		animate(window.scrollY, 0, {
			duration: 0.6,
			ease: [0.25, 0.1, 0.25, 1],
			onUpdate: (latest) => {
				window.scrollTo(0, latest)
			},
		})
	}

	const isActivePath = (path: string) => {
		if (path === '/') {
			return location.pathname === '/'
		}
		return location.pathname.startsWith(path)
	}

	return (
		<OpenImgContextProvider
			optimizerEndpoint="/resources/images"
			getSrc={getImgSrc}
		>
			<div className="flex min-h-screen flex-col justify-between">
				<header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
					<div className="container3 mx-auto flex items-center justify-between px-4 py-2.5 md:px-28 md:py-3 lg:px-20">
						<Link to="/" className="flex items-center gap-3">
							<img
								src="/img/via-logo-cropped.png"
								alt="Via Nova logo"
								className="h-[58px] w-auto md:h-[81px] md:w-[324px]"
								style={{ imageRendering: 'crisp-edges' }}
							/>
						</Link>
						<nav
							className="font-display hidden items-center gap-10 text-base tracking-wide lg:flex lg:tracking-wider"
							aria-label="Main navigation"
						>
							<Link
								to="/"
								className={`text-black transition-colors hover:text-[#404040] hover:underline ${
									isActivePath('/') ? 'text-[#404040] underline' : ''
								}`}
							>
								Home
							</Link>
							<Link
								to="/life-in-via"
								className={`text-black transition-colors hover:text-[#404040] hover:underline ${
									isActivePath('/life-in-via') ? 'text-[#404040] underline' : ''
								}`}
							>
								Life in Via
							</Link>
							<Link
								to="/why-via"
								className={`text-black transition-colors hover:text-[#404040] hover:underline ${
									isActivePath('/why-via') ? 'text-[#404040] underline' : ''
								}`}
							>
								Why Via?
							</Link>
							<Link
								to="/curriculum"
								className={`text-black transition-colors hover:text-[#404040] hover:underline ${
									isActivePath('/curriculum') ? 'text-[#404040] underline' : ''
								}`}
							>
								Curriculum
							</Link>
							<Link
								to="/faq"
								className={`text-black transition-colors hover:text-[#404040] hover:underline ${
									isActivePath('/faq') ? 'text-[#404040] underline' : ''
								}`}
							>
								FAQ
							</Link>
							<Link
								to="/contact"
								className={`text-black transition-colors hover:text-[#404040] hover:underline ${
									isActivePath('/contact') ? 'text-[#404040] underline' : ''
								}`}
							>
								Contact
							</Link>
							<a
								href="https://vianova.stellarwebsystems.com/donations/pool/79bdb7d4-264e-11ee-9cac-16118fddfe69"
								target="_blank"
								rel="noreferrer noopener"
								className="text-black transition-colors hover:text-[#404040] hover:underline"
							>
								GIVE
							</a>
						</nav>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="rounded-md p-2 text-gray-700 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:outline-none lg:hidden"
							aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
							aria-expanded={mobileMenuOpen}
						>
							<span className="sr-only">
								{mobileMenuOpen ? 'Close menu' : 'Open menu'}
							</span>
							<svg
								className="h-8 w-8"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<motion.path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16"
									initial={false}
									animate={{
										rotate: mobileMenuOpen ? 45 : 0,
										y: mobileMenuOpen ? 6 : 0,
										opacity: 1,
									}}
									transition={{
										duration: 0.3,
										ease: [0.4, 0, 0.2, 1],
									}}
								/>
								<motion.path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 12h16"
									initial={false}
									animate={{
										opacity: mobileMenuOpen ? 0 : 1,
										scaleX: mobileMenuOpen ? 0 : 1,
									}}
									transition={{
										duration: 0.2,
										ease: [0.4, 0, 0.2, 1],
									}}
								/>
								<motion.path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 18h16"
									initial={false}
									animate={{
										rotate: mobileMenuOpen ? -45 : 0,
										y: mobileMenuOpen ? -6 : 0,
										opacity: 1,
									}}
									transition={{
										duration: 0.3,
										ease: [0.4, 0, 0.2, 1],
									}}
								/>
							</svg>
						</button>
					</div>
					<AnimatePresence>
						{mobileMenuOpen && (
							<motion.nav
								initial={{ opacity: 0, y: -100 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -100 }}
								transition={{
									duration: 0.3,
									ease: [0.4, 0, 0.2, 1],
								}}
								className="h-full border-t border-gray-200 bg-white lg:hidden"
								aria-label="Mobile navigation"
							>
								<div className="mx-auto flex h-[100vh] flex-col items-center gap-4 px-4 py-4 text-xl">
									<Link
										to="/"
										onClick={() => setMobileMenuOpen(false)}
										className={`tracking-wider text-black transition-colors hover:text-[#404040] hover:underline ${
											isActivePath('/') ? 'text-[#404040] underline' : ''
										}`}
									>
										Home
									</Link>
									<Link
										to="/life-in-via"
										onClick={() => setMobileMenuOpen(false)}
										className={`tracking-wider text-black transition-colors hover:text-[#404040] hover:underline ${
											isActivePath('/life-in-via')
												? 'text-[#404040] underline'
												: ''
										}`}
									>
										Life in Via
									</Link>
									<Link
										to="/why-via"
										onClick={() => setMobileMenuOpen(false)}
										className={`font-display tracking-wider text-black transition-colors hover:text-[#404040] hover:underline ${
											isActivePath('/why-via') ? 'text-[#404040] underline' : ''
										}`}
									>
										Why Via?
									</Link>
									<Link
										to="/curriculum"
										onClick={() => setMobileMenuOpen(false)}
										className={`tracking-wider text-black transition-colors hover:text-[#404040] hover:underline ${
											isActivePath('/curriculum')
												? 'text-[#404040] underline'
												: ''
										}`}
									>
										Curriculum
									</Link>
									<Link
										to="/faq"
										onClick={() => setMobileMenuOpen(false)}
										className={`tracking-wider text-black transition-colors hover:text-[#404040] hover:underline ${
											isActivePath('/faq') ? 'text-[#404040] underline' : ''
										}`}
									>
										FAQ
									</Link>
									<Link
										to="/contact"
										onClick={() => setMobileMenuOpen(false)}
										className={`tracking-wider text-black transition-colors hover:text-[#404040] hover:underline ${
											isActivePath('/contact') ? 'text-[#404040] underline' : ''
										}`}
									>
										Contact
									</Link>
									<a
										href="https://vianova.stellarwebsystems.com/donations/pool/79bdb7d4-264e-11ee-9cac-16118fddfe69"
										target="_blank"
										rel="noreferrer noopener"
										onClick={() => setMobileMenuOpen(false)}
										className="tracking-wider text-black transition-colors hover:text-[#404040] hover:underline"
									>
										GIVE
									</a>
								</div>
							</motion.nav>
						)}
					</AnimatePresence>
				</header>

				<div className="flex flex-1 flex-col">
					<Outlet />
				</div>
				{/* Footer */}
				<footer className="border-t border-gray-200 bg-white py-6">
					<div className="mx-auto max-w-7xl px-4 text-center">
						<p className="text-xs text-gray-500 md:text-base md:text-gray-600">
							Via Nova is an independent 501(c)(3) organization. All donations
							are tax-deductible by law.
						</p>
					</div>
				</footer>
			</div>
			{/* Mobile Scroll to Top Button */}
			<AnimatePresence>
				{showScrollToTop && (
					<motion.button
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						onClick={scrollToTop}
						className="fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border bg-white text-black shadow-lg transition-colors hover:bg-gray-800 md:hidden"
						aria-label="Scroll to top"
					>
						<Icon name="chevron-up" className="h-12 w-12 text-black" />
					</motion.button>
				)}
			</AnimatePresence>
			<EpicToaster closeButton position="top-center" theme={theme} />
			<EpicProgress />
		</OpenImgContextProvider>
	)
}

function Logo() {
	return (
		<Link to="/" className="group grid leading-snug">
			<span className="font-light transition group-hover:-translate-x-1">
				epic
			</span>
			<span className="font-bold transition group-hover:translate-x-1">
				notes
			</span>
		</Link>
	)
}

function AppWithProviders() {
	const data = useLoaderData<typeof loader>()
	return (
		<HoneypotProvider {...data.honeyProps}>
			<App />
		</HoneypotProvider>
	)
}

export default AppWithProviders

// this is a last resort error boundary. There's not much useful information we
// can offer at this level.
export const ErrorBoundary = GeneralErrorBoundary
