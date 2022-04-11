import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { COLORS } from '../../../constants/schedule';
import {
  getSchedule,
  setDefaultBackground,
} from '../../../features/schedule/scheduleSlice';
import './ColorList.scss';

const ColorList: React.FC<any> = () => {
  const { defaultBackground } = useAppSelector(getSchedule);
  const dispatch = useAppDispatch();

  const handleClick = (color: string) => (e: any) => {
    if (color === defaultBackground) return;
    dispatch(setDefaultBackground(color));
  };
  return (
    <div className="ColorList">
      {COLORS.map((color, index) => {
        return (
          <button
            onClick={handleClick(color)}
            key={index}
            className={`ColorButton ${
              defaultBackground === color ? '--selected' : ''
            }`}
            style={{ background: color }}
          />
        );
      })}
    </div>
  );
};

export default ColorList;
