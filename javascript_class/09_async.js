/*
 * 09. 비동기 (callback → Promise → async/await)
 * -----------------------------------------------------------
 * '시간이 걸리는 일(네트워크 요청 등)'을 기다리는 동안 프로그램을 멈추지 않고
 * 다른 일을 하게 하는 게 비동기다. React 에서 서버 데이터를 받아올 때 필수.
 *
 * ※ 아래 출력들은 '기다리는' 코드라 순서가 뒤섞여 보인다. 그게 정상이자 핵심이다.
 *
 * 실행:  node 09_async.js
 */

// ------------------------------------------------------------
// 1) 비동기의 맛보기 — setTimeout (일정 시간 뒤 실행)
// ------------------------------------------------------------
console.log("1. 시작");
setTimeout(() => console.log("3. 1초 뒤 도착"), 1000); // 1초 뒤에 실행
console.log("2. 끝");
// 이 세 줄의 출력 순서: 1. 시작 → 2. 끝 → (1초 후) 3. 1초 뒤 도착
// ★ setTimeout 이 '기다리는 동안' 멈추지 않고 다음 줄(2)로 넘어간다 — 이게 비동기.

// ------------------------------------------------------------
// 2) Promise — "나중에 값이 올 것"이라는 약속
// ------------------------------------------------------------
// resolve = 성공 시 부를 함수. (실패용 reject 도 있지만 여기선 성공만 다룸)
function wait(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
}

wait(500, "결과A")
  .then((result) => console.log("then 으로 받음:", result)) // 성공하면 여기로
  .catch((err) => console.log("에러:", err)); // 실패하면 여기로

// ------------------------------------------------------------
// 3) ★ async / await — Promise 를 '동기 코드처럼' 깔끔하게
// ------------------------------------------------------------
// async 함수 안에서 await 를 쓰면, 그 Promise 가 끝날 때까지 '기다렸다가' 값을 받는다.
async function run() {
  console.log("A. 요청 보냄");
  const a = await wait(300, "첫 번째"); // 여기서 잠깐 기다림
  console.log("B. 받음:", a);
  const b = await wait(300, "두 번째");
  console.log("C. 받음:", b);
}
run();
// [Python 비교] Python 의 async def / await 와 문법·개념이 거의 같다!
//   async def run(): a = await wait(...)   ↔   async function run() { const a = await wait(...) }

// ------------------------------------------------------------
// 4) 실전 — fetch 로 인터넷에서 데이터 받기 (인터넷 연결 필요)
// ------------------------------------------------------------
async function loadUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await res.json(); // 응답 본문을 객체로 변환 (이것도 비동기)
    console.log("D. 서버에서 받은 이름:", user.name);
  } catch (e) {
    console.log("네트워크 오류(오프라인이면 정상):", e.message);
  }
}
loadUser();
// ★ React 에서 서버 데이터를 불러올 때 바로 이 async/await + fetch 조합을 쓴다.
