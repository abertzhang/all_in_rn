import React, {useState} from 'react';
import {ScrollView, View, Text, StyleSheet, Switch} from 'react-native';

/**
 * StyleSheetCompPage —— StyleSheet 样式表工具演示页（函数式组件）
 *
 * StyleSheet 不是可视组件，而是 RN 推荐的「样式定义工具」：
 * 在编译期对样式做优化（去重、不可变、跨实例复用）。本页演示其常用 API：
 *   1) StyleSheet.create           —— 定义样式表（核心用法）
 *   2) 复用与数组合并               —— [a,b] 合并；[a, cond && c] 条件样式
 *   3) StyleSheet.hairlineWidth    —— 平台最细分割线宽度（iOS=0.5 / Android≈1）
 *   4) StyleSheet.absoluteFill     —— 绝对定位铺满父容器的简写
 *   5) StyleSheet.flatten          —— 运行时合并多个 style 对象（便于覆盖/调试）
 *
 * 经验：静态样式尽量写进 StyleSheet；只有「依赖数据动态计算」的值
 * （如根据索引取色）才用内联 style，二者可数组合并共存。
 */
function StyleSheetCompPage(): JSX.Element {
  const [big, setBig] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. StyleSheet.create 基本用法</Text>
      <Text style={styles.note}>
        把样式对象传入 StyleSheet.create，返回的对象即可挂到任意 style 属性
      </Text>
      <View style={styles.box}>
        <Text style={styles.boxText}>这是一个用样式表定义的盒子</Text>
      </View>

      <Text style={styles.title}>2. 复用与数组合并</Text>
      <Text style={styles.note}>
        style 支持数组：[基础, 覆盖]；条件样式用 [基础, cond && 覆盖]
      </Text>
      <View style={[styles.box, styles.boxBlue]}>
        <Text style={styles.boxText}>基础样式 + 蓝色覆盖</Text>
      </View>
      <View style={[styles.box, big && styles.boxLarge]}>
        <Text style={styles.boxText}>
          {big ? '放大态（条件样式生效）' : '普通态（点下方开关放大）'}
        </Text>
      </View>
      <Switch value={big} onValueChange={setBig} />

      <Text style={styles.title}>3. StyleSheet.hairlineWidth</Text>
      <Text style={styles.note}>
        获取平台最细线宽，做分割线最合适（不会在 Retina 上糊成 2px）
      </Text>
      <View style={styles.hairline} />

      <Text style={styles.title}>4. StyleSheet.absoluteFill</Text>
      <Text style={styles.note}>
        absoluteFill 等价于把 position 设为 absolute、四边设为 0
        的简写，常用于遮罩/铺满父容器
      </Text>
      <View style={styles.relativeBox}>
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.coverWrap}>
            <Text style={styles.boxText}>absoluteFill 铺满整个父盒子</Text>
          </View>
        </View>
      </View>

      <Text style={styles.title}>5. StyleSheet.flatten</Text>
      <Text style={styles.note}>
        flatten([a,b]) 把多个样式合并成一个普通对象（常用来合并后再做覆盖/打印）
      </Text>
      <Text style={mergedBigFont}>
        这行文字放大了（boxText + bigFont 合并）
      </Text>
    </ScrollView>
  );
}

/* 集中抽取的样式 */
const styles = StyleSheet.create({
  container: {padding: 16, paddingBottom: 40, backgroundColor: '#ffffff'},
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#222',
  },
  note: {fontSize: 12, color: '#888', marginTop: 2, marginBottom: 8},
  box: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  boxText: {fontSize: 14, color: '#0d47a1'},
  boxBlue: {backgroundColor: '#1565c0'},
  boxLarge: {paddingVertical: 28},
  hairline: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bdbdbd',
    marginVertical: 8,
  },
  relativeBox: {
    height: 120,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#eeeeee',
  },
  coverWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(21,101,192,0.85)',
  },
  bigFont: {fontSize: 20, fontWeight: 'bold'},
});

/* flatten 合并结果：在模块级计算一次，避免内联写法 */
const mergedBigFont = StyleSheet.flatten([styles.boxText, styles.bigFont])!;

export default StyleSheetCompPage;
