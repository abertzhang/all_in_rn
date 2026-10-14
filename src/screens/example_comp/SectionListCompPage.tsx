import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

/**
 * SectionListCompPage —— SectionList 分组列表演示页
 *
 * SectionList 在 FlatList 基础上支持「分组（section）」，每组带一个标题，
 * 适合通讯录、设置分组等场景。演示：
 *   1) 基础分组 + 选中高亮             —— sections=[{title,data}] + renderSectionHeader + renderItem
 *   2) ItemSeparatorComponent / SectionSeparatorComponent —— 行/组分隔线
 *   3) stickySectionHeadersEnabled     —— 组头吸顶（滚动时固定）
 */
interface Fruit {
  id: string;
  name: string;
}
interface Section {
  title: string;
  data: Fruit[];
}

function SectionListCompPage(): JSX.Element {
  const [selected, setSelected] = useState<string | null>(null);

  const SECTIONS: Section[] = [
    {
      title: '柑橘类',
      data: [
        {id: 'o1', name: '橙子'},
        {id: 'o2', name: '柚子'},
        {id: 'o3', name: '橘子'},
      ],
    },
    {
      title: '浆果类',
      data: [
        {id: 'b1', name: '草莓'},
        {id: 'b2', name: '蓝莓'},
        {id: 'b3', name: '葡萄'},
      ],
    },
    {
      title: '瓜类',
      data: [
        {id: 'm1', name: '西瓜'},
        {id: 'm2', name: '哈密瓜'},
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 基础分组列表（带选中高亮）</Text>
      <Text style={styles.note}>
        sections 是分组数组，每个元素含 title 与 data；renderSectionHeader
        渲染组头，renderItem 渲染每行
      </Text>
      <SectionList
        sections={SECTIONS}
        keyExtractor={item => item.id}
        renderItem={({item, section}) => {
          const sel = item.id === selected;
          return (
            <TouchableOpacity
              style={[styles.row, sel && styles.rowSel]}
              onPress={() => setSelected(item.id)}>
              <Text style={[styles.rowText, sel && styles.rowTextSel]}>
                {item.name}（{section.title}）{sel ? '  ✓' : ''}
              </Text>
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        ItemSeparatorComponent={RowSep}
        SectionSeparatorComponent={SectionSep}
        style={styles.listBox}
        nestedScrollEnabled
        stickySectionHeadersEnabled
      />
      <Text style={styles.note}>
        已选：{selected ?? '（未选）'} ｜ stickySectionHeadersEnabled 让组头吸顶
      </Text>
    </ScrollView>
  );
}

/* 行 / 组分隔线：提取到模块级，避免在 render 内定义组件 */
const RowSep = () => <View style={styles.rowSep} />;
const SectionSep = () => <View style={styles.sectionSep} />;

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
  listBox: {
    height: 320,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginBottom: 8,
  },
  sectionHeader: {
    backgroundColor: '#eceff1',
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  sectionHeaderText: {fontSize: 13, fontWeight: 'bold', color: '#455a64'},
  row: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  rowText: {fontSize: 14, color: '#333'},
  rowSel: {backgroundColor: '#dbeafe'},
  rowTextSel: {color: '#1d4ed8', fontWeight: 'bold'},
  rowSep: {height: 1, backgroundColor: '#e0e0e0'},
  sectionSep: {height: 8, backgroundColor: '#f0f0f0'},
});

export default SectionListCompPage;
