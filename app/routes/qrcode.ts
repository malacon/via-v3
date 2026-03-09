import { type LoaderFunctionArgs } from 'react-router'
import * as QRCode from 'qrcode'

const SITE_URL = 'https://via.studyworkpray.org/'

export async function loader(_args: LoaderFunctionArgs) {
	const buffer = await QRCode.toBuffer(SITE_URL)

	return new Response(new Uint8Array(buffer), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=3600',
		},
	})
}
