import React, {useRef, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Animated,
  Easing,
  Button,
  StyleSheet,
} from 'react-native';

/**
 * AnimatedCompPage —— Animated 动画演示页
 *
 * Animated 是 RN 内置的声明式动画库，核心是 Animated.Value +
 * 动画方法（timing / spring / decay）+ 把 value 绑到 style。
 * 本页覆盖两个最常用的驱动方式：
 *   1) Animated.timing   —— 按时间插值（可指定 duration / easing）
 *   2) Animated.spring   —— 弹性物理动画（friction / tension）
 *   3) sequence 组合 + scale 脉冲（spring 收尾）
 * 注意：useNativeDriver:true 会把动画交给原生线程，性能更好；
 *       但涉及布局属性（width/height/left）时不能用，只能用 transform/opacity。
 */
function AnimatedCompPage(): JSX.Element {
  // timing 示例：水平移动
  const tx = useRef(new Animated.Value(0)).current;
  const [toRight, setToRight] = useState(false);
  // spring 示例：垂直弹动
  const sy = useRef(new Animated.Value(0)).current;
  const [springOut, setSpringOut] = useState(false);
  // 缩放脉冲
  const scale = useRef(new Animated.Value(1)).current;

  const runTiming = () => {
    const next = toRight ? 0 : 160;
    setToRight(!toRight);
    Animated.timing(tx, {
      toValue: next,
      duration: 800,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const runSpring = () => {
    const next = springOut ? 0 : 120;
    setSpringOut(!springOut);
    Animated.spring(sy, {
      toValue: next,
      friction: 4,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const runPulse = () => {
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.4,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. Animated.timing（线性插值）</Text>
      <Text style={styles.note}>
        按 duration 在起止值间平滑过渡，可配 easing 曲线
      </Text>
      <View style={styles.track}>
        <Animated.View style={[styles.box, {transform: [{translateX: tx}]}]} />
      </View>
      <Button title="播放 timing 动画" onPress={runTiming} />

      <Text style={styles.title}>2. Animated.spring（弹性）</Text>
      <Text style={styles.note}>基于物理参数 friction/tension 的回弹效果</Text>
      <View style={styles.track}>
        <Animated.View style={[styles.box, {transform: [{translateY: sy}]}]} />
      </View>
      <Button title="播放 spring 动画" onPress={runSpring} />

      <Text style={styles.title}>3. sequence 组合 + scale 脉冲</Text>
      <Animated.View style={[styles.pulse, {transform: [{scale: scale}]}]}>
        <Text style={styles.pulseText}>脉冲</Text>
      </Animated.View>
      <Button title="脉冲一下" onPress={runPulse} />
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
  track: {
    height: 56,
    backgroundColor: '#eceff1',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  box: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#1976d2',
    margin: 4,
  },
  pulse: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fb8c00',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  pulseText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default AnimatedCompPage;
