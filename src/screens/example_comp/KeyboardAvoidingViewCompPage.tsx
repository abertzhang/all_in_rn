import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';

/**
 * KeyboardAvoidingViewCompPage —— KeyboardAvoidingView 键盘避让演示页
 *
 * 当输入框被软键盘遮挡时，KeyboardAvoidingView 会把内容往上推，避免键盘盖住输入区。演示：
 *   1) behavior 切换 —— 'padding'（iOS 推荐）/ 'height'（Android 推荐）/ 'position'
 *   2) keyboardVerticalOffset —— 额外偏移（如顶部有自定义导航栏时）
 *   3) 对比：把输入框放底部，唤起键盘观察是否被推起
 */
type Behavior = 'height' | 'position' | 'padding';

function KeyboardAvoidingViewCompPage(): JSX.Element {
  const [behavior, setBehavior] = useState<Behavior>('padding');
  const [text, setText] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>KeyboardAvoidingView 键盘避让</Text>
      <Text style={styles.note}>
        输入框被软键盘遮挡时，用它把内容往上推。behavior：padding（iOS 推荐）/
        height（Android 推荐）/ position
      </Text>

      <Text style={styles.title}>behavior 切换（当前：{behavior}）</Text>
      <View style={styles.seg}>
        {(['padding', 'height', 'position'] as Behavior[]).map(b => (
          <TouchableOpacity
            key={b}
            style={[styles.segBtn, behavior === b && styles.segBtnActive]}
            onPress={() => setBehavior(b)}>
            <Text
              style={[
                styles.segBtnText,
                behavior === b && styles.segBtnTextActive,
              ]}>
              {b}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.note}>
        iOS 上常用 padding；Android 上常用 height，并需在 AndroidManifest 配置
        windowSoftInputMode=adjustResize
      </Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : behavior}
        keyboardVerticalOffset={10}
        style={styles.kav}>
        <View style={styles.bottomBox}>
          <TextInput
            style={styles.input}
            placeholder="点我唤起键盘，看是否被遮挡"
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity style={styles.btnPrimary} onPress={() => {}}>
            <Text style={styles.btnText}>提交（演示用）</Text>
          </TouchableOpacity>
          <Text style={styles.note}>当前输入：{text || '（空）'}</Text>
        </View>
      </KeyboardAvoidingView>
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
  seg: {
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1976d2',
  },
  segBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  segBtnActive: {backgroundColor: '#1976d2'},
  segBtnText: {fontSize: 13, color: '#1976d2'},
  segBtnTextActive: {color: '#fff', fontWeight: 'bold'},
  kav: {marginTop: 8},
  bottomBox: {
    padding: 16,
    backgroundColor: '#f5f9ff',
    borderRadius: 10,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  btnPrimary: {
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 4,
  },
  btnText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default KeyboardAvoidingViewCompPage;
