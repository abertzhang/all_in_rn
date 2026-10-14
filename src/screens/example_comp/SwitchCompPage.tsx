import React, {useState} from 'react';
import {ScrollView, View, Text, Switch, StyleSheet} from 'react-native';

/**
 * SwitchCompPage —— Switch 开关组件演示页
 *
 * Switch 是受控的布尔开关（iOS 滑块样式 / Android 原生开关）。演示：
 *   1) 基础 value + onValueChange   —— 受控开关，实时回显
 *   2) disabled                     —— 禁用态
 *   3) trackColor / thumbColor / ios_backgroundColor —— 自定义颜色
 *   4) 多开关联动                    —— 飞行模式开启时自动关闭 Wi-Fi / 蓝牙
 */
function SwitchCompPage(): JSX.Element {
  const [wifi, setWifi] = useState(true);
  const [bt, setBt] = useState(false);
  const [airplane, setAirplane] = useState(false);

  const toggleAirplane = (v: boolean) => {
    setAirplane(v);
    if (v) {
      setWifi(false);
      setBt(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 基础 value + onValueChange</Text>
      <Text style={styles.note}>
        受控开关：value 决定开/关，onValueChange 回写 state
      </Text>
      <View style={styles.row}>
        <Text style={styles.rowText}>Wi-Fi</Text>
        <Switch value={wifi} onValueChange={setWifi} />
      </View>
      <Text style={styles.note}>当前 Wi-Fi：{wifi ? '开' : '关'}</Text>

      <Text style={styles.title}>2. disabled 禁用态</Text>
      <View style={styles.row}>
        <Text style={styles.rowText}>禁用开关（始终开）</Text>
        <Switch value={true} disabled onValueChange={() => {}} />
      </View>

      <Text style={styles.title}>3. trackColor / thumbColor 自定义配色</Text>
      <Text style={styles.note}>
        trackColor 控制关/开两种状态的轨道色；thumbColor 控制圆点；
        ios_backgroundColor 仅 iOS 生效
      </Text>
      <View style={styles.row}>
        <Text style={styles.rowText}>蓝牙（绿轨）</Text>
        <Switch
          value={bt}
          onValueChange={setBt}
          trackColor={{false: '#cccccc', true: '#43a047'}}
          thumbColor="#ffffff"
          ios_backgroundColor="#cccccc"
        />
      </View>

      <Text style={styles.title}>4. 多开关联动（设置面板）</Text>
      <View style={styles.row}>
        <Text style={styles.rowText}>飞行模式（开启会关掉下方两项）</Text>
        <Switch value={airplane} onValueChange={toggleAirplane} />
      </View>
      <View style={styles.row}>
        <Text style={styles.rowText}>Wi-Fi</Text>
        <Switch value={wifi} onValueChange={setWifi} />
      </View>
      <View style={styles.row}>
        <Text style={styles.rowText}>蓝牙</Text>
        <Switch value={bt} onValueChange={setBt} />
      </View>
      <Text style={styles.note}>
        状态：飞行模式 {airplane ? '开' : '关'} ｜ Wi-Fi {wifi ? '开' : '关'} ｜
        蓝牙 {bt ? '开' : '关'}
      </Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  rowText: {fontSize: 15, color: '#333'},
});

export default SwitchCompPage;
