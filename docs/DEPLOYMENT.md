# GitHub Actions & GitHub Pages 배포 가이드

## 개요

이 프로젝트는 GitHub Actions를 사용한 자동화된 CI/CD 파이프라인과 GitHub Pages를 통한 배포를 지원합니다.

## 워크플로우 구성

### 1. Deploy Workflow (`.github/workflows/deploy.yml`)

**트리거:**
- `main` 브랜치에 push할 때
- `main` 브랜치로 PR이 생성될 때
- 수동 실행 (workflow_dispatch)

**작업 흐름:**
1. **Build Job**
   - 코드 체크아웃
   - Node.js 20 설정
   - 의존성 설치 (`npm ci`)
   - 린터 실행 (실패해도 계속 진행)
   - 테스트 실행 (실패해도 계속 진행)
   - 프로덕션 빌드 (`npm run build`)
   - GitHub Pages 아티팩트 업로드

2. **Deploy Job** (main 브랜치에서만)
   - Build Job 완료 후 실행
   - GitHub Pages에 배포

### 2. CI Workflow (`.github/workflows/ci.yml`)

**트리거:**
- `develop` 브랜치에 push할 때
- `feature/**` 브랜치에 push할 때
- `main`, `develop` 브랜치로 PR이 생성될 때

**작업 흐름:**
- Node.js 18.x, 20.x 매트릭스 테스트
- 린터 실행
- 유닛 테스트 실행
- 프로덕션 빌드
- E2E 테스트 실행 (Playwright)
- 테스트 결과 아티팩트 업로드

## GitHub Pages 설정

### 1. Repository 설정

1. GitHub 저장소로 이동
2. **Settings** > **Pages** 클릭
3. **Source** 섹션에서:
   - Source: `GitHub Actions` 선택
4. 저장

### 2. 권한 설정

워크플로우 파일에 이미 필요한 권한이 설정되어 있습니다:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

### 3. Base URL 설정

`vite.config.js`에서 자동으로 처리됩니다:

```javascript
base: process.env.NODE_ENV === 'production' 
  ? '/earthworm-game-demo/' 
  : '/'
```

> **중요:** Repository 이름이 `earthworm-game-demo`가 아니라면 이 값을 변경해야 합니다.

## 배포 프로세스

### 자동 배포 (권장)

1. 코드 변경 후 커밋:
   ```bash
   git add .
   git commit -m "feat: 새로운 기능 추가"
   ```

2. `main` 브랜치에 push:
   ```bash
   git push origin main
   ```

3. GitHub Actions가 자동으로:
   - 빌드 실행
   - 테스트 실행
   - GitHub Pages에 배포

4. 배포 완료 후 접속:
   ```
   https://[username].github.io/earthworm-game-demo/
   ```

### 수동 배포

1. GitHub 저장소의 **Actions** 탭으로 이동
2. **Deploy to GitHub Pages** 워크플로우 선택
3. **Run workflow** 버튼 클릭
4. 브랜치 선택 후 실행

## 브랜치 전략

```
main (프로덕션)
  ├── 자동 배포 to GitHub Pages
  └── PR 시 빌드 & 테스트

develop (개발)
  ├── CI 테스트 실행
  └── main으로 PR 생성

feature/* (기능 개발)
  └── CI 테스트 실행
```

### 작업 흐름

1. **새 기능 개발:**
   ```bash
   git checkout -b feature/new-feature
   # 개발 작업
   git push origin feature/new-feature
   ```
   → CI 워크플로우 실행 (테스트)

2. **Develop에 병합:**
   ```bash
   # PR 생성: feature/new-feature → develop
   # PR 승인 후 병합
   ```
   → CI 워크플로우 실행

3. **프로덕션 배포:**
   ```bash
   # PR 생성: develop → main
   # PR 승인 후 병합
   ```
   → Deploy 워크플로우 실행 → GitHub Pages 배포

## 환경 변수

현재 프로젝트는 환경 변수가 필요하지 않지만, 필요한 경우:

1. GitHub 저장소 **Settings** > **Secrets and variables** > **Actions**
2. **New repository secret** 클릭
3. 환경 변수 추가

워크플로우에서 사용:
```yaml
- name: Build
  run: npm run build
  env:
    VITE_API_KEY: ${{ secrets.VITE_API_KEY }}
```

## 빌드 캐싱

워크플로우는 npm 캐싱을 사용하여 빌드 속도를 향상시킵니다:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'  # npm 캐시 활성화
```

## 배포 상태 확인

### 1. GitHub Actions 탭
- 실시간 빌드 로그 확인
- 각 단계별 성공/실패 상태
- 에러 메시지 확인

### 2. Environments 탭
- 배포 히스토리
- 현재 배포된 버전
- 배포 URL

### 3. 배지 추가 (선택)

README.md에 배포 상태 배지 추가:

```markdown
[![Deploy](https://github.com/[username]/earthworm-game-demo/actions/workflows/deploy.yml/badge.svg)](https://github.com/[username]/earthworm-game-demo/actions/workflows/deploy.yml)
```

## 로컬 테스트

배포 전 로컬에서 프로덕션 빌드 테스트:

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 트러블슈팅

### 배포 실패 시

1. **Actions 탭에서 로그 확인**
   - 어느 단계에서 실패했는지 확인
   - 에러 메시지 읽기

2. **일반적인 문제:**

   **빌드 실패:**
   ```bash
   # 로컬에서 빌드 테스트
   npm run build
   ```

   **테스트 실패:**
   ```bash
   # 로컬에서 테스트 실행
   npm run test
   npm run lint
   ```

   **권한 오류:**
   - Repository Settings > Actions > General
   - Workflow permissions: "Read and write permissions" 확인

   **Pages 설정 오류:**
   - Settings > Pages
   - Source가 "GitHub Actions"로 설정되어 있는지 확인

3. **캐시 문제:**
   - Actions 탭에서 "Clear cache" 실행
   - 또는 워크플로우 재실행

### 404 에러

배포 후 404 에러가 발생하면:

1. **Base URL 확인:**
   ```javascript
   // vite.config.js
   base: '/earthworm-game-demo/'  // Repository 이름과 일치해야 함
   ```

2. **GitHub Pages 설정 확인:**
   - Settings > Pages에서 배포 상태 확인
   - URL이 올바른지 확인

3. **라우팅 문제:**
   - SPA의 경우 404.html 추가 필요 (필요시)

## 성능 최적화

### 1. 빌드 시간 단축

```yaml
# 캐시 활용
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### 2. 병렬 실행

```yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [18.x, 20.x]
    # 여러 Node 버전에서 동시 테스트
```

### 3. 조건부 실행

```yaml
# main 브랜치에서만 배포
if: github.ref == 'refs/heads/main'
```

## 비용

- GitHub Actions: 공개 저장소는 무료
- GitHub Pages: 공개 저장소는 무료
- 월 2,000분 빌드 시간 제공 (공개 저장소)

## 참고 자료

- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [GitHub Pages 문서](https://docs.github.com/en/pages)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html#github-pages)
