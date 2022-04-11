import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { getCalendar } from '../../../features/calendar/calendarSlice';

import SchedulerBody from './SchedulerBody';
import SchedulerHeader from './SchedulerHeader';
import './WeeklyScheduler.scss';

const WeeklyScheduler: React.FC<any> = () => {
  const calendar = useAppSelector(getCalendar);
  const now = React.useMemo(() => dayjs(Date.now()), []);
  const days = React.useMemo(() => {
    const startOfWeek = dayjs(calendar.currentMills).startOf('week');
    const tw = Array(7)
      .fill(0)
      .map((_, idx) => startOfWeek.add(idx, 'day'));
    return tw;
  }, [calendar.currentMills]);

  return (
    <div className="WeeklyScheduler">
      <SchedulerHeader days={days} now={now} />
      <SchedulerBody days={days} now={now} />
    </div>
  );
};

export default WeeklyScheduler;
