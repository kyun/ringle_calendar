import React from 'react';
import './App.scss';
import Header from './components/common/Header';
import MiniCalendar from './components/calendar/MiniCalendar';
import WeeklyScheduler from './components/calendar/WeeklyScheduler/index2';
import { useAppSelector } from './app/hooks';
import { getCalendar } from './features/calendar/calendarSlice';
import MonthlyScheduler from './components/calendar/MonthlyScheduler';
import IconButton from './components/common/IconButton';
import { Md10K, Md360, MdRadar, MdSafetyDivider } from 'react-icons/md';

function App() {
  const calendar = useAppSelector(getCalendar);
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
            <MonthlyScheduler />
          )}
        </div>
        <div className="right-section">
          <IconButton>
            <Md10K />
          </IconButton>
          <IconButton>
            <Md360 />
          </IconButton>
          <IconButton>
            <MdSafetyDivider />
          </IconButton>
          <IconButton>
            <MdRadar />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default App;
