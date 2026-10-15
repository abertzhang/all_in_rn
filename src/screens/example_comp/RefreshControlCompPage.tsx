import React, {useState} from 'react';
import {ScrollView, View, Text, RefreshControl, StyleSheet} from 'react-native';

/**
 * RefreshControlCompPage —— RefreshControl 下拉刷新演示页
 *
 * RefreshControl 不是独立组件，而是作为 ScrollView / FlatList /
 * SectionList 的 refreshControl 属性传入，实现下拉刷新。演示：
 *   1) 基础下拉刷新（refreshing + onRefresh）
 *   2) 刷新时追加 / 重置数据（模拟网络请求）
 */
interface Item {
  id: string;
  text: string;
}

function RefreshControlCompPage(): JSX.Element {
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState<Item[]>([
    {id: '1', text: '原始第 1 条'},
    {id: '2', text: '原始第 2 条'},
    {id: '3', text: '原始第 3 条'},
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // 模拟 1.2s 网络请求后插入一条新数据
    setTimeout(() => {
      const n = items.length + 1;
      setItems(prev => [{id: String(n), text: `刷新新增第 ${n} 条`}, ...prev]);
      setRefreshing(false);
    }, 1200);
  };

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#1976d2']}
          tintColor="#1976d2"
          title="下拉刷新中…"
        />
      }>
      <Text style={styles.hint}>↓ 下拉页面触发刷新</Text>
      {items.map(item => (
        <View key={item.id} style={styles.row}>
          <Text style={styles.rowText}>{item.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {flex: 1, backgroundColor: '#ffffff'},
  container: {padding: 16, paddingBottom: 40},
  hint: {fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 12},
  row: {
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  rowText: {fontSize: 15, color: '#0d47a1'},
});

export default RefreshControlCompPage;
