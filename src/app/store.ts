import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import calendarReducer from '../features/calendar/calendarSlice';
import scheduleReducer from '../features/schedule/scheduleSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
