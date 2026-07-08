// ============================================================
// App.jsx — 이 학습 프로젝트의 "골격(뼈대)"
// ------------------------------------------------------------
// 왼쪽 목록에서 레슨을 고르면, 오른쪽에 그 레슨을 보여준다.
//
// ⚠️ 지금 이 파일을 완벽히 이해 못 해도 괜찮아요.
//    여기 쓰인 useState / .map() / onClick / 조건부는 바로 레슨 03~06에서
//    배울 것들이라, 그때 다시 보면 "아, 이거였구나" 하게 됩니다.
//    지금은 "레슨을 골라 보여주는 리모컨" 정도로만 여기세요.
// ============================================================
import { useState } from 'react'
import './App.css'

// 8개 레슨 컴포넌트를 불러온다
import Lesson01 from './lessons/01_component_jsx.jsx'
import Lesson02 from './lessons/02_props.jsx'
import Lesson03 from './lessons/03_state_usestate.jsx'
import Lesson04 from './lessons/04_events.jsx'
import Lesson05 from './lessons/05_list_render.jsx'
import Lesson06 from './lessons/06_conditional.jsx'
import Lesson07 from './lessons/07_form.jsx'
import Lesson08 from './lessons/08_effect_fetch.jsx'

// 목록 데이터: 번호 · 제목 · 컴포넌트
const LESSONS = [
  { id: 1, title: '컴포넌트 & JSX', Comp: Lesson01 },
  { id: 2, title: 'props', Comp: Lesson02 },
  { id: 3, title: 'useState (상태)', Comp: Lesson03 },
  { id: 4, title: '이벤트 핸들링', Comp: Lesson04 },
  { id: 5, title: '리스트 렌더링', Comp: Lesson05 },
  { id: 6, title: '조건부 렌더링', Comp: Lesson06 },
  { id: 7, title: '폼 (input)', Comp: Lesson07 },
  { id: 8, title: 'useEffect + fetch', Comp: Lesson08 },
]

function App() {
  const [current, setCurrent] = useState(1) // 지금 보고 있는 레슨 번호
  const active = LESSONS.find((l) => l.id === current)
  const Current = active.Comp // 대문자 변수에 담아야 <Current />로 쓸 수 있다

  return (
    <div className="layout">
      <aside className="sidebar">
        <h1>react_class</h1>
        <p className="sub">핵심 8개 · Vite + React</p>
        <nav>
          {LESSONS.map((l) => (
            <button
              key={l.id}
              className={l.id === current ? 'nav-item active' : 'nav-item'}
              onClick={() => setCurrent(l.id)}
            >
              <span className="num">{String(l.id).padStart(2, '0')}</span>
              {l.title}
            </button>
          ))}
        </nav>
      </aside>

      <main className="content">
        <Current />
      </main>
    </div>
  )
}

export default App
