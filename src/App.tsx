import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.scss';
import Calendar from './features/calendar/Calendar';
import Header from './components/common/Header';
import MiniCalendar from './components/calendar/MiniCalendar';
import WeeklyScheduler from './components/calendar/WeeklyScheduler';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="Layout">
        <div className="left-section">
          <MiniCalendar />
        </div>
        <div className="center-section">
          <WeeklyScheduler />
        </div>
        <div className="right-section"></div>
      </div>
    </div>
  );
}

export default App;
