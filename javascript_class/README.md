# JavaScript 언어 코어 (javascript_class)

React / Next.js 로 가기 위한 첫걸음 — JavaScript 언어 자체를 번호 순서대로.
`python_class` 를 끝낸 사람을 위해, 각 파일에 **"Python 에서는 이랬는데 JS 에선 이렇다"**
비교 주석을 달아 두었다. 이미 아는 개념 위에 문법만 얹으면 되므로 빠르게 익힐 수 있다.

## 학습 순서

| 파일 | 배우는 것 | React 로 가는 이유 |
|------|-----------|------------------|
| `01_variables_and_types.js` | `let`/`const`/`var`, 원시 타입, `typeof`, 템플릿 리터럴 | state 의 기본 |
| `02_operators_and_conditions.js` | `===` vs `==`, truthy/falsy, `if`, 삼항, `&&`/`\|\|` | 조건부 렌더링 |
| `03_functions.js` | 선언식·표현식·**화살표 함수**, 기본/나머지 매개변수 | 컴포넌트·콜백의 형태 |
| `04_array_methods.js` | **`map`**/`filter`/`reduce`/`find`, 메서드 체이닝 | 리스트 렌더링의 핵심 |
| `05_objects.js` | 객체, **구조분해**, **스프레드**, `Object.entries` | props·불변성 패턴 |
| `06_loops.js` | `for`/`for...of`/`for...in`/`while` | — |
| `07_scope_and_closure.js` | 블록 스코프, `var` 의 함정, **클로저** | hooks 이해의 토대 |
| `08_modules.js` (+`08_math_utils.js`) | `import`/`export` (ES 모듈) | 컴포넌트 파일 분리 |
| `09_async.js` | 콜백→Promise→**`async/await`**, `fetch` | 데이터 페칭 |
| `10_classes.js` | `class`, `constructor`, `extends`/`super`, `get`/`static` | (python_class 와 다리 놓기) |
| `11_modern_syntax.js` | 옵셔널 체이닝 `?.`, 널 병합 `??`, 배열 구조분해 등 | **React 준비물 팩** |

## 실행 방법

```
cd javascript_class
node 01_variables_and_types.js
```

Node.js 만 있으면 바로 실행된다(이 저장소는 v24 확인). 별도 설치 불필요.

## 참고: `package.json` 의 `{"type": "module"}`

이 폴더의 `package.json` 한 줄(`"type": "module"`)이 08번의 `import`/`export`
문법을 동작하게 해 준다. React/Next.js 도 이 ES 모듈 방식을 쓰므로 지금부터 익숙해지자.

## 다음 단계

코어를 익혔다면 `web_class/` 로 넘어가 이 문법들을 **실제 화면(HTML/CSS/DOM)** 에 연결한다.
마지막 `web_class/10_why_react.md` 를 읽으면 React 로 넘어갈 준비가 끝난다.
