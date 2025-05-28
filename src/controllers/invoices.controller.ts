import { FastifyRequest, FastifyReply } from 'fastify'
import { generateInvoices } from '../services/invoice.service'

export async function getInvoicesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const invoices = generateInvoices()

  return reply.status(200).send(invoices)
}
