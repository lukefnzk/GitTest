# 10. 브릿지 — "왜 React 인가?"

`web_class` 를 통해 **바닐라 JS**(순수 JS)로 화면을 만들었다. 마지막으로,
09번 투두앱에서 우리가 겪은 '불편함'을 짚고, React 가 그걸 어떻게 없애는지 본다.
이걸 지금 이해하면 React 학습이 "새 규칙 암기"가 아니라 "불편함의 해결책"으로 들어온다.

## 우리가 직접 했던 귀찮은 일들

1. **상태를 바꿀 때마다 `render()` 를 손으로 불렀다.**
   `todos` 를 바꾼 뒤 매번 `render()` 를 잊지 않고 호출해야 했다. 빠뜨리면 화면이 안 바뀐다.

2. **매번 목록 전체(`innerHTML`)를 다시 그렸다.**
   할 일 하나만 바뀌어도 `<ul>` 전체를 새로 만들었다. 목록이 크면 느리고,
   입력 포커스나 스크롤 위치 같은 게 날아갈 수 있다.

3. **화면 구조(HTML 문자열)와 로직(JS)이 흩어졌다.**
   `render()` 안의 템플릿 문자열과 이벤트 처리 코드가 서로 떨어져 있어 추적이 번거로웠다.

## React 가 대신 해주는 것

| web_class 에서 우리가 한 것 | React 에서는 |
|------|------|
| `let todos = [...]` 로 상태 관리 | `const [todos, setTodos] = useState([...])` — `11_modern_syntax` 의 그 배열 구조분해! |
| 상태 바꾼 뒤 `render()` **수동 호출** | `setTodos(...)` 하면 **자동으로** 다시 그림 |
| `innerHTML` 로 전체를 다시 그림 | 바뀐 **부분만** 골라 갱신 (가상 DOM) |
| `todos.map(t => '<li>...</li>')` 문자열 | `todos.map(t => <li>...</li>)` **JSX** — 거의 똑같다! |
| `addEventListener("click", ...)` | `<button onClick={...}>` |
| HTML / CSS / JS 3파일 | '컴포넌트' 하나로 묶음 (`08_modules` 의 import/export 로 연결) |

## 핵심 한 줄

> React = **"상태(state)를 바꾸면 화면은 알아서 따라온다"** 를 자동화한 도구.

우리가 08·09번에서 손으로 만든 `state → render` 패턴이 바로 React 의 심장이다.
그래서 이 트랙을 거친 사람은 React 의 `useState` 와 JSX 를 처음 봐도 낯설지 않다.

## 다음에 배울 것 (React 로 가는 길)

1. **개발 환경**: `npm create vite@latest` 로 React 프로젝트 생성 (`08_modules` 의 모듈 · `package.json`, Node 사용)
2. **컴포넌트 & JSX**: `map` · 구조분해 · 삼항 · `&&` 이 그대로 쓰인다 (트랙 1 의 ★ 항목들)
3. **useState / useEffect**: 08·09번의 `state` · `render` · `fetch` 가 각각 hook 으로
4. 이후 **Next.js**: 라우팅 · 서버 렌더링 등 React 위에 얹는 프레임워크

준비물은 이미 다 갖췄다. **트랙 1(언어) + 트랙 2(화면) = React 의 기초.** 수고했다! 🎉
