import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, Button, StyleSheet} from 'react-native';
import {getTheme} from '../../theme';

// 接入项目主题色（浅色主题；语义色便于后续整体换肤）
const theme = getTheme('light');

/**
 * UseEffectExample —— useEffect Hook 综合演示页
 * ---------------------------------------------------------------------------
 * useEffect 用来在函数组件里执行“副作用”：数据订阅、定时器、手动改 DOM、
 * 异步请求等。它接收两个参数：
 *   useEffect(fn, deps?)
 *     - 不传 deps        ：每次渲染后都执行（较少用）
 *     - deps = []        ：仅在“挂载”时执行一次（最常用：建连接/起定时器）
 *     - deps = [a, b]    ：仅当 a/b 变化时才重新执行
 *   fn 可以返回一个“清理函数”，在组件卸载或下次执行前调用，用于释放资源。
 *
 * 本页用 3 个对照示例把上述三种依赖写法 + 清理函数讲清楚。
 */
function UseEffectExample(): JSX.Element {
  // —— 示例 1：定时器秒数 ——
  const [seconds, setSeconds] = useState<number>(0);

  // —— 示例 2：控制“依赖 effect”是否重跑的变量 ——
  const [dep, setDep] = useState<number>(0);
  // 统计 effect 实际执行次数，直观看出“依赖变化才重跑”
  const [effectRuns, setEffectRuns] = useState<number>(0);

  // —— 示例 3：一次性异步加载 ——
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<string>('');

  // ① 空依赖 []：挂载时启动定时器，返回清理函数清除定时器（经典防泄漏写法）
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    // 清理函数：组件卸载 / 下次执行前调用，避免定时器一直跑造成内存泄漏
    return () => clearInterval(id);
  }, []);

  // ② 指定依赖 [dep]：仅当 dep 变化时才重新执行（这里用来统计执行次数）
  useEffect(() => {
    setEffectRuns(r => r + 1);
  }, [dep]);

  // ③ 空依赖 []：仅挂载一次，模拟“一次性拉取数据”
  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => {
      setData('示例数据已加载完成 ✓');
      setLoading(false);
    }, 1500);
    return () => clearTimeout(id);
  }, []);

  // 手动重新模拟一次加载（不走 effect，便于反复演示）
  const reload = () => {
    setLoading(true);
    setTimeout(() => {
      setData('示例数据已重新加载 ✓');
      setLoading(false);
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heroTitle}>useEffect 副作用与生命周期</Text>
      <Text style={styles.heroNote}>
        在渲染之后执行副作用；依赖数组决定“何时重跑”，返回函数负责“清理”。
      </Text>

      {/* ① 定时器 + 清理 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>1. 空依赖 [] · 定时器 + 清理</Text>
        <Text style={styles.bigNumber}>{seconds}s</Text>
        <Text style={styles.kv}>
          每秒 +1，由 useEffect 启动的 setInterval 驱动
        </Text>
        <Text style={styles.tip}>
          返回 clearInterval(id) 清理函数：组件卸载（返回首页）时定时器被清除，
          不会在后台偷偷累加，避免内存泄漏。
        </Text>
      </View>

      {/* ② 依赖数组 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>2. 依赖 [dep] · 仅依赖变化才重跑</Text>
        <View style={styles.btnRow}>
          <Button title="dep -1" onPress={() => setDep(d => d - 1)} />
          <Button title="dep +1" onPress={() => setDep(d => d + 1)} />
        </View>
        <Text style={styles.kv}>dep = {dep}</Text>
        <Text style={styles.kv}>副作用已执行 {effectRuns} 次</Text>
        <Text style={styles.tip}>
          effect 只在 dep 变化时重跑：点按钮改 dep 会让执行次数 +1；
          仅改其他不相关 state 则不会触发。挂载时也会执行 1 次。
        </Text>
      </View>

      {/* ③ 一次性加载 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          3. 空依赖 [] · 仅挂载一次的数据加载
        </Text>
        <Text style={styles.kv}>{loading ? '加载中…' : data}</Text>
        <View style={styles.btnRow}>
          <Button title="重新模拟加载" onPress={reload} />
        </View>
        <Text style={styles.tip}>
          空依赖让 effect 只跑一次（模拟拉接口）；组件卸载会 clearTimeout
          取消未完成的计时。
        </Text>
      </View>

      {/* 规则小结 */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>依赖数组三件套（牢记）</Text>
        <Text style={styles.kv}>• 不传 deps：每次渲染后都执行</Text>
        <Text style={styles.kv}>• []：仅挂载时执行一次</Text>
        <Text style={styles.kv}>• [a, b]：a 或 b 变化才执行</Text>
        <Text style={styles.tip}>
          忘记写依赖或漏写变量，是 useEffect 最常见的 bug
          来源；需要用到的值都要放进数组。
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
    fontSize: 44,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
    marginVertical: 6,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  kv: {
    fontSize: 14,
    color: theme.text,
    marginTop: 6,
  },
  tip: {
    fontSize: 12,
    color: theme.textSecondary,
    lineHeight: 18,
    marginTop: 8,
  },
});

export default UseEffectExample;
