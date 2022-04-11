import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { RootState, AppThunk } from '../../app/store';

export interface CalendarState {
  selected: number;
  viewMode: 'weekly' | 'monthly';
}

const initialState: CalendarState = {
  selected: Date.now(),
  viewMode: 'weekly',
};

export const calendarSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateViewMode: (state, action: PayloadAction<'monthly' | 'weekly'>) => {
      state.viewMode = action.payload;
    },
    selectDate: (state, action: PayloadAction<number>) => {
      state.selected = action.payload;
    },
    selectToday: (state) => {
      state.selected = Date.now();
    },
    nextWeek: (state) => {
      state.selected = dayjs(state.selected).add(1, 'week').unix() * 1000;
    },
    prevWeek: (state) => {
      state.selected = dayjs(state.selected).subtract(1, 'week').unix() * 1000;
    },
    nextMonth: (state) => {
      state.selected = dayjs(state.selected).add(1, 'month').unix() * 1000;
    },
    prevMonth: (state) => {
      state.selected = dayjs(state.selected).subtract(1, 'month').unix() * 1000;
    },
  },
});
export const {
  selectDate,
  nextWeek,
  prevWeek,
  nextMonth,
  prevMonth,
  selectToday,
  updateViewMode,
} = calendarSlice.actions;

export const selectCalendar = (state: RootState) => state.calendar;

export default calendarSlice.reducer;
