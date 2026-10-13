import {Singleton} from './Singleton';

/** 字符串工具：命名风格转换、截断、填充、模板、脱敏、slug 等。 */
export class StringUtil extends Singleton {
  /** 转小驼峰：hello_world / hello-world -> helloWorld */
  camelCase(str: string): string {
    const s = str
      .replace(/[-_\s]+(.)?/g, (_, c: string) => (c ? c.toUpperCase() : ''))
      .replace(/^(.)/, (_, c: string) => c.toLowerCase());
    return s;
  }

  /** 转大驼峰/Pascal：hello_world -> HelloWorld */
  pascalCase(str: string): string {
    const c = this.camelCase(str);
    return c.charAt(0).toUpperCase() + c.slice(1);
  }

  /** 转下划线：helloWorld -> hello_world */
  snakeCase(str: string): string {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .replace(/[-\s]+/g, '_')
      .toLowerCase();
  }

  /** 转中划线：helloWorld -> hello-world */
  kebabCase(str: string): string {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[_\s]+/g, '-')
      .toLowerCase();
  }

  /** 首字母大写 */
  capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /** 首字母小写 */
  uncapitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  /** 截断并补后缀 */
  truncate(str: string, length: number, suffix = '...'): string {
    if (str.length <= length) return str;
    return str.slice(0, Math.max(0, length - suffix.length)) + suffix;
  }

  padStart(str: string, length: number, char = ' '): string {
    return str.padStart(length, char);
  }

  padEnd(str: string, length: number, char = ' '): string {
    return str.padEnd(length, char);
  }

  repeat(str: string, n: number): string {
    return str.repeat(Math.max(0, n));
  }

  /** 字符串反转 */
  reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  /** 是否为空白（null/undefined/纯空白） */
  isBlank(str: string | null | undefined): boolean {
    return str === null || str === undefined || str.trim().length === 0;
  }

  /** 是否为空串（零长度，不含空白判断） */
  isEmpty(str: string | null | undefined): boolean {
    return str === null || str === undefined || str.length === 0;
  }

  /** 忽略大小写比较 */
  equalsIgnoreCase(a: string, b: string): boolean {
    return a.toLowerCase() === b.toLowerCase();
  }

  /** 提取所有连续字母/数字词 */
  words(str: string): string[] {
    return str.match(/[A-Za-z0-9]+/g) ?? [];
  }

  /** 生成 URL 友好的 slug */
  slugify(str: string): string {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  /** 中间脱敏：mask('13812345678') -> 138****5678 */
  mask(str: string, start = 3, end = 4, maskChar = '*'): string {
    if (str.length <= start + end) return maskChar.repeat(str.length);
    const head = str.slice(0, start);
    const tail = str.slice(str.length - end);
    const mid = maskChar.repeat(str.length - start - end);
    return head + mid + tail;
  }

  /** 模板插值：template('Hi {{name}}', {name:'Tom'}) -> 'Hi Tom' */
  template(tpl: string, data: Record<string, any>): string {
    return tpl.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k: string) =>
      data[k] !== undefined ? String(data[k]) : '',
    );
  }

  pluralize(word: string, count: number, suffix = 's'): string {
    return `${count} ${count === 1 ? word : word + suffix}`;
  }

  /** 去除 HTML 标签 */
  stripTags(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }

  /** 统计子串出现次数 */
  countSubstring(str: string, sub: string): number {
    if (!sub) return 0;
    return str.split(sub).length - 1;
  }
}
