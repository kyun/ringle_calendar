import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calendarReducer from '../features/calendar/calendarSlice';
import scheduleReducer from '../features/schedule/scheduleSlice';

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    schedule: scheduleReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
