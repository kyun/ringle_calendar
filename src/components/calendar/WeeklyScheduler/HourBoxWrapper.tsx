import React from 'react';
import { HOUR_NAME } from '../../../constants/schedule';
import './SchedulerBody.scss';

const HourBoxWrapper: React.FC = () => {
  return (
    <>
      {HOUR_NAME.map((_, index) => (
        <div key={index} className="hour-box" />
      ))}
    </>
  );
};
export default React.memo(HourBoxWrapper);
