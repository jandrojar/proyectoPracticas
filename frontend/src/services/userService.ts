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
    const data = response.data.data

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

// https://jsonplaceholder.typicode.com/users-inventado

// https://apinoexiste.com

/**
 * Mock function to simulate fetching users from an API.
export async function fetchUsers(): Promise<User[]> {
  return [
      { id: '123aw', name: 'Alice Alonso', email: 'aliciaalonso@company.com'},
      { id: '456as', name: 'Carlos Blanco', email: 'carlosblanco@company.com' },
      { id: '789df', name: 'Antonio Delgado', email:'antoniodelgado@company.com' },
      { id: '321gh', name: 'Elena García', email:'elenagarcia@company.com' },
      { id: '654jk', name: 'Marta Jiménez', email:'martajimenez@company.com' }
  ]

}
  */