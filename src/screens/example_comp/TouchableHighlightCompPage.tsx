import React, {useState} from 'react';
import {ScrollView, Text, TouchableHighlight, StyleSheet} from 'react-native';

/**
 * TouchableHighlightCompPage —— TouchableHighlight 演示页
 *
 * TouchableHighlight 按下时会在底层显示 underlayColor（默认黑色半透明），
 * 松手后淡出，是最常见的「按钮按下变暗」方案。演示：
 *   1) 基础 underlayColor               —— 按下显示底层高亮色
 *   2) activeOpacity                    —— 整体透明度（配合 underlay）
 *   3) onShowUnderlay / onHideUnderlay  —— 显示/隐藏时的回调（可改文本）
 */
function TouchableHighlightCompPage(): JSX.Element {
  const [showing, setShowing] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 基础 underlayColor</Text>
      <Text style={styles.note}>
        underlayColor 决定按下时露出的底层颜色；松手自动淡出
      </Text>
      <TouchableHighlight
        style={styles.btn}
        underlayColor="#1565c0"
        onPress={() => {}}>
        <Text style={styles.btnText}>按下变蓝底（underlayColor）</Text>
      </TouchableHighlight>

      <Text style={styles.title}>2. activeOpacity 透明度</Text>
      <TouchableHighlight
        style={styles.btn}
        underlayColor="#2e7d32"
        activeOpacity={0.5}
        onPress={() => {}}>
        <Text style={styles.btnText}>activeOpacity=0.5（整体更透明）</Text>
      </TouchableHighlight>

      <Text style={styles.title}>3. onShowUnderlay / onHideUnderlay</Text>
      <Text style={styles.note}>
        按下/松手回调，可借此切换文字或触发其它逻辑
      </Text>
      <TouchableHighlight
        style={styles.btn}
        underlayColor="#ad1457"
        onShowUnderlay={() => setShowing(true)}
        onHideUnderlay={() => setShowing(false)}
        onPress={() => {}}>
        <Text style={styles.btnText}>
          {showing ? '正在按下 👇' : '按我（回调切换文字）'}
        </Text>
      </TouchableHighlight>
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
  btn: {
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
});

export default TouchableHighlightCompPage;
