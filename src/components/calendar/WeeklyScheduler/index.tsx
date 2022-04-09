import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCalendar } from '../../../features/calendar/calendarSlice';
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
const WeeklyScheduler: React.FC<any> = () => {
  const calendar = useAppSelector(selectCalendar);
  const dispatch = useAppDispatch();
  const today = React.useMemo(() => dayjs(Date.now()), []);
  const [thisWeek, setThisWeek] = React.useState<Dayjs[]>([]);
  const [nowPosition, setNowPosition] = React.useState('0%');
  let pos = {
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

  const handleMouseDown = (e: any) => {
    console.log(e);
    pos.isActive = true;
    pos.startY = e.clientY;
  };
  const handleMouseMove = (e: any) => {
    if (!pos.isActive) return;
    pos.endY = e.clientY;
  };
  const handleMouseUp = (e: any) => {
    pos.isActive = false;
    pos.endY = e.clientY;
    console.log(`e`, e.nativeEvent, e.clientY);
    console.log(pos);
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
      <div className="body">
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
          return (
            <div
              className="box"
              key={i}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
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
