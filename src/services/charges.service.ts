import { Charge } from '../models/charge.model'
import { ChargesRepository } from '../repositories/charges.repository'

export function addCharge(charge: Charge): { success: boolean; message: string } {
  if (ChargesRepository.exists(charge.chargeId)) {
    return { success: false, message: 'A cobrança já existe!' }
  }
  ChargesRepository.add(charge)
  return { success: true, message: 'Cobrança adicionada com sucesso!' }
}