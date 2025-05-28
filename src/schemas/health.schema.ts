export const HealthSchema = {
  type: 'object',
  properties: {
    status: { type: 'string' },
  },
  required: ['status'],
}
