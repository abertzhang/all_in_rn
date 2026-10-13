import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {
  NavigationContainer,
  useNavigation,
} from './src/navigation/NavigationContainer';
import ViewCompPage from './src/screens/example_comp/ViewCompPage';
import HomePage from './src/screens/HomePage';
import TextCompPage from './src/screens/example_comp/TextCompPage';

/* 根组件：声明路由表，交给原生路由容器管理 */
function App(): JSX.Element {
  return (
    <NavigationContainer
      initialRoute="Home"
      routes={{
        Home: {component: HomePage, title: '首页'},
        ViewComp: {component: ViewCompPage, title: 'View 组件演示'},
        TextComp:{component:TextCompPage,title:"Text演示页"}
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
