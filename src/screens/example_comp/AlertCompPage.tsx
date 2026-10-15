import React, {useState} from 'react';
import {ScrollView, Text, Alert, Button, StyleSheet} from 'react-native';

/**
 * AlertCompPage —— Alert 弹窗演示页
 *
 * Alert.alert(title, message?, buttons?, options?) 弹出系统原生对话框。
 * buttons 数组按「从右到左」排列，建议把取消放最前（iOS 习惯）。
 * 注意：Alert 是模态提示，不可定制样式，复杂 UI 用 Modal。
 * 演示：
 *   1) 单按钮（仅确定）
 *   2) 双按钮（取消 / 确定，含回调）
 *   3) 多按钮 + Android 输入框（Alert.prompt）
 */
function AlertCompPage(): JSX.Element {
  const [last, setLast] = useState('（暂无）');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 单按钮确定</Text>
      <Text style={styles.note}>最简单用法：标题 + 确定按钮</Text>
      <Button
        title="弹出单按钮 Alert"
        onPress={() => Alert.alert('提示', '这是一条信息，点击确定关闭。')}
      />

      <Text style={styles.title}>2. 双按钮（取消 / 确定）</Text>
      <Text style={styles.note}>按钮 onPress 回调里区分用户选择</Text>
      <Button
        title="弹出双按钮 Alert"
        onPress={() =>
          Alert.alert('确认删除', '删除后不可恢复，确定吗？', [
            {text: '取消', style: 'cancel'},
            {
              text: '确定',
              style: 'destructive',
              onPress: () => setLast('点了「确定」删除'),
            },
          ])
        }
      />

      <Text style={styles.title}>3. Android 输入框（Alert.prompt）</Text>
      <Text style={styles.note}>
        Alert.prompt 仅在 Android 上有效（iOS 需自定义 Modal 实现）
      </Text>
      <Button
        title="弹出输入 Alert（Android）"
        onPress={() =>
          Alert.prompt(
            '请输入昵称',
            '最多 12 个字符',
            (text: string | null) => setLast(`输入了：${text ?? ''}`),
            'plain-text',
            '默认值',
          )
        }
      />

      <Text style={styles.result}>最近操作：{last}</Text>
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
  result: {
    fontSize: 14,
    color: '#1565c0',
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default AlertCompPage;
