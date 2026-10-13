import {Singleton} from './Singleton';

/** 数字工具：区间约束、取整、映射、随机数、千分位、货币/文件大小/时长格式化。 */
export class NumberUtil extends Singleton {
  /** 将 value 限制在 [min, max] */
  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /** 保留 decimals 位小数（四舍五入） */
  roundTo(value: number, decimals = 0): number {
    const f = Math.pow(10, decimals);
    return Math.round(value * f) / f;
  }

  /** 线性插值 */
  lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  /** 数值区间映射 */
  mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number,
  ): number {
    if (inMax === inMin) return outMin;
    return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
  }

  isNumber(value: unknown): value is number {
    return typeof value === 'number' && !Number.isNaN(value);
  }

  /** 英文序数：1 -> 1st, 2 -> 2nd ... */
  ordinal(n: number): string {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  /** [min, max] 闭区间随机整数 */
  randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** [min, max) 随机浮点 */
  randomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  /** 千分位分隔（不依赖 Intl） */
  thousands(value: number, separator = ','): string {
    const [int, dec] = String(value).split('.');
    const sign = int.startsWith('-') ? '-' : '';
    const digits = sign ? int.slice(1) : int;
    const withSep = digits.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return sign + withSep + (dec !== undefined ? '.' + dec : '');
  }

  /** 百分比字符串，如 toPercent(0.1234, 1) -> '12.3%' */
  toPercent(value: number, decimals = 0): string {
    return this.roundTo(value * 100, decimals).toFixed(decimals) + '%';
  }

  /** 数字千分位格式化（支持小数位） */
  formatNumber(value: number, decimals = 0): string {
    const fixed = value.toFixed(decimals);
    const [int, dec] = fixed.split('.');
    const sign = int.startsWith('-') ? '-' : '';
    const digits = sign ? int.slice(1) : int;
    const withSep = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return sign + withSep + (dec ? '.' + dec : '');
  }

  /** 货币格式化，默认 ¥ */
  formatCurrency(value: number, currency = 'CNY', decimals = 2): string {
    const symbols: Record<string, string> = {
      CNY: '¥',
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
    };
    const sym = symbols[currency] || '';
    const fixed = Math.abs(value).toFixed(decimals);
    const [int, dec] = fixed.split('.');
    const sign = value < 0 ? '-' : '';
    const withSep = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${sign}${sym}${withSep}${dec ? '.' + dec : ''}`;
  }

  /** 文件大小：formatFileSize(1536) -> '1.50 KB' */
  formatFileSize(bytes: number, decimals = 2): string {
    if (bytes <= 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.min(
      Math.floor(Math.log(bytes) / Math.log(k)),
      sizes.length - 1,
    );
    return `${(bytes / Math.pow(k, i)).toFixed(decimals)} ${sizes[i]}`;
  }

  /** 秒数转 mm:ss 或 hh:mm:ss */
  formatDuration(seconds: number): string {
    const total = Math.max(0, Math.floor(seconds));
    const s = total % 60;
    const m = Math.floor((total / 60) % 60);
    const h = Math.floor(total / 3600);
    const pad = (n: number) => String(n).padStart(2, '0');
    return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  }
}
