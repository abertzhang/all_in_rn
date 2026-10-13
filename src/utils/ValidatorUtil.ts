import {Singleton} from './Singleton';

/** 校验工具：邮箱/手机/URL/IP/身份证/银行卡/强密码等常用校验。 */
export class ValidatorUtil extends Singleton {
  isEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  /** region: 'CN' 中国大陆手机号 | 'US' 美国 | 'any' 国际 */
  isPhone(value: string, region: 'CN' | 'US' | 'any' = 'CN'): boolean {
    if (region === 'CN') return /^1[3-9]\d{9}$/.test(value);
    if (region === 'US')
      return /^\+?1?\d{10}$/.test(value.replace(/[\s()-]/g, ''));
    return /^\+?\d{6,15}$/.test(value.replace(/[\s()-]/g, ''));
  }

  isURL(value: string): boolean {
    try {
      const url = /^https?:\/\//.test(value) ? value : `https://${value}`;
      const u = new URL(url);
      return !!u.hostname;
    } catch {
      return false;
    }
  }

  /** 是否为“空值”：null/undefined/空串/空数组/空对象 */
  isEmptyValue(value: unknown): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object')
      return Object.keys(value as object).length === 0;
    return false;
  }

  isInteger(value: unknown): value is number {
    return typeof value === 'number' && Number.isInteger(value);
  }

  isJSON(value: string): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }

  isIPv4(value: string): boolean {
    const parts = value.split('.');
    if (parts.length !== 4) return false;
    return parts.every(
      p => /^\d{1,3}$/.test(p) && Number(p) >= 0 && Number(p) <= 255,
    );
  }

  isPostalCodeCN(value: string): boolean {
    return /^\d{6}$/.test(value);
  }

  isIDCardCN(value: string): boolean {
    return /^\d{17}[\dXx]$/.test(value);
  }

  /** Luhn 算法校验银行卡号 */
  isCreditCard(value: string): boolean {
    const v = value.replace(/\s|-/g, '');
    if (!/^\d{13,19}$/.test(v)) return false;
    let sum = 0;
    let alt = false;
    for (let i = v.length - 1; i >= 0; i--) {
      let n = Number(v[i]);
      if (alt) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      sum += n;
      alt = !alt;
    }
    return sum % 10 === 0;
  }

  isNumber(value: unknown): value is number {
    return typeof value === 'number' && !Number.isNaN(value);
  }

  isPort(value: number): boolean {
    return Number.isInteger(value) && value >= 0 && value <= 65535;
  }

  /** 强密码校验，默认至少 8 位 */
  isStrongPassword(
    value: string,
    opts?: {
      min?: number;
      max?: number;
      requireNumber?: boolean;
      requireLetter?: boolean;
      requireSpecial?: boolean;
    },
  ): boolean {
    const min = opts?.min ?? 8;
    const max = opts?.max ?? Infinity;
    if (value.length < min || value.length > max) return false;
    if (opts?.requireNumber && !/\d/.test(value)) return false;
    if (opts?.requireLetter && !/[a-zA-Z]/.test(value)) return false;
    if (opts?.requireSpecial && !/[^a-zA-Z0-9]/.test(value)) return false;
    return true;
  }
}
