# PRACTICE — 연습장 실습 가이드

`src/playground.jsx`에서 **직접 손으로 만들어보는** 실습 모음입니다.
레슨(`src/lessons/`)이 "읽는 교재"라면, 이 문서는 **"치는 교재"**입니다.

> **반복이 목적입니다.** 한 번 완성했다고 끝이 아니라, 며칠 뒤 **연습장을 비우고 처음부터 다시**
> 만들어보세요. 두 번째는 절반 시간에, 세 번째는 안 보고 됩니다. 그때가 "익혔다"입니다.

```bash
cd react_class
npm run dev      # → 사이드바 맨 아래 "★ 내 연습장"
```

---

## 시작 전 — 연습장 비우기

다시 처음부터 해보려면 `src/playground.jsx`의 `Playground` 함수를 **이 최소 뼈대로** 되돌리세요.
(파일 위쪽 `import`와 아래쪽 주석은 그대로 둬도 됩니다)

```jsx
export default function Playground() {
  return (
    <>
      <h2>★ 내 연습장</h2>
    </>
  )
}
```

화면에 제목만 뜨면 준비 완료입니다.

---

## 🎯 실습 1 — 카드 목록

**목표:** 배열 데이터를 화면에 카드로 뿌리고, 클릭하면 선택되게 만든다.
**쓰는 개념:** `import` · props · `.map()` + `key` · `useState` · 조건부 렌더링

한 단계씩 **저장하고 화면을 확인한 뒤** 다음으로 가세요.
한 번에 다 쓰고 "왜 안 되지?" 하는 게 가장 느립니다.

### 0단계 · 부품 가져오기

파일 맨 위 `import` 줄 아래에 추가합니다.

```jsx
import Card from './components/Card.jsx'
```

> **경로 주의.** `playground.jsx`는 `src/` **바로 아래**라서 `./components/...` 입니다.
> `src/lessons/` 안의 파일들은 한 단계 나가야 하므로 `../components/...` 였습니다.
> `Card`는 `export default`로 내보내졌기 때문에 `{ }` 없이 가져옵니다.

### 1단계 · 데이터부터 만든다

**컴포넌트 함수 바깥**(파일 최상단, `import` 아래)에 둡니다.

```jsx
const CARDS = [
  { id: 1, title: 'React', desc: 'UI를 컴포넌트로 조립하는 라이브러리' },
  { id: 2, title: 'Vite', desc: '아주 빠른 개발 서버 & 빌드 도구' },
  { id: 3, title: 'Next.js', desc: 'React에 라우팅과 SSR을 더한 프레임워크' },
]
```

**왜 함수 바깥인가?** 이 값은 **안 바뀌기** 때문입니다.
바뀌는 값만 `useState`에 넣고, 안 바뀌는 건 그냥 상수로 둡니다.
(함수 안에 두면 화면을 다시 그릴 때마다 배열을 새로 만들게 됩니다)

`id`를 넣어둔 이유는 3단계에서 밝혀집니다.

### 2단계 · 일단 **하나만** 그린다

`return` 안에 넣습니다.

```jsx
<h3>카드 목록</h3>
<Card title={CARDS[0].title} desc={CARDS[0].desc} />
```

✅ **체크포인트:** 화면에 "React" 카드 **하나**가 뜬다.

> 처음부터 `.map()`을 쓰지 마세요. **하나가 되면 열 개도 됩니다.**
> 여기서 안 뜨면 십중팔구 `import` 경로 오타입니다. 다음으로 넘어가지 말고 여기서 해결하세요.

### 3단계 · `.map()`으로 전부 그린다

2단계에서 쓴 `<Card ... />` 한 줄을 이걸로 바꿉니다.

```jsx
<h3>카드 목록</h3>
{CARDS.map((card) => (
  <Card key={card.id} title={card.title} desc={card.desc} />
))}
```

✅ **체크포인트:** 카드 **3개**가 뜬다. 콘솔(F12)에 경고가 **없다**.

**PHP와 비교하면 하는 일이 같습니다.**

```php
foreach ($CARDS as $card) {
  echo card($card['title'], $card['desc']);   // 문자열을 이어붙여 출력
}
```
```jsx
{CARDS.map((card) => <Card title={card.title} desc={card.desc} />)}
// 배열을 돌면서 JSX로 바꿔 "새 배열"을 만든다 → React가 순서대로 그려준다
```

> **`key`를 절대 빼먹지 마세요.** React가 각 항목을 구별하는 이름표입니다.
> 없으면 콘솔에 경고가 뜨고, 나중에 항목을 추가·삭제할 때 엉뚱한 줄이 바뀝니다.
> `id`를 미리 넣어둔 게 이걸 위해서였습니다.
> **일부러 `key`를 지우고 콘솔 경고를 한 번 보세요.** 나중에 실전에서 만나면 바로 알아챕니다.

### 4단계 · 클릭하면 선택되게 (`useState`)

**"지금 선택된 카드가 뭔지"라는 바뀌는 값**이 생겼습니다. → `useState`가 필요합니다.

고칠 곳은 **3군데**뿐입니다. 함수를 통째로 새로 쓰는 게 아닙니다.

**① `return` 위에 state 추가** (state 선언은 언제나 함수 맨 위)

```jsx
export default function Playground() {
  const [selectedId, setSelectedId] = useState(null)   // ← 추가. 아직 안 골랐으니 null
```

**② `.map()` 안의 `<Card>`를 `<div>`로 감싸기**

```jsx
{CARDS.map((card) => (
  <div key={card.id} onClick={() => setSelectedId(card.id)} style={{ cursor: 'pointer' }}>
    <Card title={card.title} desc={card.desc} />
  </div>
))}
```

`key`가 `<Card>`에서 **`<div>`로 이사**했습니다. `key`는 `.map()`이 만드는 **가장 바깥 요소**에 붙습니다.

**③ 선택 결과 표시** (`.map()` 아래, `</>` 위)

```jsx
{selectedId && (
  <p className="muted">
    선택됨: <b>{CARDS.find((c) => c.id === selectedId).title}</b>
  </p>
)}
```

✅ **체크포인트:** 카드를 클릭하면 아래에 `선택됨: React`가 뜨고, 다른 카드를 누르면 즉시 바뀐다.

> **⚠️ 함정:** `<Card onClick={...} />` 라고 쓰면 **아무 일도 안 일어납니다.**
> `Card`는 `{ title, desc, children }`만 받도록 만들어져 있어서, `onClick`을 넘겨도
> **Card 안에서 아무도 안 쓰니까 그냥 버려집니다.** 그래서 `<div>`로 감싼 겁니다.
> (원한다면 `Card.jsx`를 열어 `onClick`을 받도록 고쳐도 됩니다. **이제 그 파일은 당신 코드입니다.**)

---

### ✅ 완성 코드 (막혔을 때만 펼쳐보기)

<details>
<summary>정답 보기</summary>

```jsx
import { useState } from 'react'
import Card from './components/Card.jsx'

const CARDS = [
  { id: 1, title: 'React', desc: 'UI를 컴포넌트로 조립하는 라이브러리' },
  { id: 2, title: 'Vite', desc: '아주 빠른 개발 서버 & 빌드 도구' },
  { id: 3, title: 'Next.js', desc: 'React에 라우팅과 SSR을 더한 프레임워크' },
]

export default function Playground() {
  const [selectedId, setSelectedId] = useState(null)

  return (
    <>
      <h2>★ 내 연습장</h2>

      <h3>카드 목록</h3>
      {CARDS.map((card) => (
        <div key={card.id} onClick={() => setSelectedId(card.id)} style={{ cursor: 'pointer' }}>
          <Card title={card.title} desc={card.desc} />
        </div>
      ))}

      {selectedId && (
        <p className="muted">
          선택됨: <b>{CARDS.find((c) => c.id === selectedId).title}</b>
        </p>
      )}
    </>
  )
}
```

</details>

---

### 🔍 스스로 점검 (답이 바로 안 나오면 그 단계로 돌아가세요)

1. `import Card`에 왜 `{ }`가 없나?
2. `CARDS`를 함수 **안**에 넣으면 뭐가 문제인가?
3. `key`는 왜 필요하고, 왜 `<div>`에 붙었나?
4. `selectedId`를 `useState`가 아니라 `let selectedId = null`로 하면 어떻게 되나?
5. `{selectedId && ...}`에서 `&&`는 무슨 뜻인가?

<details>
<summary>답 보기</summary>

1. `Card.jsx`가 `export default`로 내보냈기 때문. named export(`Badge`)였다면 `{ Badge }`가 필요하다.
2. 화면을 다시 그릴 때마다 함수가 재실행되어 **배열을 매번 새로 만든다.** 안 바뀌는 값은 바깥에 둔다.
3. React가 각 항목을 구별하는 이름표. `.map()`이 만들어내는 **가장 바깥 요소**에 붙여야 한다.
4. **①** 클릭해도 React가 모르니 화면이 안 바뀌고, **②** 다시 그려지면 `null`로 초기화된다.
   (레슨 `03`의 "고장난 카운터"가 정확히 이 문제다)
5. "왼쪽이 참일 때만 오른쪽을 그린다." `selectedId`가 `null`이면 아무것도 안 그린다. → 조건부 렌더링(레슨 06)

</details>

---

### 🚀 확장 과제 (여유 되면)

- `CARDS`에 항목을 하나 더 추가한다. → **JSX는 한 줄도 안 고쳤는데 화면이 늘어난다.**
  이게 "데이터를 만들면 화면이 따라온다"의 실감이다.
- 선택된 카드에만 테두리 색을 준다. 힌트: `style={{ borderColor: card.id === selectedId ? '#61dafb' : undefined }}`
- 같은 카드를 다시 누르면 선택이 **해제**되게 한다. 힌트: `setSelectedId(selectedId === card.id ? null : card.id)`
- 카드 설명이 `…`로 잘리는 게 싫으면 `components/Card.jsx`의 `shorten(text, 34)` 숫자를 고친다.

---

## 💡 모든 실습에 통하는 원칙

React 컴포넌트는 **언제나 두 덩어리**입니다.

```jsx
export default function Playground() {
  // ┌─────────────────────────────────────┐
  // │  return 위 = 데이터와 로직           │   ← state 선언, 이벤트 함수
  // │  const [x, setX] = useState(...)     │
  // └─────────────────────────────────────┘
  return (
    // ┌─────────────────────────────────────┐
    // │  return 안 = 화면 (JSX)              │   ← 위의 값을 { }로 꺼내 쓴다
    // └─────────────────────────────────────┘
  )
}
```

그래서 새 기능을 붙일 땐 **항상 두 곳**을 건드립니다:
**위에 state를 추가하고 → 아래 JSX에서 사용한다.**

막히면 이 순서로 점검하세요.

1. **콘솔(F12)을 먼저 본다.** 에러 메시지가 답을 알려주는 경우가 대부분이다.
2. **화면이 하얗게 죽었다** → JSX 문법 오류(닫는 태그, 중괄호). 방금 쓴 줄을 지워 되살린다.
3. **아무 일도 안 일어난다** → `set...`을 안 불렀거나, props 이름이 안 맞거나(`onClick`을 안 받는 컴포넌트에 넘김).
4. **값이 이상하다** → `console.log()`를 `return` 위에 찍어본다. 클릭할 때마다 찍히는 걸 보면 "함수가 다시 실행된다"가 눈에 보인다.

---

## 다음 실습 (아직 준비 안 됨)

`playground.jsx` 하단 주석의 **연습 과제 2·3**이 다음 순서입니다.

- **실습 2 — 할 일 목록:** input으로 추가 + 각 줄 삭제 (`07 폼`, 함수 props)
- **실습 3 — 탭 UI:** 버튼으로 화면 전환 (`06 조건부 렌더링`. `App.jsx` 사이드바가 정확히 이 구조)

실습 1을 **안 보고 만들 수 있게 되면** 다음으로 넘어가세요.
