import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { DAY_NAME } from '../../../constants/schedule';
import {
  nextMonth,
  prevMonth,
  selectCalendar,
} from '../../../features/calendar/calendarSlice';
import './MonthlyScheduler.scss';

const MonthlyScheduler: React.FC<any> = () => {
  const calendar = useAppSelector(selectCalendar);
  const dispatch = useAppDispatch();

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

  React.useEffect(() => {
    const debounce = (fn: Function, ms = 300) => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
      };
    };
    const handleScroll = (e: any) => {
      if (!pos.isScrollable) return;
      const isScrollingDown = Math.sign(e.wheelDeltaY);
      console.log(isScrollingDown);
      setInterval(() => {
        pos.isScrollable = !pos.isScrollable;
      }, 500);
      pos.isScrollable = false;
      if (isScrollingDown) {
        dispatch(prevMonth());
      } else {
        dispatch(nextMonth());
      }
    };
    const wrap = (e: any) => {
      debounce(handleScroll, 400)(e);
    };
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="MonthlyScheduler">
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
                  key={j}
                >
                  {d.date()}
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
