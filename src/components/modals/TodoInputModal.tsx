/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { useAppDispatch } from '../../app/hooks';
import { COLORS, DAY_NAME, DAY_NAME_EN } from '../../constants/schedule';
import { setCurrentMills } from '../../features/calendar/calendarSlice';
import {
  addRoutine,
  deleteRoutine,
  addSchedule,
  deleteSchedule,
  Schedule,
} from '../../features/schedule/scheduleSlice';
import ColorBox from '../common/ColorBox';
import IconButton from '../common/IconButton';
import Input from '../common/Input';
import InputPeriod from '../common/Input/InputPeriod';
import SimpleButton from '../common/SimpleButton';

import './TodoInputModal.scss';

interface Props {
  onClose: () => void;
  draft: Schedule;
  setDraft: (v: any) => void;
}

const TodoInputModal: React.FC<Props> = ({ onClose, draft, setDraft }) => {
  const dispatch = useAppDispatch();

  const isAddMode = React.useMemo(() => {
    return draft.id === '';
  }, [draft]);
  const originDraft = React.useMemo(() => draft, []);
  const originDay = React.useMemo(
    () => DAY_NAME_EN[dayjs(draft.date).day()],
    []
  );
  const day = React.useMemo(
    () => DAY_NAME_EN[dayjs(draft.date).day()],
    [draft]
  );
  const background = React.useMemo(() => draft.background, [draft]);
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft?.((prev: any) => ({
      ...prev,
      title: e.target.value.length === 0 ? '(제목 없음)' : e.target.value,
    }));
  };

  const handleDelete = () => {
    if (draft.type === 'schedule') {
      dispatch(deleteSchedule({ date: originDraft.date, id: draft.id }));
    } else {
      dispatch(deleteRoutine({ day: originDay, id: draft.id }));
    }
    onClose?.();
  };
  const handleRoutineSubmit = () => {
    if (isAddMode) {
      dispatch(addRoutine({ day, data: draft }));
    } else {
      dispatch(deleteRoutine({ day: originDay, id: draft.id }));
      dispatch(addRoutine({ day, data: draft }));
    }
    onClose?.();
  };
  const handleSubmit = () => {
    if (isAddMode) {
      dispatch(addSchedule({ date: draft.date, data: draft }));
    } else {
      // update를 못 쓰는 이유,, 날짜 변경시 현재 데이터 구조에서 업데이트 불가 Date를 key로 하는 해쉬맵구조라서.
      // dispatch(
      //   updateSchedule({
      //     date: draft.date,
      //     data: draft,
      //     index: selectedScheduleIndex,
      //   })
      // );
      dispatch(deleteSchedule({ date: originDraft.date, id: draft.id }));
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
    dispatch(setCurrentMills(targetMills));
    setDraft?.((prev: any) => ({
      ...prev,
      date: e.target.value,
    }));
  };

  React.useEffect(() => {
    console.log(draft);
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

  const handleRoutine = (e: any) => {
    setDraft?.((prev: any) => ({
      ...prev,
      type: e.target.value,
    }));
  };
  const handleColor = (color: string) => {
    setDraft?.((prev: any) => ({
      ...prev,
      background: color,
    }));
  };
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
            <select
              className="plain-select"
              onChange={handleRoutine}
              value={draft.type}
              disabled={!isAddMode}
            >
              <option value="schedule">반복 안함</option>
              <option value="routine">
                매주 {DAY_NAME[dayjs(draft.date).day()]}요일
              </option>
            </select>
          </div>
          <div className="row">
            <ColorBox
              colors={COLORS}
              value={background}
              onChange={handleColor}
            />
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
          <SimpleButton
            theme="primary"
            onClick={() =>
              draft.type === 'schedule' ? handleSubmit() : handleRoutineSubmit()
            }
          >
            {isAddMode ? 'Submit' : 'Update'}
          </SimpleButton>
        </div>
      </div>
    </>
  );
};

export default TodoInputModal;
