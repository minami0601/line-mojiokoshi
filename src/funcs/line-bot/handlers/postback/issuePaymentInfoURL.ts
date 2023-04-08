import { PostbackEvent } from '@line/bot-sdk'

import { lineClient } from '~/clients/line.client'
import { stripeClient } from '~/clients/stripe.client'
import { getStripeCustomerIdByUserId } from '~/domains/stripe.domain'
import { getUserByUserId } from '~/domains/user.domain'
import { makeReplyMessage } from '~/utils/line.util'

export const issuePaymentInfoURLHandler = async (event: PostbackEvent): Promise<void> => {
  const userId = event.source.userId as string

  const user = await getUserByUserId(userId)

  if (!user.isActive) {
    return
  }

  const stripeCustomerId = await getStripeCustomerIdByUserId(userId)

  const { url } = await stripeClient.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: 'https://lin.ee/KOdK8tw'
  })

  await lineClient.replyMessage(event.replyToken, makeReplyMessage(url))
}
