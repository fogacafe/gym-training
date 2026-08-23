export class JsonStorage<T> {
  private cachedRaw: string | null | undefined
  private cachedValue: T

  constructor(
    private readonly key: string,
    private readonly fallback: T,
  ) {
    this.cachedValue = fallback
  }

  read(): T {
    const raw = localStorage.getItem(this.key)

    if (raw === this.cachedRaw) {
      return this.cachedValue
    }

    this.cachedRaw = raw

    if (!raw) {
      this.cachedValue = this.fallback
      return this.cachedValue
    }

    try {
      this.cachedValue = JSON.parse(raw) as T
    } catch {
      this.cachedValue = this.fallback
    }

    return this.cachedValue
  }

  write(value: T): void {
    const raw = JSON.stringify(value)
    localStorage.setItem(this.key, raw)
    this.cachedRaw = raw
    this.cachedValue = value
    window.dispatchEvent(new Event(this.changeEventName))
  }

  subscribe(listener: () => void): () => void {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === this.key) {
        this.cachedRaw = undefined
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
