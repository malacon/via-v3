import { data, type LoaderFunctionArgs } from 'react-router'
import { prisma } from '#app/utils/db.server.ts'

export async function loader(_args: LoaderFunctionArgs) {
	let db: 'ok' | 'timeout-or-error' | 'skipped' = 'skipped'

	const ping = (async () => {
		try {
			await prisma.$queryRaw`SELECT 1`
			db = 'ok'
		} catch {
			db = 'timeout-or-error'
		}
	})()

	const softTimeout = new Promise<void>((resolve) => setTimeout(resolve, 300))

	await Promise.race([ping, softTimeout])

	return data({ status: 'ok', db })
}
