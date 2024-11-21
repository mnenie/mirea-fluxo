import type { Stage } from './stages.interface'

export type OrderStatus = 'not verified' | 'in process' | 'closed'

export interface Order {
  _id: string
  title: string
  content: string
  date: Date
  dateEnd?: Date
  closeDate?: Date
  status: OrderStatus
  price: number
  organization: string
  manager?: string
  stages: Array<Stage>
  risks?: Risk[]
}

export interface Risk {
  name: string
  values: number[]
}
