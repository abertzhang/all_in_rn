import React from 'react';
import {NavigationContainer} from './src/navigation/NavigationContainer';
import ViewCompPage from './src/screens/example_comp/ViewCompPage';
import HomePage from './src/screens/HomePage';
import TextCompPage from './src/screens/example_comp/TextCompPage';
import ImageCompPage from './src/screens/example_comp/ImageCompPage';
import ScrollViewCompPage from './src/screens/example_comp/ScrollViewCompPage';
import ButtonCompPage from './src/screens/example_comp/ButtonCompPage';
import TextInputCompPage from './src/screens/example_comp/TextInputCompPage';
import FlatListCompPage from './src/screens/example_comp/FlatListCompPage';

/* 根组件：声明路由表，交给原生路由容器管理 */
function App(): JSX.Element {
  return (
    <NavigationContainer
      initialRoute="Home"
      routes={{
        Home: {component: HomePage, title: '首页'},
        ViewComp: {component: ViewCompPage, title: 'View 组件演示'},
        TextComp: {component: TextCompPage, title: 'Text演示页'},
        ImageComp: {component: ImageCompPage, title: 'Image演示页'},
        ScrollViewComp: {
          component: ScrollViewCompPage,
          title: 'ScrollView演示页',
        },
        ButtonComp: {component: ButtonCompPage, title: 'Button演示页'},
        TextInputComp: {
          component: TextInputCompPage,
          title: 'TextInput演示页',
        },
        FlatListComp: {
          component: FlatListCompPage,
          title: 'FlatList演示页',
        },
      }}
    />
  );
}

export default App;
