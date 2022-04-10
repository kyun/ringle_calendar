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

  status: 'idle',
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addSchedule: (
      state,
      action: PayloadAction<{ date: string; data: any }>
    ) => {
      console.log(action.payload.date, action.payload.data);
      console.log(state.schedule[action.payload.date]);
      if (state.schedule?.[action.payload.date]) {
        state.schedule[action.payload.date] = state.schedule[
          action.payload.date
        ].concat(action.payload.data);
      } else {
        state.schedule[action.payload.date] = [action.payload.data];
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

export const { addSchedule, updateSchedule, deleteSchedule } =
  scheduleSlice.actions;

export const getSchedule = (state: RootState) => state.schedule;

export default scheduleSlice.reducer;
