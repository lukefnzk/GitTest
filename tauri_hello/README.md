# tauri_hello — Rust + WebView2로 만든 윈도우 데스크톱 GUI

`electron_hello`와 **완전히 같은 화면**(👋 인사 버튼)을 Tauri로 만든 버전.
목적: "가볍고 빠른가?"를 Electron과 나란히 두고 **숫자로** 비교하기.

## Electron과 무엇이 다른가 (핵심 1장)

| | electron_hello | tauri_hello |
|---|---|---|
| 화면 엔진 | **Chromium을 통째로 내장**해서 새로 켬 | **OS의 WebView2를 빌려 씀** (이미 떠 있음) |
| 백엔드 언어 | Node.js | **Rust** |
| JS↔백엔드 다리 | preload / IPC | `invoke()` → `#[tauri::command]` |
| 배포물 크기 | 큼 (수십~수백 MB) | 작음 (수 MB급 exe) |
| 빌드 도구 | npm만 | **Rust 툴체인 + C++ 빌드도구** 필요 |

> 트레이드오프 한 줄: **Electron = 설치 쉬움 / 결과물 무거움**,
> **Tauri = 설치 까다로움 / 결과물 가벼움.** 딱 반대다.

## 구조

| 경로 | 역할 | 언어 |
|------|------|------|
| `src/index.html`, `main.js`, `styles.css` | 화면(렌더러) | HTML/CSS/**JS** |
| `src-tauri/src/lib.rs` | 백엔드 커맨드(`greet`) | **Rust** |
| `src-tauri/tauri.conf.json` | 앱 설정(창 크기·아이콘·식별자) | JSON |
| `src-tauri/Cargo.toml` | Rust 의존성 | TOML |

화면의 `invoke("greet", { name })` → `lib.rs`의 `greet()` Rust 함수가 실행되어
문자열을 돌려준다. "인사 받기(JS)" 버튼은 Rust 없이 순수 JS 카운터다(Electron과 동일 UX).

## 실행 / 빌드 (from inside tauri_hello)

전제: Rust(rustup), C++ 빌드도구(MSVC), WebView2 가 있어야 함. (Rust 없으면 `rustup`으로 설치)

```
npm install                       # @tauri-apps/cli (한 번)
npm run tauri dev                 # 개발 실행 — 창이 뜬다 (HMR 유사)
npm run tauri build -- --no-bundle   # 릴리스 exe만: src-tauri/target/release/tauri_hello.exe
npm run tauri build               # 설치파일(.msi/.exe)까지 (WiX/NSIS 필요)
```

> 첫 빌드는 Rust가 크레이트 수백 개를 컴파일해서 몇 분 걸린다.
> 두 번째부터는 캐시(`target/`) 덕에 훨씬 빠르다. `target/`은 .gitignore 대상.

## 직접 비교해볼 3가지 (느낌 말고 숫자)

1. **exe/폴더 용량** — `target/release/tauri_hello.exe` vs Electron `node_modules` 362MB
2. **메모리** — 작업관리자에서 실행 중 RAM
3. **시작 시간** — 창 뜨는 속도
4. **(보너스) 엔진 정체** — 창 하단 UA 문자열. Tauri는 `Edge/...`(WebView2),
   Electron은 `Chrome/... Electron/...` 이 뜬다. 같은 웹 UI인데 엔진이 다른 게 눈에 보인다.
