import { FieldValue, getFirestore } from 'firebase-admin/firestore'

import { User } from '~/types/models'

export const usersRef = getFirestore().collection('users')
export const createUserDb = async (userId: string, user: User): Promise<User> => {
  const newUser = {
    ...user,
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()
  } as User
  await usersRef.doc(userId).create(newUser)
  return newUser
}
export const getUserDb = async (userId: string): Promise<User | null> => {
  const snapshot = await usersRef.doc(userId).get()
  return snapshot.exists ? ({ id: snapshot.id, ...snapshot.data() } as User) : null
}
export const updateUserDb = async (userId: string, user: Partial<User>): Promise<void> => {
  await usersRef.doc(userId).update({
    ...user,
    updatedAt: FieldValue.serverTimestamp()
  } as Partial<User>)
}
export const deleteUserDb = async (userId: string): Promise<void> => {
  await usersRef.doc(userId).delete()
}
