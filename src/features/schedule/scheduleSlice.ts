import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { RootState, AppThunk } from '../../app/store';
import React from 'react';
import dayjs from 'dayjs';

export interface Schedule {
  title: string;
  startAt: number;
  endAt: number;
  date: string;
  background: string;
  id: string;
}
export interface ScheduleState {
  schedule: {
    [date: string]: Schedule[];
  };
  routine: {
    [day: string]: Schedule[];
  };
}
const initialState: ScheduleState = {
  schedule: {
    [dayjs(Date.now()).format('YYYY-MM-DD')]: [
      {
        date: dayjs(Date.now()).format('YYYY-MM-DD'),
        startAt: 0,
        endAt: 0.5,
        title: '(SAMPLE)',
        background: '#f8d548',
        id: uuidv4(),
      },
    ],
  },
  routine: {
    // ['MON']: [
    //   {
    //     date: '',
    //     startAt: 1,
    //     endAt: 1.5,
    //     title: '(SAMPLE)',
    //     background: '#f8d548',
    //   },
    // ],
  },
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
      if (state.schedule?.[day]) {
        state.schedule[day] = state.schedule[day].concat(data);
      } else {
        state.schedule[day] = [data];
      }
    },
    deleteRoutine: (
      state,
      action: PayloadAction<{ day: string; index: number }>
    ) => {
      //
      const { day, index } = action.payload;
      state.schedule[day] = state.schedule[day].filter((el, i) => {
        return i !== index;
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
  },
});

export const { addRoutine, addSchedule, updateSchedule, deleteSchedule } =
  scheduleSlice.actions;

export const getSchedule = (state: RootState) => state.schedule;

export default scheduleSlice.reducer;
