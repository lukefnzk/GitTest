/*
 * 09. 투두리스트 — 동작(로직)
 * -----------------------------------------------------------
 * 08번 카운터의 'state → render' 패턴을 '배열 상태'로 확장한다.
 *   상태(todos 배열)를 바꾸고 → render() 로 목록 전체를 다시 그린다.
 * 이 구조가 React 컴포넌트와 사실상 같다 (10_why_react.md 에서 비교).
 */

// ★ 상태(state): 할 일들의 배열. 각 할 일은 { id, text, done } 객체.
let todos = [
  { id: 1, text: "트랙 1 JS 코어 끝내기", done: true },
  { id: 2, text: "web_class 로 화면 붙이기", done: false },
];
let nextId = 3; // 새 할 일에 부여할 id (겹치지 않게 계속 증가)

const listEl = document.querySelector("#list");
const counterEl = document.querySelector("#counter");

// ★ render(): 현재 todos 배열을 보고 화면(ul)을 '통째로' 다시 그린다.
function render() {
  // 04_array_methods 의 map: todos(데이터) → <li> HTML 문자열 배열
  listEl.innerHTML = todos
    .map(
      (todo) => `
        <li class="${todo.done ? "done" : ""}" data-id="${todo.id}">
          <span class="text">${todo.text}</span>
          <button class="del">✕</button>
        </li>`
    )
    .join(""); // 배열 → 하나의 문자열

  // 남은(안 끝난) 개수 — 05_objects/04 의 filter
  const left = todos.filter((t) => !t.done).length;
  counterEl.textContent = `남은 할 일 ${left}개 / 전체 ${todos.length}개`;
}

// [추가] 폼 제출 → todos 에 새 객체 넣고 → render
document.querySelector("#form").addEventListener("submit", (e) => {
  e.preventDefault(); // 새로고침 막기 (06번)
  const input = document.querySelector("#input");
  const text = input.value.trim();
  if (!text) return; // 빈 입력은 무시

  // ★ 불변성 스타일: push 로 원본을 고치지 않고, 스프레드로 '새 배열'을 만든다
  //   (05_objects 에서 배운 습관 — React 가 요구하는 방식)
  todos = [...todos, { id: nextId++, text, done: false }];
  input.value = "";
  render();
});

// [완료 토글 / 삭제] 이벤트 위임(06번): li 가 계속 늘어나므로 부모 ul 에 한 번만 등록
listEl.addEventListener("click", (e) => {
  const li = e.target.closest("li"); // 클릭 지점에서 가장 가까운 li 를 찾음
  if (!li) return;
  const id = Number(li.dataset.id); // data-id 속성값 읽기 (문자열이라 숫자로 변환)

  if (e.target.classList.contains("del")) {
    // 삭제 버튼: filter 로 그 id 만 빼고 새 배열
    todos = todos.filter((t) => t.id !== id);
  } else {
    // 그 외(텍스트) 클릭: 해당 항목의 done 만 뒤집어 새 배열 (map + 스프레드)
    todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  }
  render();
});

render(); // 첫 화면 그리기

/*
 * [정리] 우리가 직접 한 일:
 *   - 상태를 바꿀 때마다 render() 를 '손으로' 호출했다.
 *   - render() 는 매번 목록 전체를 다시 그린다 (규모가 크면 비효율적일 수 있음).
 * React 는 바로 이 부분을 자동화한다 → 10_why_react.md 로!
 */
