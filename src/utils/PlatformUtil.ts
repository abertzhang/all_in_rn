import {Platform, Dimensions} from 'react-native';
import {Singleton} from './Singleton';

export type PlatformName =
  | 'ios'
  | 'android'
  | 'harmonyos'
  | 'web'
  | 'windows'
  | 'macos'
  | 'unknown';

/** 平台工具：基于 react-native 的 Platform，统一获取系统/版本及平台判断。 */
export class PlatformUtil extends Singleton {
  get os(): PlatformName {
    try {
      return (Platform.OS as PlatformName) ?? 'unknown';
    } catch {
      return 'unknown';
    }
  }

  get version(): string {
    try {
      return Platform.Version ? String(Platform.Version) : 'unknown';
    } catch {
      return 'unknown';
    }
  }

  get isIOS(): boolean {
    return this.os === 'ios';
  }

  get isAndroid(): boolean {
    return this.os === 'android';
  }

  get isHarmony(): boolean {
    return this.os === 'harmonyos';
  }

  get isNative(): boolean {
    return this.isIOS || this.isAndroid || this.isHarmony;
  }

  get isWeb(): boolean {
    return this.os === 'web';
  }

  /** 粗略判平板：窗口较短边 >= 600 */
  get isTablet(): boolean {
    const {width, height} = Dimensions.get('window');
    return Math.min(width, height) >= 600;
  }

  /** 按平台选择取值，可带 fallback */
  select<T>(
    map: Partial<Record<PlatformName, T>>,
    fallback?: T,
  ): T | undefined {
    return map[this.os] ?? fallback;
  }
}
