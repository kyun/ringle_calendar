import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { RootState } from '../../app/store';
import { MOCK_SCHEDULE, MOCK_ROUTINE } from './scheduleMock';

export interface Schedule {
  type: 'routine' | 'schedule';
  title: string;
  startAt: number;
  endAt: number;
  date: string;
  background: string;
  id: string;
}
export interface ScheduleState {
  defaultBackground: string;
  schedule: {
    [date: string]: Schedule[];
  };
  routine: {
    [day: string]: Schedule[];
  };
}
const initialState: ScheduleState = {
  defaultBackground: '#7d5df5',
  schedule: MOCK_SCHEDULE,
  routine: MOCK_ROUTINE,
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addRoutine: (
      state,
      action: PayloadAction<{ day: string; data: Schedule }>
    ) => {
      //
      const { day, data } = action.payload;
      if (state.routine?.[day]) {
        state.routine[day] = state.routine[day].concat({
          ...data,
          id: uuidv4(),
        });
      } else {
        state.routine[day] = [{ ...data, id: uuidv4() }];
      }
    },
    deleteRoutine: (
      state,
      action: PayloadAction<{ day: string; id: string }>
    ) => {
      //
      const { day, id } = action.payload;
      state.routine[day] = state.routine[day]?.filter((el) => {
        return el.id !== id;
      });
    },
    addSchedule: (
      state,
      action: PayloadAction<{ date: string; data: Schedule }>
    ) => {
      const { date, data } = action.payload;
      if (state.schedule?.[date]) {
        const clone = state.schedule[date].concat({ ...data, id: uuidv4() });
        const sorted = clone.sort((a, b) => a.startAt - b.startAt);
        state.schedule[date] = sorted;
        // state.schedule[date] = state.schedule[date].concat({
        //   ...data,
        //   id: uuidv4(),
        // });
      } else {
        state.schedule[date] = [{ ...data, id: uuidv4() }];
      }
    },
    updateSchedule: (
      state,
      action: PayloadAction<{ date: string; data: any; index: number }>
    ) => {
      //
      const { date, data, index } = action.payload;
      state.schedule[date] = state.schedule[date].map((el, i) => {
        if (i === index) {
          return data;
        }
        return el;
      });
    },
    deleteSchedule: (
      state,
      action: PayloadAction<{ date: string; id: string }>
    ) => {
      //
      const { date, id } = action.payload;
      state.schedule[date] = state.schedule[date].filter((el) => {
        return el.id !== id;
      });
    },
    setDefaultBackground: (state, action: PayloadAction<string>) => {
      state.defaultBackground = action.payload;
    },
  },
});

export const {
  addRoutine,
  deleteRoutine,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  setDefaultBackground,
} = scheduleSlice.actions;

export const getSchedule = (state: RootState) => state.schedule;

export default scheduleSlice.reducer;
