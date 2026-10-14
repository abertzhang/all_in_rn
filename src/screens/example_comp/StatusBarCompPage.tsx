import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';

/**
 * StatusBarCompPage —— StatusBar 状态栏控制演示页
 *
 * StatusBar 不是页面内视图，而是控制整个 App 顶部系统状态栏的组件。演示：
 *   1) barStyle           —— 'dark-content'（深色字，适配浅背景）/ 'light-content'（白字）
 *   2) hidden             —— 隐藏/显示状态栏
 *   3) backgroundColor + translucent —— 仅 Android：状态栏背景色与半透明
 *
 * 注意：返回上一页后，状态栏由 App 层逻辑接管恢复；Harmony 上部分属性以平台为准。
 */
function StatusBarCompPage(): JSX.Element {
  const [dark, setDark] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [bg, setBg] = useState(false);

  const reset = () => {
    setDark(false);
    setHidden(false);
    setBg(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 该组件直接作用于全局状态栏，随下方 state 实时变化 */}
      <StatusBar
        barStyle={dark ? 'light-content' : 'dark-content'}
        hidden={hidden}
        backgroundColor={bg ? '#1976d2' : '#ffffff'}
        translucent={bg}
      />

      <Text style={styles.title}>StatusBar 控制（影响整个 App 状态栏）</Text>
      <Text style={styles.note}>
        下方切换会立即改变真机/模拟器顶部的状态栏样式；返回上一页后由 App 恢复
      </Text>

      <View style={styles.row}>
        <Text style={styles.rowText}>浅色内容（light-content，白字）</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>
      <Text style={styles.note}>
        关闭则为 dark-content（深色字），适配浅色背景
      </Text>

      <View style={styles.row}>
        <Text style={styles.rowText}>隐藏状态栏（hidden）</Text>
        <Switch value={hidden} onValueChange={setHidden} />
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Android 背景色 + 半透明</Text>
        <Switch value={bg} onValueChange={setBg} />
      </View>
      <Text style={styles.note}>
        backgroundColor / translucent 仅 Android 生效
      </Text>

      <TouchableOpacity style={styles.btnPrimary} onPress={reset}>
        <Text style={styles.btnText}>重置为默认</Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  rowText: {fontSize: 15, color: '#333'},
  btnPrimary: {
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 12,
  },
  btnText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default StatusBarCompPage;
