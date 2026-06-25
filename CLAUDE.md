# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal learning/practice repository ("GitTest"). It is not a single application — it
collects three unrelated study tracks. There is no build system, package manifest, or test
runner; the `test0*.txt` files and `README.md` are Git-workflow practice notes, not test fixtures.

The real code artifacts:

1. **`QThread/`** — PySide6 (Qt for Python) concurrency study with a desktop GUI.
2. **`CountFontColorN_fixed.js`** — a standalone Google Apps Script custom function for Google Sheets.
3. **`python_class/`** — numbered, step-by-step pure-Python lessons on classes (`01_*` → `05_*`),
   each runnable standalone with no dependencies. See `python_class/README.md` for the order.

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

## Git workflow

`master` is the main/default branch. Commit messages in history follow a `YY.MM.DD: [tag] summary`
convention (some use gitmoji). The repo's whole history is Git-feature practice (branches, merges,
PRs, detached HEAD), so unusual-looking commits are intentional exercises.
