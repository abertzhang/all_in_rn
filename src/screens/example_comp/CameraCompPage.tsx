import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

/**
 * CameraCompPage —— 相机（三方插件）演示页
 *
 * 说明：RN 核心不提供相机，现代推荐 react-native-vision-camera
 * （性能更好、API 更现代），旧方案是 react-native-camera。
 *   - 纯 Android/iOS 安装：npm i react-native-vision-camera
 *     （iOS 需 cd ios && pod install；需在 Info.plist / AndroidManifest
 *      配置相机与麦克风权限）
 *   - 鸿蒙适配：OpenHarmony 缺少稳定相机适配包，需自行封装原生
 *     camera 能力，或通过应用侧相机 API 实现。
 *   - ⚠️ 切勿在当前宿主工程随意 npm install 原生模块，会破坏鸿蒙构建。
 */
let CameraLib: any = null;

const CAMERA_SNIPPET = `// 安装：npm i react-native-vision-camera
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useEffect} from 'react';

function Cam() {
  const devices = useCameraDevices();
  const device = devices.back;
  const [perm, setPerm] = useState(false);

  useEffect(() => {
    (async () => {
      const p = await Camera.requestCameraPermission();
      setPerm(p === 'authorized');
    })();
  }, []);

  if (!device || !perm) return <Text>等待相机权限…</Text>;
  return (
    <Camera
      device={device}
      isActive={true}
      style={{flex: 1}}
      photo={true}
    />
  );
}`;

function CameraCompPage(): JSX.Element {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>相机（react-native-vision-camera）</Text>
      <Text style={styles.note}>
        {CameraLib
          ? '检测到已安装，可使用 Camera 组件'
          : `未安装三方包 react-native-vision-camera，展示标准用法代码`}
      </Text>

      {CameraLib ? (
        <Text style={styles.hint}>
          已加载 react-native-vision-camera，可按上面 snippet 渲染 Camera。
        </Text>
      ) : (
        <View style={styles.codeBox}>
          <Text style={styles.code}>{CAMERA_SNIPPET}</Text>
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

export default CameraCompPage;
