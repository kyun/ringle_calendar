import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import {
  COLORS,
  DAY_NAME_EN,
  HALF_HOUR_HEIGHT,
  HEADER_HEIGHT,
  HOUR_HEIGHT,
  SCHEDULER_HEIGHT,
  TIME_NAME,
} from '../../../constants/schedule';
import {
  getSchedule,
  Schedule,
} from '../../../features/schedule/scheduleSlice';
import { hexToRgba } from '../../../utils/color';
import { deduplicator, generateStyle } from '../../../utils/schedule';
import Portal from '../../common/Portal';
import TodoInputModal from '../../modals/TodoInputModal';
import './SchedulerBody.scss';

interface Props {
  //
  days: Dayjs[];
  now: Dayjs;
}
const _HOUR_NAME = Array(24)
  .fill(0)
  .map((_, index) => {
    const i = index + 1;
    if (i === 24) {
      return '';
    }
    if (i > 11) {
      if (i === 12) {
        return `오후 ${i}시`;
      }
      return `오후 ${i - 12}시`;
    } else {
      return `오전 ${i}시`;
    }
  });

const INIT_DRAFT: Schedule = {
  type: 'schedule',
  date: '',
  startAt: 0,
  endAt: 0,
  title: '(제목 없음)',
  background: COLORS[0],
  id: '',
};
const SchedulerBody: React.FC<Props> = ({ days, now }) => {
  const { schedule, routine, defaultBackground } = useAppSelector(getSchedule);
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const resizableDivRefs = React.useRef<HTMLDivElement[]>([]);
  const initDraft = React.useMemo(() => {
    return {
      ...INIT_DRAFT,
      background: defaultBackground,
    };
  }, [defaultBackground]);
  const [isInputModalOpen, setIsInputModalOpen] = React.useState(false);
  const [selectedScheduleInfo, setSelectedScheduleInfo] = React.useState({
    targetId: '',
    date: '',
  });
  const [draft, setDraft] = React.useState(initDraft);

  const nowBarStyleTop = React.useMemo(() => {
    const diff = now.diff(now.startOf('day'));
    const DAY_MILLS = 1000 * 60 * 60 * 24;
    return `${(diff / DAY_MILLS) * 100}%`;
  }, [now]);

  let pos = {
    index: -1,
    isActive: false,
    startAt: 0,
    endAt: 0,
  };

  const handleMouseDown =
    (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      if (!bodyRef.current) return;
      pos.index = index;
      pos.isActive = true;
      const clientY =
        e.clientY -
        HEADER_HEIGHT -
        SCHEDULER_HEIGHT +
        bodyRef.current.scrollTop;
      pos.startAt =
        (Math.trunc(clientY / HALF_HOUR_HEIGHT) * HALF_HOUR_HEIGHT) /
        HOUR_HEIGHT;
      pos.endAt = pos.startAt + 1;
      document.body.style.cursor = 'row-resize';
      const { top, height } = generateStyle(pos.startAt, pos.endAt);
      resizableDivRefs.current[index].style.top = `${top}px`;
      resizableDivRefs.current[index].style.height = `${height}px`;
    };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pos.isActive) return;
    disableMouseEvent(e);
    if (!bodyRef.current) return;
    const { index } = pos;
    const clientY =
      e.clientY - HEADER_HEIGHT - SCHEDULER_HEIGHT + bodyRef.current.scrollTop;
    pos.endAt =
      (Math.floor(clientY / HALF_HOUR_HEIGHT) * HALF_HOUR_HEIGHT) /
        HOUR_HEIGHT +
      0.5;

    const { top, height } = generateStyle(pos.startAt, pos.endAt);

    resizableDivRefs.current[index].style.top = `${top}px`;
    resizableDivRefs.current[index].style.height = `${height}px`;
  };
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pos.isActive) return;
    disableMouseEvent(e);

    if (!bodyRef.current) return;
    if (pos.startAt > pos.endAt) {
      let temp = pos.startAt;
      pos.startAt = pos.endAt;
      pos.endAt = temp;
    }
    const { index, startAt, endAt } = pos;
    document.body.style.cursor = 'unset';
    if (resizableDivRefs.current[index]) {
      resizableDivRefs.current[index].style.top = `${0}px`;
      resizableDivRefs.current[index].style.height = `${0}px`;
    }

    setDraft((prev) => ({
      ...prev,
      startAt,
      endAt,
      date: days[index].format('YYYY-MM-DD'),
    }));
    setIsInputModalOpen(true);
    pos = {
      index: -1,
      isActive: false,
      startAt: 0,
      endAt: 0,
    };
  };

  const handleInputModalClose = () => {
    setIsInputModalOpen(false);
    setSelectedScheduleInfo({
      targetId: '',
      date: '',
    });
    setDraft(initDraft);
  };

  const disableMouseEvent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleScheduleClick = (el: Schedule) => {
    let _date = el.date === '' ? now.format('YYYY-MM-DD') : el.date;
    setIsInputModalOpen(true);
    setDraft({ ...el, date: _date });
    setSelectedScheduleInfo({
      targetId: el.id,
      date: el.date,
    });
  };

  React.useEffect(() => {
    setDraft((prev) => ({ ...prev, background: defaultBackground }));
  }, [defaultBackground]);

  return (
    <div className="SchedulerBody" ref={bodyRef}>
      {isInputModalOpen && (
        <Portal>
          <TodoInputModal
            draft={draft}
            setDraft={setDraft}
            onClose={handleInputModalClose}
          />
        </Portal>
      )}
      <div className="time-indicator-column">
        {_HOUR_NAME.map((name, index) => (
          <div key={index} className="hour-box">
            <span className="name">{name}</span>
          </div>
        ))}
      </div>
      {days.map((day, index) => {
        const clone = day.clone();
        const isPast = clone.add(24, 'hour').unix() < now.unix();
        const isToday = day.format('YYYYMMDD') === now.format('YYYYMMDD');
        const _routine = (routine[DAY_NAME_EN[index]] ?? []).map((data) => ({
          ...data,
          date: day.format('YYYY-MM-DD'),
        }));
        const sortedSchedule = [
          ...(schedule?.[day.format('YYYY-MM-DD')] ?? []),
          ..._routine,
        ].sort((a, b) => a.startAt - b.startAt);
        const ranged = sortedSchedule?.map((el) => {
          return [el.startAt, el.endAt];
        });
        const position = deduplicator(ranged);
        return (
          <div
            className="day-column"
            onMouseDown={handleMouseDown(index)}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            key={index}
          >
            {/* resizable box */}
            <div
              ref={(el) => {
                resizableDivRefs.current[index] = el as HTMLDivElement;
              }}
              className="resizable-div"
              style={{ background: hexToRgba(draft.background, 0.6) }}
            />
            {/* draft schedule */}
            {draft.date === day.format('YYYY-MM-DD') && (
              <div
                className={`draft `}
                style={{
                  ...generateStyle(draft.startAt, draft.endAt),
                  background: draft.background,
                }}
              >
                <span className="title">{draft.title}</span>
                <span className="period">
                  {TIME_NAME[draft.startAt * 2]} - {TIME_NAME[draft.endAt * 2]}
                </span>
              </div>
            )}
            {/* Now Indicator */}
            {isToday && (
              <span className="now-bar" style={{ top: nowBarStyleTop }} />
            )}
            {/* Hour Box */}
            {_HOUR_NAME.map((_, index) => (
              <div key={index} className="hour-box"></div>
            ))}
            {/* Saved Schedule */}
            {sortedSchedule?.map((el, index) => {
              return (
                <div
                  className={`saved-schedule ${
                    selectedScheduleInfo.targetId === el.id &&
                    selectedScheduleInfo.date === day.format('YYYY-MM-DD')
                      ? '--hidden'
                      : ''
                  }`}
                  style={{
                    ...generateStyle(el.startAt, el.endAt),
                    ...position[index],
                    background: hexToRgba(el.background, isPast ? 0.4 : 1),
                  }}
                  key={index}
                  onMouseDown={disableMouseEvent}
                  // onMouseMove={disableMouseEvent}
                  // onMouseUp={disableMouseEvent}
                  onClick={() => handleScheduleClick(el)}
                >
                  <span className="title">{el.title}</span>
                  <span className="period">
                    {TIME_NAME[el.startAt * 2]} - {TIME_NAME[el.endAt * 2]}
                  </span>
                </div>
              );
            })}

            {/* Saved Routine */}
            {/* {routine?.[DAY_NAME_EN[index]]?.map((el, index) => {
              return (
                <div
                  className={`saved-schedule ${
                    selectedScheduleInfo.targetId === el.id &&
                    selectedScheduleInfo.date === day.format('YYYY-MM-DD')
                      ? '--hidden'
                      : ''
                  }`}
                  style={generateStyle(el.startAt, el.endAt)}
                  key={index}
                  onMouseDown={disableMouseEvent}
                  onMouseMove={disableMouseEvent}
                  onMouseUp={disableMouseEvent}
                  onClick={() => handleScheduleClick(el, el.id)}
                >
                  <span className="title">{el.title}</span>
                  <span className="period">
                    {TIME_NAME[el.startAt * 2]} - {TIME_NAME[el.endAt * 2]}
                  </span>
                </div>
              );
            })} */}
          </div>
        );
      })}
    </div>
  );
};

export default SchedulerBody;
