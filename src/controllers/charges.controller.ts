import { FastifyRequest, FastifyReply } from 'fastify'
import { Charge } from '../models/charge.model'
import { addCharge } from '../services/charges.service'

export async function postChargeHandler(
  request: FastifyRequest<{ Body: Charge }>,
  reply: FastifyReply
) {
  const result = addCharge(request.body)

  if (!result.success) {
    return reply.status(400).send({ error: result.message })
  }

  return reply.status(201).send({ message: result.message })
}
