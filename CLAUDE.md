# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal learning/practice repository ("GitTest"). It is not a single application — it
collects five unrelated study tracks. There is no build system or test runner (the lone
`javascript_class/package.json` exists only to enable ES modules, not to install anything);
the `test0*.txt` files and root `README.md` are Git-workflow practice notes, not test fixtures.

The real code artifacts:

1. **`QThread/`** — PySide6 (Qt for Python) concurrency study with a desktop GUI.
2. **`CountFontColorN_fixed.js`** — a standalone Google Apps Script custom function for Google Sheets.
3. **`python_class/`** — numbered, step-by-step pure-Python lessons on classes (`01_*` → `10_*`),
   each runnable standalone with no dependencies. See `python_class/README.md` for the order.
4. **`javascript_class/`** — numbered JavaScript language lessons (`01_*` → `11_*`), each runnable
   standalone with `node`. A React/Next.js on-ramp; every file carries Python↔JS comparison
   comments (it is the sequel to `python_class`). See `javascript_class/README.md`.
5. **`web_class/`** — browser front-end lessons (`01_*` → `10_*`): HTML, CSS, DOM, events, `fetch`,
   plus two mini-projects (counter, todo). Opened in a browser, not run with `node`. See
   `web_class/README.md`.

## QThread/ — PySide6 concurrency examples

Two entry points implement the **same UI** (two buttons + a `QListView`) with **two different
concurrency strategies**. This pairing is the point of the directory — compare them, don't merge them.

- `main_qthread.py` — `ThreadWorker(QThread)` directly emits per-item signals (`progressSignal_num`,
  `progressSignal_alpa`) to the main thread. One worker per button press, tracked in `self.thread_workers`.
- `main_producer_consumer.py` — splits work across a `Producer(QThread)` and `Consumer(QThread)`
  communicating through a `queue.Queue`. Producer pushes `(type, value)` tuples and a sentinel
  `('end', None)`; Consumer drains with `get(timeout=0.5)` and re-emits `update_signal` to the UI.

Shared UI:
- `qthread.ui` — Qt Designer source.
- `qthread_ui.py` — **generated** from `qthread.ui` (header says "All changes made in this file will
  be lost when recompiling"). Do not hand-edit it. Regenerate with:
  ```
  pyside6-uic QThread/qthread.ui -o QThread/qthread_ui.py
  ```

Run an example (requires `pip install PySide6`; run from inside `QThread/` because the scripts
`from qthread_ui import Ui_MainWindow` with no package path):
```
cd QThread
python main_qthread.py
python main_producer_consumer.py
```

Conventions that matter when editing these:
- **Never touch Qt widgets from a worker thread.** All UI mutation goes through signals
  (`Signal` → slot on `MainWindow`). Worker threads only `emit`.
- Each worker exposes a cooperative `stop()` that flips `self._is_running`; `closeEvent` calls
  `stop()` then `wait()` (with a timeout / `terminate()` fallback) so the app exits cleanly.
  Preserve this shutdown handshake when adding workers.

## CountFontColorN_fixed.js — Google Apps Script

A custom spreadsheet function `=CountFontColorN(range, colorRef)` that counts non-empty cells in
`range` whose font color matches `colorRef`'s font color. It runs in Apps Script (bound to a Google
Sheet), not Node — there is no local way to execute it here.

Key/fragile detail: it does **not** use its declared parameters directly. It reads the calling cell's
raw formula via `getActiveRange().getFormula()` and regex-extracts the two argument addresses, then
rebuilds `Range` objects. This is a workaround for Sheets caching color reads; keep that mechanism if
you modify it, and update the regexes if the argument shape changes.

## javascript_class/ & web_class/ — JS learning tracks (React/Next.js on-ramp)

Two paired tracks, both mirroring `python_class`'s teaching style (numbered files, a top-of-file
explanation block, dense Korean comments, expected output shown inline as `// →`). They exist to
take someone from `python_class` toward React/Next.js.

- **`javascript_class/`** — the *language* core, run with `node NN_name.js`. `package.json` holds
  `{"type": "module"}` solely so lesson `08` can use `import`/`export` (ESM). Every lesson adds
  `[Python 비교]` comments contrasting the JS syntax with the Python the learner just finished.
- **`web_class/`** — the *browser*. Open the `.html` files directly (or via a static server /
  VS Code Live Server; lesson `07`'s `fetch` needs a server or network). Lessons `08`/`09`
  deliberately use a `state → render()` pattern, and `10_why_react.md` maps that pattern onto
  React's `useState`/JSX to motivate the next step. `09_project_todo/` is split into
  `index.html` + `style.css` + `app.js` to model a real project layout.

When adding lessons, keep the numbering contiguous, preserve the Python-comparison comments in
`javascript_class/`, and keep every example runnable standalone.

## Git workflow

`master` is the main/default branch. Commit messages in history follow a `YY.MM.DD: [tag] summary`
convention (some use gitmoji). The repo's whole history is Git-feature practice (branches, merges,
PRs, detached HEAD), so unusual-looking commits are intentional exercises.
