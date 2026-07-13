// ============================================================
// 03 · useState — 변하는 값(상태)을 다루기   ⭐ React의 심장
// ------------------------------------------------------------
// [한 줄 요약] useState는 새로운 마법이 아니다.
//   web_class 08에서 "손으로" 하던 일을 자동화한 것뿐이다.
//
// [★ 가장 중요한 사실] React 컴포넌트 함수 = web_class의 render() 다!
//   React는 화면을 그릴 때마다 이 함수를 "처음부터 다시" 실행한다.
//   그래서 함수 안에 let count = 0 을 두면 = render() 안에 값을 넣어둔 꼴이다.
//   → 다시 실행될 때마다 0으로 리셋된다. (0절에서 직접 눌러보고 확인!)
//
// [web_class 08 (손으로) ↔ React (useState)]
//   let count = 0;              →  const [count, setCount] = useState(0)
//   function render() { ... }   →  컴포넌트 함수 그 자체
//   count++;  render();         →  setCount(count + 1)      ← 두 줄이 한 줄로!
//   render() 호출을 까먹으면 끝  →  까먹을 수가 없다 (setCount가 자동으로 부름)
//
//   const [count, setCount] = useState(0)
//          ↑현재값   ↑바꾸는함수      ↑처음값
//   - 값을 바꿀 땐 반드시 setCount(...)를 쓴다. (count = 1 처럼 직접 대입 ❌)
//   - setCount를 부르면 → 이 컴포넌트 함수가 "다시 실행"되어 새 화면이 그려짐.
//
// [PHP 비교] PHP는 요청이 끝나면 스크립트가 죽는다(상태 없음). 값이 바뀌면 새로고침.
//   React state는 새로고침 없이 브라우저 안에서 화면 일부만 즉시 바뀐다.
// ============================================================
import { useState } from 'react'

// ============================================================
// 0절 · 왜 그냥 let 변수는 안 되나 — "고장난 카운터"
// ------------------------------------------------------------
// ★ 이 컴포넌트는 일부러 고장 냈다. 고치지 말고 직접 눌러보라!
//   F12를 눌러 콘솔을 열어두고 시작할 것.
// ============================================================
function BrokenCounter() {
  let count = 0 // ❌ 컴포넌트 함수 "안"의 평범한 변수 = render() 안에 값을 넣은 꼴

  const handleClick = () => {
    count = count + 1
    // 값은 진짜로 올라간다. 그런데 화면은 꿈쩍도 안 한다.
    console.log('[고장난 카운터] count =', count, '← 값은 오르는데 화면은 그대로!')
  }

  return (
    <div className="demo" style={{ borderColor: '#f5a3a3', borderWidth: 2 }}>
      <p style={{ margin: '0 0 8px' }}>
        화면에 표시된 값: <b style={{ fontSize: 24 }}>{count}</b>
      </p>
      <button onClick={handleClick}>+1 (눌러도 화면이 안 바뀐다)</button>
      <p className="muted" style={{ marginBottom: 0 }}>
        <b>문제 ①  알림이 안 간다</b> — setCount가 없으니 React는 "값이 바뀌었으니 다시
        그려야겠다"는 걸 <b>알 방법이 없다.</b> 콘솔엔 1, 2, 3… 이 찍히는데 화면은 0 그대로다.
      </p>
    </div>
  )
}

// ============================================================
// 레슨 본체
// ============================================================
export default function Lesson03() {
  const [count, setCount] = useState(0) // 숫자 상태
  const [on, setOn] = useState(false) // true/false 상태
  const [redraw, setRedraw] = useState(0) // 0절 실험용: 강제로 화면을 다시 그리게 만드는 스위치

  return (
    <>
      <h2>03 · useState</h2>

      {/* ---------- 0절: 고장난 카운터 ---------- */}
      <h3>0. 왜 그냥 let 변수는 안 되나 (직접 눌러보기)</h3>
      <p className="muted">
        <b>F12를 눌러 콘솔을 열고</b> 아래 빨간 상자의 <code>+1</code>을 <b>5번</b> 눌러보라.
      </p>

      <BrokenCounter />

      <div className="demo" style={{ borderColor: '#f5a3a3', borderWidth: 2 }}>
        <p className="muted" style={{ marginTop: 0 }}>
          콘솔에 5까지 찍혔는데 위 화면은 0이다. 그럼 화면을 강제로 다시 그리게 해보자.
          (이 버튼은 이 레슨의 다른 state를 건드려 <b>화면 전체를 다시 그리게</b> 만든다)
        </p>
        <button onClick={() => setRedraw(redraw + 1)}>
          강제로 화면 다시 그리기 (지금까지 {redraw}번)
        </button>
        <p className="muted" style={{ marginBottom: 0 }}>
          <b>문제 ②  기억을 못 한다</b> — 화면이 다시 그려졌는데도 위 숫자는 5가 아니라{' '}
          <b>여전히 0</b>이다. BrokenCounter 함수가 <b>처음부터 다시 실행</b>되면서{' '}
          <code>let count = 0</code>도 <b>다시 실행됐기 때문</b>이다.
        </p>
      </div>

      <p className="muted">
        정리하면 <code>let</code>은 <b>①값이 바뀌어도 React가 모르고, ②다시 그리면 값을 잃는다.</b>
        <br />
        <b>useState는 이 두 문제를 동시에 푼다.</b> 값은 React가 컴포넌트 바깥에 보관해주고
        (→기억), setCount를 부르면 React가 화면을 다시 그려준다(→알림).
      </p>

      {/* ---------- 1절: 정상 카운터 ---------- */}
      <h3>1. useState로 고친 카운터</h3>

      <div className="demo" style={{ borderColor: '#8fd8a0', borderWidth: 2 }}>
        <p style={{ margin: '0 0 8px' }}>
          카운트: <b style={{ fontSize: 24 }}>{count}</b>
        </p>
        {/* 클릭 → setCount로 값 변경 → 자동 리렌더 → 화면 숫자 갱신 */}
        <button onClick={() => setCount(count + 1)}>+1</button>{' '}
        {/* {' '} = 버튼 사이 공백 한 칸 (JSX에선 이렇게 넣는다) */}
        <button onClick={() => setCount(0)}>리셋</button>
        <p className="muted" style={{ marginBottom: 0 }}>
          <code>let</code>이 <code>useState</code>로 바뀌고, <code>count++</code>가{' '}
          <code>setCount(count + 1)</code>로 바뀐 것 <b>딱 두 곳</b>이 다르다. 그런데 이제 동작한다.
        </p>
      </div>
      {/* → 버튼 누를 때마다 새로고침 없이 숫자가 올라간다 */}

      {/* ---------- 2절: 토글 ---------- */}
      <h3>2. 숫자가 아니어도 된다 (true/false)</h3>
      <div className="demo">
        <p>전등: {on ? '💡 켜짐' : '⚫ 꺼짐'}</p>
        <button onClick={() => setOn(!on)}>토글</button> {/* 반대값으로 뒤집기 */}
      </div>
      <p className="muted">
        state에는 숫자·문자열·true/false·배열·객체 무엇이든 담을 수 있다. 규칙은 하나뿐:
        <b> 바꿀 땐 반드시 set함수로.</b>
      </p>
    </>
  )
}

// ============================================================
// 🔬 더 해볼 실험 (직접 고쳐보기)
// ------------------------------------------------------------
//  1. 위 Lesson03 함수의 맨 위에 이 줄을 넣고 +1을 눌러보라:
//       console.log('Lesson03 함수 실행됨! count =', count)
//     → 버튼을 누를 때마다 콘솔에 찍힌다. "컴포넌트 함수가 진짜로 다시 실행된다"는 증거다.
//
//  2. BrokenCounter의  let count = 0  을  const [count, setCount] = useState(0) 으로,
//     count = count + 1  을  setCount(count + 1) 로 바꿔보라.
//     → 고장난 카운터가 살아난다. 바꾼 건 딱 두 줄이다.
//
//  3. setCount(count + 1) 대신 count = count + 1 이라고 써보라.
//     → React가 "state는 직접 바꾸면 안 된다"고 경고하거나, 그냥 아무 일도 안 일어난다.
// ============================================================
