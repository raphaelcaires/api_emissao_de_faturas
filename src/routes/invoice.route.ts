import { FastifyInstance } from 'fastify'
import { getInvoicesHandler } from '../controllers/invoices.controller'
import { InvoiceSchema } from '../schemas/invoice.schema'
import { ChargeSchema } from '../schemas/charge.schema'

export async function invoicesRoutes(server: FastifyInstance) {
  server.get(
    '/invoices',
    {
      schema: {
        summary: 'Gera e retorna as faturas agrupadas por parceiros',
        description:
          'Este endpoint agrupa as cobranças por parceiro, calcula o total e retorna uma lista ordenada por valor total decrescente. As cobranças são removidas do sistema após a geração das faturas.',
        response: {
          200: {
            description: 'Lista de faturas geradas com sucesso',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                partnerId: { type: 'string' },
                total: { type: 'number' },
                charges: {
                  type: 'array',
                  items: ChargeSchema,
                },
              },
              required: ['partnerId', 'total', 'charges'],
            },
          }
        },
      },
    },
    getInvoicesHandler
  )
}
