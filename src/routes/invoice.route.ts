import { FastifyInstance } from 'fastify'
import { getInvoicesHandler } from '../controllers/invoices.controller'
import { InvoiceRouteSchema } from '../schemas/routes.schemas/invoice.route.schema'

export async function invoicesRoutes(server: FastifyInstance) {
  server.get(
    '/invoices',
    {
      schema: InvoiceRouteSchema,
    },
    getInvoicesHandler
  )
}
