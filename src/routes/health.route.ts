import { FastifyInstance } from 'fastify'
import { HealthSchema } from '../schemas/health.schema'

export async function healthRoute(app: FastifyInstance) {
  app.get(
    '/',
    {
      schema: {
        summary: 'Health check',
        response: {
          200: HealthSchema,
        },
      },
    },
    async () => {
      return { status: 'OK' }
    }
  )
}
