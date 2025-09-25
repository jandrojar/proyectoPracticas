export interface Session {
  id: string
  userId: string
  token: string
  startDate: Date
  expiryDate: Date
}