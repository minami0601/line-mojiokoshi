import { Request, Response } from 'express'

import { signatureMiddleware } from '../middleware/signature.middleware'
import { paymentIntentSucceededHandler } from './payment_intent.succeeded'

export const stripeWebhookHandlers = async (req: Request, res: Response) => {
  try {
    const event = signatureMiddleware(req)

    switch (event.type) {
      case 'customer.subscription.updated':
        break
      case 'customer.subscription.deleted':
        break
      case 'payment_intent.succeeded':
        // @ts-ignore
        await paymentIntentSucceededHandler({ customerId: event.data.object.customer })
        break
    }

    res.status(200).send('success').end()
  } catch (err) {
    console.error(err)
    res.status(500).send('error').end()
  }
}
