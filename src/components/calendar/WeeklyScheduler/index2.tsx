import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectCalendar } from '../../../features/calendar/calendarSlice';

import SchedulerBody from './SchedulerBody';
import SchedulerHeader from './SchedulerHeader';
import './WeeklyScheduler.scss';

const WeeklyScheduler: React.FC<any> = () => {
  const calendar = useAppSelector(selectCalendar);
  const [days, setDays] = React.useState<Dayjs[]>([]);
  const now = React.useMemo(() => dayjs(Date.now()), []);
  React.useEffect(() => {
    const startOfWeek = dayjs(calendar.selected).startOf('week');
    const tw = Array(7)
      .fill(0)
      .map((_, idx) => startOfWeek.add(idx, 'day'));
    setDays(tw);
  }, [calendar.selected]);
  return (
    <div className="WeeklyScheduler">
      <SchedulerHeader days={days} now={now} />
      <SchedulerBody days={days} now={now} />
    </div>
  );
};

export default WeeklyScheduler;