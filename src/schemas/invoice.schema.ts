import { ChargeSchema } from './charge.schema'

export const InvoiceSchema = {
  type: 'object',
  properties: {
    partnerId: { type: 'string' },
    total: { type: 'number' },
    charges: {
      type: 'array',
      items: ChargeSchema
    }
  },
  required: ['partnerId', 'total', 'charges']
}
