/*
 * 04 (외부 스크립트). HTML 의 <script src="04_script.js"> 로 연결된 파일.
 * 코드를 HTML 과 분리하면 관리가 쉽다 — React 도 이렇게 JS 를 파일로 나눈다.
 */
console.log("외부 파일 04_script.js 도 실행됐습니다.");

// 이 파일 역시 트랙 1 의 문법을 그대로 쓴다 (03_functions 의 화살표 함수)
const greet = (name) => `${name}님, 외부 JS 에서 인사합니다`;
console.log(greet("영희"));
