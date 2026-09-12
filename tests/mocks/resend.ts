import { faker } from '@faker-js/faker'
import { HttpResponse, http, type HttpHandler } from 'msw'
import { requireHeader, writeEmail } from './utils.ts'

const { json } = HttpResponse

export const handlers: Array<HttpHandler> = [
	http.post(`https://api.resend.com/emails`, async ({ request }) => {
		requireHeader(request.headers, 'Authorization')
		const body = await request.json()
		// Match Via's verified Resend domain instead of accepting any sender.
		if (
			!body ||
			typeof body !== 'object' ||
			!('from' in body) ||
			body.from !== 'hello@mail.studyworkpray.org'
		) {
			return json(
				{
					name: 'validation_error',
					message: 'The sender domain is not verified.',
					statusCode: 403,
				},
				{ status: 403 },
			)
		}
		console.info('🔶 mocked email contents:', body)

		const email = await writeEmail(body)

		return json({
			id: faker.string.uuid(),
			from: email.from,
			to: email.to,
			created_at: new Date().toISOString(),
		})
	}),
]
