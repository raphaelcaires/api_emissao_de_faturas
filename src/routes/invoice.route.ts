import { FastifyInstance } from 'fastify'
import { getInvoicesHandler } from '../controllers/invoices.controller'

export async function invoicesRoutes(server: FastifyInstance) {
  server.get('/invoices', getInvoicesHandler)
}
