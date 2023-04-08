import express from 'express'
import { region, RuntimeOptions } from 'firebase-functions'

import { stripeWebhookHandlers } from './webhook'

const app = express()

// -----------
// config

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// -----------
// router

app.post('/', stripeWebhookHandlers)

// *************
// functions設定
// *************

const runtimeOpts: RuntimeOptions = {
  timeoutSeconds: 540,
  memory: '512MB'
}

module.exports = region('asia-northeast1').runWith(runtimeOpts).https.onRequest(app)
