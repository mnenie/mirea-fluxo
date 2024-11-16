export type Role = 'manager' | 'corporation'

export interface User {
  _id: string
  email: string
  photoUrl: string
  role: Role
  organization?: string
}
