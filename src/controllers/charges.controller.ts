import { FastifyRequest, FastifyReply } from 'fastify'
import { Charge } from '../models/charge.model'
import { addCharge } from '../services/charges.service'

export async function postChargeHandler(
  request: FastifyRequest<{ Body: Charge[] }>,
  reply: FastifyReply
) {
  const results = request.body.map(charge => {
    const result = addCharge(charge)
    return {
      chargeId: charge.chargeId || 'sem chargeId',
      status: result.status,
      message: result.message,
    }
  })

  const added = results.filter(r => r.status === 'added')
  const duplicates = results.filter(r => r.status === 'duplicate')
  const invalids = results.filter(r => r.status === 'invalid')

  const messages: string[] = []

  duplicates.forEach(d => messages.push(d.message))
  invalids.forEach(i => messages.push(i.message))

  let statusCode = 207
  if (added.length > 0 && duplicates.length === 0 && invalids.length === 0)
    statusCode = 201
  if (added.length === 0 && (duplicates.length > 0 || invalids.length > 0))
    statusCode = 400

  return reply.status(statusCode).send({
    success: true,
    processed: results,
  })
}
