/*
 * 01. 변수와 타입
 * -----------------------------------------------------------
 * Python 은 `x = 3` 처럼 바로 변수를 만들었지만,
 * JS 는 앞에 let / const / var 중 하나를 붙여 '선언'한다.
 *
 *   let   : 나중에 값을 바꿀 수 있는 변수
 *   const : 한 번 정하면 못 바꾸는 상수 (기본으로 이걸 쓰는 걸 권장)
 *   var   : 옛날 방식 — 헷갈리는 규칙이 있어 요즘은 거의 안 씀 (07번에서 이유 설명)
 *
 * 실행:  node 01_variables_and_types.js
 */

// ------------------------------------------------------------
// 1) let 과 const
// ------------------------------------------------------------
let age = 20; // 바꿀 수 있음
age = 21; // OK
console.log(age); // → 21

const name = "홍길동"; // 상수
// name = "김철수";     // ← 이 줄의 주석을 풀면 TypeError! const 는 재할당 불가
console.log(name); // → 홍길동

// [Python 비교] Python 은 name = "홍길동" 이면 언제든 다시 대입 가능.
//              JS 는 const 로 '못 바꾸게' 명시할 수 있다. 안전한 코드에 유리.

// ------------------------------------------------------------
// 2) 원시 타입(primitive) — typeof 로 확인
// ------------------------------------------------------------
console.log(typeof 42); // → number   (Python 의 int/float 구분 없이 전부 number)
console.log(typeof 3.14); // → number
console.log(typeof "hi"); // → string   (Python 의 str)
console.log(typeof true); // → boolean  (Python 의 bool. 단, JS 는 true/false 소문자!)
console.log(typeof undefined); // → undefined
console.log(typeof null); // → object   (⚠️ JS 의 유명한 버그 — null 인데 object 로 나옴)

// [Python 비교] Python 의 None 하나가, JS 에서는 둘로 나뉜다:
//   undefined : "아직 값이 안 정해짐" (시스템이 준 빈 값)
//   null      : "비어 있음을 내가 일부러 지정" (개발자가 준 빈 값)
let notYet; // 값을 안 주면 자동으로 undefined
console.log(notYet); // → undefined
let empty = null; // 내가 '비었다'고 명시
console.log(empty); // → null

// ------------------------------------------------------------
// 3) 템플릿 리터럴 — Python 의 f-string 에 해당
// ------------------------------------------------------------
// 백틱(`) 으로 감싸고 ${...} 안에 값을 넣는다.
const city = "서울";
console.log(`${name}님은 ${age}살, ${city}에 삽니다.`);
// → 홍길동님은 21살, 서울에 삽니다.
// [Python 비교] f"{name}님은 {age}살"  ↔  `${name}님은 ${age}살`

// ------------------------------------------------------------
// 4) 숫자는 하나의 타입 (int/float 구분 없음)
// ------------------------------------------------------------
console.log(7 / 2); // → 3.5   (Python3 의 나눗셈과 같음)
console.log(Math.floor(7 / 2)); // → 3  (Python 의 7 // 2 는 JS 에 없어 Math.floor 사용)
console.log(2 ** 10); // → 1024  (거듭제곱 ** 는 Python 과 문법이 같다!)
