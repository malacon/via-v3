import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

// Prepare these assets before release so a fresh server never has to encode
// the homepage or FAQ images while visitors are trying to apply.
const imageDirectory = new URL('../public/img/', import.meta.url)
const images = [
	['mountain-isaac-anthony-flip.jpg', 1920, 1080],
	['life-in-via-luke.png', 1920, 1080],
	['hero-dancing.jpg', 1920, 1080],
	['hero-teaching.jpg', 800, 600],
	['life-in-via-prayer.jpg', 800, 600],
	['anthony-praying.jpg', 800, 600],
	['mountain-isaac-anthony.jpg', 1920, 1080],
	['hike-group.jpg', 1920, 1080],
	['faq-books-glasses.jpg', 1920, 1080],
]

for (const [source, width, height] of images) {
	const destination = source.replace(/\.(jpg|png)$/, '.webp')
	const result = await sharp(fileURLToPath(new URL(source, imageDirectory)))
		.resize(width, height, { fit: 'cover' })
		.webp({ quality: 85 })
		.toFile(fileURLToPath(new URL(destination, imageDirectory)))
	console.log(
		`${destination}: ${result.width}x${result.height}, ${result.size} bytes`,
	)
}
