import {Singleton} from './Singleton';

/** 数组工具：切片、去重、分组、扁平化、随机抽样、统计等。纯函数，不修改原数组。 */
export class ArrayUtil extends Singleton {
  /** 按 size 等分切片 */
  chunk<T>(arr: readonly T[], size: number): T[][] {
    if (size <= 0) throw new Error('chunk size must be > 0');
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
    return res;
  }

  /** 去重（基于 ===） */
  unique<T>(arr: readonly T[]): T[] {
    return Array.from(new Set(arr));
  }

  /** 按 key 去重，保留首次出现的元素 */
  uniqueBy<T, K>(arr: readonly T[], keyFn: (item: T) => K): T[] {
    const seen = new Set<K>();
    const res: T[] = [];
    for (const item of arr) {
      const k = keyFn(item);
      if (!seen.has(k)) {
        seen.add(k);
        res.push(item);
      }
    }
    return res;
  }

  /** 按 keyFn 分组为 Record */
  groupBy<T, K extends string | number>(
    arr: readonly T[],
    keyFn: (item: T) => K,
  ): Record<K, T[]> {
    const res = {} as Record<K, T[]>;
    for (const item of arr) {
      const k = keyFn(item);
      if (!res[k]) res[k] = [];
      res[k].push(item);
    }
    return res;
  }

  /** 仅拍平一层 */
  flatten<T>(arr: readonly (T | T[])[]): T[] {
    const res: T[] = [];
    for (const item of arr) {
      if (Array.isArray(item)) res.push(...item);
      else res.push(item);
    }
    return res;
  }

  /** 递归拍平任意层级 */
  flattenDeep<T>(arr: any[]): T[] {
    const res: T[] = [];
    const walk = (x: any) => {
      if (Array.isArray(x)) x.forEach(walk);
      else res.push(x);
    };
    arr.forEach(walk);
    return res;
  }

  /** 原地之外的 Fisher–Yates 洗牌 */
  shuffle<T>(arr: readonly T[]): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  /** 随机抽取 n 个（不重复） */
  sample<T>(arr: readonly T[], n = 1): T[] {
    return this.shuffle(arr).slice(0, n);
  }

  /** 数值求和 */
  sum(arr: readonly number[]): number {
    return arr.reduce((acc, x) => acc + x, 0);
  }

  /** 数值平均值，空数组返回 0 */
  average(arr: readonly number[]): number {
    return arr.length ? this.sum(arr) / arr.length : 0;
  }

  /** 按 valueFn 取最大值对应的元素 */
  maxBy<T>(arr: readonly T[], valueFn: (item: T) => number): T | undefined {
    let best: T | undefined;
    let bestVal = Number.NEGATIVE_INFINITY;
    for (const item of arr) {
      const v = valueFn(item);
      if (v > bestVal) {
        bestVal = v;
        best = item;
      }
    }
    return best;
  }

  /** 按 valueFn 取最小值对应的元素 */
  minBy<T>(arr: readonly T[], valueFn: (item: T) => number): T | undefined {
    let best: T | undefined;
    let bestVal = Number.POSITIVE_INFINITY;
    for (const item of arr) {
      const v = valueFn(item);
      if (v < bestVal) {
        bestVal = v;
        best = item;
      }
    }
    return best;
  }

  /** 交集（保留 a 的顺序） */
  intersection<T>(a: readonly T[], b: readonly T[]): T[] {
    const set = new Set(b);
    return a.filter(x => set.has(x));
  }

  /** 差集：在 a 但不在 b */
  difference<T>(a: readonly T[], b: readonly T[]): T[] {
    const set = new Set(b);
    return a.filter(x => !set.has(x));
  }

  /** 多数组并集（去重，保留首次出现顺序） */
  union<T>(...arrays: (readonly T[])[]): T[] {
    const set = new Set<T>();
    const res: T[] = [];
    for (const arr of arrays) {
      for (const x of arr) {
        if (!set.has(x)) {
          set.add(x);
          res.push(x);
        }
      }
    }
    return res;
  }

  /** 按断言拆分为 [满足, 不满足] 两组 */
  partition<T>(arr: readonly T[], predicate: (item: T) => boolean): [T[], T[]] {
    const pass: T[] = [];
    const fail: T[] = [];
    for (const item of arr) (predicate(item) ? pass : fail).push(item);
    return [pass, fail];
  }

  /** 生成数字序列。range(5) => 0..4；range(1,5) => 1..4；支持负 step */
  range(start: number, end?: number, step = 1): number[] {
    if (end === undefined) {
      end = start;
      start = 0;
    }
    const res: number[] = [];
    if (step > 0) for (let i = start; i < end; i += step) res.push(i);
    else if (step < 0) for (let i = start; i > end; i += step) res.push(i);
    return res;
  }

  first<T>(arr: readonly T[]): T | undefined {
    return arr[0];
  }

  last<T>(arr: readonly T[]): T | undefined {
    return arr[arr.length - 1];
  }

  /** 移动元素 from -> to（返回新数组） */
  move<T>(arr: readonly T[], from: number, to: number): T[] {
    const a = arr.slice();
    if (from < 0 || from >= a.length || to < 0 || to >= a.length) return a;
    const [item] = a.splice(from, 1);
    a.splice(to, 0, item);
    return a;
  }

  /** 按 keyFn 计数 */
  countBy<T, K extends string | number>(
    arr: readonly T[],
    keyFn: (item: T) => K,
  ): Record<K, number> {
    const res = {} as Record<K, number>;
    for (const item of arr) {
      const k = keyFn(item);
      res[k] = (res[k] || 0) + 1;
    }
    return res;
  }

  /** 按索引两两组合 */
  zip<T, U>(a: readonly T[], b: readonly U[]): [T, U][] {
    const len = Math.min(a.length, b.length);
    const res: [T, U][] = [];
    for (let i = 0; i < len; i++) res.push([a[i], b[i]]);
    return res;
  }
}
