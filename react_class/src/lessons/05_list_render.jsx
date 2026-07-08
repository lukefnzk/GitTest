// ============================================================
// 05 · 리스트 렌더링 — 배열을 화면 목록으로
// ------------------------------------------------------------
// [개념] 배열.map()으로 "데이터 배열 → JSX 요소 배열"을 만든다.
//   각 항목엔 반드시 key(고유값)를 준다. React가 항목을 구분하는 이름표.
//
// [PHP 비교]
//   foreach ($fruits as $f) { echo "<li>$f</li>"; }
//        ↕ 똑같은 일을
//   {fruits.map((f) => <li key={f}>{f}</li>)}
//
// [web_class 비교] 반복문으로 innerHTML 문자열을 이어붙이던 것을 .map()이 대신한다.
//
// [key 규칙] 형제 항목끼리 안 겹치는 고유값(주로 id). 없으면 콘솔 경고가 뜬다.
//   되도록 index 대신 진짜 id를 써라(항목 순서가 바뀌면 index는 문제가 된다).
// ============================================================
export default function Lesson05() {
  const fruits = ['🍎 사과', '🍌 바나나', '🍇 포도']
  const users = [
    { id: 101, name: '철수', role: '관리자' },
    { id: 102, name: '영희', role: '회원' },
    { id: 103, name: '민수', role: '회원' },
  ]

  return (
    <>
      <h2>05 · 리스트 렌더링</h2>

      <div className="demo">
        <b>과일 (문자열 배열)</b>
        <ul>
          {fruits.map((f) => (
            <li key={f}>{f}</li> // key = 항목 구분용 고유값
          ))}
        </ul>
      </div>

      <div className="demo">
        <b>사용자 (객체 배열)</b>
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.name} <span className="muted">— {u.role}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* → 배열 항목 수만큼 <li>가 자동으로 생성된다 */}
    </>
  )
}
