// ============================================================
// 03 · useState — 변하는 값(상태)을 다루기   ⭐ React의 심장
// ------------------------------------------------------------
// [개념] 화면에서 "바뀌는 값"은 그냥 변수로 두면 안 된다.
//   useState로 만들어야 값이 바뀔 때 React가 화면을 자동으로 다시 그린다.
//
//   const [count, setCount] = useState(0)
//          ↑현재값   ↑바꾸는함수      ↑처음값
//   - 값을 바꿀 땐 반드시 setCount(...)를 쓴다. (count = 1 처럼 직접 대입 ❌)
//   - setCount를 부르면 → 이 컴포넌트 함수가 "다시 실행"되어 새 화면이 그려짐.
//
// [web_class 비교] web_class에서 `let state = 0; ...; render()` 처럼
//   값을 바꾼 뒤 render()를 "손으로" 부르던 그 패턴을 useState가 자동화한다.
//   즉 setCount가 render() 호출까지 대신 해준다.
//
// [PHP 비교] PHP는 페이지가 한 번 그려지면 끝(상태 없음). 값이 바뀌면 새로고침해야 했다.
//   React state는 새로고침 없이 화면 일부가 즉시 바뀐다.
// ============================================================
import { useState } from 'react'

export default function Lesson03() {
  const [count, setCount] = useState(0) // 숫자 상태
  const [on, setOn] = useState(false) // true/false 상태

  return (
    <>
      <h2>03 · useState</h2>

      <div className="demo">
        <p>
          카운트: <b>{count}</b>
        </p>
        {/* 클릭 → setCount로 값 변경 → 자동 리렌더 → 화면 숫자 갱신 */}
        <button onClick={() => setCount(count + 1)}>+1</button>{' '}
        {/* {' '} = 버튼 사이 공백 한 칸 (JSX에선 이렇게 넣는다) */}
        <button onClick={() => setCount(0)}>리셋</button>
      </div>
      {/* → 버튼 누를 때마다 새로고침 없이 숫자가 올라간다 */}

      <div className="demo">
        <p>전등: {on ? '💡 켜짐' : '⚫ 꺼짐'}</p>
        <button onClick={() => setOn(!on)}>토글</button> {/* 반대값으로 뒤집기 */}
      </div>
    </>
  )
}
