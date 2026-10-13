import {Singleton} from './Singleton';

/** 对象工具：深拷贝、深合并、pick/omit、按路径 get/set/has、相等比较、映射、空值判断等。 */
export class ObjectUtil extends Singleton {
  isObject(value: unknown): value is Record<string, any> {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  /** 递归深拷贝（支持 Date；函数按引用复制） */
  deepClone<T>(value: T): T {
    if (value === null || typeof value !== 'object') return value;
    if (value instanceof Date) return new Date(value.getTime()) as any;
    if (Array.isArray(value))
      return value.map(item => this.deepClone(item)) as any;
    const out: any = {};
    for (const key of Object.keys(value as object)) {
      out[key] = this.deepClone((value as any)[key]);
    }
    return out;
  }

  /** 递归合并多个对象（后者覆盖前者，纯对象递归合并，其他直接替换） */
  deepMerge<T extends Record<string, any>>(
    target: T,
    ...sources: (Partial<T> | undefined)[]
  ): T {
    const out: any = this.deepClone(target);
    for (const src of sources) {
      if (!src) continue;
      for (const key of Object.keys(src)) {
        const sv = (src as any)[key];
        const tv = out[key];
        if (this.isObject(sv) && this.isObject(tv))
          out[key] = this.deepMerge(tv, sv);
        else out[key] = this.deepClone(sv);
      }
    }
    return out;
  }

  pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const res = {} as Pick<T, K>;
    for (const k of keys) if (k in obj) res[k] = obj[k];
    return res;
  }

  omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const res = {...obj} as any;
    for (const k of keys) delete res[k];
    return res;
  }

  /** 安全按路径取值，支持 'a.b.c' 或 ['a',0,'b'] */
  get<T = any>(
    obj: any,
    path: string | (string | number)[],
    defaultValue?: T,
  ): T {
    const parts = Array.isArray(path)
      ? path
      : path
          .split('.')
          .map(p => p.trim())
          .filter(Boolean);
    let cur: any = obj;
    for (const p of parts) {
      if (cur == null) return defaultValue as T;
      cur = cur[p];
    }
    return (cur === undefined ? defaultValue : cur) as T;
  }

  /** 按路径设值（必要时自动创建中间对象） */
  set(obj: any, path: string | (string | number)[], value: any): void {
    const parts = Array.isArray(path)
      ? path
      : path
          .split('.')
          .map(p => p.trim())
          .filter(Boolean);
    let cur = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      const p = parts[i];
      if (cur[p] == null || typeof cur[p] !== 'object') cur[p] = {};
      cur = cur[p];
    }
    cur[parts[parts.length - 1]] = value;
  }

  /** 路径是否存在 */
  has(obj: any, path: string | (string | number)[]): boolean {
    const parts = Array.isArray(path)
      ? path
      : path
          .split('.')
          .map(p => p.trim())
          .filter(Boolean);
    let cur: any = obj;
    for (const p of parts) {
      if (cur == null || !(p in cur)) return false;
      cur = cur[p];
    }
    return true;
  }

  /** 深度相等比较（数组/对象/原始值） */
  isEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (a == null || b == null) return a === b;
    if (typeof a !== 'object') return a === b;
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every(k => this.isEqual(a[k], b[k]));
  }

  mapValues<T extends object, U>(
    obj: T,
    fn: (value: T[keyof T], key: keyof T) => U,
  ): Record<keyof T, U> {
    const res = {} as Record<keyof T, U>;
    for (const k of Object.keys(obj) as (keyof T)[])
      res[k] = fn((obj as any)[k], k);
    return res;
  }

  mapKeys<T extends object>(
    obj: T,
    fn: (key: keyof T, value: T[keyof T]) => string,
  ): Record<string, T[keyof T]> {
    const res: Record<string, T[keyof T]> = {};
    for (const k of Object.keys(obj) as (keyof T)[])
      res[fn(k, (obj as any)[k])] = (obj as any)[k];
    return res;
  }

  isEmpty(obj: any): boolean {
    if (obj == null) return true;
    if (typeof obj === 'string' || Array.isArray(obj)) return obj.length === 0;
    if (typeof obj === 'object') return Object.keys(obj).length === 0;
    return false;
  }

  /** 键值反转 */
  invert(obj: Record<string, string>): Record<string, string> {
    const res: Record<string, string> = {};
    for (const k of Object.keys(obj)) res[obj[k]] = k;
    return res;
  }
}
