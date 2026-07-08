# SETUP — Vite React 실행환경 (초심자용, 하나하나)

PHP만 다뤄본 사람 기준으로, **VS Code 터미널에서 무엇을 어떤 순서로 치는지**를
설명합니다. 개념이 궁금하면 각 단계의 `[PHP 비교]`를 보세요.

---

## 0. 준비물 — Node.js (딱 하나)

React/Vite에 필요한 건 **Node.js** 하나뿐입니다. npm·npx는 Node에 딸려옵니다.
**이미 설치돼 있는지 확인**부터 하세요. VS Code에서 터미널 열기: 메뉴 `Terminal → New Terminal`
(단축키 `` Ctrl+` ``). 그리고:

```bash
node -v      # 예: v24.13.1  이렇게 버전이 나오면 설치됨 ✅
npm -v       # 예: 11.11.0
```

> 버전이 안 나오면 https://nodejs.org 에서 **LTS** 버전을 설치하세요. (React/Next.js는 18.18+ 이상이면 됨)

**용어 정리**

| 명령 | 하는 일 | PHP 비교 |
|------|---------|----------|
| `npm install` | 이 프로젝트에 라이브러리 설치 (`node_modules/` 생성) | `composer install` (`vendor/` 생성) |
| `npm run dev` | 개발 서버 켜기 | `php -S localhost:8000` (로컬 서버 띄우기) |
| `npx 무엇` | 설치 없이 도구를 한 번만 실행 | (composer의 `create-project` 느낌) |
| `package.json` | 의존성 목록 + 실행 스크립트 | `composer.json` |
| `node_modules/` | 실제 라이브러리 뭉치 (커밋 안 함) | `vendor/` |

---

## ⭐ 반드시 이해 — "설치"는 두 종류다 (전역 vs 프로젝트별)

가장 헷갈리는 지점. "Node는 이미 깔았는데 왜 또 `npm install`을 하지?" 라는 의문이 여기서 풀립니다.
**설치에는 두 종류가 있고, 서로 다른 것**입니다.

| | ① 전역(global) 도구 | ② 프로젝트별(local) 라이브러리 |
|---|---|---|
| 무엇 | **Node.js**, npm, npx | React, Vite 등 그 프로젝트가 쓰는 것 |
| 어디에 | 컴퓨터 시스템 전체 | **그 프로젝트 폴더 안 `node_modules/`에만** |
| 언제 | 평생 한 번 (0번 항목) | **프로젝트마다 한 번** (`npm install`) |
| PHP 비교 | PHP 인터프리터 설치 | `composer install` (프로젝트마다 `vendor/`) |

즉 `node -v`가 잘 나오면 ①은 끝난 것. 하지만 프로젝트는 저마다 필요한 라이브러리가 달라서,
**프로젝트 폴더에 들어가 `npm install`을 한 번** 해줘야 그 폴더의 `node_modules/`가 채워집니다.

### `node_modules/` 폴더의 정체

- `package.json`에 적힌 라이브러리들이 실제로 다운로드되어 담기는 곳. **수백 MB**로 커질 수 있어요.
- **그 프로젝트 폴더 안에만** 존재. 시스템 전역에 영향 없음. 이 폴더를 지워도 다른 프로젝트는 멀쩡.
- **Git에 커밋하지 않습니다** (`.gitignore`가 막음). 왜? `package.json`만 있으면 `npm install`로
  언제든 똑같이 다시 만들 수 있으니까. → 그래서 남에게 프로젝트를 줄 땐 `node_modules` 없이 주고,
  받은 사람이 `npm install`로 복원합니다.

### 그래서 "언제 `npm install`을 하나?" — 판단 흐름

```
프로젝트 폴더에 node_modules/ 가 있나?
├─ 있다   → 안 해도 됨. 바로 `npm run dev`
└─ 없다   → `npm install` 한 번 먼저. 그다음 `npm run dev`
```

구체적으로 **`npm install`이 필요한 상황:**
- 🆕 내가 방금 새로 만든 프로젝트 (`npm create vite ...` 직후) → **한 번**
- 📥 남의 프로젝트를 clone/복사/다운로드했는데 `node_modules`가 없을 때 → **제일 먼저 한 번**
- 🗑 `node_modules`를 지웠거나 꼬였을 때 → 지우고 다시 `npm install` (복원됨)
- ➕ 새 라이브러리를 추가할 때 → `npm install 이름` (예: `npm install axios`)

**필요 없는 상황:** 이미 설치된 프로젝트를 다시 켤 때 → 그냥 `npm run dev`.

> 🔑 **한 문장 기억:** *"새 프로젝트를 받거나 만들면, 그 폴더에서 `npm install` 한 번 → 이후엔 `npm run dev`만."*
> (PHP에서 프로젝트 받으면 `composer install` 한 번 하고 개발하던 것과 똑같습니다.)

---

## A. 이미 있는 이 프로젝트 실행하기

VS Code에서 이 저장소를 연 뒤, 터미널에서 **`react_class` 폴더로 이동**해야 합니다.
(명령은 항상 이 폴더 안에서!)

```bash
cd react_class          # 이 프로젝트 폴더로 이동
npm install              # ① 라이브러리 다운로드 — "딱 한 번"만 (이미 했으면 생략 가능)
npm run dev              # ② 개발 서버 켜기
```

`npm run dev`를 치면 터미널에 이렇게 뜹니다:

```
  VITE v8.x  ready in 300 ms
  ➜  Local:   http://localhost:5173/
```

→ `http://localhost:5173/` 를 **Ctrl+클릭**(또는 브라우저에 직접 입력)하면 화면이 열립니다.

### 🔥 HMR — 저장하면 즉시 반영 (React의 첫 감동 포인트)

서버를 켜둔 채로 `src/lessons/03_state_usestate.jsx` 를 열어 숫자나 글자를 바꾸고 **저장(Ctrl+S)** 해보세요.
새로고침 안 해도 브라우저가 **그 부분만 즉시** 바뀝니다. (이게 HMR = Hot Module Replacement)

> [PHP 비교] PHP는 파일 저장 후 브라우저를 **새로고침**해야 반영됐죠. Vite는 저장 즉시 반영됩니다.

### ⏹ 서버 끄기 / 다시 켜기

- 끄기: 터미널에서 **`Ctrl + C`**
- 다시 켜기: `npm run dev` (한 번 `npm install` 했으면 이후엔 이것만 반복)

---

## B. 완전히 밑바닥부터 — 빈 폴더 만들기 → node_modules 만들기

"아무것도 없는 상태"에서 폴더를 만들고 설치까지 가는 길입니다.
먼저 **원리(B-1)** 로 "빈 폴더에 node_modules가 어떻게 생기는지"를 눈으로 본 뒤,
**실전(B-2)** 으로 React 프로젝트를 한 번에 만드세요.

### B-1. 원리 — 빈 폴더에 `node_modules`가 "생기는" 과정 (최소 실습)

npm의 기본 동작을 눈으로 확인하는 연습입니다. 아무 라이브러리(`dayjs`)나 하나 깔아봅니다.
원하는 위치(예: 바탕화면, 문서 폴더)에서 터미널을 열고:

```bash
mkdir my-first      # ① 빈 폴더 생성 — 이 폴더가 '프로젝트 폴더'가 된다
cd my-first         #    그 폴더 안으로 이동
                    #    → 지금 폴더는 텅 빔 (package.json 없음, node_modules 없음)

npm init -y         # ② package.json 생성 (설치 목록을 적어둘 '명세서'). 아직 node_modules 없음
npm install dayjs   # ③ 라이브러리 설치 → 바로 이 순간 node_modules/ 폴더가 "처음" 만들어진다
```

- ①에서 만든 **빈 폴더 = 프로젝트 폴더**. 처음엔 안이 비어 있습니다.
- ②의 `npm init -y` 가 `package.json` 을 만듭니다(무엇을 설치했는지 적어둘 명세서).
- ③의 `npm install 이름` 을 하는 **바로 그 순간**, 폴더 안에 `node_modules/` 가 생기고
  `package.json` 의 `dependencies` 에 그 라이브러리가 기록됩니다.

> 🔑 즉 **`node_modules`는 내가 손으로 만드는 게 아니라, `npm install` 이 자동으로 만들어 주는 폴더**입니다.
> 빈 폴더 + `npm install` = node_modules 생성. 이게 전부예요.
> [PHP 비교] `mkdir` → `composer init` → `composer require` 와 완전히 똑같은 3단계입니다.

### B-2. 실전 — React는 `npm create vite` 로 한 번에

B-1을 React용으로 하려면 vite·react 설치에 더해 `index.html`·`main.jsx`·`vite.config.js` 같은
설정·뼈대 파일까지 손으로 다 만들어야 해서 번거롭습니다. 그래서 실제로는 **그 전부를 한 방에**
해주는 이 명령을 씁니다. 원하는 상위 폴더에서:

```bash
npm create vite@latest my-app -- --template react   # 폴더 my-app 생성 + React 뼈대 자동 구성
cd my-app
npm install          # node_modules 채우기 (B-1의 ③에 해당)
npm run dev          # 개발 서버 실행
```

- `npm create vite@latest my-app ...` 가 **폴더 `my-app` 을 대신 만들어 줍니다.**
  그래서 여기선 `mkdir` 을 따로 안 해도 됩니다 — B-1의 ①·②를 이 한 줄이 대신 해주는 셈이죠.
- `-- --template react` : React(JS) 템플릿 (TypeScript는 `react-ts`)
- 대화형 질문이 뜨면 처음엔 **기본값(Enter)** 으로 진행하세요.

> [PHP 비교] `composer create-project` 로 새 프로젝트 뼈대를 통째로 받던 것과 같은 역할입니다.

> ⚠️ **정리:** "빈 폴더를 내가 직접 만들어서" 시작하는 건 **B-1**(원리 이해용). 실제 React 작업은
> 폴더 생성까지 자동으로 해주는 **B-2**를 씁니다. 어느 쪽이든 마지막은 항상 `npm install` → `node_modules` 생성.

---

## C. 자주 겪는 문제 (Troubleshooting)

| 증상 | 원인 / 해결 |
|------|-------------|
| `npm : ... 없습니다` | Node 미설치. https://nodejs.org 에서 LTS 설치 후 터미널 재시작 |
| `Missing script: "dev"` | 프로젝트 폴더 밖에서 실행함. `cd react_class` 로 들어가서 다시 |
| `Cannot find module ...` | `npm install` 을 안 했음. 폴더 안에서 `npm install` |
| `Port 5173 is in use` | 이미 서버가 떠 있음. 그 창에서 `Ctrl+C` 로 끄거나, Vite가 제안하는 다른 포트 사용 |
| 브라우저가 안 열림 | 터미널의 `http://localhost:5173/` 주소를 직접 복사해 브라우저에 붙여넣기 |
| 레슨 08이 ⚠️ 에러 | 네트워크(인터넷)가 없으면 정상. fetch가 실패한 것 — 에러 처리도 학습 포인트 |

---

## D. 다음 단계

`npm run dev` 로 화면이 뜨면, **[README.md](./README.md)** 의 학습 순서(01→08)대로 진행하세요.
`src/lessons/` 파일의 **주석을 읽고 → 직접 고쳐보는 것**이 핵심입니다.
