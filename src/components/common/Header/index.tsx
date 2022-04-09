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
  selectCalendar,
  selectToday,
} from '../../../features/calendar/calendarSlice';
import dayjs from 'dayjs';

const Header: React.FC<any> = () => {
  const calendar = useAppSelector(selectCalendar);
  const [isWeek, setIsWeek] = React.useState(true);
  const dispatch = useAppDispatch();

  const handlePrevious = () => {
    if (isWeek) {
      dispatch(prevWeek());
    } else {
      dispatch(prevMonth());
    }
  };
  const handleNext = () => {
    if (isWeek) {
      dispatch(nextWeek());
    } else {
      dispatch(nextMonth());
    }
  };
  React.useEffect(() => {
    console.log(calendar);
  }, [calendar]);
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
            onClick={() => dispatch(selectToday())}
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
            {dayjs(calendar.selected).format('YYYY년 MM월')}
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
            value={isWeek}
            onChange={setIsWeek}
            style={{ marginLeft: 16 }}
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
