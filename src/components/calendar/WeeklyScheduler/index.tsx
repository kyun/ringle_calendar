import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCalendar } from '../../../features/calendar/calendarSlice';
import {
  addSchedule,
  getSchedule,
} from '../../../features/schedule/scheduleSlice';
import Portal from '../../common/Portal';
import TodoInputModal from '../../modals/TodoInputModal';
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
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  let pos = {
    index: -1,
    isActive: false,
    startY: 0,
    height: 0,
    endY: 0, // NOTE: deprecated..
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
    pos.height = 24;
    const y = e.clientY - HEAD + bodyRef.current.scrollTop;
    pos.startY = Math.trunc(y / 24) * 24;
    privateTodoRef.current[index].style.top = `${pos.startY}px`;
    privateTodoRef.current[index].style.height = `${24}px`;
    document.body.style.cursor = 'crosshair';
  };
  const handleMouseMove = (e: any) => {
    if (!bodyRef.current) return;
    if (!pos.isActive) return;
    const { index } = pos;
    // 실제 좌표
    const y = e.clientY - HEAD + bodyRef.current.scrollTop;

    pos.endY = Math.floor(y / 24) * 24;
    const height = pos.endY - pos.startY;
    const _h = Math.ceil(height / 24) * 24;
    pos.height = _h < 0 ? Math.abs(_h) : _h + 24;
    if (_h < 0) {
      privateTodoRef.current[index].style.height = `${pos.height}px`;
      privateTodoRef.current[index].style.top = `${pos.endY}px`;
      return;
    }
    privateTodoRef.current[index].style.height = `${pos.height}px`;
  };
  const handleMouseUp = (e: any) => {
    const { index } = pos;
    console.log(index, 'mouseup', e.clientY);

    console.log(
      pos.startY,
      pos.endY
      // privateTodoRef.current[index]?.clientHeight
    );
    console.log(privateTodoRef.current[0].style, index);

    pos.index = -1;
    document.body.style.cursor = 'unset';
    console.log(thisWeek[index].format('YYYY-MM-DD'));
    console.log(pos.startY / 48, (pos.startY + pos.height) / 48);
    dispatch(
      addSchedule({
        date: thisWeek[index].format('YYYY-MM-DD'),
        data: {
          style: {
            top: privateTodoRef.current[index].style.top,
            height: privateTodoRef.current[index].style.height,
          },
          startAt: pos.startY / 48,
          endAt: (pos.startY + pos.height) / 48,
          title: '123',
        },
      })
    );

    pos.isActive = false;
    pos.endY = 0;
    privateTodoRef.current[index].style.top = `${0}px`;
    privateTodoRef.current[index].style.height = `${0}px`;
  };

  React.useEffect(() => {
    console.log(schedule.schedule);
  }, [schedule.schedule]);
  return (
    <div className="WeeklyScheduler">
      <Portal>
        <TodoInputModal />
      </Portal>
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
          return (
            <div
              className="box"
              key={i}
              onMouseDown={handleMouseDown(i)}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <div
                ref={(el) => {
                  privateTodoRef.current[i] = el as HTMLDivElement;
                }}
                className="todobox"
              />
              {schedule.schedule[d.format('YYYY-MM-DD')]?.map((el, i) => {
                return (
                  <div
                    className={`saved-todobox ${
                      el.endAt - el.startAt === 0.5 && '--row'
                    }`}
                    key={i}
                    style={el.style}
                  >
                    <span className="title">{el.title}</span>
                    <span className="period">
                      {el.startAt} - {el.endAt}
                    </span>
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
