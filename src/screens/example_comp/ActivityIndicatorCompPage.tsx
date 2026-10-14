import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

/**
 * ActivityIndicatorCompPage —— ActivityIndicator 加载指示器演示页
 *
 * ActivityIndicator 是圆形旋转加载动画（iOS 菊花 / Android 进度环）。演示：
 *   1) 默认（小尺寸）
 *   2) size="large"
 *   3) color 自定义颜色（可放多个不同色对比）
 *   4) animating 控制显隐（运行时启停旋转）
 *   5) 加载场景：按钮触发 2s 加载态
 */
function ActivityIndicatorCompPage(): JSX.Element {
  const [spinning, setSpinning] = useState(true);
  const [loading, setLoading] = useState(false);

  const trigger = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 默认（小尺寸）</Text>
      <ActivityIndicator />

      <Text style={styles.title}>2. size="large"</Text>
      <ActivityIndicator size="large" />

      <Text style={styles.title}>3. color 自定义颜色</Text>
      <View style={styles.colorRow}>
        <ActivityIndicator size="large" color="#1976d2" />
        <ActivityIndicator size="large" color="#e53935" />
        <ActivityIndicator size="large" color="#43a047" />
      </View>

      <Text style={styles.title}>4. animating 控制显隐</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => setSpinning(s => !s)}>
          <Text style={styles.btnText}>{spinning ? '停止' : '开始'}旋转</Text>
        </TouchableOpacity>
        <ActivityIndicator animating={spinning} size="large" color="#fb8c00" />
      </View>

      <Text style={styles.title}>5. 加载场景（按钮触发 2s）</Text>
      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#1976d2" />
          <Text style={styles.note}>加载中…</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.btnGreen} onPress={trigger}>
          <Text style={styles.btnText}>发起请求（loading 2s）</Text>
        </TouchableOpacity>
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
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  loadingBox: {alignItems: 'center', paddingVertical: 16},
  btnPrimary: {
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnGreen: {
    backgroundColor: '#43a047',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default ActivityIndicatorCompPage;
