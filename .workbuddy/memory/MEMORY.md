# 项目记忆 (all_in_rn)

## Harmony RN OH 宿主工程（harmony/entry）
- 已按掘金文章（2025-03，Mac 搭鸿蒙 RN 环境，HarmonyOS NEXT/API12+）改造为 RN OH 宿主工程；模块名 `entry`（标准名，文章也用 `entry`）
- 版本严格对齐（已验证可编译）：
  - 原生侧 `entry/oh-package.json5` → `@rnoh/react-native-openharmony@0.72.112`
  - JS 侧 `package.json` → `@react-native-oh/react-native-harmony@0.72.112` + `react-native@0.72.5`
  - 0.72.112 原生包内确有 `src/main/cpp/RNOHAppNapiBridge.cpp`，CMakeLists 需显式编它（与文章一致）
- `appKey` = `"all_in_rn"`（取自根 `app.json` 的 name）；宿主首页 `entry/src/main/ets/pages/Index.ets` 用 `RNApp` + `MetroJSBundleProvider`（开发期从 Metro :8081 拉 bundle）
- 文章 0.72 写法的关键符号在 0.72.112 均真实导出并已核验：RNAbility / RNApp / createRNPackages / RNPackageContext / RNPackage / MetroJSBundleProvider / AnyJSBundleProvider / FileJSBundleProvider / ResourceJSBundleProvider / TraceJSBundleProviderDecorator / RNOHErrorDialog / RNOHLogger / RNOHCoreContext / ComponentBuilderContext；`wrapBuilder` 为 ArkTS 全局 API（无需 import）
- 环境变量已在 `~/.zshrc` 配置：`HDC_SERVER_PORT=7035`、`RNOH_C_API_ARCH=1`（含 launchctl setenv）；DevEco toolchains PATH 未显式加（可选）

## 关键文件清单（entry 模块）
- `src/main/cpp/CMakeLists.txt`：引入 @rnoh cpp、编译 `rnoh_app`（含 PackageProvider.cpp + RNOHAppNapiBridge.cpp）
- `src/main/cpp/PackageProvider.cpp`：包注册入口（当前空实现）
- `src/main/ets/RNPackagesFactory.ets`：`createRNPackages()`（ArkTS 侧包注册，当前空）
- `src/main/ets/entryability/EntryAbility.ets`：继承 `RNAbility` + `getPagePath()`
- `src/main/ets/pages/Index.ets`：`RNApp` 加载 RN
- `build-profile.json5`：`buildOption.externalNativeOptions` 指向 cpp/CMakeLists
- `src/main/module.json5`：`ohos.permission.ACCELEROMETER`（摇一摇调试）

## 教训
- 之前一次配置因会话中断未落盘，且 summary 把真实状态幻觉成 `phone` 模块 + 0.84.3；**凡是涉及具体文件/版本前必须先 ls/Read 真实验证**，不要信任中断后的 summary。
