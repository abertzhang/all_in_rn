#!/bin/bash
# ============================================================
# 修复安卓真机(华为/HarmonyOS 兼容机) 报错:
#   Invariant Violation: "all_in_rn" has not been registered
# 根因: 该机型 adb reverse(tcp:8081) 通道失效, App 连不上 Metro,
#       拿不到 bundle → AppRegistry.registerComponent 未执行 → 报未注册。
# 解决: 把 RN 的 debug_http_host 指向本机局域网 IP(RN 会自动拼 :8081)
#       ⚠️ 只能写纯 IP, 不能带端口, 否则 URL 变成 ip:8081:8081 静默失败
# 用法: bash scripts/rn_android_fix_devhost.sh [设备序列号]
# ============================================================
set -euo pipefail

DEVICE="${1:-$(adb devices | awk 'NR==2{print $1}')}"
export ANDROID_HOME="${ANDROID_HOME:-$HOME/sdk/android_sdk}"
PKG="uk.aknot.all_in_rn"
PREF="shared_prefs/${PKG}_preferences.xml"

# 本机局域网 IP(优先 en0,回退 en1)
MYIP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null)"
if [ -z "$MYIP" ]; then
  echo "❌ 未能获取本机局域网 IP,请检查网络连接"; exit 1
fi

echo "设备: $DEVICE   本机 IP: $MYIP"
echo "→ 写入 debug_http_host=$MYIP (纯 IP,不带端口)"

adb -s "$DEVICE" shell am force-stop "$PKG" || true
adb -s "$DEVICE" shell "run-as $PKG sh -c 'cat > $PREF'" <<XML
<?xml version='1.0' encoding='utf-8' standalone='yes' ?>
<map>
    <boolean name="remote_js_debug" value="false" />
    <string name="debug_http_host" value="$MYIP" />
</map>
XML

echo "→ 校验写入结果:"
adb -s "$DEVICE" shell "run-as $PKG cat $PREF" | grep debug_http_host
echo "✅ 完成。现在可启动 Metro 并 run-android:"
echo "   npx react-native start"
echo "   npx react-native run-android --deviceId=$DEVICE"
