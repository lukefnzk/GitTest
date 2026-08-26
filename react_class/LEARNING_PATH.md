# React 학습 방향 표준

이 문서는 `react_class` → Next.js로 가기 전, **무엇을 “기본”으로 볼지**를 고정한 기준이다.
세부 레슨·실행 방법은 [README.md](./README.md), [SETUP.md](./SETUP.md)를 따른다.

> **한 문장 기준**  
> **컴포넌트 · props · useState** = React의 핵심 3기둥.  
> 여기에 **이벤트 · 리스트 · 조건**까지 = “기초 졸업”에 가깝다.  
> **폼 · useEffect/fetch** = 기본 위에 얹는 실전 한 겹 → 그다음 Next.js.

---

## 8개 개념 표 (표준)

| 개념 | 역할 | “기본”에 들어가는가 | 레슨 |
|------|------|---------------------|------|
| **컴포넌트 + JSX** | 화면 조각 = 함수 | ✅ 필수 | `01_component_jsx.jsx` |
| **props** | 부모 → 자식으로 값 전달 | ✅ 필수 | `02_props.jsx` (+ `02b` 조립) |
| **useState** | 화면이 바뀌는 상태 | ✅ 필수 | `03_state_usestate.jsx` |
| **이벤트** (`onClick` 등) | state를 바꾸는 손 | ✅ 거의 필수 (useState와 짝) | `04_events.jsx` |
| **리스트** (`.map` + `key`) | 목록 그리기 | ✅ 실무에서 매일 씀 | `05_list_render.jsx` |
| **조건부 렌더링** | 보여줄지 말지 | ✅ 실무에서 매일 씀 | `06_conditional.jsx` |
| **폼** (controlled input) | 입력 ↔ state | ⭕ 기본에 넣으면 좋음 | `07_form.jsx` |
| **useEffect + fetch** | 데이터 불러오기 | △ Next.js 전에 맛보기면 충분 | `08_effect_fetch.jsx` |

---

## 단계로 읽는 법

| 단계 | 범위 | 의미 |
|------|------|------|
| **A. 3기둥** | 컴포넌트 · props · useState | React가 무엇인지의 뼈대. 여기가 흔들리면 뒤가 전부 안개 |
| **B. 기초 졸업** | A + 이벤트 · 리스트 · 조건 | “작은 화면을 스스로 조립할 수 있다” 수준 |
| **C. 실전 한 겹** | 폼 · useEffect/fetch | 입력·서버 데이터를 다루는 맛보기. CSR/SEO 한계도 여기서 체감 |
| **D. 다음 트랙** | Next.js (matefranchise 등) | 라우팅 · SSR · SEO. React 기본이 탄탄할 때 이동 |

학습 순서는 레슨 번호 **01 → 08**을 그대로 따른다.  
보너스 `02b`(컴포넌트 조립)는 02와 03 사이에 두면 좋다.

---

## 졸업 체크 (이 문서의 “통과” 기준)

아래를 **교재 안 보고** 연습장(`playground.jsx`)에서 만들 수 있으면 기초 졸업으로 본다.

- [ ] 컴포넌트를 나눠 `<태그 />`처럼 재사용한다
- [ ] props로 제목·내용 등을 넘긴다
- [ ] `useState`로 버튼/토글이 화면을 바꾼다
- [ ] `onClick` 등으로 state를 갱신한다
- [ ] 배열을 `.map` + `key`로 목록 그린다
- [ ] 조건에 따라 다른 UI를 보여 준다
- [ ] (권장) input 값을 state로 묶는다
- [ ] (권장) `fetch`로 목록을 한 번 불러 본다

**지금 몰라도 되는 것:** Context, 커스텀 훅, Redux/Zustand, React Query 등.  
기초 졸업 후 Next.js로 가도 늦지 않다.

---

## 관련 문서

| 문서 | 역할 |
|------|------|
| [SETUP.md](./SETUP.md) | Node / `npm install` / `npm run dev` |
| [README.md](./README.md) | 레슨 목록 · 폴더 구조 |
| [PRACTICE.md](./PRACTICE.md) | 손으로 치는 실습 |
| [09_why_nextjs.md](./09_why_nextjs.md) | React 졸업 → Next.js 브릿지 |
| 공식 Learn (한국어) | https://ko.react.dev/learn — 막히는 개념만 검색 |

---

## 현재 위치 메모 (직접 고쳐서 씀)

- 진행 중: `02_props` (또는 여기에 현재 레슨을 적는다)
- 다음 목표: `03_state_usestate` → `04_events` (3기둥 + 이벤트 짝까지)
