import React, {createContext, useContext, useReducer, useEffect} from 'react';
import {ScrollView, View, Text, Button, StyleSheet} from 'react-native';
import {getTheme} from '../../theme';

// 接入项目主题色（浅色主题）
const theme = getTheme('light');

/**
 * ReduxExample —— Redux 全局状态管理演示页
 * ---------------------------------------------------------------------------
 * Redux 核心三件套：
 *   - store    ：唯一数据源（单一状态树）
 *   - reducer  ：纯函数 (state, action) => newState，决定如何更新
 *   - dispatch ：派发 action，触发 reducer 计算新 state
 * React 侧由 react-redux 提供 <Provider> + useSelector + useDispatch 把 store 接进来。
 *
 * ⚠️ 该 RN 宿主工程遵循“不安装三方包（避免破坏鸿蒙构建）”的约定，因此本页：
 *   1) 默认不 require @reduxjs/toolkit / react-redux（避免缺失包在 Metro 下抛错）；
 *   2) 始终使用下方「内置极小兼容层」实现等价交互（store / <Provider> / useSelector / useDispatch）；
 *   3) 末尾给出基于 Redux Toolkit 的标准用法代码参考 + 安装命令；
 *   4) 若正式安装这两包，把 reduxMod / reactReduxMod 改为动态探测 require(...) 即可切换官方库。
 */

/**
 * 该 RN 宿主工程遵循“不安装三方包（避免破坏鸿蒙构建）”的约定，
 * 默认未安装 @reduxjs/toolkit / react-redux，故本页始终使用下方
 * 「内置极小兼容层」实现等价交互（store / <Provider> / useSelector / useDispatch）。
 * 若后续正式安装这两包，把下方两行改为动态探测 require(...) 即可无缝切换官方库。
 */
let reduxMod: any = null;
let reactReduxMod: any = null;

/**
 * 极简 redux/react-redux 兼容层（兜底实现）
 * API 与官方对齐：createStore / <Provider store> / useSelector / useDispatch
 * 仅在项目未安装官方库时使用；装上后页面交互完全一致。
 */
interface Store {
  getState: () => any;
  dispatch: (action: any) => any;
  subscribe: (listener: () => void) => () => void;
}

function createFallbackStore(reducer: (state: any, action: any) => any): Store {
  let state = reducer(undefined, {type: '@@INIT'});
  const listeners = new Set<() => void>();
  return {
    getState: () => state,
    dispatch: (action: any) => {
      state = reducer(state, action);
      listeners.forEach(l => l());
      return action;
    },
    subscribe: (l: () => void) => {
      listeners.add(l);
      return () => {
        listeners.delete(l);
      };
    },
  };
}

// 兜底版 react-redux：用 Context 把 store 透传给子组件
const StoreContext = createContext<Store | null>(null);

function FallbackProvider({
  store,
  children,
}: {
  store: Store;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

function useFallbackSelector(selector: (state: any) => any): any {
  const store = useContext(StoreContext);
  const [, forceRender] = useReducer((c: number) => c + 1, 0);
  useEffect(() => {
    if (!store) {
      return;
    }
    const unsub = store.subscribe(() => forceRender());
    return unsub;
  }, [store]);
  return selector(store ? store.getState() : undefined);
}

function useFallbackDispatch(): (action: any) => any {
  const store = useContext(StoreContext);
  return store ? store.dispatch : () => {};
}

// 真库优先，否则兜底；二者 API 名称完全一致，demo 调用写法不变
const buildStore = (reducer: (state: any, action: any) => any): Store => {
  if (reduxMod?.configureStore) {
    return reduxMod.configureStore({reducer});
  }
  if (reduxMod?.createStore) {
    return reduxMod.createStore(reducer);
  }
  return createFallbackStore(reducer);
};
const ProviderImpl = reactReduxMod?.Provider ?? FallbackProvider;
const useSelectorImpl = reactReduxMod?.useSelector ?? useFallbackSelector;
const useDispatchImpl = reactReduxMod?.useDispatch ?? useFallbackDispatch;
const hasReal = !!(reduxMod && reactReduxMod);

/* —— 2. reducer：纯函数，按 action.type 返回全新 state —— */
const counterReducer = (state = {count: 0}, action: any) => {
  switch (action.type) {
    case 'increment':
      return {...state, count: state.count + 1};
    case 'decrement':
      return {...state, count: state.count - 1};
    case 'reset':
      return {...state, count: 0};
    default:
      return state;
  }
};

// 单一数据源：全局唯一的 store（模块级单例）
const store = buildStore(counterReducer);

/* 计数器面板：useSelector 读值 + useDispatch 派发 action */
function CounterPanel({label}: {label: string}): JSX.Element {
  const count = useSelectorImpl((s: any) => s.count);
  const dispatch = useDispatchImpl();
  return (
    <View style={styles.panel}>
      <Text style={styles.panelLabel}>{label}</Text>
      <Text style={styles.panelCount}>{count}</Text>
      <View style={styles.btnRow}>
        <Button title="-1" onPress={() => dispatch({type: 'decrement'})} />
        <Button title="重置" onPress={() => dispatch({type: 'reset'})} />
        <Button title="+1" onPress={() => dispatch({type: 'increment'})} />
      </View>
    </View>
  );
}

/* 派生展示：另一个组件读取同一 store，验证“单一数据源 / 全局共享” */
function CountParity(): JSX.Element {
  const count = useSelectorImpl((s: any) => s.count);
  return (
    <Text style={styles.kv}>
      当前 count 是 {count % 2 === 0 ? '偶数' : '奇数'}
    </Text>
  );
}

function ReduxExample(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heroTitle}>Redux 单一数据源状态管理</Text>
      <Text style={styles.heroNote}>
        store 是唯一数据源；reducer 是纯函数；dispatch(action) 触发更新；
        useSelector 读、useDispatch 写，全程走 &lt;Provider&gt; 注入。
      </Text>

      {/* 用 Provider 把 store 注入整棵子树 */}
      <ProviderImpl store={store}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>1. 多组件共享同一个 store</Text>
          <Text style={styles.tip}>
            两个面板读取的是同一个 Redux store，在任一面板
            +1/-1，另一个同步变化， 体现“单一数据源”。
          </Text>
          <CounterPanel label="面板 A" />
          <CounterPanel label="面板 B" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            2. useSelector 读取 / useDispatch 派发
          </Text>
          <CountParity />
          <Text style={styles.tip}>
            CounterPanel 用 useSelector(s =&gt; s.count) 取值、useDispatch()
            派发
            {'{type: "increment"}'}；reducer 收到 action 后返回全新 state。
          </Text>
        </View>
      </ProviderImpl>

      {/* 未安装官方库时展示标准用法参考 */}
      {!hasReal && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            标准 Redux Toolkit 用法参考（当前工程未安装）
          </Text>
          <Text style={styles.code}>
            {
              '// 安装：npm install @reduxjs/toolkit react-redux\n\nimport {configureStore, createSlice} from "@reduxjs/toolkit";\nimport {Provider, useSelector, useDispatch} from "react-redux";\n\nconst slice = createSlice({\n  name: "counter",\n  initialState: {count: 0},\n  reducers: {\n    increment: (s) => { s.count += 1; },\n    decrement: (s) => { s.count -= 1; },\n    reset: (s) => { s.count = 0; },\n  },\n});\nexport const {increment, decrement, reset} = slice.actions;\nexport const store = configureStore({reducer: {counter: slice.reducer}});\n\nfunction Page() {\n  const count = useSelector((s) => s.counter.count);\n  const dispatch = useDispatch();\n  return <Button title={`+${count}`} onPress={() => dispatch(increment())} />;\n}\n\n// 根组件用 Provider 包裹一次\n<Provider store={store}><App /></Provider>;'
            }
          </Text>
          <Text style={styles.tip}>
            本页已用「内置极小兼容层」实现等价交互，无需安装即可运行；
            正式项目建议执行 npm install @reduxjs/toolkit react-redux
            使用官方库（API 完全一致）。
          </Text>
        </View>
      )}
    </ScrollView>
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

export default ReduxExample;
