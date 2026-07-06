/*
 * 07. 스코프와 클로저
 * -----------------------------------------------------------
 * '변수가 어디까지 살아있는가(스코프)'와, '함수가 자기 태어난 환경을
 * 기억하는 것(클로저)'을 배운다. 클로저는 나중에 React 의 useState 같은
 * hook 을 이해하는 밑바탕이 된다.
 *
 * 실행:  node 07_scope_and_closure.js
 */

// ------------------------------------------------------------
// 1) 블록 스코프 — let/const 는 { } 안에서만 산다
// ------------------------------------------------------------
{
  const secret = "블록 안";
  console.log(secret); // → 블록 안
}
// console.log(secret);  // ← 주석 풀면 에러! 블록 밖에서는 secret 이 없다.

// ------------------------------------------------------------
// 2) var 가 옛날 방식인 이유 — 블록을 무시한다
// ------------------------------------------------------------
if (true) {
  var leaked = "샜다"; // var 는 블록을 뚫고 밖으로 샌다
  let safe = "안전"; // let 은 이 블록 안에만 존재
}
console.log(leaked); // → 샜다  (⚠️ 밖에서도 보임 — 버그의 원인)
// console.log(safe);    // ← 에러 (let 이라 정상적으로 막힘)
// ★ 그래서 요즘은 var 를 안 쓰고 const/let 만 쓴다.

// ------------------------------------------------------------
// 3) ★ 클로저 — 함수가 자기 '바깥 변수'를 기억한다
// ------------------------------------------------------------
function makeCounter() {
  let count = 0; // 이 변수는 makeCounter 안에 '갇혀' 있다
  return () => {
    // 반환된 함수가 count 를 계속 기억(클로저)
    count++;
    return count;
  };
}
const counter = makeCounter();
console.log(counter()); // → 1
console.log(counter()); // → 2   (count 가 살아남아 계속 늘어남!)
console.log(counter()); // → 3

const counter2 = makeCounter(); // 새로 만들면 count 도 새것
console.log(counter2()); // → 1  (counter 와 완전히 독립적)

// [Python 비교] Python 도 중첩 함수 + nonlocal 로 같은 걸 한다:
//   def make_counter():
//       count = 0
//       def inc():
//           nonlocal count
//           count += 1
//           return count
//       return inc
// JS 는 nonlocal 선언 없이 바깥 변수를 그냥 읽고 쓸 수 있다.
// ★ React 의 useState 도 "값을 기억하는" 이 클로저 원리 위에서 돌아간다.
