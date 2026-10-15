import React from 'react';
import {ScrollView, View, Button, StyleSheet} from 'react-native';
import {useNavigation} from '../../navigation/NavigationContainer';

/* 状态管理演示首页：作为 useState / useEffect / Zustand / Redux 的入口菜单 */
function StateHomePage(): JSX.Element {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Button
        title="useState 演示"
        onPress={() => navigation.navigate('UseStateExample')}
      />
      <View style={{height: 20}} />
      <Button
        title="useEffect 演示"
        onPress={() => navigation.navigate('UseEffectExample')}
      />
      <View style={{height: 20}} />
      <Button
        title="Zustand 演示"
        onPress={() => navigation.navigate('ZustandExample')}
      />
      <View style={{height: 20}} />
      <Button
        title="Redux 演示"
        onPress={() => navigation.navigate('ReduxExample')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ScrollView 需要 flex:1 才能占满剩余空间、自己处理滚动
  container: {
    flex: 1,
  },
  // 内容容器：居中排布并留出内边距，保证首尾按钮不贴边
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});

export default StateHomePage;
