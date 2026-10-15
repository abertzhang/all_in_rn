import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

/**
 * PermissionsCompPage —— 权限申请（三方插件）演示页
 *
 * 说明：RN 核心不提供统一权限 API，常用 react-native-permissions。
 *   - 纯 Android/iOS 安装：npm i react-native-permissions
 *     （需在 Info.plist / AndroidManifest 声明权限，iOS pod install）
 *   - 鸿蒙适配：OpenHarmony 权限体系不同，需通过 ArkTS 侧
 *     abilityContext.requestPermissionsFromUser 申请，再桥接到 RN。
 *   - ⚠️ 切勿在当前宿主工程随意 npm install 原生模块，会破坏鸿蒙构建。
 */
let PermLib: any = null;

const PERM_SNIPPET = `// 安装：npm i react-native-permissions
import {
  check, request, PERMISSIONS, RESULTS,
} from 'react-native-permissions';

// 检查
const r = await check(PERMISSIONS.ANDROID.CAMERA);
if (r === RESULTS.DENIED) {
  // 申请
  const res = await request(PERMISSIONS.ANDROID.CAMERA);
  console.log('结果：', res);
}`;

function PermissionsCompPage(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>权限申请（react-native-permissions）</Text>
      <Text style={styles.note}>
        {PermLib
          ? '检测到已安装，可调用 check/request'
          : `未安装三方包 react-native-permissions，展示标准用法代码`}
      </Text>

      {PermLib ? (
        <Text style={styles.hint}>
          已加载 react-native-permissions，可按上面 snippet 调用 check /
          request。
        </Text>
      ) : (
        <View style={styles.codeBox}>
          <Text style={styles.code}>{PERM_SNIPPET}</Text>
        </View>
      )}
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
  hint: {fontSize: 13, color: '#555', lineHeight: 20},
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

export default PermissionsCompPage;
