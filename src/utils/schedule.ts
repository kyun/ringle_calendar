/*
  startAt 과 endAt를 입력으로 받아, 
  style.top, style.height를 return 합니다.
*/

import { HALF_HOUR_HEIGHT, HOUR_HEIGHT } from '../constants/schedule';

const generateStyle = (startAt: number, endAt: number) => {
  const top = startAt * HOUR_HEIGHT;
  const height = endAt * HOUR_HEIGHT - top;
  if (startAt >= endAt) {
    return {
      top: top + height,
      height: Math.max(Math.abs(height), 24) - 4,
    };
  }
  return {
    top,
    height: height - 4,
  };
};

export { generateStyle };
