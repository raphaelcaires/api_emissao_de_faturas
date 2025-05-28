import app from '../src/app'
import { ChargesRepository } from '../src/repositories/charges.repository'

describe('GET /invoices', () => {
  beforeEach(() => {
    ChargesRepository.clearAll()
  })

  it('deve gerar faturas agrupadas por partnerId e ordenar por total decrescente', async () => {
    const charges = [
      {
        chargeId: 'c001',
        partnerId: 'net-01',
        amount: 200.0,
        reference: '2024-01',
        timestamp: '2024-01-15T10:00:00Z',
      },
      {
        chargeId: 'c002',
        partnerId: 'claro-12',
        amount: 150.0,
        reference: '2024-01',
        timestamp: '2024-01-15T10:00:00Z',
      },
      {
        chargeId: 'c003',
        partnerId: 'net-01',
        amount: 300.0,
        reference: '2024-01',
        timestamp: '2024-01-15T10:00:00Z',
      },
    ]

    await app.inject({ method: 'POST', url: '/charges', payload: charges })

    const response = await app.inject({ method: 'GET', url: '/invoices' })
    expect(response.statusCode).toBe(200)

    const invoices = response.json()
    expect(invoices).toHaveLength(2)
    expect(invoices[0].partnerId).toBe('net-01')
    expect(invoices[0].total).toBe(500)
    expect(invoices[1].partnerId).toBe('claro-12')
    expect(invoices[1].total).toBe(150)
  })

  it('deve remover as cobranças da memória após gerar as faturas', async () => {
    const charges = [
      {
        chargeId: 'c001',
        partnerId: 'net-01',
        amount: 200.0,
        reference: '2024-01',
        timestamp: '2024-01-15T10:00:00Z',
      },
      {
        chargeId: 'c002',
        partnerId: 'claro-12',
        amount: 150.0,
        reference: '2024-01',
        timestamp: '2024-01-15T10:00:00Z',
      },
      {
        chargeId: 'c003',
        partnerId: 'net-01',
        amount: 300.0,
        reference: '2024-01',
        timestamp: '2024-01-15T10:00:00Z',
      },
    ]

    await app.inject({ method: 'POST', url: '/charges', payload: charges })
    await app.inject({ method: 'GET', url: '/invoices' })
    expect(ChargesRepository.getAll()).toHaveLength(0)
  })
})
