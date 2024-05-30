import { tesloApi } from '@/api/teslo.api'
import type { AuthResponse, User } from '../interfaces'
import { isAxiosError } from 'axios'

export interface LoginError {
  ok: false
  message: string
}

export interface LoginSuccess {
  ok: true
  token: string
  user: User
}

export const loginAction = async (
  email: string,
  password: string
): Promise<LoginError | LoginSuccess> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', { email, password })

    return {
      ok: true,
      token: data.token,
      user: data.user,
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401)
      return { ok: false, message: 'Invalid credentials' }

    console.error(error)
    throw new Error('An error occurred while trying to login')
  }
}
