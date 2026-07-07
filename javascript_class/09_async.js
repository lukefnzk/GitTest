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
// 4) ★ Promise ↔ async/await 는 '같은 코드'다 — 변환 규칙 3줄
// ------------------------------------------------------------
// async/await 는 Promise 를 '대체'한 게 아니라, 아래 규칙으로 똑같이 옮겨 쓴 것뿐이다.
// (그래서 async 함수도 결국 Promise 를 반환한다 — 대체가 아니라 위에 얹은 문법.)
//   resolve(값)       →   return 값
//   reject(에러)      →   throw 에러
//   new Promise(...)  →   (통째로 생략, 함수 앞에 async 만 붙임)

// [A] Promise 방식
function checkAgePromise(age) {
  return new Promise((resolve, reject) => {
    if (age > 20) resolve(`${age}세: 통과`);
    else reject(new Error(`${age}세: 20세 이하라 거부`));
  });
}

// [B] async 방식 — 위 규칙만 적용하면 [A] 와 완전히 동일 (둘 다 Promise 를 반환!)
async function checkAgeAsync(age) {
  if (age > 20) return `${age}세: 통과`; // resolve(값) → return 값
  else throw new Error(`${age}세: 20세 이하라 거부`); // reject(에러) → throw 에러
}

// 받는 쪽도 짝이 맞는다:  .then / .catch   ↔   try { await } catch
checkAgePromise(25).then((v) => console.log("E. [A] then :", v)); // → 25세: 통과
checkAgePromise(15).catch((e) => console.log("F. [A] catch:", e.message)); // → ...거부

async function useAsync() {
  try {
    const ok = await checkAgeAsync(25); // 성공 → 값이 ok 에 담김
    console.log("G. [B] await:", ok); // → 25세: 통과
    await checkAgeAsync(15); // 실패(throw) → 아래 catch 로 점프
  } catch (e) {
    console.log("H. [B] catch:", e.message); // → 15세: ...거부
  }
}
useAsync();
// ★ 한 줄 정리: resolve=return, reject=throw, .then/.catch = try/await/catch.
//   '문법만 다르고 동작은 같다'. (참고 글: springfall.cc 의 promise-async-await 정리)

// ------------------------------------------------------------
// 5) 실전 — fetch 로 인터넷에서 데이터 받기 (인터넷 연결 필요)
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

// ------------------------------------------------------------
// 6) ★ 실전 시나리오 — "느린 DB 는 기다리되, 페이지는 먼저 그린다"
// ------------------------------------------------------------
// 상황: 웹페이지를 연다 → 상품 목록을 DB 에서 가져오는데 '양이 많아' 오래 걸린다.
//   그동안 헤더·푸터 같은 '나머지'는 먼저 완성해 보여주고(안 기다림),
//   DB 데이터가 다 오면 비워뒀던 자리를 채워 페이지를 '최종 완성'한다.
//
// (이 섹션 로그는 전부 [웹] 으로 시작한다. 실행하면 위 1~5번 출력과 섞여 보이는데,
//  그게 정상 — 여러 비동기가 '동시에' 도는 이벤트 루프의 실제 모습이다.)

// 양이 많아 2초 걸리는 DB 조회. 결과가 '나중에' 오므로 Promise 를 돌려준다(=진동벨).
function fetchProductsFromDB() {
  console.log("[웹] (DB) 상품 조회 시작… 양이 많아 2초 걸림 ⏳");
  return new Promise((resolve) => {
    setTimeout(() => resolve(["노트북", "마우스", "키보드"]), 2000); // 2초 뒤 도착
  });
}

async function openPage() {
  // ① DB 를 뺀 '나머지'를 즉시 그린다 — 데이터를 기다리지 않는다
  console.log("[웹] 헤더·메뉴 그림 ✅");
  console.log("[웹] 상품영역: '불러오는 중…' 자리만 잡아둠 ⏳");
  console.log("[웹] 푸터 그림 ✅");
  console.log("[웹] → 페이지 뼈대 완성! 사용자는 벌써 화면을 본다 (DB 안 기다림)");

  // ② 오래 걸리는 DB '만' await 로 기다린다 (기다리는 동안 프로그램 전체는 안 멈춘다)
  const products = await fetchProductsFromDB();

  // ③ 데이터 도착 → 비워뒀던 상품영역을 채워 '최종 완성'
  console.log("[웹] (DB) 도착! 상품영역 채움 → " + products.join(", ") + " ✅");
  console.log("[웹] → 페이지 최종 완성! 🎉");
}

openPage();
// ④ 이 줄이 '[웹] (DB) 도착' 보다 '먼저' 찍힌다 = 페이지가 DB 를 안 기다렸다는 증거.
console.log("[웹] openPage() 는 백그라운드로 진행 중 — 여기 메인 코드는 계속 달린다");

// 이 섹션만 떼어 순서를 보면:
//   [웹] 헤더·메뉴 → 상품영역 자리만 → 푸터 → 뼈대 완성   (여기까지 즉시)
//   [웹] (DB) 상품 조회 시작…                              (요청 보냄)
//   [웹] openPage() 는 백그라운드로 진행 중                 (★ DB 안 기다리고 다음 줄!)
//   ────────────── 2초 뒤 ──────────────
//   [웹] (DB) 도착! 상품영역 채움 → 노트북, 마우스, 키보드
//   [웹] → 페이지 최종 완성! 🎉

// [Python 비교] Python 도 동일: async def open_page(): products = await fetch_from_db()
// ★ React 에선 이 패턴을 useEffect + useState 로 쓴다 —
//   화면(로딩 스피너)을 먼저 그리고, 데이터가 도착하면 setState 로 그 자리를 채운다.
