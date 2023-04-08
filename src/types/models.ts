import { Timestamp } from 'firebase-admin/firestore'

interface Base {
  id?: string
  createdAt?: Timestamp
  updatedAt?: Timestamp
}
export interface User extends Base {
  isActive: boolean
  stripeCustomerId: string
  point: number
}
export const getUserInitData = (initialPoint = 500): User => {
  return {
    isActive: false,
    stripeCustomerId: '',
    point: initialPoint
  }
}
