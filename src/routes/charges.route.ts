import { FastifyInstance } from 'fastify'
import { postChargeHandler } from '../controllers/charges.controller'
import { ChargesRouteSchema } from '../schemas/routes.schemas/charge.route.schema'

export async function chargesRoutes(server: FastifyInstance) {
  server.post(
    '/charges',
    {
      schema: ChargesRouteSchema,
    },
    postChargeHandler
  )
}
