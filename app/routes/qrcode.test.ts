/**
 * @vitest-environment node
 */
import * as QRCode from 'qrcode'
import { test, expect, describe } from 'vitest'
import { loader } from './qrcode.ts'

describe('QR Code Endpoint', () => {
	test('returns PNG image with correct content-type', async () => {
		const request = new Request('http://localhost/qrcode')
		const response = await loader({
			request,
			params: {},
			context: {},
		})

		expect(response).toBeInstanceOf(Response)
		expect(response.headers.get('Content-Type')).toBe('image/png')
	})

	test('returns a valid QR code containing the application contact URL', async () => {
		const request = new Request('http://localhost/qrcode')
		const response = await loader({
			request,
			params: {},
			context: {},
		})

		const buffer = await response.arrayBuffer()
		expect(buffer.byteLength).toBeGreaterThan(0)

		// Verify the QR code contains the expected URL by generating our own
		const expectedBuffer = await QRCode.toBuffer(
			'https://via.studyworkpray.org/contact',
		)
		expect(Buffer.compare(Buffer.from(buffer), expectedBuffer)).toBe(0)
	})
})
