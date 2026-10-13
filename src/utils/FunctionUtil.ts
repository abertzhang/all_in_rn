import {Singleton} from './Singleton';

type AnyFunc = (...args: any[]) => any;

/** 函数工具：防抖、节流、只执行一次、记忆化、sleep、重试、组合。 */
export class FunctionUtil extends Singleton {
  /** 防抖：wait 毫秒内多次调用只触发一次 */
  debounce<T extends AnyFunc>(
    fn: T,
    wait = 300,
    options?: {leading?: boolean; trailing?: boolean},
  ): T & {cancel: () => void} {
    let timer: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: any[] | null = null;
    let lastThis: any = null;
    const leading = options?.leading ?? false;
    const trailing = options?.trailing ?? true;
    const debounced = function (this: any, ...args: any[]) {
      lastArgs = args;
      lastThis = this;
      const callNow = leading && timer === null;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        if (trailing && lastArgs) fn.apply(lastThis, lastArgs);
      }, wait);
      if (callNow) fn.apply(lastThis, args);
    } as any;
    debounced.cancel = () => {
      if (timer) clearTimeout(timer);
      timer = null;
    };
    return debounced;
  }

  /** 节流：每 wait 毫秒最多触发一次 */
  throttle<T extends AnyFunc>(fn: T, wait = 300): T & {cancel: () => void} {
    let last = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let lastArgs: any[] | null = null;
    let lastThis: any = null;
    const throttled = function (this: any, ...args: any[]) {
      const now = Date.now();
      const remaining = wait - (now - last);
      lastArgs = args;
      lastThis = this;
      if (remaining <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        last = now;
        fn.apply(lastThis, lastArgs);
      } else if (!timer) {
        timer = setTimeout(() => {
          last = Date.now();
          timer = null;
          if (lastArgs) fn.apply(lastThis, lastArgs);
        }, remaining);
      }
    } as any;
    throttled.cancel = () => {
      if (timer) clearTimeout(timer);
      timer = null;
    };
    return throttled;
  }

  /** 包装为只执行一次（首次结果被缓存） */
  once<T extends AnyFunc>(fn: T): T {
    let called = false;
    let res: any;
    return function (this: any, ...args: any[]) {
      if (!called) {
        called = true;
        res = fn.apply(this, args);
      }
      return res;
    } as T;
  }

  /** 记忆化：相同参数只计算一次（默认以 JSON 序列化做 key） */
  memoize<T extends AnyFunc>(fn: T, resolver?: (...args: any[]) => string): T {
    const cache = new Map<string, any>();
    return function (this: any, ...args: any[]) {
      const key = resolver ? resolver(...args) : JSON.stringify(args);
      if (cache.has(key)) return cache.get(key);
      const val = fn.apply(this, args);
      cache.set(key, val);
      return val;
    } as T;
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /** 失败自动重试：retries 次，间隔 delay*backoff^i 递增 */
  async retry<T>(
    fn: () => Promise<T>,
    options?: {retries?: number; delay?: number; backoff?: number},
  ): Promise<T> {
    const retries = options?.retries ?? 3;
    const delay = options?.delay ?? 300;
    const backoff = options?.backoff ?? 2;
    let lastErr: any;
    for (let i = 0; i <= retries; i++) {
      try {
        return await fn();
      } catch (err) {
        lastErr = err;
        if (i < retries) await this.sleep(delay * Math.pow(backoff, i));
      }
    }
    throw lastErr;
  }

  /** 从左到右依次执行：pipe(f,g)(x) = g(f(x)) */
  pipe<T>(...fns: Array<(arg: any) => any>): (arg: T) => any {
    return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg);
  }

  /** 从右到左组合：compose(f,g)(x) = f(g(x)) */
  compose<T>(...fns: Array<(arg: any) => any>): (arg: T) => any {
    return (arg: T) => fns.reduceRight((acc, fn) => fn(acc), arg);
  }

  noop(): void {}
}
