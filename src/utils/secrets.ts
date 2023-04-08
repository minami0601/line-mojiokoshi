import 'dotenv/config'

// LINE

export const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN as string
export const LINE_SECRET = process.env.LINE_SECRET as string

// Google
export const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY as string
export const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL as string
export const GOOGLE_PROJECT_ID = process.env.GOOGLE_PROJECT_ID as string

// Stripe
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string

// OpenAI

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string

