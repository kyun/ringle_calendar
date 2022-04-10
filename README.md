
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



#### eslint, prettier

코딩 스타일에 관대한 편이라, 기본적인 설정만 했습니다.


### 구현 목록

#### UI

- [x] Header UI
- [x] Header Responsible
- [x] Mini Calendar 
- [x] Weekly Scheduler
- [ ] Weekly Scheduler Responsible
- [ ] Monhtly Scheduler
- [ ] Monthly Scheduler Responsible
- [x] Todo Input Modal
- [ ] Monthly Scheduler Floating Schedule List Modal

#### 기능
- [ ] [Redux] Calendar State 정의
- [ ] [Redux] Scheduler State 정의
- [x] [Component] Mini Calendar 날짜 변경 기능
- [x] [Component] Weekly Scheduler 기간 드래그 선택 기능
- [x] [Component] Weekly Scheduler 등록된 일정 렌더링
- [ ] [Component] Monthly Scheduler 등록된 일정 렌더링
- [x] [Component] Todo Input Modal 일정 등록 기능
- [x] [Component] Todo Input Modal 일정 삭제 기능
- [x] [Component] Todo Input Modal 일정 수정 기능
- [ ] [Component] Todo Input Modal 반복 일정 등록 기능
- [ ] [Component] Scheduler 공통 반복 일정 렌더링


#### 여유가 있다면 개발할 기능
- [ ] [Component] 중첩 일정 UI 표시
- [x] [Component] ESC키로 Todo Input Modal 닫기 
- [ ] [Component] 마우스 스크롤로 Monthly Scheduler 월 변경
> Scheduler State의 구조를 다시 고민해봐야함.


#### 버그
- [ ] [Component] Weekly Scheduler 기간 드래그시 좌측 미니캘린더쪽으로 이동 시 일정 박스 사라지지 않음
