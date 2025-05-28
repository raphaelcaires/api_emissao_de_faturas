import { FastifyInstance } from 'fastify'
import { postChargeHandler } from '../controllers/charges.controller'

export async function chargesRoutes(server: FastifyInstance) {
  server.post('/charges', postChargeHandler)
}
