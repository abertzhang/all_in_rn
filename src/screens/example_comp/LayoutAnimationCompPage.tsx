import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  LayoutAnimation,
  TouchableOpacity,
  Platform,
  UIManager,
  StyleSheet,
} from 'react-native';

/**
 * LayoutAnimationCompPage —— LayoutAnimation 布局动画演示页
 *
 * LayoutAnimation 用于「在 setState 导致布局变化时，自动补间动画」
 * （增删列表项、展开收起等），无需手动管理 Animated.Value。
 * 关键是：在改 state 之前调用 LayoutAnimation.configureNext(preset)。
 * 演示：
 *   1) 添加 / 删除列表项，自动带有 spring 位移动画
 *   2) 切换三种预设：spring / linear / easeInEaseOut
 */
// Android 需手动开启实验性开关；鸿蒙通常无需（保留兼容写法）
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Row {
  id: number;
  text: string;
}

function LayoutAnimationCompPage(): JSX.Element {
  const [rows, setRows] = useState<Row[]>([
    {id: 1, text: '列表项 1'},
    {id: 2, text: '列表项 2'},
  ]);
  const [seq, setSeq] = useState(3);
  const [presetName, setPresetName] = useState<'spring' | 'linear' | 'ease'>(
    'spring',
  );

  const pickPreset = () => {
    const next =
      presetName === 'spring'
        ? 'linear'
        : presetName === 'linear'
        ? 'ease'
        : 'spring';
    setPresetName(next);
  };

  const addRow = () => {
    const preset =
      presetName === 'spring'
        ? LayoutAnimation.Presets.spring
        : presetName === 'linear'
        ? LayoutAnimation.Presets.linear
        : LayoutAnimation.Presets.easeInEaseOut;
    LayoutAnimation.configureNext(preset);
    setRows(prev => [...prev, {id: seq, text: `列表项 ${seq}`}]);
    setSeq(s => s + 1);
  };

  const removeRow = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setRows(prev => prev.filter(r => r.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 增删列表项（自动动画）</Text>
      <Text style={styles.note}>
        每次改 state 前调用 configureNext，新项插入/删除带过渡动画
      </Text>
      <TouchableOpacity style={styles.btn} onPress={addRow}>
        <Text style={styles.btnText}>＋ 添加一项</Text>
      </TouchableOpacity>
      {rows.map(row => (
        <View key={row.id} style={styles.row}>
          <Text style={styles.rowText}>{row.text}</Text>
          <TouchableOpacity onPress={() => removeRow(row.id)}>
            <Text style={styles.del}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Text style={styles.title}>2. 切换动画预设</Text>
      <Text style={styles.note}>当前：{presetName}（影响下一次布局变化）</Text>
      <TouchableOpacity style={styles.btnGreen} onPress={pickPreset}>
        <Text style={styles.btnText}>切换预设</Text>
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
  btn: {
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnGreen: {
    backgroundColor: '#43a047',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  rowText: {fontSize: 15, color: '#0d47a1'},
  del: {fontSize: 18, color: '#e53935', fontWeight: 'bold'},
});

export default LayoutAnimationCompPage;
