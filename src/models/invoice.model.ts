import { Charge } from './charge.model'

export interface Invoice {
  partnerId: string
  total: number
  charges: Charge[]
}
