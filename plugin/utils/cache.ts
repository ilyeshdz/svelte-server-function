import { readFile, writeFile } from "./file-system";

type CacheValue = string | Record<string, any>;

export class FileBackedCache {
  private memory = new Map<string, CacheValue>();
  private readonly filePath?: string;

  constructor(filePath?: string) {
    this.filePath = filePath;
  }

  get(key: string) {
    return this.memory.get(key);
  }

  set(key: string, value: CacheValue) {
    this.memory.set(key, value);
  }

  has(key: string) {
    return this.memory.has(key);
  }

  delete(key: string) {
    this.memory.delete(key);
  }

  clear() {
    this.memory.clear();
  }

  entries(): [string, CacheValue][] {
    return Array.from(this.memory.entries());
  }

  toObject(): Record<string, CacheValue> {
    return Object.fromEntries(this.memory.entries());
  }

  async load() {
    if (!this.filePath) return;
    try {
      const raw = await readFile(this.filePath);
      const parsed = JSON.parse(raw) as Record<string, CacheValue>;
      for (const [key, value] of Object.entries(parsed)) {
        this.memory.set(key, value);
      }
    } catch {
      // Ignore missing file or parse errors
    }
  }

  async persist() {
    if (!this.filePath) return;
    const json = JSON.stringify(this.toObject(), null, 2);
    await writeFile(this.filePath, json);
  }
}
