# LIFECHANGE_RN — Architecture

---

## 1. 프로젝트 설명

LIFECHANGE는 운동·식단·가계부·수면 기록을 관리하는 **Android 전용 React Native 모바일 앱**이다.
WebView 기반 인터페이스와 Android 홈 화면 위젯을 제공한다.

---

## 2. 기술 스택

| 항목 | 버전 / 설명 |
|------|------------|
| **React Native** | 0.82.1 (React 19.2.1) |
| **TypeScript** | 5.9.3 (`strict`, `noEmit`) |
| **Android SDK** | compileSdk 36, targetSdk 35, minSdk 24 |
| **Kotlin** | 2.1.20 |
| **Gradle (AGP)** | 8.7.3 |
| **NDK** | 27.1.12297006 |
| **Node.js** | >= 20 |
| **Bun** | latest (`.node/mjs/` 스크립트 실행 필수) |
| **SWC** | `@swc/core` 1.15.3 (커스텀 빌드) |
| **Metro** | React Native 기본 번들러 |
| **ESLint** | 9.39.1 (flat config `eslint.config.mjs`) |
| **Prettier** | 3.7.4 |
| **Jest** | 30.2.0 (preset: `react-native`) |
| **주요 라이브러리** | `axios`, `react-native-webview`, `react-native-gesture-handler`, `react-native-screens`, `react-native-android-widget`, `react-native-google-mobile-ads`, `moment-timezone` |

---

## 3. 디렉토리 구조

```
.
├── src/                          # React Native 소스
│   ├── App.tsx                   # 루트 컴포넌트
│   ├── assets/
│   │   ├── images/               # 이미지 리소스 (.webp)
│   │   └── types/                # 글로벌 타입 선언 (alias.d.ts, global.d.ts, extension.d.ts)
│   ├── containers/               # 화면 레벨 컴포넌트 (Banner, Webviews)
│   ├── imports/                  # 배럴 re-export (ImportContainers, ImportLibs, …)
│   ├── schemas/                  # 데이터 모델 (Calendar, Exercise, Food, Money, Sleep, …)
│   ├── widgets/                  # Android 위젯 (CalendarWidget, DetailWidget)
│   └── widgetTaskHandler.tsx     # 위젯 태스크 핸들러
├── android/                      # Android 네이티브 프로젝트 (Gradle, Kotlin)
├── .node/
│   ├── lib/utils.mjs             # 공유 유틸리티 (logger, runCmd 등)
│   └── mjs/                      # 커스텀 빌드 스크립트 (swc, fix, reset, git, gcloud, vsce, sync)
├── index.js                      # React Native 앱 진입점
├── tsconfig.json                 # TypeScript 설정 (strict, noEmit)
├── tsconfig.paths.json           # Path alias (@schemas/*, @exports/*, @containers/*, …)
├── babel.config.js               # Babel + module-resolver + react-native-dotenv
├── metro.config.js               # Metro 번들러 설정 (path alias 매핑)
├── eslint.config.mjs             # ESLint 9 flat config
├── jest.config.js                # Jest 설정 (preset: react-native)
├── package.json                  # 의존성 + 스크립트
├── .env                          # 환경변수 (TITLE, SERVER_URL, ADMOB_*)
└── changelog.md                  # 자동 생성 (Gradle 빌드 시 버전 증가)
```

### Path Alias (`tsconfig.paths.json`)

| Alias | 실제 경로 |
|-------|----------|
| `@assets/*` | `src/assets/*` |
| `@images/*` | `src/assets/images/*` |
| `@types/*` | `src/assets/types/*` |
| `@schemas/*` | `src/schemas/*` |
| `@containers/*` | `src/containers/*` |
| `@widgets/*` | `src/widgets/*` |
| `@exports/*` | `src/imports/*` |

### 수정 금지 목록

| 경로 | 이유 |
|------|------|
| `android/app/.cxx/` | CMake 빌드 산출물 (자동 생성) |
| `android/.gradle/`, `android/*/build/` | Gradle 캐시/빌드 출력 |
| `node_modules/` | 설치된 의존성 |
| `changelog.md` | Gradle 빌드 시 자동 업데이트 |
| `package.default.json`, `tsconfig.default.json` | 참조용 기본값 템플릿 |
| Lock 파일 (`package-lock.json`, `bun.lockb`) | 패키지 매니저로 관리 |

---

## 4. 빌드 / 실행 명령어

### 환경 준비

```shell
npm install                       # 의존성 설치
curl -fsSL https://bun.sh/install | bash  # Bun 설치 (필수)
```

### 타입 체크

```shell
npx tsc --noEmit                  # 타입 에러만 확인, 파일 미생성
```

### SWC 빌드 (Bun 필수)

```shell
npm run build                     # bun .node/mjs/swc.mjs --bun --build --server
```

> ⚠️ 현재 `tsc-alias`가 `compilerOptions.outDir` 미설정으로 실패함

### Android APK

```shell
cd android && ./gradlew assembleDebug     # 디버그 빌드
cd android && ./gradlew assembleRelease   # 릴리스 빌드
```

### 개발 서버 (Metro)

```shell
npx react-native start            # Metro 번들러
npx react-native run-android      # 에뮬레이터/디바이스 실행
```

---

## 5. 사용 가능한 스크립트 (`package.json`)

| 명령어 | 설명 |
|--------|------|
| `npm run build` | SWC 컴파일 (Bun 필요) |
| `npm run start` | SWC dev server (Bun 필요) |
| `npm run fix` | 코드 수정 스크립트 (Bun 필요) |
| `npm run reset` | 프로젝트 리셋 (Bun 필요) |
| `npm run sync` | 동기화 스크립트 (Bun 필요) |
| `npm run git-push-y` | Git push (자동 yes) |
| `npm run git-push-n` | Git push (자동 no) |
| `npm run gcloud` | GCloud 배포 스크립트 |
| `npm run vsce` | VS Code Extension 패키징 |
| `npx tsc --noEmit` | TypeScript 타입 체크 |
| `npx jest --passWithNoTests` | Jest 테스트 실행 |
| `npx eslint src index.js` | ESLint 린트 |
| `npx prettier --check src` | Prettier 포맷 확인 |
