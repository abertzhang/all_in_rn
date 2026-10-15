import React from 'react';
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from 'react-native';

/**
 * ImageBackgroundCompPage —— ImageBackground 图片背景演示页
 *
 * ImageBackground 用法与 Image 几乎一致，但可以包裹子组件，
 * 子节点会叠加显示在图片之上，常做卡片背景、头像底图、全屏欢迎页。
 * 演示：
 *   1) 基础：背景图 + 居中叠加文字
 *   2) resizeMode 对比（cover / contain / stretch）
 *   3) imageStyle 单独控制图片样式（如圆角、透明度）
 *
 * 说明：示例用网络图 URI，需要设备可联网且原生配置网络权限；
 *       离线场景把 source 换成本地 require('./xxx.png') 即可。
 */
const BG_URI = 'https://reactnative.dev/img/tiny_logo.png';

function ImageBackgroundCompPage(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 基础：背景图 + 叠加文字</Text>
      <ImageBackground
        source={{uri: BG_URI}}
        style={styles.bg}
        resizeMode="cover">
        <View style={styles.overlayInner}>
          <Text style={styles.overlayText}>标题文字</Text>
          <Text style={styles.overlaySub}>图片上的副标题</Text>
        </View>
      </ImageBackground>

      <Text style={styles.title}>2. resizeMode 对比</Text>
      <Text style={styles.note}>
        cover 裁切填满 / contain 完整显示 / stretch 拉伸变形
      </Text>
      <ImageBackground
        source={{uri: BG_URI}}
        style={styles.bgSmall}
        resizeMode="contain">
        <Text style={styles.overlayText}>contain</Text>
      </ImageBackground>
      <ImageBackground
        source={{uri: BG_URI}}
        style={styles.bgSmall}
        resizeMode="stretch">
        <Text style={styles.overlayText}>stretch</Text>
      </ImageBackground>

      <Text style={styles.title}>3. imageStyle 调透明度</Text>
      <ImageBackground
        source={{uri: BG_URI}}
        style={styles.bg}
        imageStyle={styles.dimImage}
        resizeMode="cover">
        <Text style={styles.overlayText}>底图变暗，文字更清晰</Text>
      </ImageBackground>
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
  bg: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  bgSmall: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#eee',
  },
  dimImage: {opacity: 0.45},
  overlayInner: {alignItems: 'center'},
  overlayText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3,
  },
  overlaySub: {color: '#fff', fontSize: 13, marginTop: 4},
});

export default ImageBackgroundCompPage;
