/*
 * 08. ES 모듈 (import / export)
 * -----------------------------------------------------------
 * 코드를 여러 파일로 나누고, 필요한 것만 가져다 쓰는 방법.
 * React/Next.js 는 '컴포넌트 하나 = 파일 하나' — 전부 이 import/export 로 연결된다.
 *
 * ※ 이 폴더의 package.json 에 {"type": "module"} 이 있어서 import 문법이 동작한다.
 *   (그 줄이 없으면 Node 는 옛 방식인 require 를 기대해서 에러가 난다)
 *
 * 실행:  node 08_modules.js
 */

// 이름 붙은 것들은 { } 로 감싸 '같은 이름'으로 가져온다
import { PI, circleArea, add } from "./08_math_utils.js";
// default 로 내보낸 것은 { } 없이, 이름은 내가 정한다 (여기선 hello 로 받음)
import hello from "./08_math_utils.js";
// 한 줄로 합쳐도 됨:  import hello, { PI, circleArea } from "./08_math_utils.js";

console.log(PI); // → 3.14159
console.log(circleArea(2)); // → 12.56636
console.log(add(3, 4)); // → 7
console.log(hello("영희")); // → 영희님 안녕하세요

// [Python 비교]
//   from math_utils import PI, circle_area   ↔   import { PI, circleArea } from "./..."
//   Python 의 import 와 목적이 같다: 코드를 파일로 쪼개 재사용.
// [참고] 옛날 Node 코드에서 보는  const x = require("...") / module.exports = ...
//        는 CommonJS 방식. 요즘 React 쪽은 위의 import/export(ESM)를 쓴다.

// ★ import 경로 끝에 확장자 ".js" 를 꼭 붙인다는 점 주의! (Node ESM 규칙)
