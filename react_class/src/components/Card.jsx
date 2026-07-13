// ============================================================
// components/Card.jsx — "부품" 파일 (레슨이 아니라, 레슨이 가져다 쓰는 컴포넌트)
// ------------------------------------------------------------
// [이 파일이 왜 lessons/ 가 아니라 components/ 에 있나]
//   실전 React 프로젝트는 컴포넌트를 이렇게 파일로 쪼갠다.
//   화면(페이지)은 lessons/ 나 pages/ 에, 재사용 부품은 components/ 에 둔다.
//   레슨 02b 가 이 파일을 import 해서 쓴다 → export/import 를 "실물"로 보라는 뜻.
//
// [export 3종 세트가 이 한 파일에 다 들어있다]
//   1) export default  → 이 파일의 대표. 파일당 딱 1개. 받는 쪽이 이름을 마음대로 짓는다.
//   2) export (named)  → 이름표 붙은 곁다리. 여러 개 가능. 받는 쪽이 { } 로 이름을 지목한다.
//   3) export 없음     → 이 파일 안에서만 쓰는 내부 부품. 밖에서는 존재조차 알 수 없다.
//
// [PHP 비교]
//   PHP: require 'card.php' → 그 파일의 함수가 전부 전역에 등록됨 (숨길 방법이 없음).
//   JS : export 를 붙인 것만 밖으로 나간다. 기본값이 "비공개"다.
// ============================================================

// ── (3) export 없음 = 내부 전용 헬퍼 ─────────────────────────
// 밖에서 import { shorten } 하려고 하면 에러가 난다:
//   → "does not provide an export named 'shorten'"
function shorten(text, max = 34) {
  return text.length > max ? text.slice(0, max) + '…' : text
}

// ── (2) named export = 이름표 붙여 내보내기 ──────────────────
// 받는 쪽:  import { Badge } from '../components/Card.jsx'   ← 이름이 정확히 같아야 함
export function Badge({ children }) {
  return <span className="badge">{children}</span>
}

// ── (1) default export = 이 파일의 대표 ─────────────────────
// 받는 쪽:  import Card from '../components/Card.jsx'        ← { } 없이, 이름은 자유
export default function Card({ title, desc, children }) {
  return (
    <div className="demo">
      {/* children: 태그 사이에 넣은 내용이 여기로 들어온다 (레슨 02b 2절에서 자세히) */}
      <b>{title}</b> {children}
      <p className="muted" style={{ margin: '4px 0 0' }}>
        {shorten(desc)} {/* ← 내부 헬퍼는 같은 파일이라 그냥 쓸 수 있다 */}
      </p>
    </div>
  )
}
