#!/usr/bin/env tsx
/**
 * Script to load secrets from .env file to Fly.io
 * 
 * Usage:
 *   npm run load-secrets:fly [-- --app=via-v3-4511] [-- --staging]
 *   or
 *   tsx scripts/load-secrets-to-fly.ts [--app=via-v3-4511] [--staging]
 */

import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'
import { execa } from 'execa'

const APP_NAME = 'via-v3-4511'
const ENV_FILE = '.env'

interface ParsedEnv {
	[key: string]: string
}

/**
 * Parse .env file, handling comments and empty lines
 */
function parseEnvFile(content: string): ParsedEnv {
	const secrets: ParsedEnv = {}
	const lines = content.split('\n')

	for (const line of lines) {
		// Remove leading/trailing whitespace
		const trimmed = line.trim()

		// Skip empty lines and comments
		if (!trimmed || trimmed.startsWith('#')) {
			continue
		}

		// Parse KEY=VALUE format
		const equalIndex = trimmed.indexOf('=')
		if (equalIndex === -1) {
			continue
		}

		const key = trimmed.slice(0, equalIndex).trim()
		let value = trimmed.slice(equalIndex + 1).trim()

		// Remove quotes if present
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1)
		}

		// Skip if key or value is empty
		if (!key || !value) {
			continue
		}

		secrets[key] = value
	}

	return secrets
}

/**
 * Set secrets on Fly.io using fly secrets set command
 */
async function setFlySecrets(
	appName: string,
	secrets: ParsedEnv,
): Promise<void> {
	const secretEntries = Object.entries(secrets)

	if (secretEntries.length === 0) {
		console.log('⚠️  No secrets found in .env file')
		return
	}

	console.log(`\n📤 Uploading ${secretEntries.length} secrets to ${appName}...\n`)

	// Build the secrets command
	// fly secrets set KEY1=value1 KEY2=value2 ...
	const secretArgs = secretEntries.map(([key, value]) => `${key}=${value}`)

	try {
		const { stdout, stderr } = await execa('fly', [
			'secrets',
			'set',
			...secretArgs,
			'--app',
			appName,
		])

		if (stdout) {
			console.log(stdout)
		}
		if (stderr) {
			console.error(stderr)
		}

		console.log(`\n✅ Successfully uploaded secrets to ${appName}`)
	} catch (error) {
		console.error(`\n❌ Failed to upload secrets to ${appName}:`)
		if (error instanceof Error) {
			console.error(error.message)
		}
		process.exit(1)
	}
}

/**
 * Main function
 */
async function main() {
	const args = process.argv.slice(2)
	const isStaging = args.includes('--staging')
	const appArg = args.find((arg) => arg.startsWith('--app='))
	const appName = appArg
		? appArg.split('=')[1]
		: isStaging
			? `${APP_NAME}-staging`
			: APP_NAME

	// Check if .env file exists
	const envPath = join(process.cwd(), ENV_FILE)
	if (!existsSync(envPath)) {
		console.error(`❌ Error: ${ENV_FILE} file not found at ${envPath}`)
		console.error(
			`   Please create a ${ENV_FILE} file in the project root with your secrets.`,
		)
		process.exit(1)
	}

	// Read and parse .env file
	console.log(`📖 Reading ${ENV_FILE}...`)
	let envContent: string
	try {
		envContent = await readFile(envPath, 'utf-8')
	} catch (error) {
		console.error(`❌ Error reading ${ENV_FILE}:`)
		if (error instanceof Error) {
			console.error(error.message)
		}
		process.exit(1)
	}

	const secrets = parseEnvFile(envContent)

	if (Object.keys(secrets).length === 0) {
		console.error(`❌ No valid secrets found in ${ENV_FILE}`)
		process.exit(1)
	}

	console.log(`\n📋 Found ${Object.keys(secrets).length} secrets:`)
	console.log(`   ${Object.keys(secrets).join(', ')}`)

	// Confirm before proceeding
	console.log(`\n🎯 Target app: ${appName}`)
	console.log(
		`\n⚠️  This will overwrite existing secrets on Fly.io for ${appName}`,
	)

	// Upload secrets
	await setFlySecrets(appName, secrets)

	console.log('\n✨ Done!')
}

main().catch((error) => {
	console.error('❌ Unexpected error:')
	console.error(error)
	process.exit(1)
})

