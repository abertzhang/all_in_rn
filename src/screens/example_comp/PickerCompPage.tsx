import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

/**
 * PickerCompPage —— Picker 选择器演示页
 *
 * 重要：React Native 0.72 已从核心库移除原生 <Picker>，改用社区包
 * @react-native-picker/picker（需额外安装并原生链接）。为保持「零原生依赖、
 * 在 Harmony / Android / iOS 都能直接跑」，本页用 Modal + 列表自建一个
 * 行为类似的下拉选择器 DemoPicker，覆盖「触发按钮 + 底部弹层 + 选中回写」。
 *
 * 若你的工程只跑 Android/iOS 且已装官方包，可直接替换为：
 *   import {Picker} from '@react-native-picker/picker';
 */
interface Option<T> {
  label: string;
  value: T;
}

interface DemoPickerProps<T> {
  label: string;
  options: Option<T>[];
  selectedValue: T;
  onValueChange: (value: T) => void;
}

/* 无依赖的下拉选择器：Modal 从底部滑出列表，点选项即选中并关闭 */
function DemoPicker<T extends string | number>({
  label,
  options,
  selectedValue,
  onValueChange,
}: DemoPickerProps<T>): JSX.Element {
  const [open, setOpen] = useState(false);
  const current = options.find(o => o.value === selectedValue);

  return (
    <View style={styles.pickerWrap}>
      <Text style={styles.pickerLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.pickerTrigger}
        onPress={() => setOpen(true)}>
        <Text style={styles.pickerTriggerText}>
          {current ? current.label : '请选择'}
        </Text>
        <Text style={styles.pickerArrow}>▾</Text>
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}>
        <View style={styles.pickerOverlay}>
          <TouchableOpacity
            style={styles.pickerBackdrop}
            onPress={() => setOpen(false)}
          />
          <View style={styles.pickerSheet}>
            <View style={styles.pickerSheetHeader}>
              <Text style={styles.pickerSheetTitle}>{label}</Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text style={styles.pickerDone}>完成</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={item => String(item.value)}
              renderItem={({item}) => {
                const sel = item.value === selectedValue;
                return (
                  <TouchableOpacity
                    style={[
                      styles.pickerItem,
                      sel && styles.pickerItemSelected,
                    ]}
                    onPress={() => {
                      onValueChange(item.value);
                      setOpen(false);
                    }}>
                    <Text
                      style={[
                        styles.pickerItemText,
                        sel && styles.pickerItemTextSel,
                      ]}>
                      {item.label}
                      {sel ? '  ✓' : ''}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

function PickerCompPage(): JSX.Element {
  const [city, setCity] = useState<string>('bj');
  const [fruit, setFruit] = useState<string>('apple');

  const CITY_OPTIONS: Option<string>[] = [
    {label: '北京', value: 'bj'},
    {label: '上海', value: 'sh'},
    {label: '广州', value: 'gz'},
    {label: '深圳', value: 'sz'},
  ];
  const FRUIT_OPTIONS: Option<string>[] = [
    {label: '苹果', value: 'apple'},
    {label: '香蕉', value: 'banana'},
    {label: '橙子', value: 'orange'},
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Picker 示例（无依赖自建选择器）</Text>
      <Text style={styles.note}>
        RN 0.72 已移除核心 Picker（现为 @react-native-picker/picker）。 本页用
        Modal + 列表自建选择器，避免原生依赖、保证多端可运行。
      </Text>

      <DemoPicker
        label="选择城市"
        options={CITY_OPTIONS}
        selectedValue={city}
        onValueChange={setCity}
      />
      <DemoPicker
        label="选择水果"
        options={FRUIT_OPTIONS}
        selectedValue={fruit}
        onValueChange={setFruit}
      />

      <Text style={styles.note}>
        已选城市：{CITY_OPTIONS.find(o => o.value === city)?.label}
      </Text>
      <Text style={styles.note}>
        已选水果：{FRUIT_OPTIONS.find(o => o.value === fruit)?.label}
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
  pickerWrap: {marginVertical: 8},
  pickerLabel: {fontSize: 13, color: '#666', marginBottom: 6},
  pickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f5f9ff',
  },
  pickerTriggerText: {fontSize: 15, color: '#222'},
  pickerArrow: {fontSize: 16, color: '#1976d2'},
  pickerOverlay: {flex: 1, justifyContent: 'flex-end'},
  pickerBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  pickerSheet: {
    maxHeight: '70%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingBottom: 16,
  },
  pickerSheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  pickerSheetTitle: {fontSize: 15, fontWeight: 'bold', color: '#222'},
  pickerDone: {fontSize: 15, color: '#1976d2'},
  pickerItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#f0f0f0',
  },
  pickerItemSelected: {backgroundColor: '#e3f2fd'},
  pickerItemText: {fontSize: 15, color: '#333'},
  pickerItemTextSel: {color: '#1976d2', fontWeight: 'bold'},
});

export default PickerCompPage;
