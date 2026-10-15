import React, {useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';

/**
 * DatePickerIOSCompPage —— 日期/时间选择器（三方插件）演示页
 *
 * 说明：RN 核心早已移除 DatePickerIOS（且其仅支持 iOS）。跨平台推荐
 * 使用 @react-native-community/datetimepicker。
 *   - 纯 Android/iOS 安装：npm i @react-native-community/datetimepicker
 *     （iOS 需 cd ios && pod install）
 *   - 鸿蒙适配：使用 OH 社区适配包（如 @react-native-ohcommunity/
 *     datetimepicker），通过 ohpm 安装到 harmony/entry。
 *   - ⚠️ 切勿在当前宿主工程随意 npm install 原生模块，会破坏鸿蒙构建。
 */
let DateTimePicker: any = null;

const DP_SNIPPET = `// 安装：npm i @react-native-community/datetimepicker
import DateTimePicker from '@react-native-community/datetimepicker';

<DateTimePicker
  testID="dateTimePicker"
  value={date}
  mode="date"            // 'date' | 'time' | 'datetime' | 'countdown'
  display="spinner"      // iOS: 'spinner' | 'compact' | 'inline'
  onChange={(event, selectedDate) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate);
  }}
/>`;

function DatePickerIOSCompPage(): JSX.Element {
  const [date, setDate] = useState(new Date());

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>日期选择器（datetimepicker）</Text>
      <Text style={styles.note}>
        {DateTimePicker
          ? '检测到已安装，下面是真实组件'
          : `未安装三方包 @react-native-community/datetimepicker，展示标准用法代码`}
      </Text>

      <Text style={styles.result}>当前选择：{date.toLocaleDateString()}</Text>

      {DateTimePicker ? (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={(event: any, selectedDate?: Date) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      ) : (
        <View style={styles.codeBox}>
          <Text style={styles.code}>{DP_SNIPPET}</Text>
        </View>
      )}
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
  result: {
    fontSize: 14,
    color: '#1565c0',
    marginTop: 12,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  codeBox: {
    backgroundColor: '#263238',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  code: {
    color: '#e0e0e0',
    fontSize: 12,
    fontFamily: 'Courier',
    lineHeight: 18,
  },
});

export default DatePickerIOSCompPage;
