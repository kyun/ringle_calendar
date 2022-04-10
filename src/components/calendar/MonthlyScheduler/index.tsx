import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { DAY_NAME } from '../../../constants/schedule';
import {
  nextMonth,
  prevMonth,
  selectCalendar,
} from '../../../features/calendar/calendarSlice';
import { getSchedule } from '../../../features/schedule/scheduleSlice';
import Portal from '../../common/Portal';
import TodoInputModal from '../../modals/TodoInputModal';
import './MonthlyScheduler.scss';

const INIT_DRAFT = {
  date: '',
  startAt: 0,
  endAt: 1.5,
  title: '(제목 없음)',
  background: '#FECA00',
};
const MonthlyScheduler: React.FC<any> = () => {
  const calendar = useAppSelector(selectCalendar);
  const { schedule } = useAppSelector(getSchedule);

  const dispatch = useAppDispatch();
  const [draft, setDraft] = React.useState(INIT_DRAFT);

  const [isInputModalOpen, setIsInputModalOpen] = React.useState(false);

  const today = React.useMemo(() => dayjs(Date.now()), []);
  const [selected, setSelected] = React.useState(dayjs(Date.now()));
  const [rows, setRows] = React.useState<Dayjs[][]>([[]]);
  let pos = {
    isScrollable: true,
  };

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

  React.useEffect(() => {
    setSelected(dayjs(calendar.selected));
  }, [calendar.selected]);

  const handleClickDate = (date: string) => {
    setDraft((prev) => ({
      ...prev,
      date,
    }));
    setIsInputModalOpen(true);
  };
  return (
    <div className="MonthlyScheduler">
      {isInputModalOpen && (
        <Portal>
          <TodoInputModal
            draft={draft}
            selectedScheduleIndex={-1}
            onClose={() => setIsInputModalOpen(false)}
          />
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
              return (
                <div
                  className={`box ${isToday ? '--today' : ''} ${
                    isPresent ? '--black' : ''
                  }`}
                  onClick={() => handleClickDate(d.format('YYYY-MM-DD'))}
                  key={j}
                >
                  {d.date()}
                  <div className="schedule-list">
                    {schedule?.[d.format('YYYY-MM-DD')]?.map((el, index) => {
                      return (
                        <div className="schedule-item" key={index}>
                          {el.title}
                        </div>
                      );
                    })}
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
