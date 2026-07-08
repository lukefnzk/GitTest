// ============================================================
// 08 · useEffect + fetch — 화면이 뜬 뒤 데이터 불러오기
// ------------------------------------------------------------
// [개념] useEffect = "렌더가 끝난 뒤에 실행할 부수적인 일"을 맡긴다.
//   (데이터 가져오기, 타이머, 구독 등 = side effect)
//
//   useEffect(() => {
//     ... 실행할 일 ...
//   }, [])   ← 의존성 배열. []면 "처음 화면에 나타날 때 딱 한 번".
//
// [흐름] 컴포넌트 등장 → (로딩 화면) → useEffect가 fetch → 데이터 도착 →
//   setState → 자동 리렌더 → 데이터가 화면에 채워진다.
//
// [PHP 비교 ⭐ 앞서 나눈 SEO 이야기와 연결되는 지점]
//   PHP: 서버가 데이터까지 넣어 "완성된 HTML"을 보냄 → 크롤러가 바로 본다.
//   React(CSR): 일단 빈/로딩 화면을 보내고, 뜬 뒤 useEffect에서 fetch해 채운다.
//     → 그래서 순수 React는 SEO에 약하다. 이 약점을 Next.js의 서버렌더가 해결한다.
//   즉 이 레슨이 "왜 Next.js가 필요한가"를 몸으로 보여주는 자리다.
//
// [참고] 개발 중(StrictMode)엔 effect가 일부러 2번 실행되어 요청이 2번 보일 수 있다.
//   실수를 잡으려는 개발용 동작이라 정상이다(배포판에선 1번만 실행).
// ============================================================
import { useState, useEffect } from 'react'

export default function Lesson08() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // 공개 연습용 API에서 사용자 목록을 가져온다
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error('요청 실패: ' + res.status)
        return res.json()
      })
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, []) // [] = 처음 한 번만 실행

  return (
    <>
      <h2>08 · useEffect + fetch</h2>
      <div className="demo">
        {/* 3가지 상태를 조건부 렌더링으로 구분: 로딩 / 에러 / 성공 */}
        {loading && <p className="muted">⏳ 불러오는 중…</p>}
        {error && <p style={{ color: 'crimson' }}>⚠️ {error}</p>}
        {!loading && !error && (
          <ul>
            {users.map((u) => (
              <li key={u.id}>
                {u.name} <span className="muted">({u.email})</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="muted">
        네트워크가 없으면 ⚠️ 에러가 뜨는데, 그것도 정상 동작(에러 상태 처리)입니다.
      </p>
    </>
  )
}
