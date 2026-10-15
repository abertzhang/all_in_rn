import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Platform,
  PixelRatio,
  StyleSheet,
} from 'react-native';

/**
 * DeviceInfoCompPage —— 设备信息（三方插件）演示页
 *
 * 说明：RN 核心不提供完整设备信息，常用 react-native-device-info。
 *   - 纯 Android/iOS 安装：npm i react-native-device-info
 *     （iOS 需 cd ios && pod install）
 *   - 鸿蒙适配：OpenHarmony 缺少对应适配包，需通过 ArkTS 侧
 *     deviceInfo 模块桥接。
 *   - ⚠️ 切勿在当前宿主工程随意 npm install 原生模块，会破坏鸿蒙构建。
 *
 * 下方用 RN 核心 API 演示「可在鸿蒙端直接获取」的设备信息
 * （屏幕尺寸、像素密度、平台等），并附官方包用法。
 */
let DeviceInfoLib: any = null;

const DEVICE_SNIPPET = `// 安装：npm i react-native-device-info
import DeviceInfo from 'react-native-device-info';

const id = DeviceInfo.getUniqueId();        // 设备唯一标识
const brand = DeviceInfo.getBrand();         // 厂商
const model = DeviceInfo.getModel();         // 型号
const sysVer = DeviceInfo.getSystemVersion();// 系统版本
const battery = await DeviceInfo.getBatteryLevel(); // 电量(0~1)
const isEmu = await DeviceInfo.isEmulator();// 是否模拟器`;

function DeviceInfoCompPage(): JSX.Element {
  const {width, height} = Dimensions.get('window');
  const pr = PixelRatio.get();
  const fontScale = PixelRatio.getFontScale();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>设备信息（核心 API 等价演示）</Text>
      <Text style={styles.note}>
        {DeviceInfoLib
          ? '已安装 react-native-device-info，可获取更丰富信息'
          : `未安装 react-native-device-info，下方用核心 API 展示可获取项`}
      </Text>

      <InfoRow label="平台 Platform.OS" value={Platform.OS} />
      <InfoRow
        label="系统版本 Platform.Version"
        value={String(Platform.Version)}
      />
      <InfoRow label="屏幕宽高 (px)" value={`${width} × ${height}`} />
      <InfoRow label="像素密度 PixelRatio" value={String(pr)} />
      <InfoRow label="字体缩放 fontScale" value={String(fontScale)} />

      <Text style={styles.title}>官方包可额外获取（未安装仅展示）</Text>
      <View style={styles.codeBox}>
        <Text style={styles.code}>{DEVICE_SNIPPET}</Text>
      </View>
    </ScrollView>
  );
}

function InfoRow({label, value}: {label: string; value: string}): JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
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
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {fontSize: 14, color: '#555'},
  value: {fontSize: 14, color: '#1565c0', fontWeight: 'bold'},
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

export default DeviceInfoCompPage;
