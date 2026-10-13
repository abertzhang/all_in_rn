import {Singleton} from './Singleton';

/** 键值存储后端接口（可插拔：默认内存实现，可替换为 AsyncStorage 等） */
export interface KeyValueStore {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
  getAllKeys(): Promise<string[]>;
}

class MemoryStorage implements KeyValueStore {
  private map = new Map<string, string>();
  async getItem(key: string): Promise<string | null> {
    return this.map.has(key) ? (this.map.get(key) as string) : null;
  }
  async setItem(key: string, value: string): Promise<void> {
    this.map.set(key, value);
  }
  async removeItem(key: string): Promise<void> {
    this.map.delete(key);
  }
  async clear(): Promise<void> {
    this.map.clear();
  }
  async getAllKeys(): Promise<string[]> {
    return Array.from(this.map.keys());
  }
}

/**
 * 存储工具（单例）。默认内存实现，适合无持久化需求的场景；
 * 接入 AsyncStorage 时：
 *   StorageUtil.shared.setBackend({
 *     getItem: k => AsyncStorage.getItem(k),
 *     setItem: (k, v) => AsyncStorage.setItem(k, v),
 *     removeItem: k => AsyncStorage.removeItem(k),
 *     clear: () => AsyncStorage.clear(),
 *     getAllKeys: () => AsyncStorage.getAllKeys().then(keys => keys as string[]),
 *   });
 */
export class StorageUtil extends Singleton {
  private backend: KeyValueStore = new MemoryStorage();

  setBackend(store: KeyValueStore): void {
    this.backend = store;
  }

  getBackend(): KeyValueStore {
    return this.backend;
  }

  async setItem(key: string, value: any): Promise<void> {
    const raw = typeof value === 'string' ? value : JSON.stringify(value);
    await this.backend.setItem(key, raw);
  }

  async getItem<T = any>(
    key: string,
    defaultValue?: T,
  ): Promise<T | undefined> {
    const raw = await this.backend.getItem(key);
    if (raw == null) return defaultValue;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return raw as unknown as T;
    }
  }

  async removeItem(key: string): Promise<void> {
    await this.backend.removeItem(key);
  }

  async clear(): Promise<void> {
    await this.backend.clear();
  }

  async getKeys(): Promise<string[]> {
    return this.backend.getAllKeys();
  }
}
