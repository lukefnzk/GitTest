# electron_hello — Node로 만든 윈도우 데스크톱 GUI 맛보기

버튼을 누르면 인사하는 최소 Electron 앱. `react_class`에서 배운 HTML/CSS/JS(웹 기술)가
**그대로 데스크톱 앱 창**이 되는 걸 체감하는 용도.

## 구조 (프로세스 2개)

| 파일 | 역할 | 환경 |
|------|------|------|
| `main.js` | 창을 만들고 OS와 대화 (메인 프로세스) | **Node.js** |
| `preload.js` | 메인↔화면 사이 안전한 다리 | Node.js (제한적) |
| `index.html` | 실제로 보이는 화면 (렌더러 프로세스) | **Chromium(브라우저)** |

> 한 줄 요약: **"Node가 창을 열고, 그 창 안에서 웹페이지가 돈다."**
> VS Code · Slack · Discord · Figma 데스크톱이 전부 이 방식.

## 실행

```
cd electron_hello
npm install     # 최초 1회 — Electron 런타임(≈ 수백 MB) 내려받음
npm start       # 창이 뜬다
```

## 진짜 .exe 파일로 만들려면 (선택)

`npm start`는 개발 실행이고, 배포용 단일 exe/설치파일은 `electron-builder`로 만든다:

```
npm install --save-dev electron-builder
npx electron-builder --win        # dist/ 에 설치파일(.exe) 생성
```

---

## ⚠️ "Electron이 Python보다 빠르고 가볍다"에 대한 솔직한 정정

VS Code가 빠른 건 **Electron이 가벼워서가 아니라, MS가 어마어마하게 최적화**했기 때문이다.
사실 관계는 이렇다:

- **Electron은 오히려 무겁다.** 앱마다 Chromium 브라우저 통째로(+Node)를 껴안는다.
  설치 폴더 수백 MB, 실행 시 RAM도 native 앱보다 많이 쓴다.
- **Python이 느리게 뜨는 진짜 이유**는 파이썬 자체가 아니라 **무거운 라이브러리 로딩**이다.
  예: `QThread/`의 PySide6는 거대한 Qt를 불러오느라 느리다. 순수 파이썬 스크립트는 순식간에 뜬다.
  → Electron의 Chromium과 PySide6의 Qt는 "둘 다 무거운 엔진"이라는 점에서 처지가 비슷하다.
- **정말 "가볍고 빠른 시작"이 목표라면** Electron은 최선이 아니다. 같은 웹 UI라도
  **Tauri**(윈도우 내장 WebView2 사용, 폴더 ≈ 수 MB)가 훨씬 가볍다.

### 그래서 이 테스트로 직접 재봐야 할 것

느낌 말고 숫자로 비교하자:

1. **시작 시간** — `npm start` 후 창이 뜨기까지 (PySide6 `QThread/` 실행과 비교)
2. **메모리** — 작업관리자에서 `electron` 프로세스들의 RAM 합계 (보통 여러 개로 뜬다)
3. **용량** — `node_modules/` 폴더 크기 (오른쪽 클릭 → 속성)

이 3개를 PySide6 앱과 나란히 재보면, "체감"이 아니라 근거로 판단할 수 있다.
