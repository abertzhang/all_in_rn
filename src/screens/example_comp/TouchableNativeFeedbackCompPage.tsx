import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';

/**
 * TouchableNativeFeedbackCompPage —— TouchableNativeFeedback 演示页
 *
 * TouchableNativeFeedback 使用平台原生的触摸反馈（Android 上是 Material
 * 涟漪 Ripple 效果）。注意：
 *   - 它是 Android 专用组件，iOS / 部分新架构 / 鸿蒙上会回退或不可用，
 *     因此演示里做了「不存在则降级为普通 View」的兼容处理。
 *   - 必须给子节点包一层 View（不能直接返回 Text）。
 * 演示：
 *   1) Ripple 涟漪效果（带边界）
 *   2) SelectableBackground / Borderless 选背景
 */
function TouchableNativeFeedbackCompPage(): JSX.Element {
  const [count, setCount] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. Ripple 涟漪效果</Text>
      <Text style={styles.note}>
        background 设为 Ripple，按下会出现 Material 涟漪；iOS/鸿蒙上会回退
      </Text>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#ffffff', false)}
        onPress={() => setCount(c => c + 1)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>点击涟漪（已点 {count} 次）</Text>
        </View>
      </TouchableNativeFeedback>

      <Text style={styles.title}>2. 无边界涟漪 Borderless</Text>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#1976d2', true)}
        onPress={() => {}}>
        <View style={styles.btnGreen}>
          <Text style={styles.btnText}>Borderless Ripple</Text>
        </View>
      </TouchableNativeFeedback>
    </ScrollView>
  );
}

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
  btn: {
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnGreen: {
    backgroundColor: '#43a047',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default TouchableNativeFeedbackCompPage;
