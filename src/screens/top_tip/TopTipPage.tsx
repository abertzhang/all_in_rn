import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {getTheme} from '../../theme';

// 接入项目主题色（浅色主题）
const theme = getTheme('light');

/**
 * TopTipPage —— 开发小贴士（Top Tips）
 * ---------------------------------------------------------------------------
 * 汇总 React Native / React 开发中高频、易踩坑、能显著提升性能与可维护性的
 * 经验点，做成「卡片清单」方便随时翻阅。内容均为纯展示，不依赖任何三方库。
 */

// 每条小贴士：标题 + 说明
interface TipItem {
  title: string;
  body: string;
}

const TIP_LIST: TipItem[] = [
  {
    title: '1. 用 StyleSheet 而非内联样式',
    body: 'StyleSheet.create 会在初始化时一次性创建样式对象，避免每次 render 重新生成；既提升性能，也让样式与结构分离、更易维护。',
  },
  {
    title: '2. 长列表用 FlatList / SectionList',
    body: '不要在 ScrollView 里 map 渲染成百上千个 View——会一次性创建全部节点，吃内存又卡顿。用 FlatList 做按需渲染与回收。',
  },
  {
    title: '3. 列表 key 用稳定唯一 id',
    body: 'key 不要用数组 index（增删/排序时会错位、丢状态）。用数据自身的稳定唯一字段，如 item.id。',
  },
  {
    title: '4. 不在 render 中创建新对象/函数',
    body: 'render 里写 `style={{...}}` 或 `onPress={() => ...}` 每次都会生成新引用，导致子组件无谓重渲染。提取到组件外或用 useCallback。',
  },
  {
    title: '5. 动画尽量用 useNativeDriver',
    body: '可交给原生线程的属性（transform、opacity）开启 useNativeDriver:true，动画不依赖 JS 线程，避免掉帧。',
  },
  {
    title: '6. 图片设置 resizeMode 与尺寸',
    body: '未指定宽高/resizeMode 时图片加载会引起布局抖动。用 resizeMode="cover|contain" 并尽量给定尺寸。',
  },
  {
    title: '7. 真机调试用 adb reverse 连 Metro',
    body: '真机默认访问 localhost:8081 连不上开发机。执行 `adb reverse tcp:8081 tcp:8081` 把设备端口映射到电脑 Metro，即可加载 bundle。',
  },
  {
    title: '8. 鸿蒙 RN 宿主不安装三方原生包',
    body: '本类宿主工程（@react-native-oh / RNOH）对原生依赖敏感，npm install 带原生代码的包易破坏构建。需要三方能力时优先用「内置兼容层 + 代码参考」展示。',
  },
  {
    title: '9. 状态管理按需选型',
    body: '单组件局部状态用 useState；跨组件共享用 Context；页面级/全局共享优先 Zustand（轻量）或 Redux Toolkit（规范）。别什么都塞进 Redux。',
  },
  {
    title: '10. 用 memo / useCallback / useMemo 精准控制重渲染',
    body: '对纯展示子组件包 React.memo，把传给它的函数/对象用 useCallback/useMemo 缓存，避免父组件一更新就全树重渲染。',
  },
];

function TopTipPage(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heroTitle}>React Native 开发小贴士</Text>
      <Text style={styles.heroNote}>
        高频、易踩坑、能显著提升性能与可维护性的经验点清单，随时翻阅。
      </Text>

      {TIP_LIST.map(item => (
        <View style={styles.card} key={item.title}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.tip}>{item.body}</Text>
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
  tip: {
    fontSize: 13,
    color: theme.text,
    lineHeight: 20,
  },
});

export default TopTipPage;
