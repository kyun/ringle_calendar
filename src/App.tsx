import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import Calendar from './features/calendar/Calendar';
import Header from './components/common/Header';
import MiniCalendar from './components/calendar/MiniCalendar';
import WeeklyScheduler from './components/calendar/WeeklyScheduler/index2';
import { useAppSelector } from './app/hooks';
import { selectCalendar } from './features/calendar/calendarSlice';

function App() {
  const calendar = useAppSelector(selectCalendar);

  React.useEffect(() => {
    console.log(calendar);
  }, [calendar]);
  return (
    <div className="App">
      <Header />
      <div className="Layout">
        <div className="left-section">
          <MiniCalendar />
        </div>
        <div className="center-section">
          {calendar.viewMode === 'weekly' ? (
            <WeeklyScheduler />
          ) : (
            <div>Monthly!</div>
          )}
        </div>
        <div className="right-section"></div>
      </div>
    </div>
  );
}

export default App;
