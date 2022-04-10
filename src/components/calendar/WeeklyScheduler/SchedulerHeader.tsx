import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { DAY_NAME } from '../../../constants/schedule';
import { selectCalendar } from '../../../features/calendar/calendarSlice';
import './SchedulerHeader.scss';

interface Props {
  //
  days: Dayjs[];
  now: Dayjs;
}

const SchedulerHeader: React.FC<Props> = ({ days, now }) => {
  return (
    <div className="SchedulerHeader">
      <div className="row">
        <div className="fixed-mock-box" />
        {days.map((day, index) => {
          const isToday = now.format('YYYYMMDD') === day.format('YYYYMMDD');
          return (
            <div className={`box ${isToday ? '--today' : ''}`} key={index}>
              <span className="name">{DAY_NAME[index]}</span>
              <span className="date">{day.date()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SchedulerHeader;
