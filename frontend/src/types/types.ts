export interface User {
  id: string
  name: string
  lastname:string
  age:number
  email:string
}

export interface ApiError {
  message: string
  status?: number // El status es opcional porque puede no estar presente
}