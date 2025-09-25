import type {LoginResponse} from '../types/types'
import apiService from './apiService'
import { toApiError } from './apiService'

export async function login(email: string, password: string) :Promise<LoginResponse>{
	try{
		const response = await apiService.post('/users/login', {email,password})
		return response.data as LoginResponse
	}catch (error){
    console.error('Error al iniciar sesión:', error);
		throw toApiError(error)
	}
}