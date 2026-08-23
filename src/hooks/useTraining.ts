import type { Training } from '../domain/training'
import { trainingRepository } from '../repositories/trainingRepository'

// Compatibility layer for the original pages. New UI code should prefer
// the repository directly or a real React hook such as useTrainings.
export function getTrainings(): Training[] {
  return trainingRepository.getAll()
}

export function addTraining(training: Training): void {
  trainingRepository.add(training)
}

export function getTraining(id?: string): Training | null {
  return trainingRepository.getById(id)
}

export function deleteTraining(id: string): void {
  trainingRepository.remove(id)
}
