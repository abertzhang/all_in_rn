import {Singleton} from './Singleton';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export type DateInput = Date | number | string;

/** 日期工具：格式化、加减、差值、相对时间、日历判断等。基于原生 Date，跨平台可用。 */
export class DateUtil extends Singleton {
  static readonly SECOND = 1000;
  static readonly MINUTE = 60 * 1000;
  static readonly HOUR = 60 * 60 * 1000;
  static readonly DAY = 24 * 60 * 60 * 1000;

  /** 统一转 Date（字符串/时间戳/Date） */
  toDate(input: DateInput): Date {
    return input instanceof Date ? input : new Date(input);
  }

  /**
   * 格式化日期。占位符：YYYY YY MM M DD D HH H mm m ss s A
   * 例：format(d, 'YYYY-MM-DD HH:mm:ss') -> '2026-10-13 16:46:00'
   */
  format(input: DateInput, format = 'YYYY-MM-DD'): string {
    const d = this.toDate(input);
    const map: Record<string, string> = {
      YYYY: String(d.getFullYear()),
      YY: String(d.getFullYear()).slice(-2),
      MM: String(d.getMonth() + 1).padStart(2, '0'),
      M: String(d.getMonth() + 1),
      DD: String(d.getDate()).padStart(2, '0'),
      D: String(d.getDate()),
      HH: String(d.getHours()).padStart(2, '0'),
      H: String(d.getHours()),
      mm: String(d.getMinutes()).padStart(2, '0'),
      m: String(d.getMinutes()),
      ss: String(d.getSeconds()).padStart(2, '0'),
      s: String(d.getSeconds()),
      A: d.getHours() < 12 ? 'AM' : 'PM',
    };
    return format.replace(
      /YYYY|YY|MM|M|DD|D|HH|H|mm|m|ss|s|A/g,
      (token: string) => map[token],
    );
  }

  addDays(input: DateInput, days: number): Date {
    const d = this.toDate(input);
    d.setDate(d.getDate() + days);
    return d;
  }

  addMonths(input: DateInput, months: number): Date {
    const d = this.toDate(input);
    d.setMonth(d.getMonth() + months);
    return d;
  }

  addYears(input: DateInput, years: number): Date {
    const d = this.toDate(input);
    d.setFullYear(d.getFullYear() + years);
    return d;
  }

  /** 相差天数（向下取整） */
  diffDays(a: DateInput, b: DateInput): number {
    return Math.floor(
      (this.toDate(a).getTime() - this.toDate(b).getTime()) / DateUtil.DAY,
    );
  }

  /** 相差毫秒数 */
  diffMs(a: DateInput, b: DateInput): number {
    return this.toDate(a).getTime() - this.toDate(b).getTime();
  }

  isToday(input: DateInput): boolean {
    return this.isSameDay(input, new Date());
  }

  isSameDay(a: DateInput, b: DateInput): boolean {
    const da = this.toDate(a);
    const db = this.toDate(b);
    return (
      da.getFullYear() === db.getFullYear() &&
      da.getMonth() === db.getMonth() &&
      da.getDate() === db.getDate()
    );
  }

  startOfDay(input: DateInput): Date {
    const d = this.toDate(input);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  endOfDay(input: DateInput): Date {
    const d = this.toDate(input);
    d.setHours(23, 59, 59, 999);
    return d;
  }

  /** 相对时间：'just now' / '5m ago' / 'in 3h' / '2d ago' ... */
  fromNow(input: DateInput, now: Date = new Date()): string {
    const d = this.toDate(input);
    const diff = now.getTime() - d.getTime();
    const abs = Math.abs(diff);
    const future = diff < 0;
    const rtf = (n: number, unit: string) =>
      `${future ? 'in ' : ''}${n}${unit}${future ? '' : ' ago'}`;
    if (abs < DateUtil.MINUTE) return 'just now';
    if (abs < DateUtil.HOUR) return rtf(Math.floor(abs / DateUtil.MINUTE), 'm');
    if (abs < DateUtil.DAY) return rtf(Math.floor(abs / DateUtil.HOUR), 'h');
    if (abs < 30 * DateUtil.DAY)
      return rtf(Math.floor(abs / DateUtil.DAY), 'd');
    if (abs < 365 * DateUtil.DAY)
      return rtf(Math.floor(abs / (30 * DateUtil.DAY)), 'mo');
    return rtf(Math.floor(abs / (365 * DateUtil.DAY)), 'y');
  }

  isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  daysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  getWeekday(input: DateInput): string {
    return WEEKDAYS[this.toDate(input).getDay()];
  }

  getMonthName(input: DateInput): string {
    return MONTHS[this.toDate(input).getMonth()];
  }
}
