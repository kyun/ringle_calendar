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
      height: Math.max(Math.abs(height), 24) - 2,
    };
  }
  return {
    top,
    height: height - 4,
  };
};

function between(x: number, min: number, max: number) {
  return x >= min && x < max;
}

function deduplicator(sortedArray: Array<Array<number>>) {
  let range = { min: -1, max: -1 };
  let groupIdx = 0;
  let group: any[] = [[]];
  let out: any[] = [];
  sortedArray.forEach((el, index: number) => {
    const { min, max } = range;
    if (min === -1) {
      range = {
        min: el[0],
        max: el[1],
      };
      group[groupIdx].push(index);
    } else {
      if (between(el[0], min, max) || between(el[1], min, max)) {
        range = {
          min: Math.min(range.min, el[0]),
          max: Math.max(range.max, el[1]),
        };
        group[groupIdx].push(index);
      } else {
        range = {
          min: el[0],
          max: el[1],
        };
        groupIdx += 1;
        group[groupIdx] = [index];
      }
    }
  });
  group.forEach((a) => {
    const maped = a.map((_: number, i: number) => {
      return {
        width: `calc(${Math.min((1 / a.length) * 100, 90) + '%'} - 2px)`,
        left: (1 / a.length) * 100 * i + '%',
      };
    });
    out = [...out, ...maped];
  });
  return out;
}
const generatePosition = (arr: number[]) => {
  arr.map((el, index) => {
    console.log(el * 100 + '%');
  });
};

export { generateStyle, deduplicator, generatePosition };
