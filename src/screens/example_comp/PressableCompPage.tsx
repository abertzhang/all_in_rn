import React, {useState} from 'react';
import {ScrollView, View, Text, Pressable, StyleSheet} from 'react-native';

/**
 * PressableCompPage —— Pressable 演示页
 *
 * Pressable 是官方推荐的「统一触摸组件」，能替代 TouchableOpacity /
 * TouchableHighlight / TouchableWithoutFeedback。最大特点是：
 *   - onPress / onPressIn / onPressOut / onLongPress 全都有
 *   - style 与 children 都可以是「接收 pressed/focused 等状态的函数」，
 *     从而精确控制按下态样式，无需自己维护 state。
 * 演示：
 *   1) 函数式 style 响应 pressed          —— 按下改背景/透明度
 *   2) onLongPress 长按                    —— 区分点击与长按
 *   3) hitSlop 扩大点击热区                —— 小按钮更易点中
 */
function PressableCompPage(): JSX.Element {
  const [longPressed, setLongPressed] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 函数式 style 响应 pressed</Text>
      <Text style={styles.note}>
        style 支持函数式写法；state.pressed 为 true 时切换高亮
      </Text>
      <Pressable
        style={({pressed}) => [styles.box, pressed && styles.boxPressed]}
        onPress={() => {}}>
        <Text style={styles.boxText}>按下我会变深</Text>
      </Pressable>

      <Text style={styles.title}>2. onLongPress 长按</Text>
      <Text style={styles.note}>
        长按 500ms 触发 onLongPress，可与 onPress 区分
      </Text>
      <Pressable
        onPress={() => setLongPressed(false)}
        onLongPress={() => setLongPressed(true)}
        style={styles.btn}>
        <Text style={styles.btnText}>
          {longPressed ? '这是长按 ✊' : '按住我试试'}
        </Text>
      </Pressable>

      <Text style={styles.title}>3. hitSlop 扩大热区</Text>
      <Text style={styles.note}>
        hitSlop 在四周外扩 40px 点击区域，小图标也能轻松点中
      </Text>
      <View style={styles.centerRow}>
        <Pressable
          hitSlop={{top: 40, bottom: 40, left: 40, right: 40}}
          onPress={() => {}}
          style={styles.smallDot}>
          <Text style={styles.smallDotText}>＋</Text>
        </Pressable>
      </View>
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
    backgroundColor: '#1976d2',
    borderRadius: 12,
    paddingVertical: 26,
    alignItems: 'center',
  },
  boxPressed: {backgroundColor: '#0d47a1', opacity: 0.92},
  boxText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  btn: {
    backgroundColor: '#43a047',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  centerRow: {alignItems: 'center', marginTop: 4},
  smallDot: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fb8c00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallDotText: {color: '#fff', fontSize: 24, fontWeight: 'bold'},
});

export default PressableCompPage;
