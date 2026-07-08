# react_class — React 입문 (Vite)

`python_class → javascript_class → web_class` 다음의 **React 트랙**입니다.
`web_class`에서 손으로 짜던 `state → render()` 패턴을, React가 어떻게 자동화하는지
**핵심 8개 개념**으로 배웁니다. 목표는 **React/Next.js를 PHP만큼 자유롭게 다루기**.

> 이 트랙은 **1단계(순수 React)**입니다. 여기가 탄탄해지면 → **2단계 Next.js**(라우팅·SSR·SEO)로 갑니다.

---

## 🚀 시작 (3줄 요약)

처음이라면 먼저 **[SETUP.md](./SETUP.md)** 를 읽으세요 (터미널·npm 명령을 하나하나 설명).
급하면 VS Code 터미널에서 이 폴더(`react_class/`) 기준으로:

```bash
npm install     # 딱 한 번: 필요한 라이브러리 다운로드 (이미 했다면 생략)
npm run dev      # 개발 서버 켜기 → 터미널에 뜨는 http://localhost:5173 열기
```

브라우저가 열리면 왼쪽 목록에서 레슨 01~08을 눌러가며 보세요.
`src/lessons/` 안의 파일을 열어 **주석을 읽는 게 진짜 학습**입니다.
파일을 고치고 저장하면 → 브라우저가 **자동 새로고침**(HMR)됩니다.

---

## 📚 핵심 8개 (학습 순서)

| # | 파일 | 배우는 것 | web_class / PHP 연결 |
|---|------|----------|----------------------|
| 01 | `01_component_jsx.jsx` | 컴포넌트 & JSX | HTML을 JS 함수가 돌려줌 (PHP `include` 조각 ↔ 컴포넌트) |
| 02 | `02_props.jsx` | props (부모→자식 데이터) | 함수 인자 넘기기 (`card($title)` ↔ `<Card title=.../>`) |
| 03 | `03_state_usestate.jsx` | **useState (상태)** ⭐ | `let state; render()` 수동 패턴의 자동화 |
| 04 | `04_events.jsx` | 이벤트 핸들링 | `addEventListener` ↔ `onClick` |
| 05 | `05_list_render.jsx` | 리스트 렌더링 (`.map`+`key`) | `foreach`로 `<li>` 찍기 ↔ `.map()` |
| 06 | `06_conditional.jsx` | 조건부 렌더링 | `<?php if ?>` ↔ `{cond && ...}` / 삼항 |
| 07 | `07_form.jsx` | 폼 (controlled input) | `$_POST`(서버왕복) ↔ state로 실시간 |
| 08 | `08_effect_fetch.jsx` | useEffect + fetch | **여기서 CSR·SEO 약점 체감 → Next.js 동기** |

각 파일은 맨 위에 **개념 설명 블록**이 있고, 코드엔 **한글 주석**과 **`// →` 예상 동작**이 달려 있습니다.

---

## 🧭 학습 방식

- 이 트랙은 기존 `javascript_class`/`web_class`와 같은 규칙을 따릅니다:
  **번호 붙은 파일 · 상단 설명 블록 · 촘촘한 한글 주석 · 인라인 `// →` 출력.**
- 당신은 PHP 경험자이므로, 곳곳에 **`[PHP 비교]`** 주석을 넣어 "이미 아는 것"에 얹어 배웁니다.
- 순서대로(01→08) 보되, **각 레슨을 직접 고쳐보세요.** 숫자·글자·조건을 바꿔보는 게 최고의 학습.

## ✅ 졸업 기준 (→ Next.js로 갈 때)

이 8개로 **작은 앱 하나**(예: 할 일 목록, 또는 API 목록 표시)를 스스로 만들 수 있으면 충분합니다.
Context·커스텀 훅·상태관리 라이브러리는 지금 몰라도 됩니다. 미련 없이 **Next.js**로 넘어가세요.

## 🗂 폴더 구조 (자세한 설명은 SETUP.md)

```
react_class/
├─ index.html          # 시작 HTML (안에 <div id="root">)
├─ package.json        # 의존성 목록 + 스크립트 (PHP의 composer.json 같은 것)
├─ vite.config.js      # Vite 설정
└─ src/
   ├─ main.jsx         # 진입점: App을 #root에 그림
   ├─ App.jsx          # 레슨을 골라 보여주는 골격(리모컨)
   ├─ App.css / index.css
   └─ lessons/         # ⭐ 여기가 학습 본체 (01~08)
```
