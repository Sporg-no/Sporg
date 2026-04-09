import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY ?? ''

// Mock mode when key starts with "sk_test_mock" or is missing
export const erMockModus = !stripeKey || stripeKey.startsWith('sk_test_mock')

export const stripe = erMockModus
  ? null
  : new Stripe(stripeKey, { apiVersion: '2024-06-20' })
