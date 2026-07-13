// ============================================================
// 02b · 컴포넌트 작성과 조립 (보너스 — 02와 03 사이)
// ------------------------------------------------------------
// [왜 이 레슨이 있나]
//   01에서 "컴포넌트가 뭔지", 02에서 "props로 값 내려주기"를 봤다.
//   실전에서 바로 부딪히는 건 그 다음이다:
//     "컴포넌트를 파일로 어떻게 쪼개지?" "자식이 부모한테 말하려면?"
//   이 레슨은 그 '조립' 부분만 모았다.
//
// [배우는 것 4개]
//   1절. 파일로 쪼개기      — export / import  (← components/Card.jsx 를 실제로 가져온다)
//   2절. children           — JSX 조각을 통째로 끼워넣기 (PHP 레이아웃의 <?= $content ?>)
//   3절. 함수 props         — 자식 → 부모로 알리기 (데이터는 아래로, 알림은 위로)
//   4절. 상태 끌어올리기    — 형제끼리 데이터 공유하기
//
// ⚠️ 3·4절은 useState 를 씁니다. 아직 안 봤다면 "값이 바뀌면 화면이 다시 그려지는 장치"
//    정도로만 넘기고, 레슨 03을 본 뒤 다시 오면 훨씬 선명해집니다.
// ============================================================
import { useState } from 'react'

// ★ 1절의 핵심 줄. 다른 "파일"에 있는 컴포넌트를 가져온다.
//   Card  → 그 파일이 export default 로 내보냄 → { } 없이, 이름은 내 마음대로
//   Badge → 그 파일이 export (named) 로 내보냄 → { } 안에 정확한 이름으로
//   경로의 '../' = 한 단계 위 폴더(src/)로 나간다는 뜻. lessons/ → src/ → components/
import Card, { Badge } from '../components/Card.jsx'

// [Python 비교]
//   from components.card import Card, Badge   ↔   import Card, { Badge } from '...'
//   { } 가 곧 파이썬의 from ... import ... 다. 새 개념이 아니다.

// ============================================================
// 2절 · children — 컴포넌트에 "구멍"을 뚫어둔다
// ------------------------------------------------------------
// 여는 태그와 닫는 태그 "사이"에 넣은 내용은 자동으로 children 이라는 props로 들어온다.
// [PHP 비교] layout.php 안에 <?= $content ?> 자리를 뚫어두고 페이지마다 다른 내용을
//            채워넣던 그 패턴. 껍데기는 같고 속만 다른 UI = 전부 이 방식으로 만든다.
// ============================================================
function Panel({ title, children }) {
  return (
    <section className="demo">
      <b>{title}</b>
      <div style={{ marginTop: 8 }}>
        {children} {/* ← 여기가 구멍. 부모가 넣어준 JSX가 통째로 들어온다 */}
      </div>
    </section>
  )
}

// ============================================================
// 3절 · 함수 props — 자식이 부모에게 알린다
// ------------------------------------------------------------
// props는 위→아래로만 흐른다. 그럼 자식이 부모에게 말하려면?
//   → 부모가 "함수"를 props로 내려주고, 자식이 그 함수를 호출한다.
// 자식은 "누가 무엇을 지우는지" 전혀 모른다. 그냥 시킨 함수를 부를 뿐. (= 재사용 가능)
// [이름 관례] 내려주는 props는 onXxx, 실제 함수는 handleXxx / 동사형
// ============================================================
function TodoRow({ text, onRemove }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0' }}>
      <span style={{ flex: 1 }}>{text}</span>
      {/* ⚠️ onClick={onRemove()} 라고 쓰면 렌더되자마자 실행돼버린다. 괄호 없이 넘긴다! */}
      <button onClick={onRemove}>삭제</button>
    </div>
  )
}

// ============================================================
// 4절 · 상태 끌어올리기 (lifting state up)
// ------------------------------------------------------------
// Display 와 Controls 는 형제다. 형제끼리는 직접 대화할 수 없다.
//   → 공유할 state를 "가장 가까운 공통 부모"에 두고, 아래로 내려준다.
//     · 값을 보여줄 자식   → 값(value)을 받는다
//     · 값을 바꿀 자식     → 바꾸는 함수(onUp/onDown)를 받는다
// 이 판단이 React 앱 설계의 8할이다.
// ============================================================
function Display({ value }) {
  return (
    <p style={{ margin: 0 }}>
      지금 값: <b style={{ fontSize: 20 }}>{value}</b>
    </p>
  )
}

function Controls({ onUp, onDown }) {
  // Controls 는 count 가 몇인지 모른다. 그냥 "눌리면 이 함수를 부른다"만 안다.
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
      <button onClick={onUp}>+1</button>
      <button onClick={onDown}>-1</button>
    </div>
  )
}

// ============================================================
// 레슨 본체
// ============================================================
export default function Lesson02b() {
  // 4절용 상태 — 형제 둘(Display, Controls)이 공유하므로 공통 부모인 여기에 둔다
  const [count, setCount] = useState(0)

  // 3절용 상태 — 목록을 부모가 소유한다. 자식(TodoRow)은 소유하지 않는다.
  const [todos, setTodos] = useState(['빨래하기', '설거지', 'React 공부'])
  const removeTodo = (target) => setTodos(todos.filter((t) => t !== target))

  return (
    <>
      <h2>02b · 컴포넌트 작성과 조립</h2>

      {/* ---------- 1절 ---------- */}
      <h3>1. 파일로 쪼개기 (export / import)</h3>
      <p className="muted">
        아래 카드는 이 파일이 아니라 <code>src/components/Card.jsx</code>에 있다. 맨 위의
        <code> import Card, {'{ Badge }'} from '../components/Card.jsx'</code> 한 줄로 가져왔다.
      </p>

      <Card title="Card 컴포넌트" desc="다른 파일에 살고 있다. default export 라서 { } 없이 가져온다.">
        <Badge>NEW</Badge> {/* Badge는 named export → { } 로 가져왔다 */}
      </Card>

      <p className="muted">
        ↑ 이 카드의 설명이 <b>…로 잘려있다</b>? Card.jsx 안의 <code>shorten()</code> 헬퍼가 한 일이다.
        그 함수엔 <code>export</code>가 없어서 <b>이 파일에서는 가져올 수도, 부를 수도 없다.</b>
        (기본값이 "비공개" — PHP의 <code>require</code>와 정반대)
      </p>

      {/* ---------- 2절 ---------- */}
      <h3>2. children — 껍데기는 같고 속만 다르게</h3>
      <Panel title="Panel 안에 아무거나 넣을 수 있다">
        {/* 이 <p>와 <button>이 통째로 Panel의 children으로 들어간다 */}
        <p style={{ margin: '0 0 8px' }}>여는 태그와 닫는 태그 사이의 내용 = children</p>
        <button onClick={() => alert('Panel은 이 버튼이 뭘 하는지 모른다')}>눌러보기</button>
      </Panel>

      <Panel title="같은 Panel, 다른 내용">
        <Card title="Panel 안에 Card도 넣을 수 있다" desc="컴포넌트는 이렇게 중첩해서 조립한다." />
      </Panel>

      {/* ---------- 3절 ---------- */}
      <h3>3. 함수 props — 자식이 부모에게 알리기</h3>
      <div className="demo">
        {todos.length === 0 && <p className="muted">할 일이 없다. 새로고침하면 되돌아온다.</p>}

        {todos.map((t) => (
          // key: 리스트를 그릴 땐 항목마다 고유값이 필요하다 (레슨 05에서 자세히)
          // onRemove 로 "이 항목을 지우는 함수"를 만들어 내려준다 → 자식이 호출한다
          <TodoRow key={t} text={t} onRemove={() => removeTodo(t)} />
        ))}
      </div>
      <p className="muted">
        데이터(todos)는 <b>부모가 소유</b>하고, 자식은 <b>알림만 올려보낸다.</b> 이게 React의 단방향 흐름이다.
      </p>

      {/* ---------- 4절 ---------- */}
      <h3>4. 상태 끌어올리기 — 형제끼리 데이터 공유</h3>
      <div className="demo">
        <Display value={count} /> {/* 값을 받는 자식 */}
        <Controls onUp={() => setCount(count + 1)} onDown={() => setCount(count - 1)} />
        {/* → 버튼을 누르면: Controls가 함수 호출 → 부모의 count 변경 → Display가 새 값으로 다시 그려짐 */}
      </div>
      <p className="muted">
        Display와 Controls는 <b>서로의 존재를 모른다.</b> 둘을 이어주는 건 공통 부모(이 레슨)가 가진 count 뿐이다.
      </p>

      {/* ---------- 정리 ---------- */}
      <h3>5. 컴포넌트를 언제 쪼개나</h3>
      <ul className="muted">
        <li>같은 마크업이 <b>두 번 이상 반복</b>될 때</li>
        <li><b>이름을 붙일 수 있을 때</b> (Header, TodoRow처럼 부를 이름이 떠오르면 그건 컴포넌트다)</li>
        <li>return 안이 길어져 <b>구조가 안 읽힐 때</b></li>
        <li>반대로: 한 번만 쓰고 짧으면 굳이 쪼개지 마라. <b>크게 짜고 커지면 뽑아내는</b> 순서가 정석.</li>
      </ul>
    </>
  )
}

// ============================================================
// ⚠️ 흔한 실수 5개 (여기서 하루씩 날린다)
// ------------------------------------------------------------
//  1) function card() — 소문자 이름
//     → React가 HTML 태그 <card>로 취급. 화면에 아무것도 안 나온다. 반드시 대문자!
//
//  2) {Card()} 로 호출
//     → 그냥 함수 호출이 되어 컴포넌트 취급을 못 받는다(훅/렌더 규칙이 깨짐). <Card /> 로 쓴다.
//
//  3) onClick={handleClick()}
//     → 렌더되는 순간 실행되고 그 "결과값"이 핸들러로 등록된다.
//        onClick={handleClick}  또는  onClick={() => handleClick(id)}
//
//  4) 컴포넌트 안에서 컴포넌트를 정의
//     → 부모가 다시 그려질 때마다 '새 함수'가 되어 자식이 통째로 새로 태어난다(state가 초기화됨).
//        컴포넌트는 항상 파일 최상단(다른 함수 바깥)에 정의한다. ← 이 파일이 그렇게 돼 있다
//
//  5) props를 자식이 직접 수정  (props.title = '변경')
//     → props는 읽기 전용. 바꾸고 싶으면 부모의 state를 바꾼다(= 4절의 상태 끌어올리기).
// ============================================================
