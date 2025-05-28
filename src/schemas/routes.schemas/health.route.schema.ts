import { HealthSchema } from '../health.schema'

export const HealthRouteSchema = {
  summary: 'Health check',
  response: {
    200: HealthSchema,
  },
}
