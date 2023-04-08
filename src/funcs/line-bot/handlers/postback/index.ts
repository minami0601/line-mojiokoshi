import { PostbackEvent } from '@line/bot-sdk'

import { errorLogger } from '~/utils/util'

import { issuePaymentInfoURLHandler } from './issuePaymentInfoURL'
import { issueSubscriptionPaymentURLHandler } from './issueSubscriptionPaymentURL'

export const postbackHandler = async (event: PostbackEvent): Promise<void> => {
  try {
    const { data } = event.postback
    switch (data) {
      case 'issueSubscriptionPaymentURL':
        return await issueSubscriptionPaymentURLHandler(event)
      case 'issuePaymentInfoURL':
        return await issuePaymentInfoURLHandler(event)
    }
  } catch (err) {
    errorLogger(err)
    throw new Error('postback handler')
  }
}
