/* eslint-disable no-unused-vars */
import React from 'react';
import { TIME_NAME } from '../../../constants/schedule';
import './InputPeriod.scss';

interface Props {
  startAt?: number;
  endAt?: number;
  onStartAtChange?: (v: string) => void;
  onEndAtChange?: (v: string) => void;
}

const InputPeriod: React.FC<Props> = ({
  startAt,
  endAt,
  onStartAtChange,
  onEndAtChange,
}) => {
  return (
    <div className="InputPeriod">
      <select
        value={startAt}
        onChange={(e) => onStartAtChange?.(e.target.value)}
      >
        {TIME_NAME.slice(0, -1).map((name, i) => {
          return (
            <option key={i} value={i / 2}>
              {name}
            </option>
          );
        })}
      </select>
      -
      <select value={endAt} onChange={(e) => onEndAtChange?.(e.target.value)}>
        {TIME_NAME.slice((startAt as number) * 2).map((name, i) => {
          return (
            <option key={i} value={Number(i) / 2 + (startAt as number)}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default InputPeriod;
