import type { AxiosResponse } from 'axios'
import type { Risk } from '~/types/order.interface'

export async function useRisks(body: AxiosResponse<string>['data']) {
  const _string = body
    .replace(/(\r\n|\n|\r)/g, '')
    .replace(/\*/g, '')
    .replace(/[«»]/g, '"')
    .match(/\[.*\]/)
  const normalizedArr: Risk[] | undefined = _string ? JSON.parse(_string[0]) : _string

  return {
    normalizedArr,
  }
}
