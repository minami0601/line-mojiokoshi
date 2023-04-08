import { createUserDb, getUserDb } from '~/libs/firebase/firestore/user'
import { getUserInitData, User } from '~/types/models'

export const getUserByUserId = async (userId: string): Promise<User> => {
  let user = await getUserDb(userId)
  if (user === null) {
    user = await createUserDb(userId, getUserInitData())
  }
  return user
}
