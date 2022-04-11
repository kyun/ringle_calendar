import dayjs from 'dayjs';
import React from 'react';
import { MdClose, MdDelete } from 'react-icons/md';
import { useAppDispatch } from '../../app/hooks';
import { selectDate } from '../../features/calendar/calendarSlice';
import {
  addSchedule,
  deleteSchedule,
  Schedule,
  updateSchedule,
} from '../../features/schedule/scheduleSlice';
import IconButton from '../common/IconButton';
import Input from '../common/Input';
import InputPeriod from '../common/Input/InputPeriod';
import SimpleButton from '../common/SimpleButton';

import './TodoInputModal.scss';

interface Props {
  onClose?: () => void;
  index?: number;
  onSubmit?: () => void;
  draft: Schedule;
  setDraft?: (v: any) => void;
  selectedScheduleIndex: number;
}

const TodoInputModal: React.FC<Props> = ({
  children,
  onClose,
  onSubmit,
  draft,
  setDraft,
  selectedScheduleIndex,
}) => {
  const dispatch = useAppDispatch();
  const isAddMode = React.useMemo(() => {
    return selectedScheduleIndex === -1;
  }, [selectedScheduleIndex]);
  const originDraft = React.useMemo(() => draft, []);
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft?.((prev: any) => ({
      ...prev,
      title: e.target.value.length === 0 ? '(제목 없음)' : e.target.value,
    }));
  };

  const handleDelete = () => {
    dispatch(
      deleteSchedule({ date: originDraft.date, index: selectedScheduleIndex })
    );
    onClose?.();
  };
  const handleSubmit = () => {
    if (isAddMode) {
      dispatch(addSchedule({ date: draft.date, data: draft }));
    } else {
      // update를 못 쓰는 이유,, 날짜 변경시 현재 데이터 구조에서 업데이트 불가
      // dispatch(
      //   updateSchedule({
      //     date: draft.date,
      //     data: draft,
      //     index: selectedScheduleIndex,
      //   })
      // );
      dispatch(
        deleteSchedule({ date: originDraft.date, index: selectedScheduleIndex })
      );
      dispatch(addSchedule({ date: draft.date, data: draft }));
    }
    onClose?.();
  };

  const handleStartAt = (v: string) => {
    setDraft?.((prev: any) => ({
      ...prev,
      startAt: Number(v),
      endAt: Number(v) >= draft!.endAt ? Number(v) + 0.5 : prev.endAt,
    }));
  };
  const handleEndAt = (v: string) => {
    setDraft?.((prev: any) => ({
      ...prev,
      endAt: Number(v),
    }));
  };
  const handleDateChange = (e: any) => {
    console.log(e.target.value);
    console.log(dayjs(e.target.value).unix() * 1000);
    const targetMills = dayjs(e.target.value).unix() * 1000;
    dispatch(selectDate(targetMills));
    setDraft?.((prev: any) => ({
      ...prev,
      date: e.target.value,
    }));
  };

  React.useEffect(() => {
    const handleESC = (e: any) => {
      console.log(e.key);
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleESC);

    return () => {
      window.removeEventListener('keydown', handleESC);
    };
  }, []);

  return (
    <>
      <div className="Overlay" onClick={onClose} />
      <div className="TodoInputModal">
        <div className="head">
          <IconButton onClick={onClose} size={28}>
            <MdClose />
          </IconButton>
        </div>
        <div className="content">
          <div className="row">
            <Input defaultValue={draft.title} onChange={handleTitle} />
          </div>
          <div className="row">
            <input
              type="date"
              value={draft?.date}
              onChange={handleDateChange}
              required
              onKeyDown={(e: any) => e.preventDefault()}
            />
            <InputPeriod
              startAt={draft?.startAt}
              endAt={draft?.endAt}
              onStartAtChange={handleStartAt}
              onEndAtChange={handleEndAt}
            />
          </div>
          <div className="row">
            <select>
              <option>반복 안함</option>
              <option>매일</option>
              <option>매주 n요일</option>
            </select>
          </div>
          <div className="row">
            <p style={{ fontSize: 12, color: '#4b4b4b' }}>
              ESC로도 닫을 수 있습니다.
            </p>
          </div>
        </div>
        <div className="footer">
          {!isAddMode && (
            <SimpleButton onClick={handleDelete} theme="border">
              Delete
            </SimpleButton>
          )}
          <SimpleButton theme="primary" onClick={handleSubmit}>
            {isAddMode ? 'Submit' : 'Update'}
          </SimpleButton>
        </div>
      </div>
    </>
  );
};

export default TodoInputModal;
