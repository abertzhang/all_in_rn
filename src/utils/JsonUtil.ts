import {Singleton} from './Singleton';
import {ObjectUtil} from './ObjectUtil';

/** JSON 工具：安全解析/序列化、克隆、按路径读写、拍平/还原。 */
export class JsonUtil extends Singleton {
  /** 安全解析，失败返回 defaultValue */
  parse<T = any>(text: string, defaultValue?: T): T {
    try {
      return JSON.parse(text) as T;
    } catch {
      return defaultValue as T;
    }
  }

  /** 安全序列化，失败返回 fallback */
  stringify(value: any, fallback = ''): string {
    try {
      return JSON.stringify(value);
    } catch {
      return fallback;
    }
  }

  /** 基于 JSON 的深拷贝（不支持函数/循环引用/undefined） */
  clone<T>(value: T): T {
    if (value === null || typeof value !== 'object') return value;
    return JSON.parse(JSON.stringify(value)) as T;
  }

  get<T = any>(
    obj: any,
    path: string | (string | number)[],
    defaultValue?: T,
  ): T {
    return ObjectUtil.shared().get(obj, path, defaultValue);
  }

  set(obj: any, path: string | (string | number)[], value: any): void {
    ObjectUtil.shared().set(obj, path, value);
  }

  isEqual(a: any, b: any): boolean {
    return ObjectUtil.shared().isEqual(a, b);
  }

  /** 嵌套对象拍平为点路径：{a:{b:1}} -> {'a.b':1} */
  flatten(obj: Record<string, any>, prefix = ''): Record<string, any> {
    const res: Record<string, any> = {};
    for (const key of Object.keys(obj)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (this._isPlain(obj[key]))
        Object.assign(res, this.flatten(obj[key], path));
      else res[path] = obj[key];
    }
    return res;
  }

  /** 还原拍平对象 */
  unflatten(flat: Record<string, any>): Record<string, any> {
    const res: Record<string, any> = {};
    for (const key of Object.keys(flat)) {
      this.set(res, key, flat[key]);
    }
    return res;
  }

  private _isPlain(v: any): boolean {
    return v !== null && typeof v === 'object' && !Array.isArray(v);
  }
}
