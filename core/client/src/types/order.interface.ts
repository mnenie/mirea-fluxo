export type OrderStatus = 'not verified' | 'in process' | 'closed'

export interface Order {
  _id: string
  title: string
  content: string
  date: Date
  status: OrderStatus
  price: number
  organization: string
  // TODO: fix stages
  stages: Array<any>
}