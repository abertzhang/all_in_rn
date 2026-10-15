import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  Linking,
  Alert,
  Button,
  StyleSheet,
} from 'react-native';

/**
 * LinkingCompPage —— Linking 深链接 / 外跳演示页
 *
 * Linking 用于跳出 App 打开其它应用或系统功能（网页、电话、邮件），
 * 也用于接收来自其它应用的深链接（deep link）。关键点：
 *   - 打开前用 canOpenURL 判断，否则可能抛异常
 *   - 自定义 scheme（tel:/mailto:/myapp://）需在原生配置白名单
 * 演示：
 *   1) 打开网页（openURL + canOpenURL）
 *   2) 拨打电话（tel:）
 *   3) 发送邮件（mailto:）
 *   4) 读取冷启动传入的 URL（getInitialURL）
 */
function LinkingCompPage(): JSX.Element {
  const [initialUrl, setInitialUrl] = useState('（点击下方按钮读取）');

  const openUrl = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`无法打开：${url}`);
      }
    } catch (e) {
      Alert.alert(`打开失败：${(e as Error).message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 打开网页</Text>
      <Button
        title="打开 React Native 官网"
        onPress={() => openUrl('https://reactnative.dev')}
      />

      <Text style={styles.title}>2. 拨打电话</Text>
      <Text style={styles.note}>tel: scheme 会唤起系统拨号盘</Text>
      <Button title="拨打 10086" onPress={() => openUrl('tel:10086')} />

      <Text style={styles.title}>3. 发送邮件</Text>
      <Button
        title="发邮件给 example@test.com"
        onPress={() =>
          openUrl('mailto:example@test.com?subject=Hello&body=来自 RN Demo')
        }
      />

      <Text style={styles.title}>4. 读取冷启动 URL</Text>
      <Text style={styles.note}>
        App 被其它应用通过链接唤起时，这里能拿到入口 URL
      </Text>
      <Button
        title="读取 getInitialURL"
        onPress={async () => {
          const url = await Linking.getInitialURL();
          setInitialUrl(url ?? '（没有传入 URL）');
        }}
      />
      <Text style={styles.result}>初始 URL：{initialUrl}</Text>
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
    marginTop: 12,
    fontWeight: 'bold',
  },
});

export default LinkingCompPage;
