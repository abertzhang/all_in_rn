import React, {useReducer, useEffect} from 'react';
import {ScrollView, View, Text, Button, StyleSheet} from 'react-native';
import {getTheme} from '../../theme';

// 接入项目主题色（浅色主题）
const theme = getTheme('light');

/**
 * ZustandExample —— Zustand 轻量状态管理演示页
 * ---------------------------------------------------------------------------
 * Zustand 是社区里极简的全局状态库：一个 create() 生成“共享 store”，
 * 任意组件用 useStore(s => s.xxx) 读取 / 用 action 修改，无需 Provider、无需 Context。
 *
 * ⚠️ 该 RN 宿主工程遵循“不安装三方包（避免破坏鸿蒙构建）”的约定，因此本页：
 *   1) 默认不 require zustand（避免 require 缺失包在 Metro inlineRequires 下抛错）；
 *   2) 始终使用下方「内置极小兼容层」实现等价交互（页面照常可跑）；
 *   3) 末尾给出标准 Zustand 用法代码参考 + 安装命令；
 *   4) 若正式安装 zustand，把 hasRealZustand 改为动态探测 require('zustand').create 即可切换官方库。
 */

/**
 * 该 RN 宿主工程遵循“不安装三方包（避免破坏鸿蒙构建）”的约定，
 * 默认未安装 zustand，因此本页始终使用下方「内置极小兼容层」实现等价交互。
 * 若后续正式安装 zustand（npm install zustand），把 hasRealZustand 改为
 * 动态探测 require('zustand').create 即可无缝切换到官方库。
 */
const hasRealZustand = false;

/**
 * 极简 zustand 兼容层（兜底实现）
 * API 与 zustand 对齐：
 *   const useStore = create((set, get) => ({ ...state, action }))
 *   const slice = useStore(s => s.field)
 * 仅在项目未安装 zustand 时使用；装上官方库后页面交互完全一致。
 */
function createFallback<T extends object>(
  initializer: (
    set: (partial: Partial<T> | ((s: T) => Partial<T>)) => void,
    get: () => T,
  ) => T,
): (selector: (s: T) => any) => any {
  let state: T = initializer(
    partial => {
      const next =
        typeof partial === 'function'
          ? (partial as (s: T) => Partial<T>)(state)
          : partial;
      state = {...state, ...next};
      listeners.forEach(l => l());
    },
    () => state,
  );
  const listeners = new Set<() => void>();
  const useStore = (selector: (s: T) => any) => {
    const [, forceRender] = useReducer((c: number) => c + 1, 0);
    useEffect(() => {
      const l = () => forceRender();
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    }, []);
    return selector(state);
  };
  return useStore;
}

// 已安装用真库，否则用兜底；二者 initializer 写法完全一样
const makeCreate = createFallback;

/* —— 2. 定义共享 store（全局单例）——
 * 无论真库还是兜底，下面这套写法都成立：state + action 放在一起。 */
interface CounterState {
  count: number;
  inc: () => void;
  dec: () => void;
  reset: () => void;
}

const useCounterStore = makeCreate((set: any) => ({
  count: 0,
  inc: () => set((s: CounterState) => ({count: s.count + 1})),
  dec: () => set((s: CounterState) => ({count: s.count - 1})),
  reset: () => set({count: 0}),
}));

/* 计数器面板：从同一 store 读取 / 调用 action，证明全局共享 */
function CounterPanel({label}: {label: string}): JSX.Element {
  const count = useCounterStore((s: CounterState) => s.count);
  const inc = useCounterStore((s: CounterState) => s.inc);
  const dec = useCounterStore((s: CounterState) => s.dec);
  const reset = useCounterStore((s: CounterState) => s.reset);

  return (
    <View style={styles.panel}>
      <Text style={styles.panelLabel}>{label}</Text>
      <Text style={styles.panelCount}>{count}</Text>
      <View style={styles.btnRow}>
        <Button title="-1" onPress={dec} />
        <Button title="重置" onPress={reset} />
        <Button title="+1" onPress={inc} />
      </View>
    </View>
  );
}

function ZustandExample(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heroTitle}>Zustand 轻量全局状态</Text>
      <Text style={styles.heroNote}>
        一个 create() 生成共享 store；组件用 useStore(s =&gt; s.xxx) 读值、 用
        action 改值，无需 Provider / Context。
      </Text>

      {/* 同一 store 被两个面板共享，改一个另一个同步更新 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>1. 多组件共享同一个 store</Text>
        <Text style={styles.tip}>
          下面两个面板读取的是同一个全局 store，在任意一个里
          +1/-1，另一个会同步变化。
        </Text>
        <CounterPanel label="面板 A" />
        <CounterPanel label="面板 B" />
      </View>

      {/* 派生值：用 selector 只取需要的切片（selector 用法） */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>2. selector 按需取值</Text>
        <CountParity />
        <Text style={styles.tip}>
          useStore(s =&gt; s.count % 2 === 0) 只订阅“奇偶”这一派生值，
          组件只在结果变化时才重渲染，避免无关更新。
        </Text>
      </View>

      {/* 未安装 zustand 时展示标准用法参考 */}
      {!hasRealZustand && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            标准 Zustand 用法参考（当前工程未安装 zustand）
          </Text>
          <Text style={styles.code}>
            {
              '// 安装：npm install zustand\n\nimport {create} from "zustand";\n\nconst useCounter = create((set) => ({\n  count: 0,\n  inc: () => set((s) => ({ count: s.count + 1 })),\n  dec: () => set((s) => ({ count: s.count - 1 })),\n  reset: () => set({ count: 0 }),\n}));\n\n// 组件内使用\nexport default function Page() {\n  const count = useCounter((s) => s.count);\n  const inc = useCounter((s) => s.inc);\n  return <Button title={`+${count}`} onPress={inc} />;\n}'
            }
          </Text>
          <Text style={styles.tip}>
            本页已用「内置极小兼容层」实现等价交互，无需安装即可运行；
            正式项目建议执行 npm install zustand 使用官方库（API 完全一致）。
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

/* 派生切片组件：只订阅 count 的奇偶结果 */
function CountParity(): JSX.Element {
  const isEven = useCounterStore((s: CounterState) => s.count % 2 === 0);
  return (
    <Text style={styles.kv}>当前 count 是 {isEven ? '偶数' : '奇数'}</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: theme.background,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 8,
    marginBottom: 6,
  },
  heroNote: {
    fontSize: 13,
    color: theme.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.border,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 10,
  },
  panel: {
    backgroundColor: theme.background,
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: theme.divider,
  },
  panelLabel: {
    fontSize: 13,
    color: theme.textSecondary,
    marginBottom: 4,
  },
  panelCount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  kv: {
    fontSize: 14,
    color: theme.text,
    marginTop: 6,
  },
  tip: {
    fontSize: 12,
    color: theme.textSecondary,
    lineHeight: 18,
    marginTop: 8,
  },
  code: {
    fontSize: 11,
    color: theme.text,
    backgroundColor: theme.surfaceVariant,
    borderRadius: 6,
    padding: 10,
    marginTop: 6,
    fontFamily: 'Courier',
    lineHeight: 16,
  },
});

export default ZustandExample;
