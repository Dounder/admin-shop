import { tesloApi } from '@/api/teslo.api'
import type { User } from '../interfaces'
import { isAxiosError } from 'axios'

interface CheckError {
  ok: false
  message: string
}

interface CheckSuccess {
  ok: true
  token: string
  user: User
}

export const checkAuthAction = async (): Promise<CheckError | CheckSuccess> => {
  try {
    const localToken = localStorage.getItem('token')

    if (localToken && localToken.length < 10) return { ok: false, message: 'Invalid token' }

    const { data } = await tesloApi.get('/auth/check-status')

    return { ok: true, token: data.token, user: data.user }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401)
      return { ok: false, message: 'Invalid token' }

    console.error(error)
    throw new Error('An error occurred while trying to check the authentication status')
  }
}
