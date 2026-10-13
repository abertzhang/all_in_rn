/**
 * 主题色（Theme Colors）
 * ---------------------------------------------------------------------------
 * 这是项目的第一套主题色（default 主题体系），按「语义」而非「硬编码」组织，
 * 组件应当引用语义名（如 primary / background），而不是直接写 16 进制色值，
 * 这样后续切换配色或新增主题时只需改这里，无需改动业务组件。
 *
 * 当前提供 light 与 dark 两套外观，通过 getTheme(mode) 获取。
 * 想新增另一套配色（例如「午夜蓝」「护眼绿」），只需再写一个
 * 满足 ThemeColors 接口的对象，并登记到 themes 即可。
 */

/** 主题模式：浅色 / 深色 */
export type ThemeMode = 'light' | 'dark';

/** 一套完整主题色必须实现的字段 */
export interface ThemeColors {
  // —— 品牌主色（用于按钮、链接、高亮、Tab 选中态等）——
  primary: string;
  primaryLight: string;
  primaryDark: string;

  // —— 辅助色（用于次级强调、标签、渐变等）——
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;

  // —— 状态 / 语义色（成功 / 警告 / 错误 / 提示）——
  success: string;
  warning: string;
  error: string;
  info: string;

  // —— 中性色 & 表面（背景、卡片、文字、边框等）——
  background: string;
  surface: string;
  surfaceVariant: string;
  text: string;
  textSecondary: string;
  textDisabled: string;
  border: string;
  divider: string;

  // —— 遮罩（弹窗蒙层、半透明浮层等）——
  overlay: string;
  backdrop: string;
}

/** 浅色主题：明亮背景 + 蓝色品牌主色 */
export const lightTheme: ThemeColors = {
  // 品牌主色
  primary: '#3B6EF6',
  primaryLight: '#6B94F9',
  primaryDark: '#2A53D6',
  // 辅助色
  secondary: '#6C5CE7',
  secondaryLight: '#9388EE',
  secondaryDark: '#5346C4',
  // 状态色
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  // 中性 & 表面
  background: '#FFFFFF',
  surface: '#F7F8FA',
  surfaceVariant: '#EEF0F4',
  text: '#1A1D24',
  textSecondary: '#6B7280',
  textDisabled: '#A0A6B0',
  border: '#E3E6EC',
  divider: '#EDEFF3',
  // 遮罩
  overlay: 'rgba(0, 0, 0, 0.5)',
  backdrop: 'rgba(0, 0, 0, 0.4)',
};

/** 深色主题：暗色背景 + 提亮的品牌主色 */
export const darkTheme: ThemeColors = {
  // 品牌主色
  primary: '#5B8BFF',
  primaryLight: '#84A9FF',
  primaryDark: '#3B6EF6',
  // 辅助色
  secondary: '#8B7CF0',
  secondaryLight: '#A99BF5',
  secondaryDark: '#6C5CE7',
  // 状态色
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',
  // 中性 & 表面
  background: '#0F1115',
  surface: '#171A21',
  surfaceVariant: '#1F2430',
  text: '#F2F4F8',
  textSecondary: '#9BA3B0',
  textDisabled: '#5C6470',
  border: '#2A2F3A',
  divider: '#22262F',
  // 遮罩
  overlay: 'rgba(0, 0, 0, 0.6)',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

/** 主题注册表：新增配色时在此登记 */
export const themes: Record<ThemeMode, ThemeColors> = {
  light: lightTheme,
  dark: darkTheme,
};

/**
 * 按模式获取主题色。
 * @param mode 主题模式，默认 'light'
 * @returns 对应的 ThemeColors
 */
export function getTheme(mode: ThemeMode = 'light'): ThemeColors {
  return themes[mode];
}

/** 默认导出浅色主题，方便 `import theme from '../theme/colors'` 直接拿默认色板 */
export default lightTheme;
