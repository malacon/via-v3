import {
	getFormProps,
	getInputProps,
	getTextareaProps,
	useForm,
} from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import * as E from '@react-email/components'
import { data, useFetcher } from 'react-router'
import { HoneypotInputs } from 'remix-utils/honeypot/react'
import { z } from 'zod'
import { ErrorList, Field, TextareaField } from '#app/components/forms.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import { sendEmail } from '#app/utils/email.server.ts'
import { checkHoneypot } from '#app/utils/honeypot.server.ts'
import { EmailSchema } from '#app/utils/user-validation.ts'
import { type Route } from './+types/contact.ts'

export const meta: Route.MetaFunction = () => [{ title: 'Contact | Via Nova' }]

const ContactFormSchema = z.object({
	firstName: z.string().max(100).optional(),
	lastName: z.string().max(100).optional(),
	email: EmailSchema,
	message: z.string().max(5000).optional(),
})

export async function action({ request }: Route.ActionArgs) {
	const formData = await request.formData()
	await checkHoneypot(formData)
	const submission = await parseWithZod(formData, {
		schema: ContactFormSchema,
	})

	if (submission.status !== 'success') {
		return data(
			{ result: submission.reply(), success: false },
			{ status: submission.status === 'error' ? 400 : 200 },
		)
	}

	const { firstName, lastName, email, message } = submission.value

	const name = [firstName, lastName].filter(Boolean).join(' ') || email

	const response = await sendEmail({
		to: 'hello@vianova.org', // Update this to your actual contact email
		subject: `Contact Form Submission from ${name}`,
		react: (
			<ContactFormEmail
				firstName={firstName}
				lastName={lastName}
				email={email}
				message={message}
			/>
		),
	})

	if (response.status === 'success') {
		return data({
			result: submission.reply({
				formErrors: [],
			}),
			success: true,
		})
	} else {
		return data(
			{
				result: submission.reply({
					formErrors: [response.error.message],
				}),
				success: false,
			},
			{ status: 500 },
		)
	}
}

function ContactFormEmail({
	firstName,
	lastName,
	email,
	message,
}: {
	firstName?: string
	lastName?: string
	email: string
	message?: string
}) {
	const fullName = [firstName, lastName].filter(Boolean).join(' ') || email

	return (
		<E.Html lang="en" dir="ltr">
			<E.Container>
				<E.Heading>New Contact Form Submission</E.Heading>
				<E.Section>
					<E.Text>
						<strong>Name:</strong> {fullName}
					</E.Text>
					<E.Text>
						<strong>Email:</strong> {email}
					</E.Text>
					{message && (
						<E.Section>
							<E.Text>
								<strong>Message:</strong>
							</E.Text>
							<E.Text>{message}</E.Text>
						</E.Section>
					)}
				</E.Section>
			</E.Container>
		</E.Html>
	)
}

export default function Contact() {
	const contact = useFetcher<typeof action>()
	const [form, fields] = useForm({
		id: 'contact-form',
		constraint: getZodConstraint(ContactFormSchema),
		lastResult: contact.data?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ContactFormSchema })
		},
		shouldRevalidate: 'onBlur',
	})

	const isSuccess = contact.data?.success === true

	return (
		<main className="mx-auto max-w-6xl bg-gray-100/50 px-4 py-8 sm:px-8 md:px-16 md:py-16 lg:px-52">
			<h1 className="mb-6 font-serif text-4xl font-normal sm:text-5xl md:mb-8 md:text-6xl">
				Contact
			</h1>
			<p className="mb-6 text-lg leading-relaxed text-gray-600 sm:mb-8 sm:pl-8 md:text-base">
				If you're interested in applying to Via's 2026 cohort, have any
				questions, or just want to say hello, please fill out your contact info
				below and someone from our team will get back to you in the next few
				days.
			</p>

			{isSuccess ? (
				<div className="mt-6">
					<p className="text-right text-sm text-gray-600">
						Thanks for submitting!
					</p>
				</div>
			) : (
				<contact.Form method="POST" {...getFormProps(form)}>
					<HoneypotInputs />
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
						<Field
							labelProps={{
								htmlFor: fields.firstName.id,
								children: 'First Name',
								className: 'text-lg leading-relaxed md:text-base',
							}}
							inputProps={{
								...getInputProps(fields.firstName, { type: 'text' }),
								// input should be blocked and dark background
								className: 'border-gray-800  rounded-none',
							}}
							errors={fields.firstName.errors}
						/>
						<Field
							labelProps={{
								htmlFor: fields.lastName.id,
								children: 'Last Name',
								className: 'text-lg leading-relaxed md:text-base',
							}}
							inputProps={{
								...getInputProps(fields.lastName, { type: 'text' }),
								className: 'border-gray-800  rounded-none',
							}}
							errors={fields.lastName.errors}
						/>
						<Field
							labelProps={{
								htmlFor: fields.email.id,
								children: 'Email',
								className: 'text-lg leading-relaxed md:text-base',
							}}
							inputProps={{
								required: true,
								...getInputProps(fields.email, { type: 'email' }),
								className: 'border-gray-800  rounded-none',
							}}
							errors={fields.email.errors}
						/>
					</div>
					<TextareaField
						className="mt-4"
						labelProps={{
							htmlFor: fields.message.id,
							children: 'Message',
							className: 'text-lg leading-relaxed md:text-base',
						}}
						textareaProps={{
							...getTextareaProps(fields.message),
							rows: 6,
							className: 'border-gray-800  rounded-none',
						}}
						errors={fields.message.errors}
					/>
					<ErrorList errors={form.errors} id={form.errorId} />
					<div className="mt-6 flex justify-end">
						<StatusButton
							type="submit"
							status={
								contact.state === 'submitting'
									? 'pending'
									: (form.status ?? 'idle')
							}
							disabled={contact.state !== 'idle'}
							className="font-display w-full rounded-none border-gray-800 py-6 text-lg leading-relaxed font-thin md:text-base"
						>
							Send
						</StatusButton>
					</div>
				</contact.Form>
			)}
		</main>
	)
}
