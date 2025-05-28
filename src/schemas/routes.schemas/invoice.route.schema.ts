import { InvoiceSchema } from '../invoice.schema'

export const InvoiceRouteSchema = {
  summary: 'Gera e retorna as faturas agrupadas por parceiros',
  description:
    'Este endpoint agrupa as cobranças por parceiro, calcula o total e retorna uma lista ordenada por valor total decrescente. As cobranças são removidas do sistema após a geração das faturas.',
  response: {
    200: {
      description: 'Lista de faturas geradas com sucesso',
      type: 'array',
      items: InvoiceSchema,
    },
  },
}
