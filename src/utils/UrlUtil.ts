import {Singleton} from './Singleton';

/** URL 工具：query 解析/拼接、取参、拼接、基址提取、绝对地址判定。 */
export class UrlUtil extends Singleton {
  /** 解析查询串为对象（自动 decodeURIComponent，'+' 视为空格） */
  parseQuery(search: string): Record<string, string> {
    const res: Record<string, string> = {};
    const qs = search.startsWith('?') ? search.slice(1) : search;
    if (!qs) return res;
    for (const pair of qs.split('&')) {
      if (!pair) continue;
      const idx = pair.indexOf('=');
      const rawKey = idx === -1 ? pair : pair.slice(0, idx);
      const rawVal = idx === -1 ? '' : pair.slice(idx + 1);
      const key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
      const val = decodeURIComponent(rawVal.replace(/\+/g, ' '));
      res[key] = val;
    }
    return res;
  }

  /** 拼接查询串（encode=true 默认编码；数组以逗号连接） */
  buildQuery(
    params: Record<string, any> | Array<[string, any]>,
    encode = true,
  ): string {
    const entries: Array<[string, any]> = Array.isArray(params)
      ? params
      : Object.entries(params);
    const pairs: string[] = [];
    for (const [k, v] of entries) {
      if (v === undefined || v === null) continue;
      const key = encode ? encodeURIComponent(String(k)) : String(k);
      const val = Array.isArray(v)
        ? v
            .map(x => (encode ? encodeURIComponent(String(x)) : String(x)))
            .join(',')
        : encode
        ? encodeURIComponent(String(v))
        : String(v);
      pairs.push(`${key}=${val}`);
    }
    return pairs.join('&');
  }

  /** 从 URL 中取某个查询参数 */
  getParam(url: string, key: string): string | null {
    const q = url.indexOf('?');
    if (q === -1) return null;
    return this.parseQuery(url.slice(q + 1))[key] ?? null;
  }

  /** 在现有 URL 上追加/覆盖查询参数（params 可为对象或查询字符串） */
  withQuery(url: string, params: Record<string, any> | string): string {
    const [base, existing] = url.split('?');
    const extra = typeof params === 'string' ? this.parseQuery(params) : params;
    const merged = {...this.parseQuery(existing ?? ''), ...extra};
    const qs = this.buildQuery(merged);
    return qs ? `${base}?${qs}` : base;
  }

  /** 去除 query 与 hash 的基址 */
  getBaseUrl(url: string): string {
    return url.split('?')[0].split('#')[0];
  }

  /** 是否为绝对地址（含协议） */
  isAbsolute(url: string): boolean {
    return /^[a-z][a-z0-9+.-]*:\/\//i.test(url) || /^mailto:/i.test(url);
  }
}
