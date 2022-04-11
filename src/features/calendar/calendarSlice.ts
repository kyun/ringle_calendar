import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { RootState } from '../../app/store';

export interface CalendarState {
  currentMills: number;
  viewMode: 'weekly' | 'monthly';
}

const initialState: CalendarState = {
  currentMills: Date.now(),
  viewMode: 'weekly',
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<'monthly' | 'weekly'>) => {
      state.viewMode = action.payload;
    },
    setCurrentMills: (state, action: PayloadAction<number>) => {
      state.currentMills = action.payload;
    },
    selectToday: (state) => {
      state.currentMills = Date.now();
    },
    nextWeek: (state) => {
      state.currentMills =
        dayjs(state.currentMills).add(1, 'week').unix() * 1000;
    },
    prevWeek: (state) => {
      state.currentMills =
        dayjs(state.currentMills).subtract(1, 'week').unix() * 1000;
    },
    nextMonth: (state) => {
      state.currentMills =
        dayjs(state.currentMills).add(1, 'month').unix() * 1000;
    },
    prevMonth: (state) => {
      state.currentMills =
        dayjs(state.currentMills).subtract(1, 'month').unix() * 1000;
    },
  },
});
export const {
  setCurrentMills,
  nextWeek,
  prevWeek,
  nextMonth,
  prevMonth,
  selectToday,
  setViewMode,
} = calendarSlice.actions;

export const getCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
