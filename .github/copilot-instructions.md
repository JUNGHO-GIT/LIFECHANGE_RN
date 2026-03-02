# LIFECHANGE_RN — Coding Rules & Agent Directive

> Single source of truth for coding standards and agent behavior.
> Follow these rules first. Only search the codebase when information here is incomplete.

---

## 1. 핵심 원칙

- **Readability > Performance > Cleverness** — 명확한 변수명, 극단적 축약 금지
- **SRP (Single Responsibility Principle)** — 함수·컴포넌트는 하나의 역할
- **Fail-fast** — 유효하지 않은 입력은 즉시 에러, 빈 catch 금지
- **Flat structure** — 최대 4단계 들여쓰기, 깊은 중첩 금지

---

## 2. 포매팅

- **Tab** 들여쓰기 (space 아님)
- **세미콜론** 필수
- 모든 `if/else/try/catch` 블록에 **중괄호 + 줄바꿈** 필수
- `else` / `catch` / `finally` 는 닫는 중괄호와 **별도 줄**에 작성

```ts
if (condition) {
  doA();
}
else {
  doB();
}
try {
  riskyOp();
}
catch (err) {
  handleError(err);
}
finally {
  cleanup();
}
```

- 주석 구분선은 `-----` 사용 (`======` 금지)

```ts
// 1. Section -----
const f = () => {};
```

---

## 3. 네이밍 컨벤션

| 대상 | 규칙 | 예시 |
|------|------|------|
| 파일 (컴포넌트) | `PascalCase.tsx` | `CalendarWidget.tsx` |
| 파일 (config/script) | `camelCase.js` · `kebab-case.mjs` | `metro.config.js`, `swc.mjs` |
| 배럴 re-export | `Import{Name}.tsx` | `ImportSchemas.tsx` |
| React 컴포넌트 | `PascalCase` | `const Banner = () => {}` |
| 함수 / 변수 | `camelCase` | `const fetchData = () => {}` |
| 상수 | `UPPER_SNAKE_CASE` | `const SERVER_URL = "..."` |
| TS 타입/인터페이스 | `PascalCase` | `type ExerciseRecord = {...}` |
| 타입 선언 파일 | `camelCase.d.ts` | `global.d.ts` |
| 테스트 파일 | `*.spec.ts` · `*.spec.tsx` | `App.spec.tsx` |

---

## 4. Java 규칙

- **Java 1.8** (Android Gradle 호환)
- `Optional` 적극 사용, `null` 반환 지양
- 필드에 `final` 우선 적용
- Stream API 활용 가능
- `catch (Exception e)` 금지 → 구체적 예외 타입 catch

---

## 5. TypeScript 규칙

- **Ternary / IIFE > if-else** (값 반환 로직 시 필수)
- **Single Exit Point** — 함수 중간 `return` 금지, 변수에 할당 후 끝에서 `return`
- **`any` 사용 금지** — `@ts-ignore`도 금지, 타입 에러는 직접 수정
- **Object 키**는 항상 double quote: `{ "key": value }`
- **Arrow function** 우선: `const f = () => {}` (function 선언 지양)
- **Template literal** 사용: `` `Hello ${name}` ``
- **`var` 금지** — `const` 우선, 필요 시 `let`
- 공백: `=` `:` 주위 1칸, 단 파라미터 기본값은 예외 `(a=1) => {}`
- 배열 대괄호 안 공백: `[ 1, 2, 3 ]`

```ts
// ✅ ternary chain
!s || s === "p1" ? (
  f()
) : s === "p2" ? (
  f(s, "yy")
) : (
  f(s)
);

// ✅ single exit point
const processData = (items: Item[]) => {
  const result = !items.length ? [] : items.map(transform);
  return result;
};

// ❌ mid-function return
const processData = (items: Item[]) => {
  if (!items.length) return [];
  return items.map(transform);
};
```

---

## 6. SQL / MyBatis 규칙

- **`#{}` 강제** (PreparedStatement 바인딩) — `${}` 사용 금지 (SQL Injection 위험)
- SQL 키워드는 **대문자**: `SELECT`, `FROM`, `WHERE`, `INSERT`, `UPDATE`

---

## 7. 테스트 규칙

- **Given-When-Then** 구조
- 한글 메서드명 허용: `"운동 기록을 조회한다"`
- Jest 30 (preset: `react-native`)
- 현재 테스트 파일 없음 — 새 기능 작성 시 테스트 추가 권장

```shell
npx jest --passWithNoTests          # 전체 실행
npx jest --testPathPattern="App"    # 단일 파일
```

---

## 8. 에러 핸들링

- **빈 catch 블록 절대 금지** — 최소한 로깅 또는 re-throw
- **Fail-fast** — 유효성 검증 실패 시 즉시 에러
- **Contextual message** — 에러 메시지에 변수·상태 포함

```ts
try {
  await fetchData(id);
}
catch (err) {
  throw new Error(`fetchData failed for id=${id}: ${err}`);
}
```

---

## 9. Commit 메시지

```
<type>: <short description>

# type: feat | fix | chore | refactor | docs | style | test
# 예시:
feat: add sleep record schema
fix: resolve calendar date offset
chore: update dependencies
```

---

## 10. 에이전트 행동 규칙

1. **Surgical edit** — 최소한의 변경만 수행, 관련 없는 코드 수정 금지
2. **ESLint `--fix` 자동 실행 금지** — 승인 없이 자동 포맷 금지
3. **빌드(`npm run build`) 자동 실행 금지** — Bun 필요, 환경 의존적
4. **path alias 유지** — `@exports/*`, `@schemas/*` 등을 상대 경로로 바꾸지 말 것
5. **`changelog.md` 수정 금지** — Gradle 빌드 시 자동 생성
6. **테스트가 없다고 가정하지 말 것** — Jest 설정은 존재, 파일만 없음
7. 명령 실패 시 임의 대안 실행 금지 — **에러 메시지를 그대로 보고**
8. Import 순서: React/RN core → 서드파티 → path alias → 상대 경로

---

## 11. Changes 섹션 필수

작업 완료 후 PR 본문에 **파일별 한 줄 요약**을 포함하라:

```markdown
## Changes

### `src/schemas/Sleep.tsx` — 수면 기록 타입 필드 추가
### `src/containers/Banner.tsx` — 배너 높이 반응형 수정
```