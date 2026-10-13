import {Singleton} from './Singleton';

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

/** UTF-8 字符串 -> 字节数组（含 4 字节代理对处理） */
function utf8ToBytes(str: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < str.length; i++) {
    let code = str.charCodeAt(i);
    if (code < 0x80) {
      bytes.push(code);
    } else if (code < 0x800) {
      bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    } else if (code >= 0xd800 && code <= 0xdbff && i + 1 < str.length) {
      const hi = code;
      const lo = str.charCodeAt(++i);
      code = 0x10000 + ((hi - 0xd800) << 10) + (lo - 0xdc00);
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f),
      );
    } else {
      bytes.push(
        0xe0 | (code >> 12),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f),
      );
    }
  }
  return bytes;
}

/** 字节数组 -> UTF-8 字符串 */
function utf8FromBytes(bytes: number[]): string {
  let str = '';
  let i = 0;
  while (i < bytes.length) {
    const b1 = bytes[i++];
    if (b1 < 0x80) {
      str += String.fromCharCode(b1);
    } else if (b1 >> 5 === 6) {
      const b2 = bytes[i++];
      str += String.fromCharCode(((b1 & 0x1f) << 6) | (b2 & 0x3f));
    } else if (b1 >> 4 === 14) {
      const b2 = bytes[i++];
      const b3 = bytes[i++];
      str += String.fromCharCode(
        ((b1 & 0x0f) << 12) | ((b2 & 0x3f) << 6) | (b3 & 0x3f),
      );
    } else {
      const b2 = bytes[i++];
      const b3 = bytes[i++];
      const b4 = bytes[i++];
      let cp =
        ((b1 & 0x07) << 18) |
        ((b2 & 0x3f) << 12) |
        ((b3 & 0x3f) << 6) |
        (b4 & 0x3f);
      cp -= 0x10000;
      str += String.fromCharCode(0xd800 + (cp >> 10), 0xdc00 + (cp & 0x3ff));
    }
  }
  return str;
}

/**
 * 加密/哈希工具（纯 JS 实现，跨 RN / OpenHarmony 可用）。
 * 说明：base64 / 哈希 / XOR 混淆用于防明文与校验，如需要强加密请使用原生 crypto 模块。
 */
export class CryptoUtil extends Singleton {
  // ---------------- Base64（UTF-8 安全） ----------------
  base64Encode(input: string): string {
    const bytes = utf8ToBytes(input);
    let out = '';
    for (let i = 0; i < bytes.length; i += 3) {
      const a = bytes[i];
      const b = i + 1 < bytes.length ? bytes[i + 1] : NaN;
      const c = i + 2 < bytes.length ? bytes[i + 2] : NaN;
      const e1 = a >> 2;
      const e2 = ((a & 3) << 4) | (isNaN(b) ? 0 : b >> 4);
      const e3 = isNaN(b) ? 64 : ((b & 15) << 2) | (isNaN(c) ? 0 : c >> 6);
      const e4 = isNaN(c) ? 64 : c & 63;
      out +=
        B64[e1] +
        B64[e2] +
        (e3 === 64 ? '=' : B64[e3]) +
        (e4 === 64 ? '=' : B64[e4]);
    }
    return out;
  }

  base64Decode(input: string): string {
    const str = input.replace(/[^A-Za-z0-9+/=]/g, '');
    const bytes: number[] = [];
    for (let i = 0; i < str.length; i += 4) {
      const c1 = B64.indexOf(str[i]);
      const c2 = B64.indexOf(str[i + 1]);
      const c3 = str[i + 2] === '=' ? 64 : B64.indexOf(str[i + 2]);
      const c4 = str[i + 3] === '=' ? 64 : B64.indexOf(str[i + 3]);
      const b1 = (c1 << 2) | (c2 >> 4);
      const b2 = ((c2 & 15) << 4) | (c3 >> 2);
      const b3 = ((c3 & 3) << 6) | c4;
      bytes.push(b1);
      if (c3 !== 64) bytes.push(b2);
      if (c4 !== 64) bytes.push(b3);
    }
    return utf8FromBytes(bytes);
  }

  // ---------------- 哈希（非安全，用于校验/去重） ----------------
  /** cyrb53：快速、低碰撞的非加密哈希，返回 53 位数值 */
  cyrb53(str: string, seed = 0): number {
    let h1 = 0xdeadbeef ^ seed;
    let h2 = 0x41c6ce57 ^ seed;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }

  /** cyrb53 的 8 位十六进制表示 */
  hash(str: string, seed = 0): string {
    return (this.cyrb53(str, seed) >>> 0).toString(16).padStart(8, '0');
  }

  /** FNV-1a 32 位哈希 */
  fnv1a(str: string): number {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  // ---------------- 简单异或可逆混淆（非安全加密） ----------------
  xorEncrypt(str: string, key: string): string {
    if (!key) throw new Error('xor key required');
    const bytes = utf8ToBytes(str);
    const kb = utf8ToBytes(key);
    const out = bytes.map((b, i) => b ^ kb[i % kb.length]);
    return this.base64Encode(utf8FromBytes(out));
  }

  xorDecrypt(payload: string, key: string): string {
    if (!key) throw new Error('xor key required');
    const bytes = utf8ToBytes(this.base64Decode(payload));
    const kb = utf8ToBytes(key);
    const out = bytes.map((b, i) => b ^ kb[i % kb.length]);
    return utf8FromBytes(out);
  }

  // ---------------- 标准摘要算法 ----------------
  /** MD5（纯 JS 实现，返回 32 位小写十六进制） */
  md5(input: string): string {
    const utf8 = (() => {
      const bytes = utf8ToBytes(input);
      let s = '';
      for (const b of bytes) s += String.fromCharCode(b);
      return s;
    })();

    const safeAdd = (x: number, y: number): number => {
      const lsw = (x & 0xffff) + (y & 0xffff);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xffff);
    };
    const bitRotateLeft = (num: number, cnt: number): number =>
      (num << cnt) | (num >>> (32 - cnt));
    const md5cmn = (
      q: number,
      a: number,
      b: number,
      x: number,
      s: number,
      t: number,
    ): number =>
      safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
    const md5ff = (
      a: number,
      b: number,
      c: number,
      d: number,
      x: number,
      s: number,
      t: number,
    ): number => md5cmn((b & c) | (~b & d), a, b, x, s, t);
    const md5gg = (
      a: number,
      b: number,
      c: number,
      d: number,
      x: number,
      s: number,
      t: number,
    ): number => md5cmn((d & b) | (~d & c), a, b, x, s, t);
    const md5hh = (
      a: number,
      b: number,
      c: number,
      d: number,
      x: number,
      s: number,
      t: number,
    ): number => md5cmn(b ^ c ^ d, a, b, x, s, t);
    const md5ii = (
      a: number,
      b: number,
      c: number,
      d: number,
      x: number,
      s: number,
      t: number,
    ): number => md5cmn(c ^ (b | ~d), a, b, x, s, t);

    const nblk = ((utf8.length + 8) >> 6) + 1;
    const wordArray: number[] = new Array(nblk * 16);
    for (let i = 0; i < wordArray.length; i++) wordArray[i] = 0;
    for (let i = 0; i < utf8.length; i++) {
      wordArray[i >> 2] |= (utf8.charCodeAt(i) & 0xff) << ((i % 4) * 8);
    }
    wordArray[utf8.length >> 2] |= 0x80 << ((utf8.length % 4) * 8);
    wordArray[nblk * 16 - 2] = utf8.length * 8;
    wordArray[nblk * 16 - 1] = 0;

    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;

    for (let i = 0; i < wordArray.length; i += 16) {
      const aa = a;
      const bb = b;
      const cc = c;
      const dd = d;

      a = md5ff(a, b, c, d, wordArray[i + 0], 7, -680876936);
      d = md5ff(d, a, b, c, wordArray[i + 1], 12, -389564586);
      c = md5ff(c, d, a, b, wordArray[i + 2], 17, 606105819);
      b = md5ff(b, c, d, a, wordArray[i + 3], 22, -1044525330);
      a = md5ff(a, b, c, d, wordArray[i + 4], 7, -176418897);
      d = md5ff(d, a, b, c, wordArray[i + 5], 12, 1200080426);
      c = md5ff(c, d, a, b, wordArray[i + 6], 17, -1473231341);
      b = md5ff(b, c, d, a, wordArray[i + 7], 22, -45705983);
      a = md5ff(a, b, c, d, wordArray[i + 8], 7, 1770035416);
      d = md5ff(d, a, b, c, wordArray[i + 9], 12, -1958414417);
      c = md5ff(c, d, a, b, wordArray[i + 10], 17, -42063);
      b = md5ff(b, c, d, a, wordArray[i + 11], 22, -1990404162);
      a = md5ff(a, b, c, d, wordArray[i + 12], 7, 1804603682);
      d = md5ff(d, a, b, c, wordArray[i + 13], 12, -40341101);
      c = md5ff(c, d, a, b, wordArray[i + 14], 17, -1502002290);
      b = md5ff(b, c, d, a, wordArray[i + 15], 22, 1236535329);

      a = md5gg(a, b, c, d, wordArray[i + 1], 5, -165796510);
      d = md5gg(d, a, b, c, wordArray[i + 6], 9, -1069501632);
      c = md5gg(c, d, a, b, wordArray[i + 11], 14, 643717713);
      b = md5gg(b, c, d, a, wordArray[i + 0], 20, -373897302);
      a = md5gg(a, b, c, d, wordArray[i + 5], 5, -701558691);
      d = md5gg(d, a, b, c, wordArray[i + 10], 9, 38016083);
      c = md5gg(c, d, a, b, wordArray[i + 15], 14, -660478335);
      b = md5gg(b, c, d, a, wordArray[i + 4], 20, -405537848);
      a = md5gg(a, b, c, d, wordArray[i + 9], 5, 568446438);
      d = md5gg(d, a, b, c, wordArray[i + 14], 9, -1019803690);
      c = md5gg(c, d, a, b, wordArray[i + 3], 14, -187363961);
      b = md5gg(b, c, d, a, wordArray[i + 8], 20, 1163531501);
      a = md5gg(a, b, c, d, wordArray[i + 13], 5, -1444681467);
      d = md5gg(d, a, b, c, wordArray[i + 2], 9, -51403784);
      c = md5gg(c, d, a, b, wordArray[i + 7], 14, 1735328473);
      b = md5gg(b, c, d, a, wordArray[i + 12], 20, -1926607734);

      a = md5hh(a, b, c, d, wordArray[i + 5], 4, -378558);
      d = md5hh(d, a, b, c, wordArray[i + 8], 11, -2022574463);
      c = md5hh(c, d, a, b, wordArray[i + 11], 16, 1839030562);
      b = md5hh(b, c, d, a, wordArray[i + 14], 23, -35309556);
      a = md5hh(a, b, c, d, wordArray[i + 1], 4, -1530992060);
      d = md5hh(d, a, b, c, wordArray[i + 4], 11, 1272893353);
      c = md5hh(c, d, a, b, wordArray[i + 7], 16, -155497632);
      b = md5hh(b, c, d, a, wordArray[i + 10], 23, -1094730640);
      a = md5hh(a, b, c, d, wordArray[i + 13], 4, 681279174);
      d = md5hh(d, a, b, c, wordArray[i + 0], 11, -358537222);
      c = md5hh(c, d, a, b, wordArray[i + 3], 16, -722521979);
      b = md5hh(b, c, d, a, wordArray[i + 6], 23, 76029189);
      a = md5hh(a, b, c, d, wordArray[i + 9], 4, -640364487);
      d = md5hh(d, a, b, c, wordArray[i + 12], 11, -421815835);
      c = md5hh(c, d, a, b, wordArray[i + 15], 16, 530742520);
      b = md5hh(b, c, d, a, wordArray[i + 2], 23, -995338651);

      a = md5ii(a, b, c, d, wordArray[i + 0], 6, -198630844);
      d = md5ii(d, a, b, c, wordArray[i + 7], 10, 1126891415);
      c = md5ii(c, d, a, b, wordArray[i + 14], 15, -1416354905);
      b = md5ii(b, c, d, a, wordArray[i + 5], 21, -57434055);
      a = md5ii(a, b, c, d, wordArray[i + 12], 6, 1700485571);
      d = md5ii(d, a, b, c, wordArray[i + 3], 10, -1894986606);
      c = md5ii(c, d, a, b, wordArray[i + 10], 15, -1051523);
      b = md5ii(b, c, d, a, wordArray[i + 1], 21, -2054922799);
      a = md5ii(a, b, c, d, wordArray[i + 8], 6, 1873313359);
      d = md5ii(d, a, b, c, wordArray[i + 15], 10, -30611744);
      c = md5ii(c, d, a, b, wordArray[i + 6], 15, -1560198380);
      b = md5ii(b, c, d, a, wordArray[i + 13], 21, 1309151649);
      a = md5ii(a, b, c, d, wordArray[i + 4], 6, -145523070);
      d = md5ii(d, a, b, c, wordArray[i + 11], 10, -1120210379);
      c = md5ii(c, d, a, b, wordArray[i + 2], 15, 718787259);
      b = md5ii(b, c, d, a, wordArray[i + 9], 21, -343485551);

      a = safeAdd(a, aa);
      b = safeAdd(b, bb);
      c = safeAdd(c, cc);
      d = safeAdd(d, dd);
    }

    const toHex = (n: number): string => {
      let s = '';
      for (let i = 0; i < 4; i++) {
        const v = (n >> (i * 8)) & 0xff;
        s += ('0' + v.toString(16)).slice(-2);
      }
      return s;
    };
    return toHex(a) + toHex(b) + toHex(c) + toHex(d);
  }

  /** SHA-256（纯 JS 实现，返回 64 位小写十六进制） */
  sha256(input: string): string {
    const bytes = utf8ToBytes(input);
    const K = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
      0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
      0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
      0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
      0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
      0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
      0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
      0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
      0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ];
    const H = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c,
      0x1f83d9ab, 0x5be0cd19,
    ];

    const bitLen = bytes.length * 8;
    const msg = bytes.slice();
    msg.push(0x80);
    while (msg.length % 64 !== 56) msg.push(0);
    msg.push(0, 0, 0, 0);
    msg.push(
      (bitLen >>> 24) & 0xff,
      (bitLen >>> 16) & 0xff,
      (bitLen >>> 8) & 0xff,
      bitLen & 0xff,
    );

    const rotr = (n: number, x: number): number => (x >>> n) | (x << (32 - n));

    for (let off = 0; off < msg.length; off += 64) {
      const w = new Array(64);
      for (let i = 0; i < 16; i++) {
        const j = off + i * 4;
        w[i] =
          (msg[j] << 24) | (msg[j + 1] << 16) | (msg[j + 2] << 8) | msg[j + 3];
      }
      for (let i = 16; i < 64; i++) {
        const s0 = rotr(7, w[i - 15]) ^ rotr(18, w[i - 15]) ^ (w[i - 15] >>> 3);
        const s1 = rotr(17, w[i - 2]) ^ rotr(19, w[i - 2]) ^ (w[i - 2] >>> 10);
        w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
      }
      let a = H[0];
      let b = H[1];
      let c = H[2];
      let d = H[3];
      let e = H[4];
      let f = H[5];
      let g = H[6];
      let h = H[7];
      for (let i = 0; i < 64; i++) {
        const S1 = rotr(6, e) ^ rotr(11, e) ^ rotr(25, e);
        const ch = (e & f) ^ (~e & g);
        const t1 = (h + S1 + ch + K[i] + w[i]) | 0;
        const S0 = rotr(2, a) ^ rotr(13, a) ^ rotr(22, a);
        const maj = (a & b) ^ (a & c) ^ (b & c);
        const t2 = (S0 + maj) | 0;
        h = g;
        g = f;
        f = e;
        e = (d + t1) | 0;
        d = c;
        c = b;
        b = a;
        a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0;
      H[1] = (H[1] + b) | 0;
      H[2] = (H[2] + c) | 0;
      H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0;
      H[5] = (H[5] + f) | 0;
      H[6] = (H[6] + g) | 0;
      H[7] = (H[7] + h) | 0;
    }

    return H.map(v => ('00000000' + (v >>> 0).toString(16)).slice(-8)).join('');
  }

  // ---------------- 随机 / 标识 ----------------
  /** RFC4122 v4 UUID */
  uuidV4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  randomString(
    length = 8,
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  ): string {
    let s = '';
    for (let i = 0; i < length; i++)
      s += chars.charAt(this._rand(chars.length));
    return s;
  }

  randomHexColor(): string {
    return '#' + this.randomString(6, '0123456789abcdef');
  }

  private _rand(n: number): number {
    return Math.floor(Math.random() * n);
  }
}
