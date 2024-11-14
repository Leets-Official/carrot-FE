# 🥕Carrot-FE

당근마켓 내 서비스인 당근알바 클론코딩.

## 📝 Introduce

가천대학교 교내 IT동아리인 Leets 4조에서 진행하는 당근알바 서비스 구축 클론코딩 프로젝트 **FE** 팀 레포지터리입니다. <br/>
[**🔗Carrot-BE 바로가기**](https://github.com/Leets-Official/Carrot-BE)

## ⚙️ Develop Environment

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-3578E5?style=flat-square&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
</div>

## 팀원 구성

<div  align="center">
  
|<img src="https://avatars.githubusercontent.com/u/91336314?v=4" width="150" height="150"/>|<img src="https://avatars.githubusercontent.com/u/173772422?v=4" width="150" height="150"/>|
|:-:|:-:|
|✨4기<br/>OH SUBIN<br/>[@odukong](https://github.com/odukong)|✨4기<br/>KIM MINSEO<br/>[@minseoKim](https://github.com/minseoKim-11)|
</div>

## 📝Feature
### 로그인 / 회원가입
- 사업자(구인자), 일반유저(구직자)로 구분하여 자체 회원가입을 진행하며, <br/>사업자의 경우에는 사업자인증을 진행한 후에 회원가입이 완료된다.
- 로그인은 이메일과 비밀번호를 통해 자체 로그인을 진행한다.
  
|<img src="https://github.com/user-attachments/assets/f532038e-799f-4460-b9ec-44eed33412a0" width="150"/>|<img src="https://github.com/user-attachments/assets/0ee106dd-36ec-4f09-8050-3a64bf1b9dd4" width="150"/>|
|:-:|:-:|
|로그인|회원가입|

### 홈 / 검색 / 상세페이지

- 홈페이지에서 동네 알바를 확인할 수 있다.
- 검색페이지는 검색 키워드를 통해 이와 일치하는 알바를 확인할 수 있다.
- 상세페이지에서는 해당 알바에 대한 전반적인 내용(급여,시간,장소..)과 함께 사업자 정보를 확인할 수 있으며 <br/> 구직자의 경우, 해당 페이지에서 알바 지원이 가능하다.
  
|<img src="https://github.com/user-attachments/assets/42e806d8-c731-457d-857e-dba51d2ae372" width="150"/>|<img src="https://github.com/user-attachments/assets/182aee41-3854-4c4c-8169-fda42673f6c4" width="150"/>|<img src="https://github.com/user-attachments/assets/716f2b49-3c18-4966-8057-905816346643" width="150"/>|
|:-:|:-:|:-:|
|홈페이지|검색페이지|상세페이지(지원하기,구인글 삭제 기능)|

### 구인글 작성페이지

- 사업자가 구인글을 작성할 수 있는 페이지로, 글 제목, 알바정보, 이미지 등을 입력하여 구인글을 등록할 수 있다.

|<img src="https://github.com/user-attachments/assets/eea5c013-48d4-4f79-bf2e-11658e0d5414" width="150"/>|<img src="https://github.com/user-attachments/assets/406519bf-9fe7-4e81-8b70-e9c5c16b696c" width="150"/>|
|:-:|:-:|
|구인글 작성|구인글 작성2|

### 마이페이지(구인자)
- 구인자의 마이페이지에서는 자신이 작성한 구인글을 모아볼 수 있다.
- 특정 구인글에 지원한 지원자 목록 역시 확인할 수 있으며, 채용하기를 통해 알바를 고용할 수 있다.

|<img src="https://github.com/user-attachments/assets/b59ab8e0-e0db-4897-8c3a-5dfa255a09df" width="150"/>|<img src="https://github.com/user-attachments/assets/4d8511d9-e3b9-4261-a57c-1a50c4c9ac08" width="150"/>|<img src="https://github.com/user-attachments/assets/8faa2a93-8dca-4c54-ac33-55ea6241b36a" width="150"/>|
|:-:|:-:|:-:|
|구인글 모아보기|지원자 목록 보기|채용하기|

### 마이페이지(구직자)
- 구직자의 마이페이지에서는 자신이 지원한 구인글을 상태에 따라 모아볼 수 있다. (구인중, 채용완료, 불합격)
- 마이페이지에서 자신의 자기소개서 역시 수정하는 것이 가능하다.

|<img src="https://github.com/user-attachments/assets/fd624baf-240a-4dec-8109-3d9209b55307" width="150"/>|<img src="https://github.com/user-attachments/assets/2eb88db0-1efe-416c-8b90-b70f8b706b27" width="150"/>|<img src="https://github.com/user-attachments/assets/9a63136f-7bed-4d91-ac87-368dbd37919b" width="150"/>|
|:-:|:-:|:-:|
|지원리스트 보기|지원서 관리|기본정보 수정(구인자/구직자 공통)|

### 지원하기
- 구직자는 자신이 지원하고픈 알바의 상세페이지에서 알바 지원이 가능하다.
- 중복된 알바 지원은 불가하다.
  
|<img src="https://github.com/user-attachments/assets/71b74986-9fc6-4399-89bb-fbfa4b749c22" width="150"/>|<img src="https://github.com/user-attachments/assets/20e1b8e0-f63b-43e3-9b93-0db5eb3f3f76" width="150"/>|
|:-:|:-:|
|지원완료|중복지원|



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
| `hooks`      |커스텀 훅이 담긴 폴더        |
| `pages`      | DOM에 라우팅되어 렌더링되는 페이지들이 담긴 폴더         |
| `store`     | redux 관련 파일 폴더                                      |
| `styles`     | 스타일 관련 폴더                                         |
| `utils`      | util함수들이 담긴 폴더 (getAccessToken..)                                 |

