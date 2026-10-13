import React, {useState} from 'react';
import {ScrollView, Text, TextInput, StyleSheet} from 'react-native';

/**
 * TextInputCompPage —— TextInput 组件属性演示页（函数式组件）
 *
 * 用「一块一属性」的方式演示 <TextInput> 的常用属性：
 *   1) value + onChangeText          —— 受控输入（useState 实时回显）
 *   2) placeholder / placeholderTextColor —— 占位提示文字与颜色
 *   3) keyboardType                 —— 键盘类型：default / numeric / email-address / phone-pad
 *   4) secureTextEntry              —— 密码框（密文显示）
 *   5) multiline + numberOfLines      —— 多行文本域
 *   6) maxLength                    —— 字数上限（实时显示剩余）
 *   7) editable / autoCapitalize / autoCorrect —— 禁用态与自动大小写/纠错
 *   8) returnKeyType + onSubmitEditing —— 回车键类型与提交
 *   9) 样式自定义                     —— border / borderRadius / padding 模拟输入框外观
 *
 * 每个输入框都用一个 useState 做受控绑定，便于实时观察输入结果。
 */
function TextInputCompPage(): JSX.Element {
  // —— 各输入框各自的受控 state ——
  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pwd, setPwd] = useState('');
  const [bio, setBio] = useState('');
  const [limited, setLimited] = useState('');
  const [capText, setCapText] = useState('');
  const [submitted, setSubmitted] = useState('');

  const MAX = 10; // maxLength 演示用上限

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>1. 基础受控输入（value + onChangeText）</Text>
      <Text style={styles.note}>
        输入内容通过 onChangeText 写入 state，下方实时回显
      </Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="请输入姓名"
      />
      <Text style={styles.note}>回显：{name || '（空）'}</Text>

      <Text style={styles.title}>2. placeholder / placeholderTextColor</Text>
      <TextInput
        style={styles.input}
        placeholder="这是占位提示文字"
        placeholderTextColor="#bbbbbb"
        onChangeText={() => {}}
      />

      <Text style={styles.title}>3. keyboardType（键盘类型）</Text>
      <Text style={styles.note}>不同 keyboardType 调起不同输入法键盘</Text>
      <TextInput
        style={styles.input}
        keyboardType="default"
        placeholder="default（普通）"
        onChangeText={setNum}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="numeric（纯数字）"
        onChangeText={setNum}
      />
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="email-address（邮箱）"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        placeholder="phone-pad（电话）"
        onChangeText={setPhone}
      />
      <Text style={styles.note}>
        回显：数字={num || '（空）'} 邮箱={email || '（空）'} 电话=
        {phone || '（空）'}
      </Text>

      <Text style={styles.title}>4. secureTextEntry（密码框）</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="请输入密码"
        onChangeText={setPwd}
      />
      <Text style={styles.note}>回显：{pwd || '（空）'}</Text>

      <Text style={styles.title}>
        5. multiline + numberOfLines（多行文本域）
      </Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        placeholder="可换行的多行输入"
        onChangeText={setBio}
      />
      <Text style={styles.note}>回显：{bio || '（空）'}</Text>

      <Text style={styles.title}>6. maxLength（字数上限）</Text>
      <Text style={styles.note}>
        上限 {MAX} 字；剩余：{Math.max(0, MAX - limited.length)} 字
      </Text>
      <TextInput
        style={styles.input}
        maxLength={MAX}
        placeholder={`最多输入 ${MAX} 个字`}
        onChangeText={setLimited}
      />

      <Text style={styles.title}>
        7. editable / autoCapitalize / autoCorrect
      </Text>
      <TextInput
        style={styles.input}
        editable={false}
        value="此输入框已禁用（editable=false）"
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="autoCapitalize=none 且 autoCorrect=false（不自动大写/纠错）"
        onChangeText={setCapText}
      />
      <Text style={styles.note}>回显：{capText || '（空）'}</Text>

      <Text style={styles.title}>8. returnKeyType + onSubmitEditing</Text>
      <Text style={styles.note}>
        软键盘回车键类型；点回车触发 onSubmitEditing 提交
      </Text>
      <TextInput
        style={styles.input}
        returnKeyType="done"
        placeholder="回车键类型=done"
        onSubmitEditing={e => setSubmitted(e.nativeEvent.text)}
        onChangeText={() => {}}
      />
      <Text style={styles.note}>提交内容：{submitted || '（未提交）'}</Text>

      <Text style={styles.title}>9. 样式自定义（border / borderRadius）</Text>
      <Text style={styles.note}>
        内置 TextInput 无边框，常用 border 模拟输入框外观
      </Text>
      <TextInput
        style={[styles.input, styles.custom]}
        placeholder="带边框 + 圆角的输入框"
        onChangeText={() => {}}
      />
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
    marginTop: 2,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  textarea: {
    height: 100,
  },
  custom: {
    borderColor: '#1976d2',
    borderWidth: 2,
    backgroundColor: '#f5f9ff',
  },
});

export default TextInputCompPage;
