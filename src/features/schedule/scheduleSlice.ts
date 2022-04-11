import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from '../../app/store';
import React from 'react';
import dayjs from 'dayjs';

export interface Schedule {
  title: string;
  startAt: number;
  endAt: number;
  date: string;
  background: string;
}
export interface ScheduleState {
  schedule: {
    [date: string]: Schedule[];
  };
  routine: {
    [day: string]: Schedule[];
  };
  status: 'idle' | 'loading' | 'failed';
}
const initialState: ScheduleState = {
  schedule: {
    [dayjs(Date.now()).format('YYYY-MM-DD')]: [
      {
        date: dayjs(Date.now()).format('YYYY-MM-DD'),
        startAt: 0,
        endAt: 0.5,
        title: '(SAMPLE)',
        background: '#FECA00',
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
    //     background: '#FECA00',
    //   },
    // ],
  },

  status: 'idle',
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
        state.schedule[date] = state.schedule[date].concat(data);
      } else {
        state.schedule[date] = [data];
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
      action: PayloadAction<{ date: string; index: number }>
    ) => {
      //
      const { date, index } = action.payload;
      state.schedule[date] = state.schedule[date].filter((el, i) => {
        return i !== index;
      });
    },
  },
});

export const { addRoutine, addSchedule, updateSchedule, deleteSchedule } =
  scheduleSlice.actions;

export const getSchedule = (state: RootState) => state.schedule;

export default scheduleSlice.reducer;
