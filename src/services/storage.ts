/**
 * Centralized Storage Service Interface & Adapters
 *
 * Designed following Clean Architecture principles:
 * - Abstract storage interface (`IStorageAdapter`).
 * - Prepared for web LocalStorage, IndexedDB, or Native mobile persistent storage (Capacitor/MMKV).
 * - Strict typing and graceful fallback.
 */

export interface IStorageAdapter {
  get<T>(key: string, defaultValue: T): Promise<T>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}

/**
 * Web LocalStorage Adapter implementation
 */
export class LocalStorageAdapter implements IStorageAdapter {
  private prefix: string;

  constructor(prefix = 'vdl_app_') {
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  async get<T>(key: string, defaultValue: T): Promise<T> {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return defaultValue;
      }
      const item = localStorage.getItem(this.getKey(key));
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  async set<T>(key: string, value: T): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(this.getKey(key), JSON.stringify(value));
      }
    } catch {
      // Graceful fail in private browsing mode or quota exceeded
    }
  }

  async remove(key: string): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(this.getKey(key));
      }
    } catch {
      // Graceful ignore
    }
  }

  async clear(): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        Object.keys(localStorage)
          .filter((k) => k.startsWith(this.prefix))
          .forEach((k) => localStorage.removeItem(k));
      }
    } catch {
      // Graceful ignore
    }
  }
}

/**
 * In-Memory Storage Adapter (Placeholder for mock testing / SSR environments)
 */
export class MemoryStorageAdapter implements IStorageAdapter {
  private store = new Map<string, unknown>();

  async get<T>(key: string, defaultValue: T): Promise<T> {
    return this.store.has(key) ? (this.store.get(key) as T) : defaultValue;
  }

  async set<T>(key: string, value: T): Promise<void> {
    this.store.set(key, value);
  }

  async remove(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }
}

export const storageAdapter: IStorageAdapter = new LocalStorageAdapter();

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = typeof window !== 'undefined' ? localStorage.getItem(`vdl_app_${key}`) : null;
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`vdl_app_${key}`, JSON.stringify(value));
      }
    } catch {
      // Ignore
    }
  },
  remove: (key: string): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(`vdl_app_${key}`);
      }
    } catch {
      // Ignore
    }
  },
};

export default storage;

