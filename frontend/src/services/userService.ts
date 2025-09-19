import type {User} from '../types/types'
import apiService from './apiService'
import { toApiError } from './apiService'

/**
 * Fetch users from the API and returns them as an array of User objects.
 *
 * @returns A promise that resolves to an array of User objects.
 */
export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await apiService.get('/users')
    const data = response.data

    if(Array.isArray(data)){
      return data as User[]
    } else {
      return [data as User] // Si la API devuelve un solo usuario, lo envolvemos en un array
    }

  } catch (error) {
    const apiError = toApiError(error)
    console.error('Error en fetchUsers:', apiError.message)
    throw apiError
  }
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  try {
    const response = await apiService.post('/users', user)
    return response.data as User
  } catch (error) {
    const apiError = toApiError(error)
    console.error('Error al crear el usuario:', apiError.message)
    throw apiError
  }
}
