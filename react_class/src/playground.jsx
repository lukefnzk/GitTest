// ============================================================
// playground.jsx — 내 연습장 (교재 아님!)
// ------------------------------------------------------------
// 여기는 마음껏 부수는 곳이다. lessons/ 는 교재라 원본을 지키고,
// 이 파일은 "전부 지우고 처음부터 다시 써도 되는" 내 작업 공간이다.
//
// [쓰는 법]
//   1. npm run dev  → 사이드바 맨 아래 "★ 내 연습장" 클릭
//   2. 이 파일을 고치고 저장 → 브라우저가 알아서 바뀐다 (HMR, 새로고침 불필요)
//   3. 망가지면? 아래 Playground 함수를 통째로 지우고 <h2>테스트</h2> 하나만 남겨서 되살린다
//
// [쓸 수 있는 CSS 클래스] (App.css에 이미 정의돼 있음)
//   className="demo"   → 흰 배경 + 테두리 상자 (버튼·input 스타일도 자동 적용)
//   className="muted"  → 작고 흐린 회색 글씨 (설명용)
//   className="badge"  → 노란 알약 배지
//   style={{ ... }}    → 인라인 스타일 (객체로 준다. 중괄호 2개!)
// ============================================================
import { useState } from 'react'

// ── 연습용 부품: 마음대로 고치거나 지워도 된다 ──────────────
function Hello({ name, children }) {
  return (
    <div className="demo">
      <b>안녕, {name}!</b> {children}
    </div>
  )
}

// ============================================================
// 여기부터가 화면. 지우고 새로 써도 된다.
// ============================================================
export default function Playground() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>★ 내 연습장</h2>
      <p className="muted">
        이 파일(<code>src/playground.jsx</code>)을 고치고 저장하면 바로 여기 반영된다.
      </p>

      {/* 1) props + children 연습 */}
      <Hello name="철수">
        <span className="badge">props</span>
      </Hello>

      {/* 2) useState 연습 */}
      <div className="demo">
        <p style={{ margin: '0 0 8px' }}>
          클릭 수: <b style={{ fontSize: 20 }}>{count}</b>
        </p>
        <button onClick={() => setCount(count + 1)}>+1</button>{' '}
        <button onClick={() => setCount(0)}>리셋</button>
      </div>

      {/* 3) 여기부터 자유롭게 추가해 보기 */}
    </>
  )
}

// ============================================================
// 🎯 연습 과제 (쉬운 순서)
// ------------------------------------------------------------
//  1. 카드 목록
//     - const items = [{ id: 1, title: 'React', desc: '...' }, ...] 배열을 만들고
//     - items.map(...) 으로 <Card>를 여러 개 그린다  (key 잊지 말 것!)
//     - 힌트: import Card from './components/Card.jsx'  ← 만들어둔 부품을 그냥 가져다 쓴다
//
//  2. 할 일 목록 (todo)
//     - input 에 입력 → "추가" 버튼 → 목록에 쌓이고 → 각 줄에 "삭제" 버튼
//     - state는 부모(Playground)가 갖고, 자식엔 값과 함수를 props로 내려준다
//     - 힌트: setTodos([...todos, 새항목])   ← 기존 배열을 펼치고 뒤에 붙인다(불변성)
//
//  3. 탭 UI
//     - const [tab, setTab] = useState('a')
//     - 버튼 3개로 tab을 바꾸고, {tab === 'a' && <내용A/>} 로 골라 보여준다
//     - 힌트: 지금 보고 있는 App.jsx의 사이드바가 정확히 이 구조다
// ============================================================

// ============================================================
// 📋 자주 쓰는 문법 치트시트 (검색하지 말고 여기서 복사)
// ------------------------------------------------------------
//  props 넘기기      <Card title="제목" count={3} done />
//  props 받기        function Card({ title, count, done }) { ... }
//  children          <Panel>내용</Panel>  →  function Panel({ children }) { ... }
//  상태              const [값, set값] = useState(초기값)
//  이벤트            <button onClick={() => set값(값 + 1)}>            ← 괄호 없이 함수를 넘긴다
//  리스트            {arr.map((item) => <li key={item.id}>{item.name}</li>)}
//  조건부 (있/없)    {isOn && <p>켜짐</p>}
//  조건부 (A/B)      {isOn ? <p>켜짐</p> : <p>꺼짐</p>}
//  폼 input          <input value={text} onChange={(e) => setText(e.target.value)} />
//  배열에 추가        setArr([...arr, 새항목])
//  배열에서 제거      setArr(arr.filter((x) => x.id !== 지울id))
//  인라인 스타일      style={{ color: 'red', marginTop: 8 }}          ← 중괄호 2개
//  JSX 주석          {/* 이렇게 */}
// ============================================================
