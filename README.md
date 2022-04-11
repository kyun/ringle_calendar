
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


#### eslint, prettier

코딩 스타일에 관대한 편이라, 기본적인 설정만 했습니다.


### 구현 목록
- [x] Redux
  - [x] Calendar Redux Setting
  - [x] Schedule Redux Setting
- [x] Header 
  - [x] UI 개발
  - [x] 반응형
  - [ ] Refactoring
- [x] Layout
  - [x] UI 개발
  - [x] 반응형
  - [ ] Refactoring
- [x] MiniCalendar
  - [x] UI 개발
  - [x] Calendar Generate
  - [x] Move Date
  - [x] Calendar Redux 연동
  - [x] ~~반응형 (해당사항 없음)~~
  - [ ] Refactoring
- [ ] Weekly Scheduler
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
  - [ ] 등록된 반복 일정 표시
  - [x] 기간이 겹치는 일정 UI 처리 (깊은 고민이 필요)
  - [ ] Delete 키로 일정 삭제
  - [ ] Refactoring
- [ ] Monthly Scheduler
  - [ ] UI 개발
  - [ ] 반응형
  - [x] Monthly Calendar Generate
  - [x] Calendar Redux 연동
  - [x] Schedule Redux 연동
  - [x] 일정 등록 모달 띄우기
  - [x] 등록된 일정 표시
  - [x] 등록된 일정이 3개 이상일 경우, 더보기 버튼 노출
  - [ ] 더보기 버튼 클릭시, 등록된 일정 표시 팝업
  - [ ] 등록된 반복 일정 표시
  - [ ] 등록된 일정 클릭시 일정 수정 모달 띄우기
  - [ ] 마우스 스크롤로 달력 이동
  - [ ] Refactoring
- [ ] InputScheduleModal
  - [x] UI 개발
  - [ ] 반응형
  - [x] 제목 입력
  - [x] 날짜 입력
  - [x] 기간 입력
  - [ ] 반복 여부 입력
  - [x] ESC로 닫기
  - [x] Calendar Redux 연동
  - [x] Schedule Redux 연동
  - [ ] Refactoring
- [ ] Reusable Components (비지니스 로직이 없음)
  - [x] SimpleButton
  - [x] IconButton
  - [ ] SwitchButton
  - [x] Portal
  - [x] Input
  - [ ] InputPeriod
#### 버그
- [ ] [Component] Weekly Scheduler 기간 드래그시 좌측 미니캘린더쪽으로 이동 시 일정 박스 사라지지 않음

### 작업간 느낀점 (작업중에 쓰고싶을 때마다 써야지)

> Redux는 매우 익숙하나, RTK는 이번 과제를 통해서 처음 사용해보았다. 사용에 딱히 어려움은 없으나, 경험이 부족하여 작성된 코드가 Best Practice인지는 의문.

> Scss를 너무 오랜만에 써서 조금 이질감이 든다. styled-components 같은 CSS in JS로 개발했다면 UI 개발 비용이 많이 줄었을 것 같다.

> 처음에 과제 받았을 때 너무 재밌겠다~ 라고 생각하고 지금도 재밌게 개발하고 있긴한데, 문뜩 난이도가 좀 많이 높은거 아닌가 라는 생각이 듬. 
> 필수 구현범위는 명확하나, 구현하지 않아도 되는 것들이 다소 모호해서 일단은 구글 캘린더의 주요 기능들은 전부 클론하고 있는데, 과제치고는 코드 규모가 꽤 방대해졌다.
