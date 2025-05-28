import { FastifyInstance } from 'fastify'
import { postChargeHandler } from '../controllers/charges.controller'
import { ChargeSchema } from '../schemas/charge.schema'

export async function chargesRoutes(server: FastifyInstance) {
  server.post(
    '/charges',
    {
      schema: {
        summary: 'Cria cobranças',
        description:
          'Endpoint para criar múltiplas cobranças. Exemplo de payload: [{"chargeId":"c123","partnerId":"net-01","amount":199.9,"reference":"2025-05","timestamp":"2025-05-15T10:00:00Z"}]',
        body: {
          type: 'array',
          items: ChargeSchema,
        },
        response: {
          201: {
            description: 'Todas as cobranças foram criadas com sucesso',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              processed: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    chargeId: { type: 'string' },
                    status: { type: 'string', enum: ['added'] },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          207: {
            description:
              'Apenas algumas cobranças foram processadas com sucesso',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              processed: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    chargeId: { type: 'string' },
                    status: {
                      type: 'string',
                      enum: ['added', 'duplicate', 'invalid'],
                    },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
          400: {
            description:
              'Nenhuma cobrança foi processada (todas inválidas ou duplicadas)',
            type: 'object',
            properties: {
              success: { type: 'boolean' },
              processed: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    chargeId: { type: 'string' },
                    status: { type: 'string', enum: ['duplicate', 'invalid'] },
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    postChargeHandler
  )
}
