export interface User {
  id: string
  name: string
  lastname:string
  age:number
  email:string
  password:string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface ApiError {
  message: string
  status?: number // Optional because not all errors may have a status code
}