import { RichMenu } from '@line/bot-sdk'
export const activeRichMenu: RichMenu = {
  size: {
    width: 1200,
    height: 405
  },
  selected: true,
  name: 'active',
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
        displayText: '決済情報ページへのURLを発行する',
        data: 'issuePaymentInfoURL'
      }
    }
  ]
}
