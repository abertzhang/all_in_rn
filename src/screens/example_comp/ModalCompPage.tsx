import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

/**
 * ModalCompPage —— Modal 模态弹窗演示页
 *
 * Modal 是覆盖在当前页面之上的浮层，常用于弹窗 / 选择面板 / 确认框。演示：
 *   1) 基础 visible + animationType('slide') —— 受控显隐 + 底部滑入
 *   2) transparent + 半透明遮罩 + 居中卡片   —— 自定义弹窗外观
 *   3) animationType 切换（none / slide / fade）
 *   4) onRequestClose                       —— Android 返回键关闭（Android 上强烈建议处理）
 */
type Anim = 'none' | 'slide' | 'fade';

function ModalCompPage(): JSX.Element {
  const [visible, setVisible] = useState(false);
  const [anim, setAnim] = useState<Anim>('slide');
  const [transparent, setTransparent] = useState(true);

  const open = (a: Anim, t: boolean) => {
    setAnim(a);
    setTransparent(t);
    setVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 基础 Modal（底部滑入）</Text>
      <TouchableOpacity
        style={styles.btnPrimary}
        onPress={() => open('slide', false)}>
        <Text style={styles.btnText}>打开 slide 弹窗（整页）</Text>
      </TouchableOpacity>

      <Text style={styles.title}>2. transparent 半透明遮罩 + 居中卡片</Text>
      <TouchableOpacity
        style={styles.btnGreen}
        onPress={() => open('fade', true)}>
        <Text style={styles.btnText}>打开 fade + 透明遮罩弹窗</Text>
      </TouchableOpacity>

      <Text style={styles.title}>3. animationType 切换</Text>
      <TouchableOpacity
        style={styles.btnOrange}
        onPress={() => open('none', false)}>
        <Text style={styles.btnText}>打开 none（无动画）</Text>
      </TouchableOpacity>
      <Text style={styles.note}>
        当前：animationType={anim}，transparent={String(transparent)}
      </Text>

      <Modal
        visible={visible}
        animationType={anim}
        transparent={transparent}
        onRequestClose={() => setVisible(false)}>
        {transparent ? (
          <View style={styles.overlay}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>半透明遮罩弹窗</Text>
              <Text style={styles.cardText}>
                背景是半透明遮罩，弹窗居中显示；animationType={anim}
              </Text>
              <TouchableOpacity
                style={[styles.btnPrimary, styles.btnTop]}
                onPress={() => setVisible(false)}>
                <Text style={styles.btnText}>关闭（Android 也可按返回键）</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.fullscreen}>
            <View style={styles.fullCard}>
              <Text style={styles.cardTitle}>全屏 Modal</Text>
              <Text style={styles.cardText}>
                transparent=false 时铺满全屏；animationType={anim}
              </Text>
              <TouchableOpacity
                style={[styles.btnPrimary, styles.btnTop]}
                onPress={() => setVisible(false)}>
                <Text style={styles.btnText}>关闭</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
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
  btnPrimary: {
    backgroundColor: '#1976d2',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnGreen: {
    backgroundColor: '#43a047',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnOrange: {
    backgroundColor: '#fb8c00',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  btnTop: {marginTop: 16},
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '82%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  cardTitle: {fontSize: 17, fontWeight: 'bold', color: '#222', marginBottom: 8},
  cardText: {fontSize: 13, color: '#666', textAlign: 'center'},
  fullscreen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullCard: {alignItems: 'center', padding: 24},
});

export default ModalCompPage;
