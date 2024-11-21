import type { Risk } from './order.interface'

export interface Stage {
  _id: string
  title: string
  content: string
  date: Date
  dateEnd?: Date
  stages: Stage[]
  risks?: Risk[]
  price: number
  organization: string
}
