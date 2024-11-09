export type Status = 'not verified' | 'consideration' | 'verified'

export interface Review {
  _id: string
  title: string
  content: string
  email: string
  date: Date
  status: Status
  stars: number
}
