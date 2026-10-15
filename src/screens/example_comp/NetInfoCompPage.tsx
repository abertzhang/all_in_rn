import React, {useState} from 'react';
import {ScrollView, View, Text, Button, StyleSheet} from 'react-native';

/**
 * NetInfoCompPage —— 网络状态（三方插件）演示页
 *
 * 说明：RN 核心不提供网络监听，常用 @react-native-community/netinfo。
 *   - 纯 Android/iOS 安装：npm i @react-native-community/netinfo
 *     （iOS 需 cd ios && pod install）
 *   - 鸿蒙适配：使用 OH 适配包 @react-native-ohcommunity/netinfo，
 *     通过 ohpm 安装到 harmony/entry。
 *   - ⚠️ 切勿在当前宿主工程随意 npm install 原生模块，会破坏鸿蒙构建。
 *
 * 下方用「核心 fetch 探测」等价演示网络连通性的判断思路（点击按钮
 * 探测一个稳定 URL），并附官方包 hook 用法。
 */
let NetInfoLib: any = null;

const NETINFO_SNIPPET = `// 安装：npm i @react-native-community/netinfo
import {useNetInfo} from '@react-native-community/netinfo';

function C() {
  const netInfo = useNetInfo();
  return (
    <Text>
      {netInfo.isConnected ? '已联网' : '离线'} /
      type={netInfo.type}
    </Text>
  );
}
// 也可订阅：NetInfo.addEventListener(state => console.log(state.isConnected));`;

function NetInfoCompPage(): JSX.Element {
  const [online, setOnline] = useState<boolean | null>(null);
  const [checking, setChecking] = useState(false);

  // 用核心 fetch 探测连通性（等价思路演示）
  const probe = async () => {
    setChecking(true);
    try {
      const r = await fetch('https://reactnative.dev');
      setOnline(r.ok);
    } catch {
      setOnline(false);
    } finally {
      setChecking(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>网络状态（NetInfo）</Text>
      <Text style={styles.note}>
        {NetInfoLib
          ? '已安装 netinfo，可用 useNetInfo 实时监听'
          : `未安装 @react-native-community/netinfo，下方用核心 fetch 等价探测`}
      </Text>

      <Button
        title={checking ? '探测中…' : '点击探测网络连通性'}
        onPress={probe}
        disabled={checking}
      />
      <Text style={styles.result}>
        联网状态：
        {online === null ? '（未探测）' : online ? '已联网 ✅' : '离线 ❌'}
      </Text>

      <Text style={styles.title}>官方包标准用法（未安装仅展示）</Text>
      <View style={styles.codeBox}>
        <Text style={styles.code}>{NETINFO_SNIPPET}</Text>
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

export default NetInfoCompPage;
