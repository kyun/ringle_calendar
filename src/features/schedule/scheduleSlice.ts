import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from '../../app/store';
import React from 'react';

export interface Schedule {
  style: React.CSSProperties;
  title: string;
  startAt: number;
  endAt: number;
}
export interface ScheduleState {
  schedule: {
    [date: string]: any[];
  };
  status: 'idle' | 'loading' | 'failed';
}
const initialState: ScheduleState = {
  schedule: {
    '2022-04-10': [
      {
        style: { top: '0px', height: '24px' },
        startAt: 0,
        endAt: 0.5,
        title: 'none',
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
  },
});

export const { addSchedule } = scheduleSlice.actions;

export const getSchedule = (state: RootState) => state.schedule;

export default scheduleSlice.reducer;
