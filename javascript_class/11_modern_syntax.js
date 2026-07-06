/*
 * 11. 모던 문법 총정리 — "React 준비물 팩"
 * -----------------------------------------------------------
 * React 코드에서 눈에 자주 밟히는 최신 문법을 한자리에 모았다.
 * 앞에서 조금씩 나온 것들의 복습 + 새로운 몇 가지.
 *
 * 실행:  node 11_modern_syntax.js
 */

const user = {
  name: "홍길동",
  profile: { city: "서울" },
  // address 는 일부러 없음
};

// ------------------------------------------------------------
// 1) 옵셔널 체이닝 ?. — 없는 걸 타고 들어가도 에러 대신 undefined
// ------------------------------------------------------------
console.log(user.profile?.city); // → 서울
console.log(user.address?.city); // → undefined  (address 가 없어도 터지지 않음!)
// ?. 가 없으면 user.address.city 는 "undefined 의 city" 라며 에러가 난다.
// ★ 서버에서 온 데이터가 아직 안 왔을 때 React 에서 아주 유용.

// ------------------------------------------------------------
// 2) 널 병합 ?? — null/undefined 일 때만 기본값
// ------------------------------------------------------------
const nickname = user.nickname ?? "이름없음";
console.log(nickname); // → 이름없음
// || 와의 차이: || 는 0, "" 도 '없음'으로 쳐서 기본값을 준다. ?? 는 오직 null/undefined 만.
console.log(0 || "기본"); // → 기본   (0 을 falsy 로 봐서 대체 — 원치 않을 때가 있음)
console.log(0 ?? "기본"); // → 0      (0 은 엄연한 값이므로 유지 — 이게 더 안전한 경우가 많음)

// ------------------------------------------------------------
// 3) 배열 구조분해 + 반환 — useState 가 이렇게 생겼다
// ------------------------------------------------------------
function useStateLike(initial) {
  let value = initial;
  const setValue = (v) => (value = v);
  return [value, setValue]; // 값과 '바꾸는 함수'를 배열로 반환
}
const [count, setCount] = useStateLike(0); // React: const [count, setCount] = useState(0)
console.log(count); // → 0
console.log(typeof setCount); // → function
// ★ React 의 useState 반환값을 이 배열 구조분해로 받는다. 형태를 미리 눈에 익히자.

// ------------------------------------------------------------
// 4) 스프레드로 함수에 배열 풀어 넣기
// ------------------------------------------------------------
const nums = [3, 1, 4, 1, 5];
console.log(Math.max(...nums)); // → 5   (Math.max(3, 1, 4, 1, 5) 처럼 펼쳐짐)
// [Python 비교] Python 의 max(*nums) 언패킹과 같은 개념.

// ------------------------------------------------------------
// 5) 조건부 렌더링 미리보기 — && 와 삼항 (React 최다 패턴)
// ------------------------------------------------------------
const isLoggedIn = true;
const items = ["메일", "알림"];
// && : 앞이 참일 때만 뒤를 보여준다
console.log(isLoggedIn && `환영합니다, ${user.name}님`); // → 환영합니다, 홍길동님
// 삼항 : 둘 중 하나
console.log(items.length > 0 ? `${items.length}개 있음` : "비어있음"); // → 2개 있음
// ★ JSX 안에서 {isLoggedIn && <p>...</p>} / {cond ? <A/> : <B/>} 로 똑같이 쓴다.

console.log("\n다음 단계 → web_class 에서 이 문법들을 실제 화면(HTML)에 연결한다!");
