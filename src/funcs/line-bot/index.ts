import { middleware } from '@line/bot-sdk'
import express from 'express'
import { logger, region, RuntimeOptions } from 'firebase-functions'

import { lineMiddlewareConfig } from '~/clients/line.client'
import { errorLogger } from '~/utils/util'

import { handlers } from './handlers'

const app = express()

app.use(middleware(lineMiddlewareConfig)) // アクセス防止
app.post('/', (req, res) =>
  Promise.all(req.body.events.map(handlers))
    .then(() => {
      logger.info('success')
      res.status(200).end()
    })
    .catch((err) => {
      errorLogger(err)
      res.status(500).end()
    })
)

// *************
// Functions設定

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '1GB'
}

module.exports = region('asia-northeast1').runWith(runtimeOpts).https.onRequest(app)
