import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCalendar } from '../../../features/calendar/calendarSlice';
import { getSchedule } from '../../../features/schedule/scheduleSlice';
import './WeeklyScheduler.scss';

const DAY = ['일', '월', '화', '수', '목', '금', '토'];
const HOUR = Array(24)
  .fill(0)
  .map((_, index) => {
    const i = index + 1;
    if (i === 24) {
      return '';
    }
    if (i > 11) {
      if (i === 12) {
        return `오후 ${i}시`;
      }
      return `오후 ${i - 12}시`;
    } else {
      return `오전 ${i}시`;
    }
  });

const HEAD = 164;
const WeeklyScheduler: React.FC<any> = () => {
  const schedule = useAppSelector(getSchedule);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const privateTodoRef = React.useRef<HTMLDivElement[]>([]);
  const calendar = useAppSelector(selectCalendar);
  const dispatch = useAppDispatch();
  const today = React.useMemo(() => dayjs(Date.now()), []);
  const [thisWeek, setThisWeek] = React.useState<Dayjs[]>([]);
  const [nowPosition, setNowPosition] = React.useState('0%');
  let pos = {
    index: -1,
    isActive: false,
    startY: 0,
    endY: 0,
  };
  React.useEffect(() => {
    const diff = today.diff(today.startOf('day'));
    const DAY = 1000 * 60 * 60 * 24;
    setNowPosition(`${(diff / DAY) * 100}%`);
  }, []);

  React.useEffect(() => {
    const w = dayjs(calendar.selected).startOf('week');
    console.log(w);
    const tw = Array(7)
      .fill(0)
      .map((_, idx) => {
        return w.add(idx, 'day');
      });
    setThisWeek(tw);
  }, [calendar.selected]);

  const handleMouseDown = (index: number) => (e: any) => {
    if (!bodyRef.current) return;

    pos.isActive = true;
    pos.index = index;
    const y = e.clientY - HEAD + bodyRef.current.scrollTop;
    pos.startY = Math.trunc(y / 24) * 24;
    privateTodoRef.current[index].style.top = `${pos.startY}px`;
    privateTodoRef.current[index].style.height = `${24}px`;
  };
  const handleMouseMove = (index: number) => (e: any) => {
    if (!bodyRef.current) return;
    if (!pos.isActive) return;
    const y = e.clientY - HEAD + bodyRef.current.scrollTop;
    pos.endY = Math.floor(y / 24) * 24;
    const height = pos.endY - pos.startY;
    const _h = Math.ceil(height / 24) * 24;
    if (_h < 0) {
      privateTodoRef.current[index].style.height = `${Math.abs(_h)}px`;
      privateTodoRef.current[index].style.top = `${pos.endY}px`;
      return;
    }
    privateTodoRef.current[index].style.height = `${_h + 24}px`;
  };
  const handleMouseUp = (index: number) => (e: any) => {
    pos.isActive = false;
    pos.index = -1;
    pos.endY = 0;
    console.log(
      pos.startY,
      pos.endY,
      privateTodoRef.current[index].clientHeight
    );
    if (!bodyRef.current) return;
    privateTodoRef.current[index].style.top = `${0}px`;
    privateTodoRef.current[index].style.height = `${0}px`;
  };
  const handleMouseLeave = (index: number) => (e: any) => {
    //
    pos.isActive = false;
    // privateTodoRef.current[index].style.top = `${0}px`;
    // privateTodoRef.current[index].style.height = `${0}px`;
  };
  return (
    <div className="WeeklyScheduler">
      <div className="head">
        <div className="row">
          <div className="fixed-box" />
          {thisWeek.map((d, i) => {
            return (
              <div
                key={i}
                className={`box ${
                  today.format('YYYYMMDD') === d.format('YYYYMMDD') && '--today'
                }`}
              >
                <span className="day-name">{DAY[i]}</span>
                <span className="date">{d.date()}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="body" ref={bodyRef}>
        <div className="time-indicator">
          {HOUR.map((text, i) => {
            return (
              <div key={i} className="hour-box">
                <span className="time-name">{text}</span>
              </div>
            );
          })}
        </div>
        {thisWeek.map((d, i) => {
          console.log(d.format('YYYY-MM-DD'));
          return (
            <div
              className="box"
              key={i}
              onMouseDown={handleMouseDown(i)}
              onMouseMove={handleMouseMove(i)}
              onMouseUp={handleMouseUp(i)}
              onMouseLeave={handleMouseLeave(i)}
              // onMouseOut={handleMouseUp(i)}
            >
              <div
                ref={(el) => {
                  privateTodoRef.current[i] = el as HTMLDivElement;
                }}
                className="todobox"
              />
              {schedule.schedule[d.format('YYYY-MM-DD')]?.map((el, i) => {
                return (
                  <div className="todobox" key={i}>
                    1
                  </div>
                );
              })}
              {d.format('YYYYMMDD') === today.format('YYYYMMDD') && (
                <span className="now-indicator" style={{ top: nowPosition }} />
              )}
              {HOUR.map((_, i) => {
                return <div key={i} className="hour-box"></div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyScheduler;
