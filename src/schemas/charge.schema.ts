export const ChargeSchema = {
  type: 'object',
  properties: {
    chargeId: { type: 'string' },
    partnerId: { type: 'string' },
    amount: { type: 'number' },
    reference: { type: 'string' },
    timestamp: { type: 'string' },
  },
  required: ['chargeId', 'partnerId', 'amount', 'reference', 'timestamp'],
}
