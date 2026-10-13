import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {useNavigation} from '../navigation/NavigationContainer';

/* 首页：一个跳转按钮，演示 navigation 路由 */
function HomePage(): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={styles.center}>
      <Button
        title="进入 View 组件演示"
        onPress={() => navigation.navigate('ViewComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="Text组件演示"
        onPress={() => navigation.navigate('TextComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="Image组件演示"
        onPress={() => navigation.navigate('ImageComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="ScrollView组件演示"
        onPress={() => navigation.navigate('ScrollViewComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="Button组件演示"
        onPress={() => navigation.navigate('ButtonComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="TextInput组件演示"
        onPress={() => navigation.navigate('TextInputComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="FlatList组件演示"
        onPress={() => navigation.navigate('FlatListComp')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomePage;
