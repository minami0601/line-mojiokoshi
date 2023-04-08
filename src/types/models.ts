import { Timestamp } from 'firebase-admin/firestore'

interface Base {
  id?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
export interface User extends Base {
  stripeCustomerId: string
  point: number
}
export const getUserInitData = (initialPoint = 500): User => {
  return {
    stripeCustomerId: '',
    point: initialPoint
  }
}
