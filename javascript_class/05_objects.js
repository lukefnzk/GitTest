/*
 * 05. 객체 (object)
 * -----------------------------------------------------------
 * 객체는 Python 의 dict 에 해당한다. { 키: 값 } 형태로 데이터를 묶는다.
 * 특히 '구조분해'와 '스프레드'는 React 의 props/state 에서 매일 쓴다.
 *
 * 실행:  node 05_objects.js
 */

// ------------------------------------------------------------
// 1) 객체 만들기와 값 꺼내기
// ------------------------------------------------------------
const user = {
  name: "홍길동",
  age: 21,
  city: "서울",
};
console.log(user.name); // → 홍길동   (점 표기 — 가장 흔함)
console.log(user["age"]); // → 21       (대괄호 표기 — 키가 변수에 담겼을 때 유용)
// [Python 비교] Python dict 는 user["name"] 만 되지만, JS 객체는 user.name 도 된다.

// ------------------------------------------------------------
// 2) 메서드 — 객체 안의 함수. this 로 자기 자신을 가리킨다
// ------------------------------------------------------------
const dog = {
  name: "바둑이",
  bark() {
    // 메서드 단축 문법
    return `${this.name}: 멍멍!`; // this = 이 객체 자신 (Python 의 self 와 비슷)
  },
};
console.log(dog.bark()); // → 바둑이: 멍멍!
// [Python 비교] Python 의 self 를 JS 에서는 this 라 부르고, 매개변수로 적지 않는다.

// ------------------------------------------------------------
// 3) ★ 구조분해(destructuring) — 필요한 값만 콕 집어 꺼내기
// ------------------------------------------------------------
const { name, city } = user; // user 에서 name, city 만 변수로 빼냄
console.log(name, city); // → 홍길동 서울
// [Python 비교] Python 의 (a, b) = point 언패킹과 비슷하지만, '이름'으로 꺼낸다.
// ★★ React 함수 컴포넌트의 function Card({ title, body }) 가 바로 이 구조분해다.

// 배열도 구조분해 된다 (이건 위치 순서로)
const [first, second] = [10, 20];
console.log(first, second); // → 10 20

// ------------------------------------------------------------
// 4) ★ 스프레드(...) — 객체를 '복사'하거나 '합치기'
// ------------------------------------------------------------
// React 는 원본을 직접 고치지 않고 '복사본을 새로 만드는' 방식을 쓴다(불변성).
const updated = { ...user, age: 22 }; // user 를 복사하고 age 만 덮어씀
console.log(updated); // → { name: '홍길동', age: 22, city: '서울' }
console.log(user.age); // → 21  (원본은 그대로! — 이게 불변성 패턴)
// [Python 비교] {**user, "age": 22}  ↔  { ...user, age: 22 }

// ------------------------------------------------------------
// 5) 키/값 순회 — Object.keys / values / entries
// ------------------------------------------------------------
console.log(Object.keys(user)); // → [ 'name', 'age', 'city' ]
console.log(Object.values(user)); // → [ '홍길동', 21, '서울' ]
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`); // → name: 홍길동 / age: 21 / city: 서울
}
// [Python 비교] user.items()  ↔  Object.entries(user)
