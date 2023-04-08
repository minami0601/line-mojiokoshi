import { PostbackEvent } from '@line/bot-sdk'

import { lineClient } from '~/clients/line.client'
import { getStripeCheckoutURL, getStripeCustomerIdByUserId } from '~/domains/stripe.domain'
import { createUserDb, getUserDb } from '~/libs/firebase/firestore/user'
import { getUserInitData } from '~/types/models'
import { makeReplyMessage } from '~/utils/line.util'

export const issueSubscriptionPaymentURLHandler = async (event: PostbackEvent): Promise<void> => {
  const userId = event.source.userId as string

  let user = await getUserDb(userId)
  if (user === null) {
    user = await createUserDb(userId, getUserInitData())
  }

  if (user.isActive) {
    return
  }

  const stripeCustomerId = await getStripeCustomerIdByUserId(userId)

  const { url } = await getStripeCheckoutURL({
    stripeCustomer: stripeCustomerId,
    priceId: 'price_1MuQqnE87FWKozCPEi2YvIs4',
    mode: 'subscription'
  })

  await lineClient.replyMessage(event.replyToken, makeReplyMessage(url))
}
