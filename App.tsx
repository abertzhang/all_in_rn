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
import StyleSheetCompPage from './src/screens/example_comp/StyleSheetCompPage';
import TouchableOpacityCompPage from './src/screens/example_comp/TouchableOpacityCompPage';
import SectionListCompPage from './src/screens/example_comp/SectionListCompPage';
import SwitchCompPage from './src/screens/example_comp/SwitchCompPage';
import ModalCompPage from './src/screens/example_comp/ModalCompPage';
import ActivityIndicatorCompPage from './src/screens/example_comp/ActivityIndicatorCompPage';
import PickerCompPage from './src/screens/example_comp/PickerCompPage';
import StatusBarCompPage from './src/screens/example_comp/StatusBarCompPage';
import KeyboardAvoidingViewCompPage from './src/screens/example_comp/KeyboardAvoidingViewCompPage';

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
        StyleSheetComp: {
          component: StyleSheetCompPage,
          title: 'StyleSheet 演示页',
        },
        TouchableOpacityComp: {
          component: TouchableOpacityCompPage,
          title: 'TouchableOpacity 演示页',
        },
        SectionListComp: {
          component: SectionListCompPage,
          title: 'SectionList 演示页',
        },
        SwitchComp: {
          component: SwitchCompPage,
          title: 'Switch 演示页',
        },
        ModalComp: {
          component: ModalCompPage,
          title: 'Modal 演示页',
        },
        ActivityIndicatorComp: {
          component: ActivityIndicatorCompPage,
          title: 'ActivityIndicator 演示页',
        },
        PickerComp: {
          component: PickerCompPage,
          title: 'Picker 演示页',
        },
        StatusBarComp: {
          component: StatusBarCompPage,
          title: 'StatusBar 演示页',
        },
        KeyboardAvoidingViewComp: {
          component: KeyboardAvoidingViewCompPage,
          title: 'KeyboardAvoidingView 演示页',
        },
      }}
    />
  );
}

export default App;
