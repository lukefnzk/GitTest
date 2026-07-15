// ============================================================
// main.js · Electron "메인 프로세스" — 앱의 심장
// ------------------------------------------------------------
// [구조] Electron 앱은 프로세스가 2개다:
//   1) 메인 프로세스  (이 파일)        : Node.js 환경. 창을 만들고 OS와 대화.
//   2) 렌더러 프로세스 (index.html)   : Chromium(브라우저) 환경. 화면을 그림.
//   → 한 줄 요약: "Node가 창을 열고, 그 창 안에서 웹페이지가 돈다."
//     이게 VS Code / Slack / Discord 가 돌아가는 방식과 똑같다.
//
// [PHP 비교] PHP엔 이런 '상주 프로세스' 개념이 없다(요청 때만 켜졌다 꺼짐).
//   Electron은 앱이 켜져있는 내내 이 Node 프로세스가 계속 살아있다.
// ============================================================

const { app, BrowserWindow } = require('electron')
const path = require('node:path')

// 창 하나를 만드는 함수
function createWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 380,
    webPreferences: {
      // 보안 기본값: 렌더러(브라우저)가 Node를 직접 못 쓰게 막고(nodeIntegration:false),
      //   preload.js 라는 '안전한 다리'를 통해서만 값을 넘긴다(contextIsolation:true).
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  win.loadFile('index.html') // 렌더러가 그릴 화면
  // win.webContents.openDevTools()  // ← 개발자도구(F12) 보고 싶으면 주석 해제
}

// app 이 준비되면 창을 연다
//   (React의 useEffect(첫 렌더 후 실행) 와 타이밍 감각이 비슷하다)
app.whenReady().then(() => {
  createWindow()

  // [macOS 관례] 독 아이콘 다시 클릭 시 창이 없으면 새로 연다.
  //   윈도우에선 없어도 되지만 관례상 넣어둔다.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 모든 창이 닫히면 앱 종료 (macOS만 예외적으로 안 끄는 게 관례)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
