import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
} from './src/navigation/NavigationContainer';
import ViewCompPage from './src/screens/ViewCompPage';

/* 首页：一个跳转按钮，演示 navigation 路由 */
function HomeScreen(): JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={styles.center}>
      <Text style={styles.title}>all_in_rn</Text>
      <Button
        title="进入 View 组件演示"
        onPress={() => navigation.navigate('ViewComp')}
      />
    </View>
  );
}

/* 根组件：声明路由表，交给原生路由容器管理 */
function App(): JSX.Element {
  return (
    <NavigationContainer
      initialRoute="Home"
      routes={{
        Home: {component: HomeScreen, title: '首页'},
        ViewComp: {component: ViewCompPage, title: 'View 组件演示'},
      }}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default App;
