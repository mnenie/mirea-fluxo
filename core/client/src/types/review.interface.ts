export type reviewStatus = 'not verified' | 'consideration' | 'verified'

export interface Review {
  title: string
  content: string
  email: string
  date: Date
  status: reviewStatus
  start: number
}
