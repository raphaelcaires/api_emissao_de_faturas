import { Charge } from '../models/charge.model'

const chargesMap: Map<string, Charge> = new Map()

export const ChargesRepository = {
  add: (charge: Charge) => {
    chargesMap.set(charge.chargeId, charge)
  },

  exists: (chargeId: string): boolean => {
    return chargesMap.has(chargeId)
  },

  getAll: (): Charge[] => {
    return Array.from(chargesMap.values())
  },

  clearAll: () => {
    chargesMap.clear()
  },
}
