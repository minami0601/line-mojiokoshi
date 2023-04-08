import { Stripe } from 'stripe'

import { lineClient } from '~/clients/line.client'
import { stripeClient } from '~/clients/stripe.client'
import { getUserDb, updateUserDb } from '~/libs/firebase/firestore/user'

type CheckoutURLProps = {
  stripeCustomer: string
  priceId: string
  mode: Stripe.Checkout.SessionCreateParams.Mode
}

export const getStripeCheckoutURL = async (props: CheckoutURLProps): Promise<{ url: string }> => {
  const { stripeCustomer, priceId, mode } = props

  try {
    const { url } = await stripeClient.checkout.sessions.create({
      customer: stripeCustomer,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      payment_method_types: ['card'],
      mode,
      success_url: 'https://lin.ee/F2H8dsW',
      cancel_url: 'https://lin.ee/F2H8dsW'
    })

    if (url === null) {
      throw new Error('stripe checkout url is null.')
    }

    return { url }
  } catch (err) {
    console.error(err)
    console.error('getCheckoutURLBySinglePayment func.')
    throw Error
  }
}

export const getStripeCustomerIdByUserId = async (userId: string): Promise<string> => {
  const user = await getUserDb(userId)
  if (user === null) {
    throw new Error('user is not found.')
  }

  if (user.stripeCustomerId) {
    return user.stripeCustomerId
  }

  return await createStripeCustomerByUserId(userId)
}

export const createStripeCustomerByUserId = async (userId: string): Promise<string> => {
  const { displayName } = await lineClient.getProfile(userId).catch(() => {
    return { displayName: '' }
  })

  const newCustomer = await stripeClient.customers.create({
    name: displayName || userId,
    description: userId,
    metadata: {
      userId
    }
  })
  await updateUserDb(userId, { stripeCustomerId: newCustomer.id })

  return newCustomer.id
}
