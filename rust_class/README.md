# Rust 언어 맛보기 (rust_class)

Tauri(`tauri_hello/`)를 만들며 설치한 Rust를, 이왕이면 **직접 손으로** 익혀보는 맛보기 트랙.
`python_class` / `javascript_class` 와 같은 집 스타일(파일 상단 설명 블록, 촘촘한 한글 주석,
`// →` 예상 출력, `[JS/Python 비교]` 주석)을 그대로 따른다.

목표는 문법 완주가 아니라 **Rust 의 소울(불변 기본값 + 소유권)을 체감**하는 것.

## 학습 순서

| 파일 | 배우는 것 | Python/JS 와 결정적으로 다른 점 |
|------|-----------|------------------------------|
| `01_hello_world.rs` | `fn main`, `println!`, `{}`·`{name}` 출력 | 컴파일 후 실행(인터프리터 아님) |
| `02_variables.rs` | `let`, **불변이 기본**·`mut`, 타입추론, 섀도잉, `const` | 변수가 **기본적으로 안 바뀜** |
| `03_functions.rs` | 타입 명시 매개변수·반환, **마지막 식=반환값**, `if` 식 | 타입 필수 + `return` 생략 관습 |
| `04_ownership.rs` | **이동(move)**, copy vs move, 함수로의 소유권 이동 | GC 없이 **주인 하나** 규칙 |
| `05_borrowing.rs` | **참조 `&`**, 가변참조 `&mut`, 빌림 규칙 | 소유권 안 넘기고 '빌려주기' |

`04` → `05` 가 이 트랙의 핵심이자 Rust 를 Rust 답게 만드는 부분이다.

## 실행 방법

`rust_class/` 폴더 안에서, 레슨(=별도 실행파일)을 골라 실행한다:

```
cd rust_class
cargo run --bin 01_hello_world
cargo run --bin 02_variables
cargo run --bin 03_functions
cargo run --bin 04_ownership
cargo run --bin 05_borrowing
```

> `cargo`가 "not found"면 터미널 PATH 문제다. VS Code 를 껐다 켜거나
> `export PATH="/c/Users/lukef/.cargo/bin:$PATH"` (Git Bash) 후 다시 실행.

## "고장난 데모"는 왜 주석 처리돼 있나

Python/JS 는 잘못된 코드도 일단 돌다가 런타임에 터지지만, **Rust 는 에러가 있으면 컴파일 자체가 안 된다.**
그래서 각 레슨의 "이러면 안 된다" 예시는 주석으로 막아두고

```rust
// x = 6;   // ← 이 줄의 주석을 풀면 컴파일 에러! ...
```

처럼 적어뒀다. **직접 주석을 풀고 `cargo run` 해서 컴파일러가 뭐라고 막는지 읽어보는 것**이
Rust 학습의 핵심이다 — 컴파일러가 곧 선생님이다.

## 참고

- `Cargo.toml` : 프로젝트 설정(패키지 이름·에디션). `src/bin/*.rs` 를 각각 실행파일로 자동 인식.
- `target/` : 컴파일 결과 캐시. 용량이 크고 재생성 가능하므로 `.gitignore` 대상.
- 이 트랙은 "맛보기"다. 더 파고들려면 공식 무료 책 *The Rust Programming Language*(통칭 "The Book")를 추천.
