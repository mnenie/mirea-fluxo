export type Status = 'not verified' | 'consideration' | 'verified'
type Department = 'marketing' | 'design' | 'development' | 'sales' | 'general'

export interface Review {
  _id: string
  title: string
  content: string
  email: string
  date: Date
  status: Status
  department?: Department
  stars: number
}
