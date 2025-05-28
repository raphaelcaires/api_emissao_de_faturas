import { ChargesRepository } from '../repositories/charges.repository'
import { Invoice } from '../models/invoice.model'

export function generateInvoices(): Invoice[] {
  const allCharges = ChargesRepository.getAll()

  const invoiceMap = new Map<string, Invoice>()

  for (const charge of allCharges) {
    const { partnerId, amount } = charge
    if (!invoiceMap.has(partnerId)) {
      invoiceMap.set(partnerId, {
        partnerId,
        total: 0,
        charges: [],
      })
    }

    const invoice = invoiceMap.get(partnerId)!
    invoice.total += amount
    invoice.charges.push(charge)
  }

  ChargesRepository.clearAll()

  return Array.from(invoiceMap.values()).sort((a, b) => b.total - a.total)
}
