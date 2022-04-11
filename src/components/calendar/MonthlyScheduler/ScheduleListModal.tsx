import React from 'react';
import { Schedule } from '../../../features/schedule/scheduleSlice';
import './ScheduleListModal.scss';

interface Props {
  list: Schedule[];
}
const ScheduleListModal: React.FC<Props> = ({ children, list }) => {
  console.log(list);
  return (
    <>
      <div className="Overlay" />
      <div className="ScheduleListModal">
        {list.map((el, i) => {
          return <p key={i}>{el.title}</p>;
        })}
      </div>
    </>
  );
};

export default ScheduleListModal;
