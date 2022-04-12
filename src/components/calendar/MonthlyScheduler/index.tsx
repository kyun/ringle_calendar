import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { useAppSelector } from '../../../app/hooks';
import { DAY_NAME, DAY_NAME_EN, TIME_NAME } from '../../../constants/schedule';
import { getCalendar } from '../../../features/calendar/calendarSlice';
import {
  getSchedule,
  Schedule,
} from '../../../features/schedule/scheduleSlice';
import useDraft from '../../../hooks/useDraft';
import IconButton from '../../common/IconButton';
import Portal from '../../common/Portal';
import TodoInputModal from '../../modals/TodoInputModal';
import './MonthlyScheduler.scss';

const MonthlyScheduler: React.FC<any> = () => {
  const calendar = useAppSelector(getCalendar);
  const { schedule, routine } = useAppSelector(getSchedule);
  const { draft, setDraft, initDraft } = useDraft();
  const [isInputModalOpen, setIsInputModalOpen] = React.useState(false);
  const [clickedDate, setClickedDate] = React.useState('');
  const today = React.useMemo(() => dayjs(Date.now()), []);
  const selectedDate = React.useMemo(
    () => dayjs(calendar.currentMills),
    [calendar.currentMills]
  );
  const [rows, setRows] = React.useState<Dayjs[][]>([[]]);
  const generateCalendar = () => {
    const startDay = selectedDate.startOf('month').startOf('week');
    const endDay = selectedDate.endOf('month').endOf('week');
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
    generateCalendar();
  }, [selectedDate]);

  const handleCloseInputModal = () => {
    initDraft();
    setIsInputModalOpen(false);
  };

  const handleClickDate = (date: string) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDraft((prev) => ({
      ...prev,
      date,
    }));
    setIsInputModalOpen(true);
  };
  const handleItemClick = (el: Schedule) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDraft(el);
    setIsInputModalOpen(true);
  };
  const handleClickMore = (date: string) => (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setClickedDate(date);
  };
  const handleFloatingClose = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setClickedDate('');
  };

  React.useEffect(() => {
    if (clickedDate === '') return;
    const handleESC = (e: any) => {
      if (e.key === 'Escape') {
        setClickedDate('');
      }
    };
    window.addEventListener('keydown', handleESC);
    return () => {
      window.removeEventListener('keydown', handleESC);
    };
  }, [clickedDate]);

  return (
    <div className="MonthlyScheduler">
      {isInputModalOpen && (
        <Portal>
          <TodoInputModal
            draft={draft}
            setDraft={setDraft}
            onClose={handleCloseInputModal}
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
              const isPresent = selectedDate.month() === d.month();
              const _routine = (routine[DAY_NAME_EN[j]] ?? []).map((data) => ({
                ...data,
                date: d.format('YYYY-MM-DD'),
              }));
              const sortedSchedule = [
                ...(schedule?.[d.format('YYYY-MM-DD')] ?? []),
                ..._routine,
              ].sort((a, b) => a.startAt - b.startAt);
              const length = sortedSchedule.length;
              const floated = clickedDate === d.format('YYYY-MM-DD');
              return (
                <div
                  className={`box ${isToday ? '--today' : ''} ${
                    isPresent ? '--black' : ''
                  } ${floated ? '--overflow-allowed' : ''}`}
                  onClick={(e) => {
                    !floated && handleClickDate(d.format('YYYY-MM-DD'))(e);
                  }}
                  key={j}
                >
                  {d.date()}
                  <div className={`schedule-list ${floated && '--floated'}`}>
                    {/* Floated... */}
                    {floated && (
                      <div className="head">
                        <Portal>
                          <div
                            className="Overlay"
                            style={{ zIndex: 30 }}
                            onClick={handleFloatingClose}
                          />
                        </Portal>
                        <span style={{ width: 28 }} />
                        <span className="date">
                          {d.date()} ({DAY_NAME[d.day()]})
                        </span>
                        <IconButton onClick={handleFloatingClose} size={28}>
                          <MdClose />
                        </IconButton>
                      </div>
                    )}
                    {/* Draft */}
                    {draft &&
                      draft.date === d.format('YYYY-MM-DD') &&
                      draft.id === '' && (
                        <div className="schedule-item --draft">
                          <span
                            className="bullet"
                            style={{ background: draft.background }}
                          />
                          <span className="text">
                            {TIME_NAME[draft.startAt * 2]} - {draft.title}
                          </span>
                        </div>
                      )}
                    {(floated
                      ? sortedSchedule
                      : sortedSchedule?.slice(0, 3)
                    )?.map((el, index) => {
                      return (
                        <div
                          className="schedule-item"
                          key={index}
                          onClick={handleItemClick(el)}
                        >
                          <span
                            className="bullet"
                            style={{ background: el.background }}
                          />
                          <span className="text">
                            {TIME_NAME[el.startAt * 2]} - {el.title}
                          </span>
                        </div>
                      );
                    })}
                    {length > 3 && !floated && (
                      <button
                        className="more-button"
                        onClick={handleClickMore(d.format('YYYY-MM-DD'))}
                      >
                        {length - 3}개 더보기
                      </button>
                    )}
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
