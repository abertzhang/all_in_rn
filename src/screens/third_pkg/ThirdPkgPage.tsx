import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {getTheme} from '../../theme';

// 接入项目主题色（浅色主题）
const theme = getTheme('light');

/**
 * ThirdPkgPage —— 三方库展示页
 * ---------------------------------------------------------------------------
 * 本工程是「鸿蒙 RN 宿主」演示工程，遵循「不安装三方原生包（避免破坏鸿蒙构建）」
 * 的约定。因此本页不真正 require 任何三方库，而是以「代码参考卡片」的形式，
 * 列出社区里最常用的 React Native 三方库：给出安装命令 + 标准用法片段，
 * 方便查阅与学习；真正需要时可按片段 npm install 后接入。
 *
 * 已在本工程单独演示的 Zustand / Redux Toolkit 此处不再重复。
 */

// 每个三方库的展示数据：名称、用途、安装命令、用法片段
interface PkgItem {
  name: string;
  desc: string;
  install: string;
  usage: string;
}

const PKG_LIST: PkgItem[] = [
  {
    name: '@react-navigation/native',
    desc: 'React Native 官方推荐的路由/导航库，支持栈、底部 Tab、抽屉等多种导航器。',
    install:
      'npm install @react-navigation/native\nnpm install @react-navigation/stack react-native-screens react-native-safe-area-context',
    usage: `import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}`,
  },
  {
    name: 'react-native-reanimated',
    desc: '声明式高性能动画库，动画在 UI 线程运行，避免 JS 线程卡顿掉帧。',
    install: 'npm install react-native-reanimated',
    usage: `import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

function Box() {
  const x = useSharedValue(0);
  const move = () => (x.value = withTiming(100));
  return <Animated.View style={{transform: [{translateX: x}]}} />;
}`,
  },
  {
    name: 'react-native-gesture-handler',
    desc: '取代 RN 原生手势系统，提供更流畅、可组合的手势（拖拽 / 缩放 / 旋转等）。',
    install: 'npm install react-native-gesture-handler',
    usage: `import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const pinch = Gesture.Pinch().onUpdate(e => console.log(e.scale));
return <GestureDetector gesture={pinch}><Animated.Image .../></GestureDetector>;`,
  },
  {
    name: 'react-native-svg',
    desc: '在 RN 中渲染 SVG 矢量图形，适合图标、图表、自定义图形。',
    install: 'npm install react-native-svg',
    usage: `import Svg, {Circle, Rect} from 'react-native-svg';

<Svg width="100" height="100">
  <Circle cx="50" cy="50" r="40" fill="#3B6EF6" />
</Svg>`,
  },
  {
    name: 'react-native-vector-icons',
    desc: '海量图标字体库（Ionicons / FontAwesome / Material 等），开箱即用。',
    install: 'npm install react-native-vector-icons',
    usage: `import Icon from 'react-native-vector-icons/Ionicons';

<Icon name="home" size={24} color="#3B6EF6" />`,
  },
  {
    name: 'react-native-mmkv',
    desc: '基于 MMKV 的高性能键值存储，读写比 AsyncStorage 快一个数量级。',
    install: 'npm install react-native-mmkv',
    usage: `import {MMKV} from 'react-native-mmkv';

const mmkv = new MMKV();
mmkv.set('token', 'abc');
const token = mmkv.getString('token');`,
  },
];

function ThirdPkgPage(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heroTitle}>社区常用三方库（参考）</Text>
      <Text style={styles.heroNote}>
        本工程为兼容「鸿蒙 RN 宿主」、约定不安装三方原生包，故下列仅作
        <Text style={{fontWeight: 'bold'}}> 标准用法参考 </Text>
        ，不真正 require；真正接入时按安装命令 npm install 即可。
      </Text>

      {PKG_LIST.map((item, idx) => (
        <View style={styles.card} key={idx}>
          <Text style={styles.cardTitle}>
            {idx + 1}. {item.name}
          </Text>
          <Text style={styles.tip}>{item.desc}</Text>
          <Text style={styles.label}>安装</Text>
          <Text style={styles.code}>{item.install}</Text>
          <Text style={styles.label}>用法</Text>
          <Text style={styles.code}>{item.usage}</Text>
        </View>
      ))}
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
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.textSecondary,
    marginTop: 10,
    marginBottom: 4,
  },
  tip: {
    fontSize: 12,
    color: theme.textSecondary,
    lineHeight: 18,
  },
  code: {
    fontSize: 11,
    color: theme.text,
    backgroundColor: theme.surfaceVariant,
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
    fontFamily: 'Courier',
    lineHeight: 16,
  },
});

export default ThirdPkgPage;
