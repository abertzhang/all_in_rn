import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

/**
 * VideoCompPage —— 视频播放（三方插件）演示页
 *
 * 说明：RN 核心不提供视频播放，需三方包 react-native-video。
 *   - 纯 Android/iOS 安装：npm i react-native-video
 *     （iOS 需 cd ios && pod install；Android 自动链接）
 *   - 鸿蒙适配：使用 OH 适配包 @react-native-ohos/react-native-video，
 *     通过 ohpm 安装到 harmony/entry。
 *   - ⚠️ 切勿在当前宿主工程随意 npm install 原生模块，会破坏鸿蒙构建。
 *
 * 鸿蒙宿主工程未集成该原生模块，下方展示标准用法代码（降级提示）。
 */
let VideoLib: any = null;

const VIDEO_SNIPPET = `// 安装：npm i react-native-video
import Video from 'react-native-video';

<Video
  source={{uri: 'https://example.com/clip.mp4'}}
  style={styles.video}
  controls={true}
  resizeMode="contain"
  onBuffer={(e) => console.log('buffering', e.isBuffering)}
  onError={(e) => console.log('video error', e)}
/>`;

function VideoCompPage(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>视频播放（react-native-video）</Text>
      <Text style={styles.note}>
        {VideoLib
          ? '检测到已安装，下面是真实组件'
          : `未安装三方包 react-native-video，展示标准用法代码`}
      </Text>

      {VideoLib ? (
        <VideoLib
          source={{
            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          style={styles.video}
          controls
          resizeMode="contain"
        />
      ) : (
        <View style={styles.codeBox}>
          <Text style={styles.code}>{VIDEO_SNIPPET}</Text>
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
  video: {width: '100%', height: 220, backgroundColor: '#000', borderRadius: 8},
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

export default VideoCompPage;
