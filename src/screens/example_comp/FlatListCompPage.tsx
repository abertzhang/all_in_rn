import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';
import type {ListRenderItem} from 'react-native';

/**
 * FlatListCompPage —— FlatList 组件属性演示页（函数式组件）
 *
 * <FlatList> 是 RN 的高性能「虚拟列表」，只渲染可视区域内的 item，
 * 适合长列表 / 动态数据。本页用「一块一属性」的方式演示常用属性：
 *   1) 基础列表                 —— data + renderItem + keyExtractor
 *   2) ItemSeparatorComponent   —— 列表项之间的分隔线
 *   3) ListEmptyComponent       —— 数据为空时的占位
 *   4) horizontal               —— 横向列表
 *   5) numColumns               —— 网格布局（多列）
 *   6) onRefresh + refreshing   —— 下拉刷新（RefreshControl）
 *   7) onEndReached             —— 上拉加载更多（分页）
 *   8) ListHeaderComponent / ListFooterComponent —— 列表头 / 尾
 *   9) 选中高亮                 —— 点击 item 切换选中态（useState）
 */
function FlatListCompPage(): JSX.Element {
  // 列表项数据类型
  interface Item {
    id: number;
    title: string;
  }

  // 统一的示例数据：30 条
  const DATA: Item[] = Array.from({length: 30}, (_, i) => ({
    id: i + 1,
    title: `列表项 ${i + 1}`,
  }));

  // —— 演示 ListEmptyComponent：用一个 state 控制「空 / 有数据」切换 ——
  const [isEmpty, setIsEmpty] = useState(true);

  // —— 演示下拉刷新：refreshing 控制刷新指示器显隐 ——
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  // —— 演示上拉加载更多：loaded 为已加载数据，loadingMore 控制 footer 显示 ——
  const [loaded, setLoaded] = useState<Item[]>(DATA.slice(0, 10));
  const [loadingMore, setLoadingMore] = useState(false);
  const onEndReached = () => {
    // 正在加载 或 已到末尾：避免重复触发
    if (loadingMore || loaded.length >= DATA.length) {
      return;
    }
    setLoadingMore(true);
    setTimeout(() => {
      setLoaded(prev => [...prev, ...DATA.slice(prev.length, prev.length + 5)]);
      setLoadingMore(false);
    }, 800);
  };

  // —— 演示选中高亮：记录当前选中的 id ——
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 基础 row 渲染（多个区块共用），类型用 ListRenderItem 保证与 FlatList 匹配
  const renderRow: ListRenderItem<Item> = ({item}) => (
    <View style={styles.row}>
      <Text style={styles.rowText}>{item.title}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 基础列表</Text>
      <Text style={styles.note}>
        data + renderItem + keyExtractor；FlatList 只渲染可视区域，长列表性能好
      </Text>
      <FlatList
        data={DATA}
        keyExtractor={item => String(item.id)}
        renderItem={renderRow}
        style={styles.listBox}
        nestedScrollEnabled
      />

      <Text style={styles.title}>2. ItemSeparatorComponent 分隔线</Text>
      <Text style={styles.note}>在每个 item 之间插入一条分隔线</Text>
      <FlatList
        data={DATA.slice(0, 10)}
        keyExtractor={item => String(item.id)}
        renderItem={renderRow}
        ItemSeparatorComponent={ItemSeparator}
        style={styles.listBox}
        nestedScrollEnabled
      />

      <Text style={styles.title}>3. ListEmptyComponent 空占位</Text>
      <Text style={styles.note}>
        数据为空时显示占位；点击按钮切换「空 / 有数据」
      </Text>
      <Button
        title={isEmpty ? '切换为：有数据' : '切换为：空列表'}
        onPress={() => setIsEmpty(v => !v)}
      />
      <FlatList
        data={isEmpty ? [] : DATA.slice(0, 6)}
        keyExtractor={item => String(item.id)}
        renderItem={renderRow}
        ListEmptyComponent={EmptyComponent}
        style={styles.listBox}
        nestedScrollEnabled
      />

      <Text style={styles.title}>4. horizontal 横向列表</Text>
      <FlatList
        data={DATA.slice(0, 10)}
        horizontal
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <View
            style={[
              styles.hCard,
              {backgroundColor: COLORS[(item.id - 1) % COLORS.length]},
            ]}>
            <Text style={styles.hCardText}>{item.title}</Text>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.hListBox}
      />

      <Text style={styles.title}>5. numColumns 网格（2 列）</Text>
      <FlatList
        data={DATA.slice(0, 12)}
        numColumns={2}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <View style={styles.gridCell}>
            <Text style={styles.rowText}>{item.title}</Text>
          </View>
        )}
        style={styles.listBox}
        nestedScrollEnabled
      />

      <Text style={styles.title}>6. onRefresh 下拉刷新</Text>
      <Text style={styles.note}>
        在顶部下拉触发；refreshing={String(refreshing)}
      </Text>
      <FlatList
        data={DATA.slice(0, 10)}
        keyExtractor={item => String(item.id)}
        renderItem={renderRow}
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={styles.listBox}
        nestedScrollEnabled
      />

      <Text style={styles.title}>7. onEndReached 上拉加载更多</Text>
      <Text style={styles.note}>
        滚到底部自动追加 5 条；已加载 {loaded.length} / {DATA.length} 条
      </Text>
      <FlatList
        data={loaded}
        keyExtractor={item => String(item.id)}
        renderItem={renderRow}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loadingMore ? <Text style={styles.footer}>加载中…</Text> : null
        }
        style={styles.listBox}
        nestedScrollEnabled
      />

      <Text style={styles.title}>
        8. ListHeaderComponent / ListFooterComponent
      </Text>
      <FlatList
        data={DATA.slice(0, 8)}
        keyExtractor={item => String(item.id)}
        renderItem={renderRow}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        style={styles.listBox}
        nestedScrollEnabled
      />

      <Text style={styles.title}>9. 选中高亮</Text>
      <Text style={styles.note}>
        点击 item 切换选中态（TouchableOpacity + useState）
      </Text>
      <FlatList
        data={DATA.slice(0, 10)}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => {
          const selected = item.id === selectedId;
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSelectedId(item.id)}
              style={[styles.row, selected && styles.rowSelected]}>
              <Text
                style={[styles.rowText, selected && styles.rowTextSelected]}>
                {item.title}
                {selected ? '  ✓' : ''}
              </Text>
            </TouchableOpacity>
          );
        }}
        style={styles.listBox}
        nestedScrollEnabled
      />
    </ScrollView>
  );
}

/* 调色板：横向卡片上色用（与兄弟演示页保持一致） */
const COLORS = [
  '#ff9800',
  '#42a5f5',
  '#66bb6a',
  '#ef5350',
  '#ab47bc',
  '#26a69a',
  '#ffa726',
  '#789262',
];

/* 集中抽取的样式 */
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#222',
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    marginBottom: 8,
  },
  listBox: {
    height: 200,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginBottom: 8,
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
    backgroundColor: '#ffffff',
  },
  rowText: {
    fontSize: 14,
    color: '#333',
  },
  sep: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  empty: {
    padding: 24,
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
  hListBox: {
    height: 110,
    marginBottom: 8,
  },
  hCard: {
    width: 140,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
    padding: 10,
    justifyContent: 'center',
  },
  hCardText: {
    color: '#fff',
    fontSize: 13,
  },
  gridCell: {
    flex: 1,
    margin: 4,
    paddingVertical: 14,
    backgroundColor: '#eef3fb',
    borderRadius: 8,
    alignItems: 'center',
  },
  footer: {
    padding: 12,
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
  },
  listHeader: {
    paddingVertical: 8,
    textAlign: 'center',
    color: '#1976d2',
    fontSize: 13,
    fontWeight: 'bold',
  },
  listFooter: {
    paddingVertical: 8,
    textAlign: 'center',
    color: '#888',
    fontSize: 13,
  },
  rowSelected: {
    backgroundColor: '#dbeafe',
  },
  rowTextSelected: {
    color: '#1d4ed8',
    fontWeight: 'bold',
  },
});

/* 列表辅助小组件：提取到模块级，避免在 render 内定义组件
 * （否则每次 render 都会创建新的组件类型，导致子树重建、状态丢失） */
const ItemSeparator = () => <View style={styles.sep} />;
const EmptyComponent = () => <Text style={styles.empty}>暂无数据</Text>;
const ListHeader = () => <Text style={styles.listHeader}>—— 列表头部 ——</Text>;
const ListFooter = () => <Text style={styles.listFooter}>—— 列表尾部 ——</Text>;

export default FlatListCompPage;
