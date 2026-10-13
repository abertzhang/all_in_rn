import React, {useState} from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';

/**
 * TextCompPage —— Text 组件属性演示页（函数式组件）
 *
 * 用「一块一属性」的方式演示 <Text> 的常用与特有属性：
 *   1) style                   —— 样式的两种写法（StyleSheet 提取 / 内联对象）
 *   2) color                   —— 文本颜色（十六进制 / rgb / rgba 透明）
 *   3) fontSize/fontStyle/      —— 字号 / 斜体 / 字重
 *      fontWeight
 *   4) fontFamily/fontVariant  —— 字体族 / 字体变体（小型大写等）
 *   5) letterSpacing/lineHeight—— 字间距 / 行高
 *   6) textAlign/textAlignVertical—— 水平对齐 / Android 垂直对齐
 *   7) textDecoration*         —— 下划线 / 删除线 / 线型 / 线色
 *   8) textTransform           —— 大小写转换（uppercase/lowercase/capitalize）
 *   9) textShadow*             —— 文字阴影
 *  10) numberOfLines + ellipsizeMode —— 行数截断 + 省略号位置
 *  11) adjustsFontSizeToFit + minimumFontScale —— 自动缩放字号适配宽度
 *  12) allowFontScaling + maxFontSizeMultiplier —— 跟随系统字体缩放
 *  13) onPress / onLongPress   —— 点击 / 长按事件
 *  14) selectable / selectionColor / suppressHighlighting —— 文本可选中
 *  15) textBreakStrategy       —— Android 断行策略
 *  16) onTextLayout            —— 排版回调（获取行数等）
 *  17) 嵌套 Text 与样式继承    —— Text 独有核心特性
 */
function TextCompPage(): JSX.Element {
  // —— 用于演示 onPress / onLongPress 的交互状态 ——
  const [pressCount, setPressCount] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);
  // —— 用于演示 onTextLayout：记录实际排出来的行数 ——
  const [lineCount, setLineCount] = useState(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. style 属性（两种写法）</Text>
      {/* 写法 A：引用 StyleSheet.create 里提取的样式（推荐，便于复用/维护） */}
      <Text style={styles.basicText}>写法 A：style={'{styles.basicText}'}（StyleSheet 提取）</Text>
      {/* 写法 B：直接传一个内联 style 对象（适合一次性、局部微调） */}
      <Text style={{fontSize: 16, color: '#1565c0', fontWeight: '600'}}>
        写法 B：内联 {'{...}'} 对象
      </Text>

      <Text style={styles.title}>2. color（十六进制 / rgb / rgba 透明）</Text>
      <Text style={[styles.row, {color: '#e91e63'}]}>十六进制 #e91e63</Text>
      <Text style={[styles.row, {color: 'rgb(33,150,243)'}]}>rgb(33,150,243)</Text>
      {/* rgba 末位 0.5 表示半透明 */}
      <Text style={[styles.row, {color: 'rgba(76,175,80,0.5)'}]}>
        rgba(76,175,80,0.5) 半透明
      </Text>

      <Text style={styles.title}>3. fontSize / fontStyle / fontWeight</Text>
      <Text style={[styles.row, {fontSize: 12}]}>fontSize: 12（小）</Text>
      <Text style={[styles.row, {fontSize: 22}]}>fontSize: 22（大）</Text>
      <Text style={[styles.row, {fontStyle: 'italic'}]}>fontStyle: 'italic'（斜体）</Text>
      <Text style={[styles.row, {fontWeight: 'bold'}]}>fontWeight: 'bold'（粗体）</Text>
      <Text style={[styles.row, {fontWeight: '200'}]}>fontWeight: '200'（细）</Text>

      <Text style={styles.title}>4. fontFamily / fontVariant</Text>
      <Text style={[styles.row, {fontFamily: 'Cochin'}]}>
        fontFamily: 'Cochin'（iOS 自带衬线字体；Android 上无则回退系统字体）
      </Text>
      <Text style={[styles.row, {fontVariant: ['small-caps']}]}>
        fontVariant: ['small-caps']（小型大写字母变体）
      </Text>

      <Text style={styles.title}>5. letterSpacing（字间距）/ lineHeight（行高）</Text>
      <Text style={[styles.row, {letterSpacing: 6}]}>letterSpacing: 6（字间距加大）</Text>
      <Text style={[styles.row, {lineHeight: 32}]}>
        lineHeight: 32{'\n'}第二行也会被抬高到行高 32{'\n'}第三行依然保持行高
      </Text>

      <Text style={styles.title}>
        6. textAlign（水平对齐）/ textAlignVertical（Android 垂直对齐）
      </Text>
      {/* 容器给定宽度，才能看出 textAlign 的效果 */}
      <Text style={[styles.block, {textAlign: 'left'}]}>textAlign: 'left' 左对齐</Text>
      <Text style={[styles.block, {textAlign: 'center'}]}>textAlign: 'center' 居中</Text>
      <Text style={[styles.block, {textAlign: 'right'}]}>textAlign: 'right' 右对齐</Text>
      <Text style={[styles.block, {textAlign: 'justify'}]}>
        textAlign: 'justify' 两端对齐——这段文本会拉伸至左右边缘，常用于段落排版。
      </Text>
      {/* textAlignVertical 仅 Android 生效；取值 'auto' | 'top' | 'bottom' */}

      <Text style={styles.title}>
        7. textDecorationLine / Style / Color（下划线 / 删除线）
      </Text>
      <Text style={[styles.row, {textDecorationLine: 'underline'}]}>
        textDecorationLine: 'underline' 下划线
      </Text>
      <Text style={[styles.row, {textDecorationLine: 'line-through'}]}>
        textDecorationLine: 'line-through' 删除线
      </Text>
      <Text
        style={[
          styles.row,
          {
            textDecorationLine: 'underline line-through', // 可组合
            textDecorationStyle: 'dashed', // 虚线（iOS）
            textDecorationColor: '#e91e63', // 线颜色
          },
        ]}>
        组合：下划线+删除线 / dashed / 红色
      </Text>

      <Text style={styles.title}>8. textTransform（大小写转换）</Text>
      <Text style={[styles.row, {textTransform: 'uppercase'}]}>
        hello world → uppercase 全大写
      </Text>
      <Text style={[styles.row, {textTransform: 'lowercase'}]}>
        HELLO WORLD → lowercase 全小写
      </Text>
      <Text style={[styles.row, {textTransform: 'capitalize'}]}>
        hello world → capitalize 首字母大写
      </Text>

      <Text style={styles.title}>9. 文字阴影 textShadow*</Text>
      <Text
        style={[
          styles.row,
          {
            fontSize: 20,
            color: '#333',
            textShadowColor: 'rgba(0,0,0,0.4)', // 阴影颜色
            textShadowOffset: {width: 2, height: 2}, // 阴影偏移
            textShadowRadius: 4, // 阴影模糊半径
          },
        ]}>
        带阴影的文本
      </Text>

      <Text style={styles.title}>
        10. numberOfLines + ellipsizeMode（行数截断 + 省略号）
      </Text>
      {/* numberOfLines 是 Text 自身属性（不是 style）；ellipsizeMode 仅在设了 numberOfLines 且文本超长时生效 */}
      <Text numberOfLines={2} style={styles.block}>
        这段长文本因为 numberOfLines=2 会被截断为两行，超出部分直接丢弃（默认 ellipsizeMode='tail' 不一定生效，需配合 numberOfLines）。
      </Text>
      <Text numberOfLines={1} ellipsizeMode="head" style={styles.block}>
        ellipsizeMode='head'：省略号出现在头部——这是一段非常非常长的文本用于演示头部省略效果。
      </Text>
      <Text numberOfLines={1} ellipsizeMode="middle" style={styles.block}>
        ellipsizeMode='middle'：省略号出现在中间——这是一段非常非常长的文本用于演示中间省略效果。
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.block}>
        ellipsizeMode='tail'：省略号出现在尾部——这是一段非常非常长的文本用于演示尾部省略效果。
      </Text>

      <Text style={styles.title}>
        11. adjustsFontSizeToFit + minimumFontScale（自动缩放适配宽度）
      </Text>
      {/* 容器宽度固定，字号 30 必然超出；adjustsFontSizeToFit 是 Text 属性，会自动缩小字号塞进去 */}
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.5}
        style={[styles.block, {fontSize: 30}]}>
        长文本自动缩小字号以适配容器宽度（minimumFontScale=0.5 限制最小缩放）
      </Text>

      <Text style={styles.title}>
        12. allowFontScaling + maxFontSizeMultiplier（系统字体缩放）
      </Text>
      <Text style={[styles.row, {fontSize: 18}]}>
        默认：allowFontScaling=true，会跟随系统“字体大小”设置放大
      </Text>
      {/* allowFontScaling 是 Text 属性，非 style */}
      <Text allowFontScaling={false} style={[styles.row, {fontSize: 18}]}>
        allowFontScaling=false：不受系统字体缩放影响，始终保持 18
      </Text>
      <Text
        allowFontScaling
        maxFontSizeMultiplier={1.2}
        style={[styles.row, {fontSize: 18}]}>
        maxFontSizeMultiplier=1.2：最多只放大到 1.2 倍（防止大字溢出）
      </Text>

      <Text style={styles.title}>13. onPress / onLongPress（点击 / 长按事件）</Text>
      <Text
        style={[styles.row, styles.link]}
        onPress={() => setPressCount(c => c + 1)} // 单击
        onLongPress={() => setLongPressCount(c => c + 1)} // 长按
      >
        点我 / 长按我（Text 可直接绑定事件，无需外层 Touchable）
      </Text>
      <Text style={styles.note}>
        单击次数：{pressCount} ｜ 长按次数：{longPressCount}
      </Text>

      <Text style={styles.title}>
        14. selectable / selectionColor / suppressHighlighting（可选中）
      </Text>
      <Text selectable={true} selectionColor="#ff9800" style={styles.row}>
        selectable + selectionColor：长按可选中复制，选中高亮为橙色（iOS 用 selectionColor）
      </Text>
      <Text
        selectable={true}
        suppressHighlighting={true}
        style={styles.row}>
        suppressHighlighting=true：即便可点击也不显示按压高亮（iOS）
      </Text>

      <Text style={styles.title}>15. textBreakStrategy（Android 断行策略）</Text>
      {/* textBreakStrategy 是 Text 属性，仅 Android 生效 */}
      <Text textBreakStrategy="balanced" style={styles.block}>
        textBreakStrategy='balanced'：Android 上尽量让各行长度均衡（另有 'simple' / 'highQuality'）。
      </Text>

      <Text style={styles.title}>16. onTextLayout（排版回调，可获取行数）</Text>
      <Text
        style={styles.block}
        onTextLayout={e => setLineCount(e.nativeEvent.lines.length)}>
        这段文本会被排版成多行，onTextLayout 回调会把实际行数写进下面的说明里。多写几句让内容足够长以产生换行效果，便于观察 lines.length 的变化。
      </Text>
      <Text style={styles.note}>实际排出来的行数：{lineCount}</Text>

      <Text style={styles.title}>17. 嵌套 Text 与样式继承（Text 独有核心特性）</Text>
      {/* 外层 Text 的样式会被内层 Text 继承，内层可覆盖任意字段 */}
      <Text style={styles.parentText}>
        外层文本（黑色 16 号）
        <Text style={styles.childRed}>内层红色加粗</Text>
        <Text style={{color: '#1565c0', fontSize: 12}}>内层蓝色小字</Text>
        回到外层样式
      </Text>
      {/* 嵌套 Text 也可各自带 onPress，实现「一段文字里局部可点击」 */}
      <Text style={styles.parentText}>
        点击
        <Text style={styles.link} onPress={() => setPressCount(c => c + 1)}>
          这里
        </Text>
        跳转，其余部分不可点击。
      </Text>
    </ScrollView>
  );
}

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
    marginTop: 4,
  },
  row: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  },
  basicText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  // 给定宽度的块级文本容器，用于演示对齐/截断/缩放
  block: {
    fontSize: 15,
    color: '#333',
    width: 300,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    padding: 6,
    borderRadius: 6,
  },
  link: {
    color: '#1565c0',
    textDecorationLine: 'underline',
  },
  parentText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  childRed: {
    color: '#e91e63',
    fontWeight: 'bold',
  },
});

export default TextCompPage;
