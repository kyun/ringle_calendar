import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { COLORS } from '../../constants/schedule';
import { Schedule } from './scheduleSlice';

export const MOCK_SCHEDULE: { [date: string]: Schedule[] } = {
  [dayjs(Date.now()).format('YYYY-MM-DD')]: [
    {
      type: 'schedule',
      date: dayjs(Date.now()).format('YYYY-MM-DD'),
      startAt: 0,
      endAt: 1,
      title: '(SAMPLE) 1',
      background: COLORS[1],
      id: uuidv4(),
    },
    {
      type: 'schedule',
      date: dayjs(Date.now()).format('YYYY-MM-DD'),
      startAt: 0,
      endAt: 1,
      title: '(SAMPLE) 2',
      background: COLORS[1],
      id: uuidv4(),
    },
    {
      type: 'schedule',
      date: dayjs(Date.now()).format('YYYY-MM-DD'),
      startAt: 23,
      endAt: 24,
      title: '(SAMPLE) 3',
      background: COLORS[1],
      id: uuidv4(),
    },
    {
      type: 'schedule',
      date: dayjs(Date.now()).format('YYYY-MM-DD'),
      startAt: 23,
      endAt: 24,
      title: '(SAMPLE) 4',
      background: COLORS[1],
      id: uuidv4(),
    },
  ],
};
export const MOCK_ROUTINE: { [day: string]: Schedule[] } = {
  ['SUN']: [
    {
      type: 'routine',
      id: uuidv4(),
      date: '',
      startAt: 2,
      endAt: 10,
      title: '(HEART)',
      background: COLORS[3],
    },
  ],
  ['MON']: [
    {
      type: 'routine',
      id: uuidv4(),
      date: '',
      startAt: 0,
      endAt: 12,
      title: '(HEART)',
      background: COLORS[3],
    },
  ],
  ['TUE']: [
    {
      type: 'routine',
      id: uuidv4(),
      date: '',
      startAt: 2,
      endAt: 14,
      title: '(HEART)',
      background: COLORS[3],
    },
  ],
  ['WED']: [
    {
      type: 'routine',
      id: uuidv4(),
      date: '',
      startAt: 4,
      endAt: 16,
      title: '(HEART)',
      background: COLORS[3],
    },
  ],
  ['THU']: [
    {
      type: 'routine',
      id: uuidv4(),
      date: '',
      startAt: 2,
      endAt: 14,
      title: '(HEART)',
      background: COLORS[3],
    },
  ],
  ['FRI']: [
    {
      type: 'routine',
      id: uuidv4(),
      date: '',
      startAt: 0,
      endAt: 12,
      title: '(HEART)',
      background: COLORS[3],
    },
  ],
  ['SAT']: [
    {
      type: 'routine',
      id: uuidv4(),
      date: '',
      startAt: 2,
      endAt: 10,
      title: '(HEART)',
      background: COLORS[3],
    },
  ],
};
