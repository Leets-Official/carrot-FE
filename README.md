# Leets_Carrot-FE

당근마켓 내 서비스인 당근알바 클론코딩.

## Introduce

가천대학교 교내 IT동아리인 Leets 4조에서 진행하는 당근알바 서비스 구축 클론코딩 프로젝트 프론트엔드.

## Feature

- 로그인, 회원가입, 주변 알바 리스트, 알바 지원하기, 구인글 등록 etc.

## ⚙️ Develop Environment

- Framework : React
- Node : v18.xx.x

## 🗂️ Project Structure

| 폴더명       | 설명                                                     |
| ------------ | -------------------------------------------------------- |
| `public`     | 정적 파일들이 담긴 폴더                                  |
| `src`        | 대부분의 파일을 넣는 폴더 (index.js, js파일, css파일 등) |
| `assets`     | 프로젝트의 자산들을 관리하는 폴더                        |
| `font`       | font 파일들이 담긴 폴더                                  |
| `images`     | image 파일들이 담긴 폴더                                 |
| `api`        | 서버와 데이터 통신하는 CRUD Axios가 담긴 폴더            |
| `components` | pages에 들어가는 부분마다의 components가 담긴 폴더       |
| `constants`  | 자주 사용되는 상수가 담긴 폴더                           |
| `pages`      | DOM에 라우팅되어 렌더링되는 페이지들이 담긴 폴더         |
| `styles`     | 스타일 관련 폴더                                         |
| `utils`      | util함수들이 담긴 폴더                                   |

## ✉️ Git Commit Message Convention

Commit을 할 때 다음과 같은 규칙을 따릅니다.

`type : commit name`

### TYPE

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 코드 포매팅, 세미콜론 누락, 코드의 변경이 없는 경우
- refactor : 코드 리팩터링
- test : 테스트 코드, 리팩토링 테스트 코드 추가
- start : 프로젝트 초기 세팅
- chore : 빌드 업무 수정, 패키지 매니저 수정
