export type OrderStatus = 'not verified' | 'in process' | 'closed'

export interface Order {
  _id: string
  title: string
  content: string
  date: Date
  closeDate?: Date
  status: OrderStatus
  price: number
  organization: string
  // TODO: fix stages
  stages: Array<any>
  risks?: Risk[]
}

export interface Risk {
  name: string
  values: number[]
}
