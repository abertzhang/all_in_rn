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
import TouchableWithoutFeedbackCompPage from './src/screens/example_comp/TouchableWithoutFeedbackCompPage';
import TouchableHighlightCompPage from './src/screens/example_comp/TouchableHighlightCompPage';
import TouchableNativeFeedbackCompPage from './src/screens/example_comp/TouchableNativeFeedbackCompPage';
import PressableCompPage from './src/screens/example_comp/PressableCompPage';
import AlertCompPage from './src/screens/example_comp/AlertCompPage';
import LinkingCompPage from './src/screens/example_comp/LinkingCompPage';
import RefreshControlCompPage from './src/screens/example_comp/RefreshControlCompPage';
import VirtualizedListCompPage from './src/screens/example_comp/VirtualizedListCompPage';
import ImageBackgroundCompPage from './src/screens/example_comp/ImageBackgroundCompPage';
import AnimatedCompPage from './src/screens/example_comp/AnimatedCompPage';
import LayoutAnimationCompPage from './src/screens/example_comp/LayoutAnimationCompPage';
import PanResponderCompPage from './src/screens/example_comp/PanResponderCompPage';
import SliderCompPage from './src/screens/example_comp/SliderCompPage';
import DatePickerIOSCompPage from './src/screens/example_comp/DatePickerIOSCompPage';
import VideoCompPage from './src/screens/example_comp/VideoCompPage';
import AudioCompPage from './src/screens/example_comp/AudioCompPage';
import CameraCompPage from './src/screens/example_comp/CameraCompPage';
import PermissionsCompPage from './src/screens/example_comp/PermissionsCompPage';
import DeviceInfoCompPage from './src/screens/example_comp/DeviceInfoCompPage';
import AsyncStorageCompPage from './src/screens/example_comp/AsyncStorageCompPage';
import NetInfoCompPage from './src/screens/example_comp/NetInfoCompPage';
import UseStateExample from './src/screens/state/UseStateExample';
import UseEffectExample from './src/screens/state/UseEffectExample';
import ZustandExample from './src/screens/state/ZustandExample';
import ReduxExample from './src/screens/state/ReduxExample';
import StatePage from './src/screens/state/StatePage';
import ThirdPkgPage from './src/screens/third_pkg/ThirdPkgPage';
import TopTipPage from './src/screens/top_tip/TopTipPage';

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
        TouchableWithoutFeedbackComp: {
          component: TouchableWithoutFeedbackCompPage,
          title: 'TouchableWithoutFeedback 演示页',
        },
        TouchableHighlightComp: {
          component: TouchableHighlightCompPage,
          title: 'TouchableHighlight 演示页',
        },
        TouchableNativeFeedbackComp: {
          component: TouchableNativeFeedbackCompPage,
          title: 'TouchableNativeFeedback 演示页',
        },
        PressableComp: {
          component: PressableCompPage,
          title: 'Pressable 演示页',
        },
        AlertComp: {
          component: AlertCompPage,
          title: 'Alert 演示页',
        },
        LinkingComp: {
          component: LinkingCompPage,
          title: 'Linking 演示页',
        },
        RefreshControlComp: {
          component: RefreshControlCompPage,
          title: 'RefreshControl 演示页',
        },
        VirtualizedListComp: {
          component: VirtualizedListCompPage,
          title: 'VirtualizedList 演示页',
        },
        ImageBackgroundComp: {
          component: ImageBackgroundCompPage,
          title: 'ImageBackground 演示页',
        },
        AnimatedComp: {
          component: AnimatedCompPage,
          title: 'Animated 演示页',
        },
        LayoutAnimationComp: {
          component: LayoutAnimationCompPage,
          title: 'LayoutAnimation 演示页',
        },
        PanResponderComp: {
          component: PanResponderCompPage,
          title: 'PanResponder 演示页',
        },
        SliderComp: {
          component: SliderCompPage,
          title: 'Slider 演示页',
        },
        DatePickerIOSComp: {
          component: DatePickerIOSCompPage,
          title: 'DatePickerIOS 演示页',
        },
        VideoComp: {
          component: VideoCompPage,
          title: 'Video 演示页',
        },
        AudioComp: {
          component: AudioCompPage,
          title: 'Audio 演示页',
        },
        CameraComp: {
          component: CameraCompPage,
          title: 'Camera 演示页',
        },
        PermissionsComp: {
          component: PermissionsCompPage,
          title: 'Permissions 演示页',
        },
        DeviceInfoComp: {
          component: DeviceInfoCompPage,
          title: 'DeviceInfo 演示页',
        },
        AsyncStorageComp: {
          component: AsyncStorageCompPage,
          title: 'AsyncStorage 演示页',
        },
        NetInfoComp: {
          component: NetInfoCompPage,
          title: 'NetInfo 演示页',
        },
        UseStateExample: {
          component: UseStateExample,
          title: 'useState 演示页',
        },
        UseEffectExample: {
          component: UseEffectExample,
          title: 'useEffect 演示页',
        },
        ZustandExample: {
          component: ZustandExample,
          title: 'Zustand 演示页',
        },
        ReduxExample: {
          component: ReduxExample,
          title: 'Redux 演示页',
        },
        StateHome: {
          component: StatePage,
          title: '状态管理',
        },
        ThirdPkg: {
          component: ThirdPkgPage,
          title: '三方库',
        },
        TopTip: {
          component: TopTipPage,
          title: 'TopTip',
        },
      }}
    />
  );
}

export default App;
