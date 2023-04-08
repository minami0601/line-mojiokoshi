import { cert, getApps, initializeApp } from 'firebase-admin/app'

import { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_PROJECT_ID } from '~/utils/secrets'

if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      clientEmail: GOOGLE_CLIENT_EMAIL,
      privateKey: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      projectId: GOOGLE_PROJECT_ID
    })
  })
}
