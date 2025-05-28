import app from '../src/app'
import { ChargesRepository } from '../src/repositories/charges.repository'

describe('GET /invoices', () => {
  beforeEach(() => {
    ChargesRepository.clearAll()
  })

  it('deve gerar faturas agrupadas e remover cobranças', async () => {
    const charges = [
      {
        chargeId: 'c-003',
        partnerId: 'net',
        amount: 200,
        reference: 'internet',
        timestamp: new Date().toISOString(),
      },
      {
        chargeId: 'c-004',
        partnerId: 'claro',
        amount: 150,
        reference: 'tv',
        timestamp: new Date().toISOString(),
      },
      {
        chargeId: 'c-005',
        partnerId: 'net',
        amount: 300,
        reference: 'telefone',
        timestamp: new Date().toISOString(),
      },
    ]

    await app.inject({ method: 'POST', url: '/charges', payload: charges })

    const invoiceResponse = await app.inject({
      method: 'GET',
      url: '/invoices',
    })

    expect(invoiceResponse.statusCode).toBe(200)

    const body = invoiceResponse.json()
    expect(body.length).toBe(2)

    expect(body[0].partnerId).toBe('net')
    expect(body[0].total).toBe(500)

    const after = ChargesRepository.getAll()
    expect(after.length).toBe(0)
  })
})
