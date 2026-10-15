import React, {useRef} from 'react';
import {View, Text, Animated, PanResponder, StyleSheet} from 'react-native';

/**
 * PanResponderCompPage —— PanResponder 手势拖拽演示页
 *
 * PanResponder 是 RN 处理单指手势（拖拽、滑动）的底层 API。
 * 通过 onStartShouldSetPanResponder 认领手势，再用 onPanResponderMove
 * 读取 dx/dy 更新位置。演示：拖动一个小球在屏幕内自由移动。
 * 配合 Animated.ValueXY 与 getTranslateTransform 可零样板地绑定位置。
 */
function PanResponderCompPage(): JSX.Element {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        // 松手后弹性回弹到原点
        Animated.spring(pan, {
          toValue: {x: 0, y: 0},
          friction: 5,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Text style={styles.tip}>用手指拖动小球，松手会回弹到原点</Text>
      <View style={styles.stage}>
        <Animated.View
          style={[styles.ball, {transform: pan.getTranslateTransform()}]}
          {...panResponder.panHandlers}>
          <Text style={styles.ballText}>拖我</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff', padding: 16},
  tip: {fontSize: 13, color: '#888', textAlign: 'center', marginTop: 8},
  stage: {
    flex: 1,
    marginVertical: 20,
    backgroundColor: '#eceff1',
    borderRadius: 12,
    overflow: 'hidden',
  },
  ball: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fb8c00',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  ballText: {color: '#fff', fontSize: 15, fontWeight: 'bold'},
});

export default PanResponderCompPage;
