// ============================================================
// 02 · props — 부모가 자식에게 데이터 넘기기
// ------------------------------------------------------------
// [개념] 컴포넌트를 <태그>로 쓸 때 속성처럼 값을 넘긴다 → 그게 props.
//   자식 컴포넌트는 props를 "읽기 전용"으로 받는다. (자식이 못 바꿈)
//
// [PHP 비교]
//   function card($title, $body) { ... }   →   <Card title="..." body="..." />
//   함수에 인자 넘기기와 똑같다. include에 변수 넘겨주던 것과도 같은 개념.
//
// [핵심]
//   - 넘길 때:  <Greeting name="철수" />
//   - 받을 때:  function Greeting({ name }) { ... }   ← 구조분해로 꺼냄
//   - 숫자/변수/식을 넘길 땐 중괄호:  <Item price={1000} done={true} />
//   - props는 읽기 전용! 값을 "바꾸고" 싶으면 → 다음 레슨(state).
// ============================================================

// 자식 컴포넌트: props(name, emoji)를 받아 그린다
// ↓ 이건 "인자 자리에서 바로 구조분해"한 축약형. 아래 [방법 A]와 100% 똑같이 동작한다.
function Greeting({ name, emoji }) {
  return (
    <p>
      {emoji} 안녕하세요, <b>{name}</b>님!
    </p>
  )
}

// [방법 A] React는 태그의 속성들을 props 객체 하나로 묶어 첫 인자로 넘긴다.
//   → props를 통째로 받은 뒤, "순수 JS 구조분해"로 꺼내 써도 결과는 같다.
//   위 Greeting(축약형)과 아래 GreetingA(펼친형)는 완전히 동일하게 동작한다.
//   ※ const { name } = props 는 React 문법이 아니라 JavaScript(ES6) 문법!
//     (javascript_class/11_modern_syntax.js 의 구조분해와 같은 것)
// function GreetingA(props) {
//   const { name, emoji } = props   // ← 이 줄은 100% 순수 JS
//   return (
//     <p>
//       {emoji} 안녕하세요, <b>{name}</b>님!
//     </p>
//   )
// }
// → <Greeting .../> 든 <GreetingA .../> 든 화면 결과는 똑같다.

// props로 받은 값으로 카드 UI를 만드는 재사용 컴포넌트
function Card({ title, desc }) {
  // style={{ ... }} : JSX에서 인라인 스타일은 객체로 준다 (중괄호 2개)
  return (
    <div className="demo" style={{ margin: '8px 0' }}>
      <b>{title}</b>
      <p className="muted" style={{ margin: '4px 0 0' }}>
        {desc}
      </p>
    </div>
  )
}

export default function Lesson02() {
  return (
    <>
      <h2>02 · props</h2>

      {/* 같은 컴포넌트를 다른 값으로 재사용 → 이게 컴포넌트의 힘 */}
      <Greeting name="철수" emoji="👋" />
      <Greeting name="영희" emoji="🌸" />
      {/* → 👋 안녕하세요, 철수님!  /  🌸 안녕하세요, 영희님! */}

      <Card title="React" desc="UI를 컴포넌트로 조립하는 라이브러리" />
      <Card title="Vite" desc="아주 빠른 개발 서버 & 빌드 도구" />
    </>
  )
}
