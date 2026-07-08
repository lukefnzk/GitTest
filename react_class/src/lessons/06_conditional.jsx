// ============================================================
// 06 · 조건부 렌더링 — 상황에 따라 다른 화면
// ------------------------------------------------------------
// [개념] JSX 안에서 조건에 따라 보여줄지 / 무엇을 보여줄지 고른다.
//   1) &&   : 조건이 참일 때만 보여줌       {isNew && <Badge/>}
//   2) ? :  : 둘 중 하나 (삼항 연산자)      {ok ? <Yes/> : <No/>}
//   3) early return : 함수 위에서 아예 다른 화면을 return
//
// [PHP 비교]
//   <?php if ($login): ?> 환영 <?php else: ?> 로그인하세요 <?php endif; ?>
//        ↕
//   {login ? <p>환영</p> : <p>로그인하세요</p>}
// ============================================================
import { useState } from 'react'

export default function Lesson06() {
  const [login, setLogin] = useState(false)
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>06 · 조건부 렌더링</h2>

      <div className="demo">
        {/* 삼항: 로그인 여부에 따라 다른 문구 */}
        {login ? <p>✅ 환영합니다!</p> : <p>🔒 로그인이 필요합니다.</p>}
        <button onClick={() => setLogin(!login)}>
          {login ? '로그아웃' : '로그인'} {/* 버튼 글자도 조건부 */}
        </button>
      </div>

      <div className="demo">
        <p>장바구니: {count}개</p>
        <button onClick={() => setCount(count + 1)}>담기</button>{' '}
        <button onClick={() => setCount(0)}>비우기</button>
        {/* && : 조건이 참일 때만 나타난다. 0개면 아래 줄은 안 보임 */}
        {count > 0 && <p className="muted">🛒 {count}개가 담겨 있어요.</p>}
        {count >= 5 && <p>🎉 5개 이상! 무료배송 대상입니다.</p>}
      </div>
    </>
  )
}
