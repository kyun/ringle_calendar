import React from 'react';
import IconButton from '../../common/IconButton';
import './MiniCalendar.scss';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectCalendar,
  selectDate,
} from '../../../features/calendar/calendarSlice';
import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { DAY_NAME } from '../../../constants/schedule';

dayjs.extend(weekOfYear);

const MiniCalendar: React.FC<any> = () => {
  const calendar = useAppSelector(selectCalendar);
  const dispatch = useAppDispatch();
  const today = React.useMemo(() => dayjs(Date.now()), []);
  const [selected, setSelected] = React.useState(dayjs(Date.now()));
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

  const handlePrevious = () => {
    setSelected((prev) => {
      return prev.subtract(1, 'month');
    });
  };
  const handleNext = () => {
    setSelected((prev) => {
      return prev.subtract(1, 'month');
    });
  };
  const handleDate = (d: Dayjs) => {
    setSelected(d);
    dispatch(selectDate(d.unix() * 1000));
  };

  React.useEffect(() => {
    generate();
  }, [selected]);

  React.useEffect(() => {
    setSelected(dayjs(calendar.selected));
  }, [calendar.selected]);

  return (
    <div className="MiniCalendar">
      <div className="head">
        <span className="title">{selected.format('YYYY년 MM월')}</span>
        <div className="toolbox">
          <IconButton size={24} onClick={handlePrevious}>
            <MdOutlineChevronLeft />
          </IconButton>
          <IconButton size={24} onClick={handleNext}>
            <MdOutlineChevronRight />
          </IconButton>
        </div>
      </div>
      <div className="body">
        <div className="row">
          {DAY_NAME.map((d, i) => {
            return (
              <span key={i} className="item">
                {d}
              </span>
            );
          })}
        </div>
        {rows.map((row, i) => {
          return (
            <div className="row" key={i}>
              {row.map((d, j) => {
                const isToday =
                  d.format('YYYYMMDD') === today.format('YYYYMMDD');
                const isThisMonth = selected.month() === d.month();
                const isSelected =
                  d.format('YYYYMMDD') ===
                  dayjs(calendar.selected).format('YYYYMMDD');
                return (
                  <span
                    key={j}
                    className={`item `}
                    onClick={() => handleDate(d)}
                  >
                    <span
                      className={`box ${isThisMonth ? '--black' : ''} ${
                        isToday ? '--today' : ''
                      } ${isSelected ? '--selected' : ''}`}
                    >
                      {d.date()}
                    </span>
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MiniCalendar;
