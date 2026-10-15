import React, {useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

/**
 * SliderCompPage —— Slider 滑块（三方插件）演示页
 *
 * 说明：RN 0.72 已从核心移除 Slider，需要三方包。
 *   - 纯 Android/iOS 工程安装：npm i @react-native-community/slider
 *     （0.60+ 自动链接；iOS 需 cd ios && pod install）
 *   - 鸿蒙（OpenHarmony）适配：使用 OH 社区适配包，通过 ohpm 安装到
 *     harmony/entry（例如 @react-native-ohcommunity/slider）。
 *     ⚠️ 切勿在当前宿主工程随意 npm install 原生模块，会破坏鸿蒙构建。
 *
 * 下方通过「动态 require + try/catch」优雅获取组件：装了就用真组件，
 * 没装则降级展示标准用法代码片段，且不会让 Metro 打包失败。
 */
let Slider: any = null;

const SLIDER_SNIPPET = `// 安装：npm i @react-native-community/slider
import {Slider} from '@react-native-community/slider';

<Slider
  style={{width: 200, height: 40}}
  minimumValue={0}
  maximumValue={100}
  step={1}
  value={value}
  onValueChange={setValue}
  minimumTrackTintColor="#1976d2"
  maximumTrackTintColor="#dddddd"
  thumbTintColor="#1976d2"
/>`;

function SliderCompPage(): JSX.Element {
  const [value, setValue] = useState(50);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Slider 滑块</Text>
      <Text style={styles.note}>
        {Slider
          ? '检测到已安装，下面是真实组件'
          : `未安装三方包 @react-native-community/slider，展示标准用法代码`}
      </Text>

      {Slider ? (
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={value}
          onValueChange={setValue}
          minimumTrackTintColor="#1976d2"
          maximumTrackTintColor="#dddddd"
          thumbTintColor="#1976d2"
        />
      ) : (
        <View style={styles.codeBox}>
          <Text style={styles.code}>{SLIDER_SNIPPET}</Text>
        </View>
      )}

      <Text style={styles.result}>当前值：{Math.round(value)}</Text>
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
  slider: {width: '90%', height: 40, alignSelf: 'center', marginTop: 8},
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
  result: {
    fontSize: 14,
    color: '#1565c0',
    marginTop: 16,
    fontWeight: 'bold',
  },
});

export default SliderCompPage;
