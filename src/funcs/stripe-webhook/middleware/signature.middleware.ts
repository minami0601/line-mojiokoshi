import { Request } from 'express'
import { Stripe } from 'stripe'

import { stripeClient } from '~/clients/stripe.client'
import { STRIPE_WEBHOOK_SECRET } from '~/utils/secrets'

export const signatureMiddleware = (req: Request): Stripe.Event => {
  const signature = req.headers['stripe-signature']
  if (!signature || typeof signature !== 'string') throw new Error('stripe signature is not found.')
  // @ts-ignore
  const body = req.rawBody

  const event = stripeClient.webhooks.constructEvent(
    body as string,
    signature,
    STRIPE_WEBHOOK_SECRET
  )

  return event
}
