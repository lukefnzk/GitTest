/*
 * 08 (보조 파일). 다른 파일에서 가져다 쓸 '모듈'.
 * -----------------------------------------------------------
 * export 를 붙인 것만 바깥에서 import 할 수 있다.
 * 이 파일은 직접 실행하지 않고, 08_modules.js 가 불러다 쓴다.
 */

// 이름 붙은 내보내기(named export) — 한 파일에서 여러 개 가능
export const PI = 3.14159;

export function circleArea(r) {
  return PI * r * r;
}

export const add = (a, b) => a + b;

// 기본 내보내기(default export) — 파일당 딱 하나. import 할 때 이름을 마음대로 정한다
export default function greet(name) {
  return `${name}님 안녕하세요`;
}
