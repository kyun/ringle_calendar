import React from 'react';
import { useAppSelector } from '../app/hooks';
import { COLORS } from '../constants/schedule';
import { getSchedule, Schedule } from '../features/schedule/scheduleSlice';

const INIT_DRAFT: Schedule = {
  type: 'schedule',
  date: '',
  startAt: 0,
  endAt: 0,
  title: '(제목 없음)',
  background: COLORS[0],
  id: '',
};

const useDraft = () => {
  const { defaultBackground } = useAppSelector(getSchedule);
  const [draft, setDraft] = React.useState({
    ...INIT_DRAFT,
    background: defaultBackground,
  });

  const initDraft = React.useCallback(() => {
    setDraft({
      ...INIT_DRAFT,
      background: defaultBackground,
    });
  }, []);

  React.useEffect(() => {
    setDraft((prev) => ({
      ...prev,
      background: defaultBackground,
    }));
  }, [defaultBackground]);
  return { draft, setDraft, initDraft };
};

export default useDraft;
