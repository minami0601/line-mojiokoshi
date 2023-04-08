import { MessageEvent, TextEventMessage } from '@line/bot-sdk'

import { lineClient } from '~/clients/line.client'
import { getCompletion } from '~/domains/openai.domain'
import { makeReplyMessage } from '~/utils/line.util'
import { errorLogger } from '~/utils/util'

export const messageTextHandler = async (event: MessageEvent): Promise<void> => {
  try {
    const { text } = event.message as TextEventMessage
    const newText = await getCompletion(text)

    if (newText === null) {
      await lineClient.replyMessage(
        event.replyToken,
        makeReplyMessage('うまく会話を繋げれなかったよ。')
      )
    } else {
      await lineClient.replyMessage(event.replyToken, makeReplyMessage(newText))
    }
  } catch (err) {
    errorLogger(err)
    throw new Error('message text handler')
  }
}
