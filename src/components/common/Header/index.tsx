import React from 'react';
import IconButton from '../IconButton';
import Profile from '../Profile';
import './Header.scss';
import {
  MdOutlineApps,
  MdOutlineMenu,
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
  MdSearch,
  MdOutlineHelpOutline,
  MdOutlineSettings,
} from 'react-icons/md';
import SimpleButton from '../SimpleButton';
import SwitchButton from '../SwitchButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  nextMonth,
  nextWeek,
  prevMonth,
  prevWeek,
  getCalendar,
  selectToday,
  setViewMode,
} from '../../../features/calendar/calendarSlice';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const Header: React.FC<any> = () => {
  const calendar = useAppSelector(getCalendar);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleToday = () => {
    dispatch(selectToday());
  };
  const handlePrevious = () => {
    if (calendar.viewMode === 'weekly') {
      dispatch(prevWeek());
      navigate(
        `/${calendar.viewMode}/${dayjs(calendar.currentMills)
          .subtract(1, 'week')
          .format('YYYYMMDD')}`
      );
    } else {
      dispatch(prevMonth());
      navigate(
        `/${calendar.viewMode}/${dayjs(calendar.currentMills)
          .subtract(1, 'month')
          .format('YYYYMMDD')}`
      );
    }
  };
  const handleNext = () => {
    if (calendar.viewMode === 'weekly') {
      dispatch(nextWeek());
      navigate(
        `/${calendar.viewMode}/${dayjs(calendar.currentMills)
          .add(1, 'week')
          .format('YYYYMMDD')}`
      );
    } else {
      dispatch(nextMonth());
      navigate(
        `/${calendar.viewMode}/${dayjs(calendar.currentMills)
          .add(1, 'month')
          .format('YYYYMMDD')}`
      );
    }
  };
  const handleSwitchChange = (viewMode: string) => {
    dispatch(setViewMode(viewMode as 'weekly' | 'monthly'));
    navigate(`/${viewMode}/${dayjs(calendar.currentMills).format('YYYYMMDD')}`);
  };
  return (
    <header>
      <div className="leftbox">
        <IconButton color="#4b4b4b">
          <MdOutlineMenu />
        </IconButton>
        <div className="logo-wrapper">
          <img className="logo" src={'./logo_purple.svg'} />
          <span className="title">캘린더</span>
        </div>
      </div>
      <div className="centerbox">
        <div className="datebox">
          <SimpleButton
            onClick={handleToday}
            theme="border"
            style={{ padding: '0 12px', marginRight: 16 }}
          >
            오늘
          </SimpleButton>
          <IconButton onClick={handlePrevious} size={32} color="#4b4b4b">
            <MdOutlineChevronLeft />
          </IconButton>
          <IconButton onClick={handleNext} size={32} color="#4b4b4b">
            <MdOutlineChevronRight />
          </IconButton>
          <span className="title">
            {dayjs(calendar.currentMills).format('YYYY년 MM월')}
          </span>
        </div>
        <div className="toolbox">
          <IconButton size={40} color="#4b4b4b">
            <MdSearch />
          </IconButton>
          <IconButton size={40} color="#4b4b4b">
            <MdOutlineHelpOutline />
          </IconButton>
          <IconButton size={40} color="#4b4b4b">
            <MdOutlineSettings />
          </IconButton>
          <SwitchButton
            id={['weekly', 'monthly']}
            value={calendar.viewMode === 'weekly'}
            style={{ marginLeft: 16 }}
            onChange={handleSwitchChange}
          />
        </div>
      </div>
      <div className="rightbox">
        <IconButton color="#4b4b4b">
          <MdOutlineApps />
        </IconButton>
        <Profile
          src={
            'https://lh3.googleusercontent.com/a-/AOh14GhWGlpOU0NnshRS0AlR4OzB62V85R6nPfRwdGXX=s576-p-rw-no'
          }
        />
      </div>
    </header>
  );
};

export default Header;
