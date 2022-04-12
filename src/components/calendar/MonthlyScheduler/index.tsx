import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { useAppSelector } from '../../../app/hooks';
import {
  COLORS,
  DAY_NAME,
  DAY_NAME_EN,
  TIME_NAME,
} from '../../../constants/schedule';
import { getCalendar } from '../../../features/calendar/calendarSlice';
import {
  getSchedule,
  Schedule,
} from '../../../features/schedule/scheduleSlice';
import IconButton from '../../common/IconButton';
import Portal from '../../common/Portal';
import TodoInputModal from '../../modals/TodoInputModal';
import './MonthlyScheduler.scss';

const INIT_DRAFT: Schedule = {
  type: 'schedule',
  date: '',
  startAt: 0,
  endAt: 1,
  title: '(제목 없음)',
  background: COLORS[0],
  id: '',
};

const MonthlyScheduler: React.FC<any> = () => {
  const calendar = useAppSelector(getCalendar);
  const { schedule, routine, defaultBackground } = useAppSelector(getSchedule);
  const initDraft = React.useMemo(() => {
    return {
      ...INIT_DRAFT,
      background: defaultBackground,
    };
  }, [defaultBackground]);
  const [draft, setDraft] = React.useState(initDraft);
  const [isInputModalOpen, setIsInputModalOpen] = React.useState(false);
  const [isScheduleListModalOpen, setIsScheduleListModalOpen] =
    React.useState(false);
  const [selectedDateInfo, setSelectedDateInfo] = React.useState({
    date: '',
    dayname: '',
  });
  const [clickedDate, setClickedDate] = React.useState('');

  const today = React.useMemo(() => dayjs(Date.now()), []);
  const selected = React.useMemo(
    () => dayjs(calendar.currentMills),
    [calendar.currentMills]
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
  React.useEffect(() => {
    setDraft((prev) => ({ ...prev, background: defaultBackground }));
  }, [defaultBackground]);

  const handleCloseInputModal = () => {
    setDraft(initDraft);
    setIsInputModalOpen(false);
  };
  const handleCloseListModal = () => {
    setIsScheduleListModalOpen(false);
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
    console.log(el);
    setDraft((prev) => ({
      ...el,
    }));
    setIsInputModalOpen(true);
  };
  const handleClickMore =
    ({ dayname, date }: any) =>
    (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setClickedDate(date);
      setSelectedDateInfo({
        date,
        dayname,
      });
      setIsScheduleListModalOpen(true);
    };
  const handleFloatingClose = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setClickedDate('');
  };
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
      {/* {isScheduleListModalOpen && (
        <Portal>
          <ScheduleListModal
            onClose={handleCloseListModal}
            selectedDateInfo={selectedDateInfo}
            list={schedule[clickedDate]}
          />
        </Portal>
      )} */}
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
              const _routine = (routine[DAY_NAME_EN[j]] ?? []).map((data) => ({
                ...data,
                date: d.format('YYYY-MM-DD'),
              }));
              const sorted =
                [...clone, ..._routine]?.sort(
                  (a, b) => a.startAt - b.startAt
                ) ?? [];
              const length = sorted.length;
              const floated = clickedDate === d.format('YYYY-MM-DD');
              return (
                <div
                  className={`box ${isToday ? '--today' : ''} ${
                    isPresent ? '--black' : ''
                  }`}
                  onClick={(e) => {
                    !floated && handleClickDate(d.format('YYYY-MM-DD'))(e);
                  }}
                  key={j}
                >
                  {d.date()}
                  <div className={`schedule-list ${floated && '--floated'}`}>
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
                    {(floated ? sorted : sorted?.slice(0, 3))?.map(
                      (el, index) => {
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
                      }
                    )}
                    {length > 3 && !floated && (
                      <button
                        className="more-button"
                        onClick={handleClickMore({
                          date: d.format('YYYY-MM-DD'),
                          dayname: DAY_NAME[j],
                        })}
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
