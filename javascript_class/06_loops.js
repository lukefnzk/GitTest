/*
 * 06. 반복과 순회
 * -----------------------------------------------------------
 * JS 의 반복문은 종류가 많다. 언제 뭘 쓰는지가 핵심.
 *   for (;;)   : 옛날 스타일, 인덱스를 직접 다룰 때
 *   for...of   : 배열의 '값'을 하나씩  ← 가장 자주 씀
 *   for...in   : 객체의 '키'를 하나씩  (배열엔 쓰지 말 것!)
 *   while      : 조건이 참인 동안
 *
 * 실행:  node 06_loops.js
 */

const fruits = ["사과", "바나나", "포도"];

// ------------------------------------------------------------
// 1) 고전적 for — 인덱스(i)를 직접 굴린다
// ------------------------------------------------------------
for (let i = 0; i < fruits.length; i++) {
  console.log(i, fruits[i]); // → 0 사과 / 1 바나나 / 2 포도
}
// [Python 비교] for i in range(len(fruits)):  ↔  for (let i = 0; i < fruits.length; i++)

// ------------------------------------------------------------
// 2) ★ for...of — 값을 바로 꺼낸다 (Python 의 for x in list)
// ------------------------------------------------------------
for (const fruit of fruits) {
  console.log(fruit); // → 사과 / 바나나 / 포도
}
// [Python 비교] for fruit in fruits:  ↔  for (const fruit of fruits)

// 인덱스도 같이 필요하면 entries() (Python 의 enumerate)
for (const [i, fruit] of fruits.entries()) {
  console.log(`${i}번: ${fruit}`); // → 0번: 사과 / 1번: 바나나 / 2번: 포도
}
// [Python 비교] for i, fruit in enumerate(fruits):  ↔  fruits.entries()

// ------------------------------------------------------------
// 3) for...in — 객체의 '키'를 순회 (배열엔 쓰지 말자)
// ------------------------------------------------------------
const scores = { kor: 90, eng: 85 };
for (const subject in scores) {
  console.log(subject, scores[subject]); // → kor 90 / eng 85
}
// ⚠️ for...in 은 '키'를 준다. 배열에 쓰면 인덱스가 '문자열'로 나와 헷갈리니,
//    배열은 for...of, 객체는 for...in (또는 Object.entries) 로 구분해서 쓰자.

// ------------------------------------------------------------
// 4) while / break / continue
// ------------------------------------------------------------
let n = 1;
while (n <= 3) {
  console.log(`n = ${n}`); // → n = 1 / n = 2 / n = 3
  n++;
}
// break(멈춤) / continue(건너뛰기) 는 Python 과 이름·동작이 똑같다.
