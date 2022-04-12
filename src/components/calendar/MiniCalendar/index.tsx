import React from 'react';
import IconButton from '../../common/IconButton';
import './MiniCalendar.scss';
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getCalendar,
  setCurrentMills,
} from '../../../features/calendar/calendarSlice';
import dayjs, { Dayjs } from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { DAY_NAME } from '../../../constants/schedule';
import { useNavigate } from 'react-router-dom';

dayjs.extend(weekOfYear);

const MiniCalendar: React.FC<any> = () => {
  const calendar = useAppSelector(getCalendar);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const now = React.useMemo(() => dayjs(Date.now()), []);
  // Redux state currentMills 와 함께 local state를 쓰는 이유
  // MiniCalendar의 탐색은 독립적이어야 해서.
  const [_currentMills, _setCurrentMills] = React.useState(dayjs(Date.now()));
  const [rows, setRows] = React.useState<Dayjs[][]>([[]]);
  const generateCalendar = () => {
    const startDay = _currentMills.startOf('month').startOf('week');
    const endDay = _currentMills.endOf('month').endOf('week');
    const startWeek = startDay.week();
    const endWeek = endDay.week() === 1 ? 53 : endDay.week();
    const _calendar: Dayjs[][] = [];
    const bonusWeek = Array(7)
      .fill(0)
      .map((_, idx) => {
        return startDay.week(endWeek).add(1, 'week').add(idx, 'day');
      });

    for (let week = startWeek; week <= endWeek; week++) {
      _calendar.push(
        Array(7)
          .fill(0)
          .map((_, idx) => {
            return startDay.week(week).add(idx, 'day');
          })
      );
    }
    if (_calendar.length < 6) {
      _calendar.push(bonusWeek);
    }
    setRows(_calendar);
  };

  const handlePrevious = () => {
    _setCurrentMills((prev) => {
      return prev.subtract(1, 'month');
    });
  };
  const handleNext = () => {
    _setCurrentMills((prev) => {
      return prev.subtract(1, 'month');
    });
  };
  const handleDate = (d: Dayjs) => {
    _setCurrentMills(d);
    dispatch(setCurrentMills(d.unix() * 1000));
    navigate(`/${calendar.viewMode}/${d.format('YYYYMMDD')}`);
  };

  React.useEffect(() => {
    generateCalendar();
  }, [_currentMills]);

  React.useEffect(() => {
    _setCurrentMills(dayjs(calendar.currentMills));
  }, [calendar.currentMills]);

  return (
    <div className="MiniCalendar">
      <div className="head">
        <span className="title">{_currentMills.format('YYYY년 MM월')}</span>
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
          {DAY_NAME.map((name, i) => {
            return (
              <span key={i} className="item">
                {name}
              </span>
            );
          })}
        </div>
        {rows.map((row, i) => {
          return (
            <div className="row" key={i}>
              {row.map((d, j) => {
                const formatted = d.format('YYYYMMDD');
                const isToday = formatted === now.format('YYYYMMDD');
                const isThisMonth = _currentMills.month() === d.month();
                const isSelected =
                  formatted === dayjs(calendar.currentMills).format('YYYYMMDD');
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
