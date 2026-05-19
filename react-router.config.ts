import { type Config } from '@react-router/dev/config'
import { sentryOnBuildEnd } from '@sentry/react-router'

const MODE = process.env.NODE_ENV

export default {
	// Defaults to true. Set to false to enable SPA for all routes.
	ssr: true,

	routeDiscovery: { mode: 'initial' },

	future: {
		// Keep disabled for pnpm: React Router's generated optimizeDeps.include
		// can include transitive packages that are not resolvable from the project root.
		unstable_optimizeDeps: false,
	},

	buildEnd: async ({ viteConfig, reactRouterConfig, buildManifest }) => {
		if (MODE === 'production' && process.env.SENTRY_AUTH_TOKEN) {
			await sentryOnBuildEnd({
				viteConfig,
				reactRouterConfig,
				buildManifest,
			})
		}
	},
} satisfies Config
