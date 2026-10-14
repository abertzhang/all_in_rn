import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

/**
 * TouchableOpacityCompPage —— TouchableOpacity 触摸高亮组件演示页
 *
 * TouchableOpacity 包裹子节点后，按下时会自动降低透明度（activeOpacity），
 * 是做「自定义按钮 / 可点击卡片」最常用的轻量方案。演示：
 *   1) 基础 onPress + activeOpacity      —— 点击计数，按下变淡
 *   2) activeOpacity 对比                —— 1（无变化） vs 0.2（明显变淡）
 *   3) disabled                         —— 禁用态（不响应点击）
 *   4) onPressIn / onPressOut 自定义反馈 —— 用 pressed 状态做明显视觉变化
 */
function TouchableOpacityCompPage(): JSX.Element {
  const [count, setCount] = useState(0);
  const [pressed, setPressed] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 基础 onPress + activeOpacity</Text>
      <Text style={styles.note}>
        activeOpacity 控制按下时透明度（0=全透明，1=不变）；默认约 0.2
      </Text>
      <TouchableOpacity
        style={styles.btnPrimary}
        activeOpacity={0.6}
        onPress={() => setCount(c => c + 1)}>
        <Text style={styles.btnText}>点击计数（已点 {count} 次）</Text>
      </TouchableOpacity>

      <Text style={styles.title}>2. activeOpacity 对比</Text>
      <TouchableOpacity
        style={styles.btnGreen}
        activeOpacity={1}
        onPress={() => {}}>
        <Text style={styles.btnText}>activeOpacity=1（按下无变化）</Text>
      </TouchableOpacity>
      <View style={styles.gap} />
      <TouchableOpacity
        style={styles.btnOrange}
        activeOpacity={0.2}
        onPress={() => {}}>
        <Text style={styles.btnText}>activeOpacity=0.2（按下明显变淡）</Text>
      </TouchableOpacity>

      <Text style={styles.title}>3. disabled 禁用态</Text>
      <TouchableOpacity style={styles.btnDisabled} disabled onPress={() => {}}>
        <Text style={styles.btnText}>已禁用（disabled）</Text>
      </TouchableOpacity>

      <Text style={styles.title}>
        4. 自定义按下反馈（onPressIn / onPressOut）
      </Text>
      <Text style={styles.note}>
        TouchableOpacity 自带透明度反馈；若要更强反馈，可用 pressed 状态改背景
      </Text>
      <TouchableOpacity
        style={[styles.card, pressed && styles.cardPressed]}
        activeOpacity={0.9}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        onPress={() => setCount(c => c + 1)}>
        <Text style={styles.cardText}>
          {pressed ? '手指按下了 👆' : '按我（自定义卡片按钮）'}
        </Text>
      </TouchableOpacity>
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
  gap: {height: 10},
  btnPrimary: {
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnGreen: {
    backgroundColor: '#43a047',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnOrange: {
    backgroundColor: '#fb8c00',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnDisabled: {
    backgroundColor: '#bdbdbd',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  card: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#90caf9',
  },
  cardPressed: {backgroundColor: '#90caf9'},
  cardText: {color: '#0d47a1', fontSize: 16, fontWeight: 'bold'},
});

export default TouchableOpacityCompPage;
