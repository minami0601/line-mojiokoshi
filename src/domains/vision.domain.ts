import { ImageAnnotatorClient } from '@google-cloud/vision'

import { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_PROJECT_ID } from '~/utils/secrets'
const vision = new ImageAnnotatorClient({
  credentials: {
    client_email: GOOGLE_CLIENT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  },
  projectId: GOOGLE_PROJECT_ID
})
export const imageToText = async (imageBuffer: Buffer): Promise<string | null> => {
  const result = await vision
    .textDetection({ image: { content: imageBuffer } })
    .then((results) => results[0])
  if (!result.fullTextAnnotation || !result.fullTextAnnotation.text) {
    return null
  }
  return result.fullTextAnnotation.text
}
