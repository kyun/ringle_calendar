import React from 'react';
import { MdClose } from 'react-icons/md';
import { TIME_NAME } from '../../../constants/schedule';
import { Schedule } from '../../../features/schedule/scheduleSlice';
import IconButton from '../../common/IconButton';
import './ScheduleListModal.scss';

interface Props {
  onClose: () => void;
  list: Schedule[];
  selectedDateInfo: {
    date: string;
    dayname: string;
  };
}
const ScheduleListModal: React.FC<Props> = ({
  children,
  list,
  selectedDateInfo,
  onClose,
}) => {
  console.log(list);
  return (
    <>
      <div className="Overlay" />
      <div className="ScheduleListModal">
        <div className="head">
          <IconButton onClick={onClose}>
            <MdClose />
          </IconButton>
        </div>
        <div className="content">
          <h1>
            {selectedDateInfo.date} {selectedDateInfo.dayname}
          </h1>
          <div className="row">
            {list?.map((el, i) => {
              return (
                <div className="saved_item" key={i}>
                  {TIME_NAME[el.startAt * 2]} -{el.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ScheduleListModal;
