## Getting Started

````
npm install
npm run start
````
### 기술 스택

- [x] create-react-app v5
- [ ] craco (X); // 현재 cra 5를 지원하지 않음 22.04.08 기준
- [x] typescript 
- [x] eslint + prettier 
- [x] redux
- [x] redux-toolkit
- [x] scss


#### 3rd party lib
- [x] dayjs
- [x] uuid
- [x] react-router-dom


#### eslint, prettier

코딩 스타일에 관대한 편이라, 기본적인 설정만 했습니다.


### 구현 목록
- [x] Redux
  - [x] Calendar Redux Setting
  - [x] Schedule Redux Setting

- [x] Header 
  - [x] UI 개발
  - [x] 반응형
  - [x] Refactoring

- [x] Layout
  - [x] UI 개발
  - [x] 반응형
  - [x] Refactoring

- [x] MiniCalendar
  - [x] UI 개발
  - [x] Calendar Generate
  - [x] Move Date
  - [x] Calendar Redux 연동
  - [x] ~~반응형 (해당사항 없음)~~
  - [x] Refactoring

- [x] Weekly Scheduler
  - [x] UI 개발
  - [x] 반응형
  - [x] Weelky Calendar Generate
  - [x] Calendar Redux 연동
  - [x] Schedule Redux 연동
  - [x] 일정 드래그 선택 기능
  - [x] 일정 등록 모달 띄우기
  - [x] 현재 시간 인디케이터 표시
  - [x] 등록된 일정 표시
  - [x] 등록된 일정 클릭시 일정 수정 모달 띄우기
  - [x] 등록된 반복 일정 표시
  - [x] 기간이 겹치는 일정 UI 처리 (깊은 고민이 필요)
  - [x] Refactoring

- [x] Monthly Scheduler
  - [x] UI 개발
  - [ ] ~~반응형~~
  - [x] Monthly Calendar Generate
  - [x] Calendar Redux 연동
  - [x] Schedule Redux 연동
  - [x] 일정 등록 모달 띄우기
  - [x] 등록된 일정 표시
  - [x] 등록된 일정이 3개 이상일 경우, 더보기 버튼 노출
  - [x] 더보기 버튼 클릭시, 등록된 일정 표시 팝업
  - [x] 등록된 반복 일정 표시
  - [x] 등록된 일정 클릭시 일정 수정 모달 띄우기
  - [ ] 마우스 스크롤로 달력 이동
  - [x] Refactoring

- [x] InputScheduleModal
  - [x] UI 개발
  - [ ] ~~반응형~~
  - [x] 제목 입력
  - [x] 날짜 입력
  - [x] 기간 입력
  - [x] 반복 여부 입력
  - [x] ESC로 닫기
  - [x] Delete 키로 일정 삭제
  - [x] Calendar Redux 연동
  - [x] Schedule Redux 연동
  - [x] Refactoring

- [x] ~~ScheduleListModal~~ -> Floating 처리 (MonthlyScheduler에 종속)
  - [x] UI 개발
  - [ ] ~~반응형~~
  - [x] Calendar Redux 연동
  - [x] Schedule Redux 연동
  - [x] 등록된 반복 일정 표시
  - [x] ESC로 닫기
  - [x] Refactoring

- [x] Reusable Components (비지니스 로직이 없어야 함)
  - [x] SimpleButton
  - [x] IconButton
  - [x] SwitchButton
  - [x] Portal
  - [x] Input
  - [x] InputPeriod 
  - [x] ColorBox

- [x] Algorithm 
  - [x] 중첩 스케줄 처리

- [x] 기타
  - [x] URL Params 적용
#### 버그
- [ ] [Component] Weekly Scheduler 기간 드래그시 좌측 미니캘린더쪽으로 이동 시 일정 박스 사라지지 않음

### 최종 회고

> 코드가 썩 마음에 들지는 않지만, 퇴근 후에 틈틈히 작업을 하여 목표(수요일) 보다 일찍 끝낼 수 있었습니다. 
> 처음 과제를 전달 받았을 때, 기분이 너무 좋았습니다. 캘린더 컴포넌트 만들기는 예전에 포스팅할 만큼 자신이 있었고, 구글 캘린더의 Usecase도 익숙한 상태였기 때문입니다.
> RTK는 허들 없이 쉽게 사용할 수 있었으나, Sass는 너무 오랜만에 사용하기도 했고 또 CSS in JS에 익숙해진 탓에 사용이 매끄럽지 못했습니다.
> 가장 어려웠던 부분은... 아무래도 일정을 마우스로 드래깅하여 설정하는 기능이었습니다. 그리고 늘 그렇듯 네이밍에도 꽤 많은 시간이 쓰였습니다.
> 어려울 거라 생각했던 중첩 스케줄 표시는 의외로 쉽게 풀렸습니다. 감도 못잡고 있었는데, 연습장에 한 번 그려본 후에 감을 잡고 개발할 수 있었습니다.
> 그동한 했던 코딩 과제 중에서 가장 재미있었고, 또 난이도가 높았던 과제였습니다. 