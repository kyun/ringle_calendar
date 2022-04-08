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

const Header: React.FC<any> = () => {
  const [isWeek, setIsWeek] = React.useState(true);
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
            theme="border"
            style={{ padding: '0 12px', marginRight: 16 }}
          >
            오늘
          </SimpleButton>
          <IconButton size={32} color="#4b4b4b">
            <MdOutlineChevronLeft />
          </IconButton>
          <IconButton size={32} color="#4b4b4b">
            <MdOutlineChevronRight />
          </IconButton>
          <span className="title">2022년 3월</span>
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
