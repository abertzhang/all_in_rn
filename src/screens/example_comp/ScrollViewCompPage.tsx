import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';

/**
 * ScrollViewCompPage —— ScrollView 组件属性演示页（函数式组件）
 *
 * 用「一块一属性」的方式演示 <ScrollView> 的常用属性：
 *   1) 基础垂直滚动             —— 内容超过一屏自动可滚
 *   2) horizontal               —— 横向滚动
 *   3) showsVerticalScrollIndicator / showsHorizontalScrollIndicator —— 隐藏滚动条
 *   4) contentContainerStyle    —— 直接给内容容器加内边距（区别于外层 style）
 *   5) pagingEnabled            —— 整页翻动（横向 + 每页宽 = 屏宽）
 *   6) onScroll + scrollEventThrottle —— 实时滚动偏移（useState 显示 Y 偏移）
 *   7) refreshControl           —— 下拉刷新（useState + RefreshControl）
 *   8) stickyHeaderIndices      —— 吸顶头部（滚动时固定不动）
 *   9) 嵌套滚动                 —— 纵向容器内嵌横向 ScrollView，二者独立滚动
 */
function ScrollViewCompPage(): JSX.Element {
  // —— 演示 onScroll 实时滚动偏移：用 state 保存当前 Y 偏移 ——
  const [scrollY, setScrollY] = useState(0);
  // —— 演示下拉刷新：refreshing 控制刷新指示器的显隐 ——
  const [refreshing, setRefreshing] = useState(false);

  // 下拉刷新：模拟 1.2s 后结束（真实场景此处发起网络请求）
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  // onScroll 回调：从 nativeEvent.contentOffset 读取当前偏移量
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(e.nativeEvent.contentOffset.y);
  };

  // 生成若干占位条目（撑出滚动区域用）
  const items = Array.from({length: 30}, (_, i) => i + 1);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 基础垂直滚动</Text>
      <Text style={styles.note}>
        内容超过一屏时自动可滚动；下面 30 个条目用于撑出滚动区域
      </Text>
      <View style={styles.card}>
        {items.slice(0, 6).map(n => (
          <Text key={n} style={styles.item}>
            条目 {n}
          </Text>
        ))}
        <Text style={styles.note}>…… 共 30 条，往下滚动可见更多</Text>
      </View>

      <Text style={styles.title}>2. horizontal 横向滚动</Text>
      {/* horizontal=true 让主轴变为横向；contentContainerStyle 控制内部间距 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.hRow}>
        {Array.from({length: 8}, (_, i) => (
          <View
            key={i}
            style={[
              styles.hCell,
              {backgroundColor: COLORS[i % COLORS.length]},
            ]}>
            <Text style={styles.hCellText}>{i + 1}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.title}>3. 隐藏滚动条</Text>
      <Text style={styles.note}>
        showsVerticalScrollIndicator=false /
        showsHorizontalScrollIndicator=false
      </Text>
      <ScrollView style={styles.miniBox} showsVerticalScrollIndicator={false}>
        {items.slice(0, 12).map(n => (
          <Text key={n} style={styles.item}>
            条目 {n}（无滚动条）
          </Text>
        ))}
      </ScrollView>

      <Text style={styles.title}>4. contentContainerStyle 内容容器内边距</Text>
      <Text style={styles.note}>
        style 作用于 ScrollView 本身；contentContainerStyle 作用于内部内容容器
      </Text>
      <ScrollView
        style={styles.miniBox}
        contentContainerStyle={styles.innerPad}>
        {items.slice(0, 10).map(n => (
          <Text key={n} style={styles.item}>
            条目 {n}
          </Text>
        ))}
      </ScrollView>

      <Text style={styles.title}>5. pagingEnabled 整页翻动</Text>
      <Text style={styles.note}>
        横向 + pagingEnabled：每次滑动停在一整页（每页宽 = 屏宽）
      </Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.pageBox}>
        {['页面 A', '页面 B', '页面 C'].map((t, i) => (
          <View
            key={t}
            style={[styles.page, {backgroundColor: COLORS[i % COLORS.length]}]}>
            <Text style={styles.pageText}>{t}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.title}>6. onScroll 实时滚动偏移</Text>
      <Text style={styles.note}>
        当前滚动 Y 偏移：{scrollY.toFixed(0)} px（scrollEventThrottle=16）
      </Text>
      <ScrollView
        style={styles.miniBox}
        scrollEventThrottle={16}
        onScroll={handleScroll}>
        {items.slice(0, 14).map(n => (
          <Text key={n} style={styles.item}>
            条目 {n}
          </Text>
        ))}
      </ScrollView>

      <Text style={styles.title}>7. refreshControl 下拉刷新</Text>
      <Text style={styles.note}>
        在顶部可滚动区域下拉触发；refreshing={String(refreshing)}
      </Text>
      <ScrollView
        style={styles.miniBox}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {items.slice(0, 10).map(n => (
          <Text key={n} style={styles.item}>
            刷新条目 {n}
          </Text>
        ))}
      </ScrollView>

      <Text style={styles.title}>8. stickyHeaderIndices 吸顶</Text>
      <Text style={styles.note}>第 0 个子元素吸顶，滚动时固定在顶部不动</Text>
      <ScrollView style={styles.miniBox} stickyHeaderIndices={[0]}>
        <View style={styles.sticky}>
          <Text style={styles.stickyText}>我是吸顶头部</Text>
        </View>
        {items.slice(0, 14).map(n => (
          <Text key={n} style={styles.item}>
            条目 {n}
          </Text>
        ))}
      </ScrollView>

      <Text style={styles.title}>9. 嵌套滚动（纵向 + 横向）</Text>
      <Text style={styles.note}>
        外层纵向，内部横向 ScrollView 各自独立滚动
      </Text>
      <ScrollView style={styles.miniBox}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hRow}>
          {Array.from({length: 6}, (_, i) => (
            <View
              key={i}
              style={[
                styles.hCell,
                {backgroundColor: COLORS[i % COLORS.length]},
              ]}>
              <Text style={styles.hCellText}>{i + 1}</Text>
            </View>
          ))}
        </ScrollView>
        {items.slice(0, 8).map(n => (
          <Text key={n} style={styles.item}>
            纵向条目 {n}
          </Text>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

/* 调色板：用于横向/分页演示块的上色（避免重复写色值） */
const COLORS = [
  '#ff9800',
  '#42a5f5',
  '#66bb6a',
  '#ef5350',
  '#ab47bc',
  '#26a69a',
  '#ffa726',
  '#789262',
];

/* 屏宽：pagingEnabled 需要每页宽 = 屏宽才能整页停靠 */
const SCREEN_WIDTH = Dimensions.get('window').width;

/* 集中抽取的样式 */
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#222',
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  item: {
    fontSize: 14,
    color: '#333',
    paddingVertical: 6,
  },
  hRow: {
    paddingVertical: 4,
  },
  hCell: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hCellText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  miniBox: {
    height: 180,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginBottom: 8,
  },
  innerPad: {
    padding: 16,
  },
  pageBox: {
    height: 160,
  },
  page: {
    width: SCREEN_WIDTH,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  sticky: {
    backgroundColor: '#333',
    paddingVertical: 10,
    alignItems: 'center',
  },
  stickyText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default ScrollViewCompPage;
