// ============================================================
// main.js · Tauri 렌더러(화면) 쪽 스크립트
// ------------------------------------------------------------
// [Electron 비교]
//   Electron: Node가 Chromium을 "새로 켜서" 그 안에 화면을 그림 (무겁다).
//   Tauri   : OS에 "이미 떠 있는" WebView2를 빌려 화면을 그림 (가볍다).
//   → 화면 코드(순수 JS/DOM)는 양쪽이 사실상 똑같다. 아래가 그 증거.
//
// [핵심 차이] Tauri의 백엔드는 Node가 아니라 Rust다.
//   window.__TAURI__.core.invoke("greet", {...}) 로 Rust 함수를 호출한다.
//   → Electron의 preload/IPC 다리와 같은 역할.
// ============================================================

const { invoke } = window.__TAURI__.core

window.addEventListener('DOMContentLoaded', () => {
  // 1) 순수 JS 카운터 — electron_hello 와 동일한 UX (여긴 Rust 없이 JS만)
  //    [web_class 비교] 08~09 레슨의 DOM 조작 그대로다.
  const msg = document.querySelector('#msg')
  let count = 0
  document.querySelector('#greetBtn').addEventListener('click', () => {
    count += 1
    msg.textContent = `안녕하세요! (${count}번째 인사)`
  })

  // 2) Rust 백엔드 호출 — Tauri의 시그니처 기능
  //    src-tauri/src/lib.rs 의 #[tauri::command] greet 를 호출한다.
  const rustMsg = document.querySelector('#rustMsg')
  document.querySelector('#rustBtn').addEventListener('click', async () => {
    rustMsg.textContent = await invoke('greet', { name: '철수' })
  })

  // 3) 지금 화면을 그리는 엔진 정보(UA 문자열) 표시
  //    → Electron이면 "Chrome/... Electron/..." 이 뜨고,
  //      Tauri면 "Edge/..." (= 윈도우 내장 WebView2) 가 뜬다. 직접 비교해보라.
  document.querySelector('#ver').textContent = navigator.userAgent
})
