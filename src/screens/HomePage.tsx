import React from 'react';
import {ScrollView, View, Button, StyleSheet} from 'react-native';
import {useNavigation} from '../navigation/NavigationContainer';

/* 首页：跳转按钮列表，演示 navigation 路由 */
function HomePage(): JSX.Element {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
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
      <View style={{height: 20}} />
      <Button
        title="StyleSheet组件演示"
        onPress={() => navigation.navigate('StyleSheetComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="TouchableOpacity组件演示"
        onPress={() => navigation.navigate('TouchableOpacityComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="SectionList组件演示"
        onPress={() => navigation.navigate('SectionListComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="Switch组件演示"
        onPress={() => navigation.navigate('SwitchComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="Modal组件演示"
        onPress={() => navigation.navigate('ModalComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="ActivityIndicator组件演示"
        onPress={() => navigation.navigate('ActivityIndicatorComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="Picker组件演示"
        onPress={() => navigation.navigate('PickerComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="StatusBar组件演示"
        onPress={() => navigation.navigate('StatusBarComp')}
      />
      <View style={{height: 20}} />
      <Button
        title="KeyboardAvoidingView组件演示"
        onPress={() => navigation.navigate('KeyboardAvoidingViewComp')}
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

export default HomePage;
