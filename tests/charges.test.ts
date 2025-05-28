import app from '../src/app'
import { ChargesRepository } from '../src/repositories/charges.repository'

describe('POST /charges', () => {
  beforeEach(async () => {
    await ChargesRepository.clearAll()
  })

  it('deve rejeitar uma cobrança duplicada', async () => {
    const payload = [
      {
        chargeId: 'c123',
        partnerId: 'net-01',
        amount: 199.9,
        reference: '2024-01',
        timestamp: '2024-01-15T10:00:00Z',
      },
    ]

    await app.inject({ method: 'POST', url: '/charges', payload })
    const response = await app.inject({
      method: 'POST',
      url: '/charges',
      payload,
    })

    expect(response.statusCode).toBe(400)
    const body = response.json()
    expect(body.processed[0].status).toBe('duplicate')
  })
})
