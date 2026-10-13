import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

/**
 * ButtonCompPage —— Button 组件属性演示页（函数式组件）
 *
 * 用「一块一属性」的方式演示按钮相关组件：
 *   1) 基础 Button + onPress        —— 必填 title / onPress，useState 记录点击次数
 *   2) color                        —— 着色（iOS 影响文字，Android 影响背景）
 *   3) disabled                     —— 禁用态
 *   4) accessibilityLabel           —— 无障碍标签（读屏软件朗读内容）
 *   5) touchSoundDisabled           —— Android 点击时是否关闭系统提示音
 *   6) Pressable 自定义按钮          —— 内置 Button 无法改背景/圆角/字号，用 Pressable 完全自定义
 *   7) TouchableOpacity 自定义按钮   —— 轻量自定义按钮（按下自动降低透明度）
 *
 * 说明：RN 内置 <Button> 样式受限（仅 color 可着色）；实际项目常用 Pressable /
 * TouchableOpacity 包一层 Text 做任意样式按钮，故此一并演示。
 */
function ButtonCompPage(): JSX.Element {
  // —— 演示 onPress：用 state 累计点击次数 ——
  const [count, setCount] = useState(0);
  // —— 演示 Pressable 的 pressed 反馈 ——
  const [pressed, setPressed] = useState(false);
  // —— 演示 TouchableOpacity 点击 ——
  const [tapCount, setTapCount] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 基础 Button + onPress</Text>
      <Text style={styles.note}>
        title 与 onPress 为必填；下方用 useState 记录点击次数
      </Text>
      <Button title="点我计数" onPress={() => setCount(c => c + 1)} />
      <Text style={styles.note}>已点击：{count} 次</Text>

      <Text style={styles.title}>2. color（着色）</Text>
      <Text style={styles.note}>
        iOS 上 color 影响文字颜色；Android 上影响按钮背景色
      </Text>
      <Button title="蓝色按钮" color="#1976d2" onPress={() => {}} />
      <View style={styles.gap} />
      <Button title="红色按钮" color="#e53935" onPress={() => {}} />

      <Text style={styles.title}>3. disabled（禁用态）</Text>
      <Button title="正常可用" onPress={() => {}} />
      <View style={styles.gap} />
      <Button title="已禁用" disabled onPress={() => {}} />

      <Text style={styles.title}>4. accessibilityLabel（无障碍）</Text>
      <Text style={styles.note}>
        读屏软件会朗读该标签而非 title；此处标签为“返回首页按钮”
      </Text>
      <Button
        title="返回"
        accessibilityLabel="返回首页按钮"
        onPress={() => {}}
      />

      <Text style={styles.title}>5. touchSoundDisabled（Android）</Text>
      <Text style={styles.note}>
        true 时 Android 点击不再播放系统提示音（iOS 无此属性）
      </Text>
      <Button title="无声点击按钮" touchSoundDisabled onPress={() => {}} />

      <Text style={styles.title}>6. Pressable 自定义按钮</Text>
      <Text style={styles.note}>
        内置 Button 无法改背景/圆角/字号，用 Pressable + style 完全自定义；
        style 与子节点可接收 {pressed} 状态做交互反馈
      </Text>
      <Pressable
        onPress={() => {}}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={({pressed: p}) => [
          styles.customBtn,
          {backgroundColor: p ? '#1565c0' : '#1976d2'},
        ]}>
        <Text style={styles.customBtnText}>
          {pressed ? '手指按下了' : 'Pressable 自定义按钮'}
        </Text>
      </Pressable>

      <Text style={styles.title}>7. TouchableOpacity 自定义按钮</Text>
      <Text style={styles.note}>
        轻量自定义按钮：按下时自动降低透明度，无需手写 pressed 逻辑
      </Text>
      <TouchableOpacity
        style={styles.opacityBtn}
        onPress={() => setTapCount(t => t + 1)}>
        <Text style={styles.customBtnText}>
          TouchableOpacity 按钮（已点 {tapCount} 次）
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
  gap: {
    height: 10,
  },
  customBtn: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  customBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  opacityBtn: {
    backgroundColor: '#43a047',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
});

export default ButtonCompPage;
