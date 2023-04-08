import { RichMenu } from '@line/bot-sdk'
export const defaultRichMenu: RichMenu = {
  size: {
    width: 1200,
    height: 405
  },
  selected: true,
  name: 'default',
  chatBarText: '詳細はこちらより👇',
  areas: [
    {
      bounds: {
        x: 0,
        y: 0,
        width: 1200,
        height: 405
      },
      action: {
        type: 'postback',
        displayText: '会員になりたいです。',
        data: 'issueSubscriptionPaymentURL'
      }
    }
  ]
}
