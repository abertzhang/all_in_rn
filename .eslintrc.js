module.exports = {
  root: true,
  extends: '@react-native',
  // 挂载 import 插件，提供 import/no-unresolved 等模块解析规则
  plugins: ['import'],
  // 告诉解析器去哪找 .ts/.tsx 等扩展名的文件（默认只认 .js/.json/.node）
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
  },
  // 排除原生与 OpenHarmony 构建产物，避免 .ets/原生文件被误扫报错
  ignorePatterns: ['node_modules', 'harmony', 'android', 'ios', 'coverage'],
  rules: {
    // 导入路径解析不了（写错相对路径、文件不存在等）直接报 error
    'import/no-unresolved': 'error',
  },
};
