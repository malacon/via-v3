/**
 * @vitest-environment node
 */
import { createElement } from 'react'
import { expect, test } from 'vitest'
import { sendEmail } from './email.server.ts'

test('sends contact-style React emails from the verified Resend subdomain', async () => {
	const result = await sendEmail({
		to: 'luke@studyworkpray.org',
		subject: 'Contact form regression test',
		react: createElement(
			'p',
			null,
			'A prospective applicant is getting in touch.',
		),
	})

	expect(result.status).toBe('success')
})

test('keeps the verified sender even if runtime options contain a different from', async () => {
	const options = {
		to: 'recipient@example.com',
		subject: 'Sender regression test',
		html: '<p>Test</p>',
		text: 'Test',
		from: 'visitor@example.com',
	}

	expect((await sendEmail(options)).status).toBe('success')
})
