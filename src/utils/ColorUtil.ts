import {Singleton} from './Singleton';

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

/** 颜色工具：hex/rgb 互转、透明度、明暗调整、混合、明暗判断。 */
export class ColorUtil extends Singleton {
  /** #fff / #ffffff / ffffff -> {r,g,b}；非法返回 null */
  hexToRgb(hex: string): {r: number; g: number; b: number} | null {
    let h = hex.replace('#', '');
    if (h.length === 3)
      h = h
        .split('')
        .map(c => c + c)
        .join('');
    if (h.length !== 6) return null;
    const num = parseInt(h, 16);
    if (Number.isNaN(num)) return null;
    return {r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255};
  }

  rgbToHex(r: number, g: number, b: number): string {
    const to = (n: number) =>
      clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
    return `#${to(r)}${to(g)}${to(b)}`;
  }

  /** 叠加 alpha 得到 rgba() 字符串 */
  rgba(hex: string, alpha: number): string {
    const c = this.hexToRgb(hex);
    if (!c) return hex;
    return `rgba(${c.r}, ${c.g}, ${c.b}, ${clamp(alpha, 0, 1)})`;
  }

  /** 变亮：amount 0~1 */
  lighten(hex: string, amount: number): string {
    const c = this.hexToRgb(hex);
    if (!c) return hex;
    return this.rgbToHex(
      c.r + 255 * amount,
      c.g + 255 * amount,
      c.b + 255 * amount,
    );
  }

  /** 变暗：amount 0~1 */
  darken(hex: string, amount: number): string {
    const c = this.hexToRgb(hex);
    if (!c) return hex;
    return this.rgbToHex(
      c.r - 255 * amount,
      c.g - 255 * amount,
      c.b - 255 * amount,
    );
  }

  /** 两色按权重混合，weight=0.5 中间色 */
  mixHex(a: string, b: string, weight = 0.5): string {
    const ca = this.hexToRgb(a);
    const cb = this.hexToRgb(b);
    if (!ca || !cb) return a;
    return this.rgbToHex(
      ca.r + (cb.r - ca.r) * weight,
      ca.g + (cb.g - ca.g) * weight,
      ca.b + (cb.b - ca.b) * weight,
    );
  }

  /** 是否“暗色”（用于自动选择文字颜色） */
  isDark(hex: string): boolean {
    const c = this.hexToRgb(hex);
    if (!c) return false;
    const yiq = (c.r * 299 + c.g * 587 + c.b * 114) / 1000;
    return yiq < 128;
  }
}
