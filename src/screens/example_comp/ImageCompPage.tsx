import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';

/**
 * ImageCompPage —— Image 组件属性演示页（函数式组件）
 *
 * 用「一块一属性」的方式演示 <Image> / <ImageBackground> 的常用属性：
 *   1) style                   —— 样式的两种写法（StyleSheet 提取 / 内联对象）
 *   2) source                  —— 图片来源：本地 require / 远程 uri（需联网）
 *   3) resizeMode              —— 缩放模式：cover / contain / stretch / center
 *   4) borderRadius            —— 圆角 / 圆形头像裁剪
 *   5) tintColor               —— 着色（对带透明通道的图更明显）
 *   6) ImageBackground         —— 背景图 + 文字叠加
 *   7) 加载态属性               —— defaultSource / fadeDuration / onLoad / onError
 *
 * 本地演示图由 scripts/_gen_demo_png.py 生成到 src/assets/（离线可用，无需联网）。
 */
function ImageCompPage(): JSX.Element {
  // —— 演示远程图的加载状态：idle / loaded / error ——
  const [remoteStatus, setRemoteStatus] = useState<'idle' | 'loaded' | 'error'>(
    'idle',
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. style 属性（两种写法）</Text>
      {/* 写法 A：StyleSheet 提取的样式 */}
      <Image
        source={require('../../assets/img_circle.png')}
        style={styles.imgA}
      />
      {/* 写法 B：内联 style 对象（适合一次性微调） */}
      <Image
        source={require('../../assets/img_wide.png')}
        style={{width: 160, height: 90, borderRadius: 8, marginBottom: 8}}
      />
      <Text style={styles.title}>2. source（本地 require / 远程 uri）</Text>
      {/* 本地资源：用 require 引入，Metro 会在打包时一并处理，离线可用 */}
      <Image
        source={require('../../assets/img_circle.png')}
        style={styles.imgA}
      />
      <Text style={styles.note}>
        本地 require：离线可用（已生成到 src/assets）
      </Text>
      {/* 远程资源：用 {uri:'https://...'}；需要设备联网才能加载 */}
      <Image
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        style={styles.imgA}
        onLoad={() => setRemoteStatus('loaded')}
        onError={() => setRemoteStatus('error')}
      />
      <Text style={styles.note}>
        远程 uri：需联网；当前加载状态：{remoteStatus}
      </Text>
      <Text style={styles.title}>
        3. resizeMode（cover / contain / stretch / center）
      </Text>
      {/* 同一张宽图放进 100x70 的盒子，对比四种缩放模式（盒子 1.43:1 ≠ 图 2:1） */}
      <View style={styles.row}>
        <View style={styles.resBox}>
          <Image
            source={require('../../assets/img_wide.png')}
            style={styles.resImg}
            resizeMode="cover"
          />
          <Text style={styles.cap}>cover</Text>
        </View>
        <View style={styles.resBox}>
          <Image
            source={require('../../assets/img_wide.png')}
            style={styles.resImg}
            resizeMode="contain"
          />
          <Text style={styles.cap}>contain</Text>
        </View>
        <View style={styles.resBox}>
          <Image
            source={require('../../assets/img_wide.png')}
            style={styles.resImg}
            resizeMode="stretch"
          />
          <Text style={styles.cap}>stretch</Text>
        </View>
        <View style={styles.resBox}>
          <Image
            source={require('../../assets/img_wide.png')}
            style={styles.resImg}
            resizeMode="center"
          />
          <Text style={styles.cap}>center</Text>
        </View>
      </View>
      <Text style={styles.note}>
        cover=填满并裁剪溢出；contain=完整显示留白；stretch=拉伸变形；center=居中不缩放（iOS
        另有 repeat 平铺）
      </Text>
      <Text style={styles.title}>4. borderRadius（圆形头像裁剪）</Text>
      {/* 正方形图 + borderRadius=宽高一半 → 正圆 */}
      <Image
        source={require('../../assets/img_circle.png')}
        style={styles.avatar}
      />
      <Text style={styles.title}>5. tintColor（着色）</Text>
      <Image
        source={require('../../assets/img_circle.png')}
        style={styles.imgA}
        tintColor="#e91e63"
      />
      <Text style={styles.note}>
        tintColor 对带透明通道的图更明显；此处不透明图整体被染成该色
      </Text>
      <Text style={styles.title}>6. ImageBackground（背景图 + 文字叠加）</Text>
      {/* ImageBackground 可像 View 一样包子节点，子节点渲染在图上方 */}
      <ImageBackground
        source={require('../../assets/img_wide.png')}
        style={styles.bgBox}
        imageStyle={{opacity: 0.5}}>
        <Text style={styles.bgText}>背景图上的文字</Text>
      </ImageBackground>
      <Text style={styles.title}>
        7. 加载态属性（defaultSource / fadeDuration）
      </Text>
      <Text style={styles.note}>
        defaultSource：主图加载完成前的占位图（Android 用）；fadeDuration：iOS
        图片渐显时长(ms)；配合 onLoad / onError 可自定义加载/失败占位。
      </Text>
      <Text style={styles.title}> 8. base64图片</Text>
      <Image
        source={{
          uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
        }}
      />
    </ScrollView>
  );
}

/* 集中抽取的样式 */
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#222',
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    marginBottom: 8,
  },
  imgA: {
    width: 160,
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  resBox: {
    width: 110,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  resImg: {
    width: 100,
    height: 70,
    backgroundColor: '#eeeeee',
    borderRadius: 6,
  },
  cap: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, // 宽高一半 → 正圆
    marginBottom: 8,
  },
  bgBox: {
    width: 300,
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

export default ImageCompPage;
