import React, {useState} from 'react';
import {VirtualizedList, View, Text, StyleSheet} from 'react-native';

/**
 * VirtualizedListCompPage —— VirtualizedList 通用虚拟化列表演示页
 *
 * VirtualizedList 是 FlatList / SectionList 的底层实现，更通用但需要
 * 自己提供 getItem / getItemCount。当你的数据不是「连续数组」结构、
 * 或想完全掌控渲染时很有用。演示：
 *   1) 基础用法（getItem / getItemCount / renderItem）
 *   2) 上拉到底加载更多（onEndReached）
 */
interface Row {
  id: string;
  text: string;
}

function VirtualizedListCompPage(): JSX.Element {
  const [data, setData] = useState<Row[]>(() =>
    Array.from({length: 20}, (_, i) => ({id: `i${i}`, text: `第 ${i + 1} 行`})),
  );
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMore = () => {
    if (loadingMore) {
      return;
    }
    setLoadingMore(true);
    setTimeout(() => {
      const start = data.length;
      const more = Array.from({length: 10}, (_, i) => ({
        id: `i${start + i}`,
        text: `第 ${start + i + 1} 行（加载）`,
      }));
      setData(prev => [...prev, ...more]);
      setLoadingMore(false);
    }, 800);
  };

  return (
    <VirtualizedList<Row>
      style={styles.list}
      data={data}
      initialNumToRender={10}
      getItem={(d, index) => d[index]}
      getItemCount={d => d.length}
      keyExtractor={item => item.id}
      onEndReached={loadMore}
      onEndReachedThreshold={0.2}
      renderItem={({item}) => (
        <View style={styles.row}>
          <Text style={styles.rowText}>{item.text}</Text>
        </View>
      )}
      ListFooterComponent={
        loadingMore ? <Text style={styles.footer}>加载中…</Text> : null
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {flex: 1, backgroundColor: '#ffffff'},
  row: {
    backgroundColor: '#f1f8e9',
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  rowText: {fontSize: 15, color: '#33691e'},
  footer: {
    textAlign: 'center',
    color: '#888',
    paddingVertical: 16,
    fontSize: 13,
  },
});

export default VirtualizedListCompPage;
