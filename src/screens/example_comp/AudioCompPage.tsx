import React, {useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

/**
 * AudioCompPage —— 音频录制/播放（三方插件）演示页
 *
 * 说明：RN 核心不提供音频录制/播放，常用
 * react-native-audio-recorder-player（录制+播放一体）或 expo-av。
 *   - 纯 Android/iOS 安装：npm i react-native-audio-recorder-player
 *     （iOS 需 cd ios && pod install）
 *   - 鸿蒙适配：OpenHarmony 目前缺少稳定音频录制适配包，需自行封装
 *     原生 AVPlayer / AVRecorder，或通过应用侧能力实现。
 *   - ⚠️ 切勿在当前宿主工程随意 npm install 原生模块，会破坏鸿蒙构建。
 */
let AudioLib: any = null;

const AUDIO_SNIPPET = `// 安装：npm i react-native-audio-recorder-player
import {AudioRecorderPlayer} from 'react-native-audio-recorder-player';

const recorder = new AudioRecorderPlayer();

// 录制
const uri = await recorder.startRecorder();
console.log('录音文件：', uri);
await recorder.stopRecorder();

// 播放
await recorder.startPlayer(uri);
await recorder.stopPlayer();`;

function AudioCompPage(): JSX.Element {
  const [state] = useState('空闲');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>音频录制 / 播放</Text>
      <Text style={styles.note}>
        {AudioLib
          ? '检测到已安装，可调用录制/播放 API'
          : `未安装三方包 react-native-audio-recorder-player，展示标准用法代码`}
      </Text>

      <Text style={styles.result}>状态：{state}</Text>

      {AudioLib ? (
        <Text style={styles.hint}>
          已加载 react-native-audio-recorder-player，可按上面 snippet 调用
          startRecorder / startPlayer。
        </Text>
      ) : (
        <View style={styles.codeBox}>
          <Text style={styles.code}>{AUDIO_SNIPPET}</Text>
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
  result: {
    fontSize: 14,
    color: '#1565c0',
    marginTop: 12,
    marginBottom: 10,
    fontWeight: 'bold',
  },
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

export default AudioCompPage;
