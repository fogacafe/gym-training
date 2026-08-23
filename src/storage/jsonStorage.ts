export class JsonStorage<T> {
  constructor(
    private readonly key: string,
    private readonly fallback: T,
  ) {}

  read(): T {
    const raw = localStorage.getItem(this.key)

    if (!raw) {
      return this.fallback
    }

    try {
      return JSON.parse(raw) as T
    } catch {
      return this.fallback
    }
  }

  write(value: T): void {
    localStorage.setItem(this.key, JSON.stringify(value))
    window.dispatchEvent(new Event(this.changeEventName))
  }

  subscribe(listener: () => void): () => void {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === this.key) {
        listener()
      }
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener(this.changeEventName, listener)

    return () => {
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener(this.changeEventName, listener)
    }
  }

  private get changeEventName(): string {
    return `storage:${this.key}:changed`
  }
}
