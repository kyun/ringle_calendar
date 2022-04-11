import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { DAY_NAME, TIME_NAME } from '../../../constants/schedule';
import {
  nextMonth,
  prevMonth,
  selectCalendar,
} from '../../../features/calendar/calendarSlice';
import {
  getSchedule,
  Schedule,
} from '../../../features/schedule/scheduleSlice';
import Portal from '../../common/Portal';
import TodoInputModal from '../../modals/TodoInputModal';
import './MonthlyScheduler.scss';
import ScheduleListModal from './ScheduleListModal';

const INIT_DRAFT = {
  date: '',
  startAt: 0,
  endAt: 1.5,
  title: '(제목 없음)',
  background: '#FECA00',
  id: '',
};
const MonthlyScheduler: React.FC<any> = () => {
  const calendar = useAppSelector(selectCalendar);
  const { schedule } = useAppSelector(getSchedule);

  const dispatch = useAppDispatch();
  const [draft, setDraft] = React.useState(INIT_DRAFT);
  const [isInputModalOpen, setIsInputModalOpen] = React.useState(false);
  const [isScheduleListModalOpen, setIsScheduleListModalOpen] =
    React.useState(false);
  const [clickedDate, setClickedDate] = React.useState('');
  const [targetId, setTargetId] = React.useState('');

  const today = React.useMemo(() => dayjs(Date.now()), []);
  const selected = React.useMemo(
    () => dayjs(calendar.selected),
    [calendar.selected]
  );
  const [rows, setRows] = React.useState<Dayjs[][]>([[]]);
  const generate = () => {
    const startDay = selected.startOf('month').startOf('week');
    const endDay = selected.endOf('month').endOf('week');
    const startWeek = startDay.week();
    const endWeek = endDay.week() === 1 ? 53 : endDay.week();
    const calendar: Dayjs[][] = [];

    const bonusWeek = Array(7)
      .fill(0)
      .map((_, idx) => {
        return startDay.week(endWeek).add(1, 'week').add(idx, 'day');
      });

    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        Array(7)
          .fill(0)
          .map((_, idx) => {
            return startDay.week(week).add(idx, 'day');
          })
      );
    }
    if (calendar.length < 6) {
      calendar.push(bonusWeek);
    }
    setRows(calendar);
  };
  React.useEffect(() => {
    generate();
  }, [selected]);

  const handleCloseInputModal = () => {
    setDraft(INIT_DRAFT);
    setIsInputModalOpen(false);
    setTargetId('');
  };
  const handleClickDate = (date: string) => (e: any) => {
    console.log('handle...');
    e.preventDefault();
    e.stopPropagation();
    setDraft((prev) => ({
      ...prev,
      date,
    }));
    setIsInputModalOpen(true);
  };
  const handleItemClick = (date: string, id: string) => (e: any) => {
    console.log('clickckck');
    e.preventDefault();
    e.stopPropagation();
    setDraft((prev) => ({
      ...prev,
      date,
    }));
    setTargetId(id);
    setIsInputModalOpen(true);
  };
  const handleClickMore = (date: string) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setClickedDate(date);
    setIsScheduleListModalOpen(true);
  };
  console.log('Monthly');
  return (
    <div className="MonthlyScheduler">
      {isInputModalOpen && (
        <Portal>
          <TodoInputModal
            isEditMode={targetId !== ''}
            draft={draft}
            setDraft={setDraft}
            selectedScheduleIndex={-1}
            onClose={handleCloseInputModal}
          />
        </Portal>
      )}
      {isScheduleListModalOpen && (
        <Portal>
          <ScheduleListModal list={schedule[clickedDate]} />
        </Portal>
      )}
      <div className="row --fixed">
        {DAY_NAME.map((day, i) => {
          return (
            <div className="box" key={i}>
              {day}
            </div>
          );
        })}
      </div>
      {rows.map((row, index) => {
        return (
          <div className="row" key={index}>
            {row.map((d, j) => {
              const isToday = d.format('YYYYMMDD') === today.format('YYYYMMDD');
              const isPresent = selected.month() === d.month();
              const clone = [...(schedule?.[d.format('YYYY-MM-DD')] ?? [])];
              const length = clone.length;
              const sorted = clone?.sort((a, b) => a.startAt - b.startAt) ?? [];
              return (
                <div
                  className={`box ${isToday ? '--today' : ''} ${
                    isPresent ? '--black' : ''
                  }`}
                  onClick={handleClickDate(d.format('YYYY-MM-DD'))}
                  key={j}
                >
                  {d.date()}
                  <div className="schedule-list">
                    {/* Draft */}
                    {draft &&
                      draft.date === d.format('YYYY-MM-DD') &&
                      targetId === '' && (
                        <div className="schedule-item --draft">
                          {draft.title}, {draft.startAt}-{draft.endAt}
                        </div>
                      )}
                    {sorted?.slice(0, 3)?.map((el, index) => {
                      return (
                        <div
                          className="schedule-item"
                          key={index}
                          onClick={handleItemClick(
                            d.format('YYYY-MM-DD'),
                            el.id
                          )}
                        >
                          {el.title}, {TIME_NAME[el.startAt * 2]}-
                          {TIME_NAME[el.endAt * 2]}
                        </div>
                      );
                    })}
                    {schedule?.[d.format('YYYY-MM-DD')]?.length > 3 && (
                      <button
                        className="more-button"
                        onClick={handleClickMore(d.format('YYYY-MM-DD'))}
                      >
                        {length - 3}개 더보기
                      </button>
                    )}
                    {/* <button className="more-button">n개 더보기</button> */}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MonthlyScheduler;
