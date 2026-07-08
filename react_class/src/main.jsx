// ============================================================
// main.jsx — 앱의 "진입점(entry point)"
// ------------------------------------------------------------
// 브라우저가 index.html을 열면 → <script src="/src/main.jsx"> 가 이 파일을 실행한다.
// 이 파일이 하는 일은 딱 하나: App 컴포넌트를 index.html의 <div id="root">에 그린다.
//
// [web_class 비교] web_class에서 document.getElementById('root')로 DOM을 직접
//   만지던 것을, React는 이 한 줄(createRoot().render())로 넘겨받고,
//   그 다음부터는 컴포넌트가 알아서 화면을 관리한다.
// [PHP 비교] PHP엔 이런 "진입점"이 눈에 안 보였다(웹서버가 .php를 바로 실행).
//   React는 JS 앱이라 "어디에 무엇을 그릴지"를 코드로 명시한다.
// ============================================================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode: 개발 중 실수를 잡아주는 "안전모". (배포 결과엔 영향 없음)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
