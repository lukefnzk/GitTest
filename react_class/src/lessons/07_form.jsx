// ============================================================
// 07 · 폼 다루기 — 입력값을 state와 연결(controlled input)
// ------------------------------------------------------------
// [개념] 입력창의 값을 state가 "쥐고" 있게 한다.
//   value={text}                              ← 화면에 보일 값은 state에서 온다
//   onChange={(e) => setText(e.target.value)} ← 타이핑하면 state를 갱신
//   이 두 줄이 짝을 이루면 "state ↔ 입력창"이 항상 동기화된다.
//
// [PHP 비교] PHP 폼: 제출(submit) → 서버로 왕복 → $_POST['name']로 받음.
//   즉 값을 보려면 서버에 갔다 와야 했다.
//   React: 타이핑하는 "즉시" state에 있으니, 새로고침·왕복 없이 실시간 사용.
//   form 제출 시 e.preventDefault()로 브라우저 기본 새로고침을 막는다.
//
// [종합] 이 레슨은 state + 이벤트 + 리스트 + 조건부를 한 번에 쓴다(미니 할일앱).
// ============================================================
import { useState } from 'react'

export default function Lesson07() {
  const [text, setText] = useState('') // 입력창 값
  const [todos, setTodos] = useState([]) // 추가된 할 일 목록

  function handleSubmit(e) {
    e.preventDefault() // 새로고침 막기 (중요!)
    if (text.trim() === '') return // 빈 값은 무시
    setTodos([...todos, text]) // 기존 목록 + 새 항목 → "새 배열"로 갱신
    setText('') // 입력창 비우기
  }

  return (
    <>
      <h2>07 · 폼 (controlled input)</h2>

      <form className="demo" onSubmit={handleSubmit}>
        <input
          value={text} // state가 값을 쥔다
          onChange={(e) => setText(e.target.value)} // 타이핑 → state 갱신
          placeholder="할 일을 입력하고 Enter"
        />{' '}
        <button type="submit">추가</button>

        {/* state를 실시간 그대로 보여줌 → 동기화 확인 */}
        <p className="muted">
          입력 중: “{text}” ({text.length}자)
        </p>

        {/* 여기선 "추가만" 하므로 index를 key로 써도 괜찮다 */}
        {todos.length === 0 ? (
          <p className="muted">아직 할 일이 없어요.</p>
        ) : (
          <ul>
            {todos.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        )}
      </form>
    </>
  )
}
