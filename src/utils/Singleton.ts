/**
 * 单例基类。
 * 所有工具类继承它后，通过 `XxxUtil.shared()` 获取全局唯一实例，禁止直接 `new`。
 *
 * 使用示例：
 *   import {DateUtil} from './utils';
 *   DateUtil.shared().format(new Date(), 'YYYY-MM-DD');
 */
export class Singleton {
  /** 已创建的单例实例表（按类名缓存） */
  private static _store = new Map<string, Singleton>();

  /**
   * 构造（公开，但单例请统一用 `XxxUtil.shared()` 获取）。
   * 直接 `new` 也可用，只是不会进入单例缓存。
   */
  constructor() {}

  /** 获取当前工具类的全局单例 */
  static shared<T extends Singleton>(this: new () => T): T {
    const key = (this as any).name as string;
    if (!Singleton._store.has(key)) {
      Singleton._store.set(key, new this());
    }
    return Singleton._store.get(key) as T;
  }

  /** 清空所有单例缓存（主要用于测试） */
  static reset(): void {
    Singleton._store.clear();
  }
}
