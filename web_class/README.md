# 웹 프론트엔드 기초 (web_class)

`javascript_class`(언어 코어)를 마쳤다면, 이제 그 JS 를 **실제 화면**에 연결한다.
HTML(뼈대) · CSS(꾸미기) · DOM(JS로 화면 조작) 을 번호순으로 익히고,
마지막엔 바닐라 JS 로 투두리스트를 만든 뒤 "왜 React 인가"까지 이어간다.

## 실행 방법 — Node 아님! 브라우저로 연다

트랙 1 은 `node` 로 돌렸지만, 여기서는 **HTML 파일을 브라우저로 연다**:
- 파일 탐색기에서 `.html` 을 더블클릭, 또는 브라우저 창에 드래그
- VS Code 라면 확장 **"Live Server"** 로 열면 저장할 때마다 자동 새로고침 (추천)

개발자도구(**F12**)의 **Console 탭**을 항상 열어두자 — `console.log` 출력과 에러가 거기 뜬다.
(트랙 1 처럼 터미널이 아니라 브라우저 콘솔에 찍힌다.)

## 학습 순서

| 파일 | 배우는 것 |
|------|-----------|
| `01_html_basics.html` | HTML 문서 구조, 자주 쓰는 태그, 시맨틱 태그 |
| `02_css_basics.html` | CSS 넣는 법, 선택자, **박스 모델**, 색·글자 |
| `03_css_layout.html` | **flexbox** 로 가로/세로 정렬 (요즘 레이아웃의 기본) |
| `04_js_in_page.html` (+`04_script.js`) | `<script>` 로 JS 연결, 외부 파일 분리, `defer` |
| `05_dom_manipulation.html` | 요소 선택/수정/생성/삭제 (`querySelector`, `textContent`, `classList`) |
| `06_events.html` | 클릭·입력·폼 이벤트, `addEventListener`, 이벤트 위임 |
| `07_fetch_and_render.html` | `fetch` 로 받은 데이터를 `map` 으로 화면에 그리기 |
| `08_project_counter.html` | 미니 프로젝트: 카운터 (**state → render** 패턴) |
| `09_project_todo/` | 미니 프로젝트: 투두리스트 (HTML/CSS/JS **3파일 분리**) |
| `10_why_react.md` | 브릿지: 위 투두의 불편함 → React 가 해결하는 것 |

## 트랙 1 과의 연결

각 레슨은 `javascript_class` 에서 배운 문법을 화면에서 실제로 쓴다:
`04_array_methods` 의 `map`/`filter` → 목록 렌더링, `09_async` 의 `fetch` → 데이터 로드,
`07_scope_and_closure` 의 상태 유지, `11_modern_syntax` 의 구조분해·삼항·`&&` → 곳곳에.

## 다음 단계

`10_why_react.md` 를 읽고 나면 React 로 넘어갈 준비가 끝난다.
