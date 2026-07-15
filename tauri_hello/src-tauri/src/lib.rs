// Tauri 커맨드: 화면(JS)에서 invoke("greet", { name }) 로 부르면 이 Rust 함수가 실행된다.
//   → Electron의 preload/IPC 다리와 같은 역할. 다만 백엔드가 Node가 아니라 Rust인 게 차이.
//   https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("{}님 안녕하세요! (이 문장은 Rust가 만들어 보냈습니다)", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
