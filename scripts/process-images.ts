import sharp from 'sharp'
import { readdir, copyFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname, extname, basename } from 'path'

const SOURCE_DIR = '/Users/cbaker/Downloads/FOR CRAIG 2025 WEB UPDATE'
const DEST_DIR = '/Users/cbaker/code/@other/via-v3/public/img'

// Image processing configurations
const IMAGE_CONFIGS = {
	hero: { maxWidth: 1920, maxHeight: 1080, quality: 85 },
	gallery: { maxWidth: 1200, maxHeight: 1600, quality: 85 },
	profile: { maxWidth: 800, maxHeight: 1000, quality: 85 },
	default: { maxWidth: 1200, maxHeight: 1600, quality: 85 },
}

// Image mapping: source path → destination filename → config type
const IMAGE_MAP: Array<{
	source: string
	dest: string
	config: keyof typeof IMAGE_CONFIGS
	flip?: boolean
}> = [
	// Homepage Hero Carousel (3 images only)
	{
		source: '_EventsDances/IMG_3998.jpeg',
		dest: 'hero-dancing.jpg',
		config: 'hero',
	},
	{
		source:
			'_1_CURRENTLY IN WEBSITE WIREFRAME/HomePage/HOMEPAGE TOP BAR/VIA-30.HayesAndFellowsSmilingSeminar.JPG',
		dest: 'hero-teaching.jpg',
		config: 'hero',
	},
	// Max/Lili sitting outside - need to locate and flip
	{
		source: '_GroupPhotos/IMG_8720.JPG',
		dest: 'hero-sitting-outside.jpg',
		config: 'hero',
		flip: true,
	},
	// Mountain pic for new section
	{
		source: '_TRIPS/IMG_8678.HEIC',
		dest: 'mountain-isaac-anthony.jpg',
		config: 'hero',
	},
	// Profile Gallery additions
	{
		source: '_MardiGras/LundiGrasBeggingCroppedLiliana.jpg',
		dest: 'profile-liliana-broom.jpg',
		config: 'profile',
	},
	{
		source: '_TRIPS/FellowsOnHorses.jpg',
		dest: 'profile-fellows-horses.jpg',
		config: 'gallery',
	},
	{
		source: '_PrayerPics/IMG_5245 2.JPG',
		dest: 'profile-girls-flowers.jpg',
		config: 'profile',
	},
	{
		source: '_PrayerPics/IMG_3342.jpg',
		dest: 'profile-rachel-praying.jpg',
		config: 'profile',
	},
	// Life in Via - Service & Community
	{
		source: '_MardiGras/LundiGrasRunningStreet.jpg',
		dest: 'service-lundi-gras.jpg',
		config: 'gallery',
	},
	// Life in Via - Internal Support
	{
		source: '_GroupPhotos/StagedCheckInMusicRoom.JPG',
		dest: 'internal-support-music-room.jpg',
		config: 'gallery',
	},
	// Life in Via - External Support
	{
		source: '_STUDY/IMG_9653.jpeg',
		dest: 'external-support-alt.jpg',
		config: 'gallery',
	},
	// Life in Via - Retreats & Pilgrimages
	{
		source: '_TRIPS/FellowsOnHorses.jpg',
		dest: 'retreats-pilgrimages.jpg',
		config: 'gallery',
	},
	// Why Via - Ellen testimonial
	{
		source: '_HEADshots/ACB6FD78-89FD-4AE8-AA4C-17D394B313D9.JPEG',
		dest: 'testimonial-ellen-rachel-mountain.jpg',
		config: 'gallery',
	},
	// FAQ - Books and glasses
	{
		source: '_B_ROLL/VIA-15=BooksAndGlasses.jpg',
		dest: 'faq-books-glasses.jpg',
		config: 'gallery',
	},
	// Life in Via - Study, Work, Prayer section
	{
		source: 'VIA-12-Seminar-LUandFellows.jpg',
		dest: 'life-in-via-study.jpg',
		config: 'gallery',
	},
	{
		source: 'VIA-21-AnnAyrisseWritingInSeminarNextToAnthony.jpg',
		dest: 'life-in-via-study-alt.jpg',
		config: 'gallery',
	},
	// Prayer image (Anthony and AnnAyrisse)
	{
		source:
			'_1_CURRENTLY IN WEBSITE WIREFRAME/LifeInVia PAGE/Intellectual Formation/Copy of VIA-21-AnnAyrisseWritingInSeminarNextToAnthony.jpg',
		dest: 'life-in-via-prayer.jpg',
		config: 'gallery',
	},
]

async function ensureDir(dir: string) {
	if (!existsSync(dir)) {
		await mkdir(dir, { recursive: true })
	}
}

async function processImage(
	sourcePath: string,
	destPath: string,
	config: keyof typeof IMAGE_CONFIGS,
	flip = false,
): Promise<void> {
	const fullSourcePath = join(SOURCE_DIR, sourcePath)
	const fullDestPath = join(DEST_DIR, destPath)

	if (!existsSync(fullSourcePath)) {
		console.warn(`Source file not found: ${fullSourcePath}`)
		return
	}

	const imageConfig = IMAGE_CONFIGS[config]
	let pipeline = sharp(fullSourcePath)

	// Apply flip if needed
	if (flip) {
		pipeline = pipeline.flip()
	}

	// Resize and optimize
	await pipeline
		.resize(imageConfig.maxWidth, imageConfig.maxHeight, {
			fit: 'inside',
			withoutEnlargement: true,
		})
		.jpeg({ quality: imageConfig.quality, mozjpeg: true })
		.toFile(fullDestPath)

	console.log(`Processed: ${sourcePath} → ${destPath}`)
}

async function main() {
	await ensureDir(DEST_DIR)

	console.log('Starting image processing...')
	console.log(`Source: ${SOURCE_DIR}`)
	console.log(`Destination: ${DEST_DIR}\n`)

	for (const mapping of IMAGE_MAP) {
		try {
			await processImage(
				mapping.source,
				mapping.dest,
				mapping.config,
				mapping.flip,
			)
		} catch (error) {
			console.error(
				`Error processing ${mapping.source}:`,
				error instanceof Error ? error.message : error,
			)
		}
	}

	console.log('\nImage processing complete!')
}

main().catch(console.error)
