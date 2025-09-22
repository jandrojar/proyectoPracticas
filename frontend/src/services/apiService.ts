import axios from 'axios'
import type {AxiosError} from 'axios'
import type {ApiError} from '../types/types'


const apiService = axios.create({
  baseURL: 'http://localhost:3000',
  headers:{
    'Content-Type': 'application/json'
  },
  timeout: 5000
})

export function toApiError(error: unknown): ApiError {
  const e = error as AxiosError<{error: string}>

  if(e.response){
    const status = e.response.status

    const backendMessage = e.response.data?.error // Optional chaining: if data or error is undefined, it won't throw an error
    if (backendMessage) {
      return { message: backendMessage, status }
    }

    let message: string
    switch(status){
      case 400: message = 'Solicitud incorrecta (400)'; break
      case 401: message = 'No autenticado (401)'; break
      case 403: message = 'Acceso prohibido (403)'; break
      case 404: message = 'Recurso no encontrado (404)'; break
      case 500: message = 'Error interno del servidor (500)'; break
      case 503: message = 'Servicio no disponible (503)'; break
      default:  message = `Error del servidor (${status})`
    }
    return {message, status} // return ApiError object
  } else if (e.request) {
    return {message: 'No se recibió respuesta del servidor'} // No status
  } else {
    return {message: e.message}
  }
}

export default apiService