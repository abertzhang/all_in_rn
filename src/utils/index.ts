/**
 * 通用工具库（单例模式）统一出口。
 *
 * 使用方式：
 *   import {DateUtil, CryptoUtil} from './utils';
 *   DateUtil.shared.format(new Date(), 'YYYY-MM-DD');
 *   CryptoUtil.shared.md5('hello');
 *
 * 涵盖：数组 / 字符串 / 数字 / 日期 / 对象 / JSON / 加密哈希 / URL / 校验 / 颜色 / 平台 / 存储 / 函数。
 */
export * from './Singleton';
export * from './ArrayUtil';
export * from './StringUtil';
export * from './NumberUtil';
export * from './DateUtil';
export * from './ObjectUtil';
export * from './JsonUtil';
export * from './CryptoUtil';
export * from './UrlUtil';
export * from './ValidatorUtil';
export * from './ColorUtil';
export * from './PlatformUtil';
export * from './StorageUtil';
export * from './FunctionUtil';
