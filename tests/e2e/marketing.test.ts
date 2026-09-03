import { expect, test } from '#tests/playwright-utils.ts'

test('mobile visitors can use Apply Now to reach the contact page', async ({
	page,
}) => {
	await page.setViewportSize({ width: 390, height: 844 })
	await page.route('**/*', async (route) => {
		if (route.request().resourceType() === 'image') {
			await new Promise((resolve) => setTimeout(resolve, 30_000))
		}
		await route.continue()
	})
	await page.goto('/', { waitUntil: 'domcontentloaded' })

	const applyNow = page.getByRole('link', { name: 'Apply Now' })
	await expect(applyNow).toHaveAttribute('href', '/contact')
	await applyNow.click()
	await expect(page).toHaveURL('/contact')
	await expect(
		page.getByRole('heading', { name: 'Get in touch.' }),
	).toBeVisible()
})

test('the homepage describes Via as a year of deep formation', async ({
	page,
	navigate,
}) => {
	await navigate('/')

	await expect(
		page.getByText(
			'Via was born out of the conviction that every Catholic would be profoundly well-served by having one year of deep formation.',
			{ exact: true },
		),
	).toBeVisible()
})

test('the FAQ displays the normal-week calendar screenshot', async ({
	page,
	navigate,
}) => {
	await navigate('/faq')

	const question = page.getByRole('button', {
		name: 'What does a normal week in Via look like?',
	})
	await expect
		.poll(async () => {
			if ((await question.getAttribute('data-state')) !== 'open') {
				await question.click()
			}
			return question.getAttribute('data-state')
		})
		.toBe('open')
	const calendar = page.getByRole('img', {
		name: 'Screenshot of a normal week in Via',
	})
	await expect(calendar).toBeVisible()
	await expect
		.poll(() =>
			calendar.evaluate((element) => {
				const image = element as HTMLImageElement
				return image.complete && image.naturalWidth > 0
			}),
		)
		.toBe(true)
})

test('the header logo uses smooth high-density rendering', async ({
	page,
	navigate,
}) => {
	await navigate('/')

	const logo = page.getByRole('img', { name: 'Via Nova logo' })
	await expect(logo).toBeVisible()
	await expect(logo).not.toHaveAttribute('style', /image-rendering/)
	const rendering = await logo.evaluate((element) => {
		const image = element as HTMLImageElement
		return {
			imageRendering: window.getComputedStyle(image).imageRendering,
			density: image.naturalWidth / image.getBoundingClientRect().width,
		}
	})

	expect(rendering.imageRendering).toBe('auto')
	expect(rendering.density).toBeGreaterThanOrEqual(2)
})

test('the team carousel presents the requested people, roles, and affiliations', async ({
	page,
	navigate,
}) => {
	await navigate('/')

	const team = page.getByRole('list', { name: 'Via Nova team' })
	const members = team.getByRole('listitem')
	await expect(members).toHaveCount(11)

	const expectedOrder = [
		'Luke Ungarino',
		'Jacob Troutman',
		'John Lindsley',
		'Lorena Ebenroth',
		'Sam Pitre',
		'Dr. John Anderson',
		'Dr. Cory Hayes',
		'Jay Toups',
		'Dr. Damon Cudihy',
		'Fr. Josh Guillory',
		'Blair Piras',
	]

	for (const [index, name] of expectedOrder.entries()) {
		await expect(members.nth(index)).toContainText(name)
	}

	const expectedDetails = [
		['Luke Ungarino', 'Director'],
		['Jacob Troutman', 'Director of Finance', 'Via Nova'],
		['John Lindsley', 'Lead Tutor', 'Via Nova'],
		['Lorena Ebenroth', "Women's Cohort Leader", 'Via Nova'],
		['Sam Pitre', 'Employer', 'St. Joseph the Worker Handyman'],
		['Dr. John Anderson', 'Employer', 'OncoLogics'],
		['Dr. Cory Hayes', 'Tutor', 'John Paul the Great Academy'],
		['Jay Toups', 'Employer', 'High Performance Teams'],
		['Dr. Damon Cudihy', 'Employer', 'Acadiana OBGYN'],
		['Fr. Josh Guillory', 'Tutor', 'St. Patrick Catholic Church'],
		['Blair Piras', 'Employer', 'Blair Barlow Art'],
	]

	for (const details of expectedDetails) {
		const member = members.filter({ hasText: details[0] })
		for (const detail of details) {
			await expect(member).toContainText(detail)
		}
	}
})

test.describe('Life in Via at a Retina desktop viewport', () => {
	test.use({
		deviceScaleFactor: 2,
		viewport: { width: 1200, height: 800 },
	})

	test('keeps all content in the viewport and serves sharp section images', async ({
		page,
		navigate,
	}) => {
		const runtimeOptimizedMarketingImages: string[] = []
		page.on('request', (request) => {
			const url = new URL(request.url())
			if (
				url.pathname === '/resources/images' &&
				url.searchParams.get('src')?.startsWith('/img/')
			) {
				runtimeOptimizedMarketingImages.push(request.url())
			}
		})

		await navigate('/life-in-via')

		const pageWidths = await page.evaluate(() => ({
			client: document.documentElement.clientWidth,
			scroll: document.documentElement.scrollWidth,
		}))
		expect(pageWidths.scroll).toBeLessThanOrEqual(pageWidths.client)

		const imageAltTexts = [
			'intellectual formation 1',
			'professional formation 1',
			'spiritual formation 1',
			'service & community 1',
			'retreats and pilgrimages 1',
			'external and internal support 1',
		]

		for (const altText of imageAltTexts) {
			const image = page.getByAltText(altText)
			await image.scrollIntoViewIfNeeded()
			await expect(image).toBeVisible()
			await expect(image).toHaveAttribute('src', /^\/img\/.+\.webp$/)
			await expect
				.poll(() =>
					image.evaluate((element) => {
						const imageElement = element as HTMLImageElement
						const renderedWidth = imageElement.getBoundingClientRect().width
						return imageElement.naturalWidth / renderedWidth
					}),
				)
				.toBeGreaterThanOrEqual(1.9)
		}

		expect(runtimeOptimizedMarketingImages).toEqual([])
	})
})

test('the Why Via hero begins above the hikers instead of cropping through their faces', async ({
	page,
	navigate,
}) => {
	await page.setViewportSize({ width: 1200, height: 800 })
	await navigate('/why-via')

	const hero = page.getByRole('region', { name: 'Parallax hero' })
	await expect(hero).toBeVisible()
	const sourceYAtHeroTop = await hero.evaluate((section) => {
		const image = section.querySelector<HTMLImageElement>(
			'[data-parallax-bg] img',
		)
		if (!image) throw new Error('Desktop hero image was not rendered')

		const sectionRect = section.getBoundingClientRect()
		const imageRect = image.getBoundingClientRect()
		const scale = Math.max(
			imageRect.width / image.naturalWidth,
			imageRect.height / image.naturalHeight,
		)
		const renderedHeight = image.naturalHeight * scale
		const renderedImageTop =
			imageRect.top + (imageRect.height - renderedHeight) / 2

		return (sectionRect.top - renderedImageTop) / scale
	})

	// The hikers' heads begin around source y=700. Keep the top of the crop
	// comfortably above them so every face is visible in the banner.
	expect(sourceYAtHeroTop).toBeLessThan(650)
})

test('FAQ hover underlines sit below the question letters', async ({
	page,
	navigate,
}) => {
	await navigate('/faq')

	const question = page.getByRole('button', { name: 'Who is Via for?' })
	await question.hover()
	const underlineOffset = await question.evaluate(
		(element) => window.getComputedStyle(element).textUnderlineOffset,
	)

	expect(Number.parseFloat(underlineOffset)).toBeGreaterThanOrEqual(3)
})
