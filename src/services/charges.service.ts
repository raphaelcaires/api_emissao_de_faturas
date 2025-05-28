import { Charge } from '../models/charge.model'
import { ChargesRepository } from '../repositories/charges.repository'

type AddChargeResult = {
  success: boolean
  status: 'added' | 'duplicate' | 'invalid'
  message: string
}

export function addCharge(charge: Charge): AddChargeResult {
  const { chargeId, partnerId, amount, reference, timestamp } = charge

  if (
    !chargeId || typeof chargeId !== 'string' ||
    !partnerId || typeof partnerId !== 'string' ||
    typeof amount !== 'number' || isNaN(amount) ||
    !reference || typeof reference !== 'string' ||
    !timestamp || typeof timestamp !== 'string'
  ) {
    return {
      success: false,
      status: 'invalid',
      message: `Cobrança inválida: Campos obrigatórios ausentes ou mal formatados!`
    }
  }

  if (ChargesRepository.exists(chargeId)) {
    return {
      success: false,
      status: 'duplicate',
      message: `Cobrança ${charge.chargeId} já existe!`
    }
  }

  ChargesRepository.add(charge)
  return {
    success: true,
    status: 'added',
    message: `Cobrança ${charge.chargeId} adicionada com sucesso!`
  }
}
