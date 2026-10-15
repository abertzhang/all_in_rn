import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

/**
 * ViewCompPage —— View 组件常用 style 属性演示页（函数式组件）
 *
 * 用「一块一属性」的方式演示 <View> 最常用的 8 类样式：
 *   1) style           —— 样式的两种写法（StyleSheet 提取 / 内联对象）
 *   2) FlexBox         —— flexDirection / justifyContent / alignItems / flex
 *   3) backgroundColor —— 背景色（十六进制 / rgb / 8 位带透明 / rgba）
 *   4) border          —— 边框：width / color / radius / style
 *   5) shadow          —— 阴影：iOS 用 shadow*，Android 用 elevation
 *   6) transform       —— 变换：translate / rotate / scale
 *   7) overflow        —— 溢出裁剪：visible（默认）/ hidden
 *   8) opacity         —— 整体不透明度（作用于 View 及其子节点）
 */
function ViewCompPage(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. style 属性（两种写法）</Text>
      {/* 写法 A：引用 StyleSheet.create 里提取出的样式对象（推荐，便于复用/维护） */}
      <View style={styles.card}>
        <Text style={styles.note}>
          写法 A：style={'{styles.card}'}（StyleSheet 提取）
        </Text>
      </View>

      {/* 写法 B：直接传一个内联 style 对象（适合一次性、局部微调） */}
      <View
        style={{
          width: 140,
          height: 60,
          backgroundColor: '#e0e0e0',
          borderRadius: 8,
          justifyContent: 'center',
        }}>
        <Text style={styles.note}>写法 B：内联 {'{...}'} 对象</Text>
      </View>
      <Text style={styles.title}>
        2. FlexBox（flexDirection / justifyContent / alignItems / flex）
      </Text>
      <View
        style={{
          flexDirection: 'row', // 主轴方向：row=横向（默认 column=纵向）
          justifyContent: 'space-around', // 主轴对齐：space-around 两端留白均匀分布
          alignItems: 'center', // 交叉轴对齐：center 垂直居中
          height: 90,
          backgroundColor: '#f5f5f5',
        }}>
        <View
          style={[styles.flexItem, {backgroundColor: '#f44336', flex: 1}]}
        />
        <View
          style={[styles.flexItem, {backgroundColor: '#3f51b5', flex: 2}]}
        />
        <View
          style={[styles.flexItem, {backgroundColor: '#4caf50', flex: 1}]}
        />
      </View>
      <Text style={styles.title}>
        3. backgroundColor（十六进制 / rgba / 8 位带透明）
      </Text>
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.colorBox, {backgroundColor: '#ff9800'}]} />
        {/* 十六进制 */}
        <View style={[styles.colorBox, {backgroundColor: 'rgb(33,150,243)'}]} />
        {/* rgb */}
        <View style={[styles.colorBox, {backgroundColor: '#9c27b0cc'}]} />
        {/* 8 位十六进制，末两位 cc=80% 不透明 */}
        <View
          style={[styles.colorBox, {backgroundColor: 'rgba(76,175,80,0.5)'}]}
        />
        {/* rgba 半透明 */}
      </View>
      <Text style={styles.title}>
        4. border（width / color / radius / style）
      </Text>
      <View
        style={{
          width: 140,
          height: 80,
          borderWidth: 3, // 边框宽度
          borderColor: '#e91e63', // 边框颜色
          borderRadius: 16, // 圆角半径
          borderStyle: 'dashed', // 线型：solid（默认）/ dashed / dotted
          backgroundColor: '#fff',
        }}
      />
      <Text style={styles.title}>
        5. shadow（iOS 用 shadow*，Android 用 elevation）
      </Text>
      <View
        style={{
          width: 140,
          height: 80,
          backgroundColor: '#fff',
          // —— iOS 专用阴影属性 ——
          shadowColor: '#000', // 阴影颜色
          shadowOffset: {width: 4, height: 4}, // 阴影偏移（右 4 / 下 4）
          shadowOpacity: 0.4, // 阴影不透明度 0~1
          shadowRadius: 6, // 阴影模糊半径
          // —— Android 专用：用 elevation 模拟阴影（数值越大阴影越重）——
          elevation: 8,
        }}
      />
      <Text style={styles.title}>
        6. transform（translate / rotate / scale）
      </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={[
            styles.transformBox,
            {transform: [{translateX: 10}, {rotate: '15deg'}]},
          ]}
        />
        <View style={[styles.transformBox, {transform: [{scale: 1.3}]}]} />
        <View
          style={[
            styles.transformBox,
            {transform: [{rotate: '-10deg'}, {scale: 0.8}]},
          ]}
        />
      </View>
      <Text style={styles.title}>7. overflow（hidden 裁剪超出部分）</Text>
      {/* 容器固定 100x60，子方块 120x80 明显超出；overflow:'hidden' 把超出部分裁掉 */}
      <View
        style={{
          width: 100,
          height: 60,
          overflow: 'hidden', // 默认值 'visible'（不裁剪）；设为 'hidden' 裁剪
          backgroundColor: '#fafafa',
        }}>
        <View style={{width: 120, height: 80, backgroundColor: '#ff5722'}} />
      </View>
      <Text style={styles.title}>8. opacity（作用于整个 View 及子节点）</Text>
      <View style={{flexDirection: 'row'}}>
        {/* 同一蓝色块，opacity 分别为 0.3 与 1，直观对比 */}
        <View style={[styles.opacityBox, {opacity: 0.3}]} />
        <View style={[styles.opacityBox, {opacity: 1}]} />
      </View>
    </ScrollView>
  );
}

/* 集中抽取的样式（演示 style 写法 A 的载体） */
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
    color: '#555',
  },
  card: {
    width: 200,
    height: 60,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  flexItem: {
    height: 50,
    marginHorizontal: 4,
    borderRadius: 6,
  },
  colorBox: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 8,
  },
  transformBox: {
    width: 60,
    height: 60,
    marginRight: 16,
    backgroundColor: '#009688',
    borderRadius: 8,
  },
  opacityBox: {
    width: 80,
    height: 80,
    marginRight: 16,
    backgroundColor: '#3f51b5',
    borderRadius: 8,
  },
});

export default ViewCompPage;
