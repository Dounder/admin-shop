import { tesloApi } from '@/api/teslo.api'
import { isAxiosError } from 'axios'
import type { AuthResponse, User } from '../interfaces'

interface RegisterError {
  ok: false
  message: string
}

interface RegisterSuccess {
  ok: true
  token: string
  user: User
}

export const registerAction = async (
  fullName: string,
  email: string,
  password: string
): Promise<RegisterError | RegisterSuccess> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
      fullName,
      email,
      password,
    })

    return {
      ok: true,
      token: data.token,
      user: data.user,
    }
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401)
      return { ok: false, message: 'Invalid credentials' }

    console.error(error)
    throw new Error('An error occurred while trying to register')
  }
}
