import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
} from 'react-native';
import {getTheme} from '../../theme';

// 接入项目主题色（当前取浅色主题；语义色便于后续整体换肤）
const theme = getTheme('light');

/**
 * UseStateExample —— useState Hook 综合演示页
 * ---------------------------------------------------------------------------
 * useState 是 React 中最基础、最常用的 Hook，作用是在“函数组件”里记住可变状态。
 * 每次调用返回 [state, setState] 元组：
 *   - state    ：当前值，渲染时直接读取；
 *   - setState ：更新函数，调用后会让组件重新渲染并拿到新值。
 *
 * 本页覆盖 7 个最常见的用法，从最基础的计数器，到容易踩坑的“函数式更新”与
 * “延迟初始化”，适合作为 useState 的入门参考。
 */
function UseStateExample(): JSX.Element {
  // —— 1. 基础数字 state：计数器 ——
  const [count, setCount] = useState<number>(0);

  // —— 2. 字符串 state：受控输入框（双向绑定）——
  const [name, setName] = useState<string>('');

  // —— 3. 布尔 state：显示 / 隐藏控制 ——
  const [visible, setVisible] = useState<boolean>(true);

  // —— 4. 对象 state：合并更新（必须展开旧值，否则会丢失其他字段）——
  const [user, setUser] = useState<{age: number; city: string}>({
    age: 18,
    city: '北京',
  });

  // —— 5. 数组 state：列表的增 / 删 ——
  const [todos, setTodos] = useState<string[]>([
    '学习 useState',
    '写一个 Demo',
  ]);

  // —— 6. 函数式更新：setStep(s => s + 1) 避免闭包陷阱 ——
  // 用独立计数演示“同一事件里多次更新”的正确写法
  const [step, setStep] = useState<number>(0);

  // —— 7. 延迟初始化：initializer 只在首次渲染执行一次 ——
  const [initTime] = useState<number>(() => Date.now());

  // 把输入框内容追加进待办列表；用到了 name 状态做非空校验
  const addTodo = () => {
    const text = name.trim();
    if (!text) {
      return;
    }
    // 用函数式更新，避免依赖外部 name 的闭包旧值
    setTodos(prev => [...prev, text]);
    setName('');
  };

  // 按索引删除一条待办
  const removeTodo = (idx: number) => {
    setTodos(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heroTitle}>useState 基础状态管理</Text>
      <Text style={styles.heroNote}>
        函数组件“记住”数据的唯一入口；返回 [值,
        改值函数]，调用改值函数即触发重渲染。
      </Text>

      {/* 1. 数字 state：计数器 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>1. 数字 state · 计数器</Text>
        <Text style={styles.bigNumber}>{count}</Text>
        <View style={styles.btnRow}>
          <Button title="-1" onPress={() => setCount(c => c - 1)} />
          <Button title="重置" onPress={() => setCount(0)} />
          <Button title="+1" onPress={() => setCount(c => c + 1)} />
        </View>
      </View>

      {/* 2. 字符串 state：受控输入 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>2. 字符串 state · 受控输入</Text>
        <TextInput
          style={styles.input}
          placeholder="输入文字，下方实时回显"
          value={name}
          onChangeText={setName}
        />
        <Text style={styles.kv}>你输入的是：{name || '（空）'}</Text>
      </View>

      {/* 3. 布尔 state：显示 / 隐藏 */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>3. 布尔 state · 显示 / 隐藏</Text>
          <Switch value={visible} onValueChange={setVisible} />
        </View>
        {visible && (
          <Text style={styles.kv}>现在你能看到我 👀（关掉开关我就消失）</Text>
        )}
      </View>

      {/* 4. 对象 state：合并更新 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>4. 对象 state · 合并更新</Text>
        <Text style={styles.kv}>
          年龄：{user.age} ｜ 城市：{user.city}
        </Text>
        <View style={styles.btnRow}>
          <Button
            title="年龄 +1"
            onPress={() => setUser(prev => ({...prev, age: prev.age + 1}))}
          />
          <Button
            title="搬到上海"
            onPress={() => setUser(prev => ({...prev, city: '上海'}))}
          />
        </View>
        <Text style={styles.tip}>
          注意：必须用 {'{...prev, 字段}'} 展开旧值，否则其他字段会被覆盖成
          undefined。
        </Text>
      </View>

      {/* 5. 数组 state：列表增删 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>5. 数组 state · 列表增删</Text>
        {todos.map((t, i) => (
          <View key={i} style={styles.todoRow}>
            <Text style={styles.kv}>
              {i + 1}. {t}
            </Text>
            <Button title="删除" onPress={() => removeTodo(i)} />
          </View>
        ))}
        <View style={styles.btnRow}>
          <Button title="添加输入框内容" onPress={addTodo} />
        </View>
      </View>

      {/* 6. 函数式更新：连续递增 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>6. 函数式更新 · 连续递增</Text>
        <Text style={styles.kv}>step = {step}</Text>
        <Button
          title="一次 +3（函数式更新避免丢更新）"
          onPress={() => {
            // 三次都基于“上一次的结果”累加，最终 +3
            setStep(s => s + 1);
            setStep(s => s + 1);
            setStep(s => s + 1);
          }}
        />
        <Text style={styles.tip}>
          如果写成 setStep(step + 1) 三次，三者都基于同一个旧值，结果只会 +1；
          用 (s) {'=>'} s + 1 才能正确累加到 +3。
        </Text>
      </View>

      {/* 7. 延迟初始化：只算一次 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>7. 延迟初始化 · 只算一次</Text>
        <Text style={styles.kv}>
          组件挂载时间戳：{new Date(initTime).toLocaleTimeString()}
        </Text>
        <Text style={styles.tip}>
          useState(() =&gt; 昂贵计算) 的 initializer
          仅在首次渲染执行一次，避免每次重渲染都重复计算。
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: theme.background,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 8,
    marginBottom: 6,
  },
  heroNote: {
    fontSize: 13,
    color: theme.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  card: {
    backgroundColor: theme.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.border,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.primary,
    marginBottom: 10,
  },
  bigNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginVertical: 8,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  input: {
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: theme.text,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  kv: {
    fontSize: 14,
    color: theme.text,
    marginTop: 6,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.divider,
  },
  tip: {
    fontSize: 12,
    color: theme.textSecondary,
    lineHeight: 18,
    marginTop: 8,
  },
});

export default UseStateExample;
