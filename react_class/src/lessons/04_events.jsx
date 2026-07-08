// ============================================================
// 04 · 이벤트 핸들링 — 사용자의 클릭/입력에 반응하기
// ------------------------------------------------------------
// [개념] onClick, onChange, onSubmit 처럼 on + 이벤트이름(카멜표기).
//   값으로는 "함수 자체"를 넘긴다. 함수를 "호출"하면 안 된다!
//     onClick={handleClick}     ✅ 함수를 넘김 (클릭할 때 실행됨)
//     onClick={handleClick()}   ❌ 지금 당장 실행해버림 (틀림)
//
// [web_class 비교]
//   web_class:  el.addEventListener('click', handler)
//   React:      <button onClick={handler}>   ← JSX 속성으로 바로 연결
//
// [PHP 비교] PHP엔 "클릭 이벤트" 개념이 없었다(서버는 요청만 받음).
//   버튼 반응은 늘 JS의 몫이었는데, React는 그 JS를 컴포넌트 안에 깔끔히 둔다.
// ============================================================
import { useState } from 'react'

export default function Lesson04() {
  const [log, setLog] = useState('아직 없음')

  // 이벤트 핸들러 함수 (보통 handle~ 로 이름 짓는다)
  function handleClick() {
    setLog('버튼을 클릭했다!')
  }

  // 이벤트 객체(e)로 "어떤 요소에서 일어났는지" 등 정보를 얻는다
  function handleHover(e) {
    setLog('마우스가 "' + e.target.textContent + '" 위에 올라옴')
  }

  return (
    <>
      <h2>04 · 이벤트 핸들링</h2>
      <div className="demo">
        {/* 함수를 넘긴다 (호출 X) */}
        <button onClick={handleClick}>클릭</button>{' '}
        {/* 인자를 넘기고 싶으면 화살표 함수로 감싼다 */}
        <button onClick={() => setLog('빨강 버튼!')} onMouseEnter={handleHover}>
          빨강
        </button>
        <p className="muted">마지막 이벤트: {log}</p>
      </div>
    </>
  )
}
