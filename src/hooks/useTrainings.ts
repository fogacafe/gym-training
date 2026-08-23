import { useSyncExternalStore } from 'react'
import { trainingRepository } from '../repositories/trainingRepository'

export function useTrainings() {
  const trainings = useSyncExternalStore(
    trainingRepository.subscribe,
    trainingRepository.getAll,
    trainingRepository.getAll,
  )

  return {
    trainings,
    removeTraining: trainingRepository.remove,
  }
}
