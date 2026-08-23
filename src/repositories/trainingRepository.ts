import type { Training } from '../domain/training'
import { JsonStorage } from '../storage/jsonStorage'

const trainingStorage = new JsonStorage<Training[]>('@gymtraining_trainings', [])

export const trainingRepository = {
  getAll(): Training[] {
    return trainingStorage.read()
  },

  getById(id?: string): Training | null {
    if (!id) {
      return null
    }

    return trainingStorage.read().find((training) => training.id === id) ?? null
  },

  add(training: Training): void {
    trainingStorage.write([...trainingStorage.read(), training])
  },

  remove(id: string): void {
    trainingStorage.write(
      trainingStorage.read().filter((training) => training.id !== id),
    )
  },

  subscribe(listener: () => void): () => void {
    return trainingStorage.subscribe(listener)
  },
}
