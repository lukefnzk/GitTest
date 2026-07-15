// ============================================================
// preload.js · 메인 ↔ 렌더러 사이의 "안전한 다리"
// ------------------------------------------------------------
// 렌더러(브라우저 화면)는 보안상 Node 기능에 직접 접근하지 못한다.
// 여기서 contextBridge 로 "딱 허용한 것만" 화면의 window 에 얹어준다.
// 아래에선 지금 돌고 있는 Electron/Node/Chromium 버전을 화면이 읽을 수 있게 노출한다.
//   → 이 값을 화면에 찍어보면 "웹페이지 안에서 Node와 Chromium이 함께 돈다"는 게 눈에 보인다.
// ============================================================

const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('appInfo', {
  electron: process.versions.electron,
  node: process.versions.node,
  chrome: process.versions.chrome,
})
