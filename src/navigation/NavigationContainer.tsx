import React, {createContext, useContext, useState, useCallback} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

/**
 * 轻量级原生路由容器（纯 JS，不依赖任何第三方原生模块）
 * —— 因此可在 Android / Harmony(OpenHarmony RN) 等任意 RN 平台运行。
 *
 * 原理：用 React state 维护一个“页面栈”(stack)，
 *   - navigate(name) ：把新页面压栈（入栈）
 *   - goBack()      ：把当前页面出栈，回到上一页
 * 仅靠 `react-native` 自带组件即可实现，无需 react-navigation / screens 等原生依赖。
 */

/* 暴露给各页面使用的导航方法 */
export interface NavigationContextValue {
  navigate: (name: string) => void;
  goBack: () => void;
  canGoBack: boolean;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

/* 在页面内获取导航方法；必须在 <NavigationContainer> 内部使用 */
export function useNavigation(): NavigationContextValue {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation 必须在 <NavigationContainer> 内部使用');
  }
  return ctx;
}

/* 单个页面的配置：要渲染的组件 + 顶部导航栏标题 */
export interface RouteConfig {
  component: React.ComponentType;
  title: string;
}

interface Props {
  initialRoute: string;
  routes: Record<string, RouteConfig>;
}

export function NavigationContainer({
  initialRoute,
  routes,
}: Props): JSX.Element {
  // 页面栈：数组最后一个元素就是当前显示的页面
  const [stack, setStack] = useState<string[]>([initialRoute]);

  const navigate = useCallback((name: string) => {
    setStack(prev => [...prev, name]);
  }, []);

  const goBack = useCallback(() => {
    setStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const current = stack[stack.length - 1];
  const route = routes[current];
  const Current = route?.component;

  const value: NavigationContextValue = {
    navigate,
    goBack,
    canGoBack: stack.length > 1,
  };

  if (!Current) {
    return (
      <View style={styles.center}>
        <Text>未找到页面：{current}</Text>
      </View>
    );
  }

  return (
    <NavigationContext.Provider value={value}>
      <View style={styles.root}>
        {/* 顶部导航栏：不在首页时显示“返回”按钮 */}
        <View style={styles.header}>
          {value.canGoBack && (
            <View style={styles.backBtn}>
              <Button title="< 返回" onPress={goBack} />
            </View>
          )}
          <Text style={styles.headerTitle}>{route?.title}</Text>
        </View>
        {/* 当前页面内容区 */}
        <View style={styles.content}>
          <Current />
        </View>
      </View>
    </NavigationContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  backBtn: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },
  content: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
