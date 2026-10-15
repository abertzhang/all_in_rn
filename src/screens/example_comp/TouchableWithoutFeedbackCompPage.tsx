import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

/**
 * TouchableWithoutFeedbackCompPage —— TouchableWithoutFeedback 演示页
 *
 * 与 TouchableOpacity / TouchableHighlight 不同，TouchableWithoutFeedback
 * 按下时「不提供任何默认视觉反馈」，需要自己用 onPressIn / onPressOut
 * 维护 pressed 状态来改变样式。常用于「不希望有反馈效果」的场景
 * （如点击输入框外部收起键盘、点击图片全屏预览等）。
 * 演示：
 *   1) 基础点击计数（无任何视觉变化，纯事件）
 *   2) 手动维护 pressed 状态做自定义高亮
 */
function TouchableWithoutFeedbackCompPage(): JSX.Element {
  const [count, setCount] = useState(0);
  const [pressed, setPressed] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 基础点击（无视觉反馈）</Text>
      <Text style={styles.note}>
        TouchableWithoutFeedback
        默认不加透明度/高亮；点击只触发事件，看不出按下效果
      </Text>
      <TouchableWithoutFeedback onPress={() => setCount(c => c + 1)}>
        <View style={styles.box}>
          <Text style={styles.boxText}>点我（已点 {count} 次）</Text>
        </View>
      </TouchableWithoutFeedback>

      <Text style={styles.title}>2. 手动高亮（onPressIn / onPressOut）</Text>
      <Text style={styles.note}>
        借助 pressed 状态自定义背景色，实现「可见但不依赖默认反馈」的交互
      </Text>
      <TouchableWithoutFeedback
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={() => setCount(c => c + 1)}>
        <View style={[styles.box, pressed && styles.boxPressed]}>
          <Text style={styles.boxText}>
            {pressed ? '手指按下了 👆' : '按住我能看到高亮'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
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
  box: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    paddingVertical: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#90caf9',
  },
  boxPressed: {backgroundColor: '#90caf9'},
  boxText: {color: '#0d47a1', fontSize: 16, fontWeight: 'bold'},
});

export default TouchableWithoutFeedbackCompPage;
