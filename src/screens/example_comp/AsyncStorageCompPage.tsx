import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';

/**
 * AsyncStorageCompPage —— 本地键值存储（三方插件）演示页
 *
 * 说明：RN 核心不提供持久化存储，官方推荐 @react-native-async-storage/
 * async-storage。
 *   - 纯 Android/iOS 安装：npm i @react-native-async-storage/async-storage
 *     （iOS 需 cd ios && pod install）
 *   - 鸿蒙适配：使用 OH 适配包 @react-native-ohos/async-storage，
 *     通过 ohpm 安装到 harmony/entry。
 *   - ⚠️ 切勿在当前宿主工程随意 npm install 原生模块，会破坏鸿蒙构建。
 *
 * 下方用「内存 Map」等价模拟 AsyncStorage 的异步 API 形态（setItem /
 * getItem / removeItem），让页面在鸿蒙端可直接交互演示；官方包用法
 * 完全一致的 API 签名。
 */
let AsyncStorageLib: any = null;

// 内存版存储，等价模拟官方 API（演示用）
const memory = new Map<string, string>();
const fakeSet = async (k: string, v: string) => {
  memory.set(k, v);
};
const fakeGet = async (k: string): Promise<string | null> => {
  return memory.get(k) ?? null;
};
const fakeRemove = async (k: string) => {
  memory.delete(k);
};

const ASYNC_SNIPPET = `// 安装：npm i @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

await AsyncStorage.setItem('name', '张三');
const v = await AsyncStorage.getItem('name'); // '张三'
await AsyncStorage.removeItem('name');`;

function AsyncStorageCompPage(): JSX.Element {
  const [key, setKey] = useState('name');
  const [value, setValue] = useState('张三');
  const [read, setRead] = useState('（点“读取”查看）');

  const save = async () => {
    await fakeSet(key, value);
    setRead(`已保存：${key} = ${value}`);
  };
  const readIt = async () => {
    const v = await fakeGet(key);
    setRead(v ? `${key} = ${v}` : `${key} 不存在`);
  };
  const del = async () => {
    await fakeRemove(key);
    setRead(`已删除：${key}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>本地键值存储（AsyncStorage）</Text>
      <Text style={styles.note}>
        {AsyncStorageLib
          ? '已安装官方包，可直接用 AsyncStorage.setItem 持久化'
          : `未安装 @react-native-async-storage/async-storage，下方用内存版等价模拟 API`}
      </Text>

      <Text style={styles.label}>key</Text>
      <TextInput
        style={styles.input}
        value={key}
        onChangeText={setKey}
        placeholder="key"
      />
      <Text style={styles.label}>value</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="value"
      />

      <View style={styles.btnRow}>
        <View style={styles.btn}>
          <Button title="保存" onPress={save} />
        </View>
        <View style={styles.btn}>
          <Button title="读取" onPress={readIt} />
        </View>
        <View style={styles.btn}>
          <Button title="删除" onPress={del} color="#e53935" />
        </View>
      </View>

      <Text style={styles.result}>{read}</Text>

      <Text style={styles.title}>官方包标准用法（未安装仅展示）</Text>
      <View style={styles.codeBox}>
        <Text style={styles.code}>{ASYNC_SNIPPET}</Text>
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
  label: {fontSize: 13, color: '#555', marginTop: 6},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
    marginBottom: 8,
    fontSize: 14,
  },
  btnRow: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 8},
  btn: {flex: 1, marginHorizontal: 4},
  result: {
    fontSize: 14,
    color: '#1565c0',
    marginTop: 14,
    fontWeight: 'bold',
  },
  codeBox: {
    backgroundColor: '#263238',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  code: {
    color: '#e0e0e0',
    fontSize: 12,
    fontFamily: 'Courier',
    lineHeight: 18,
  },
});

export default AsyncStorageCompPage;
