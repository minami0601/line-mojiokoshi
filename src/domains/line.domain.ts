import { logger } from 'firebase-functions'
import { Readable } from 'stream'

import { lineClient } from '~/clients/line.client'

export const getMessageContentWithStream = async (messageId: string): Promise<Readable> => {
  return await lineClient.getMessageContent(messageId)
}
export const getMessageContentWithBuffer = (messageId: string): Promise<Buffer> => {
  return new Promise((resolve, reject) =>
    lineClient
      .getMessageContent(messageId)
      .then((stream) => {
        const content: Buffer[] = []
        stream.on('data', (chunk) => content.push(Buffer.from(chunk)))
        stream.on('end', () => resolve(Buffer.concat(content)))
        stream.on('error', (err) => {
          logger.error(err)
          reject('lineGetContent')
        })
      })
      .catch((err) => {
        logger.error(err)
        reject('lineGetContent')
      })
  )
}
