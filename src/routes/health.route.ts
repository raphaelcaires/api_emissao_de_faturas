import { FastifyInstance } from 'fastify'
import { HealthRouteSchema } from '../schemas/routes.schemas/health.route.schema'

export async function healthRoute(app: FastifyInstance) {
  app.get(
    '/',
    {
      schema: HealthRouteSchema,
    },
    async () => {
      return { status: 'OK' }
    }
  )
}
