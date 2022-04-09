import dayjs from 'dayjs';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectCalendar, selectDate } from './calendarSlice';

const Calendar: React.FC<any> = () => {
  const calendar = useAppSelector(selectCalendar);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    console.log(
      calendar.selected,
      dayjs(calendar.selected).year(),
      dayjs(calendar.selected).add(1, 'week').unix() * 1000,
      dayjs(calendar.selected).format('YYYY년 MM월')
    );
  }, [calendar]);
  return (
    <div>
      <button onClick={() => dispatch(selectDate(Date.now()))}>gogo</button>
    </div>
  );
};

export default Calendar;
