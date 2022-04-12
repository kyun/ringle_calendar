import { HOUR_HEIGHT } from '../constants/schedule';
/*
  startAt 과 endAt를 입력으로 받아, 
  style.top, style.height를 return 합니다.
*/

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
function grouping(sortedArray: number[][]) {
  let range = { min: -1, max: -1 };
  let groupIdx = 0;
  let group: number[][] = [[]];
  // let output: number[] = [];
  sortedArray.forEach((el, index: number) => {
    const { min, max } = range;
    if (min === -1) {
      range = { min: el[0], max: el[1] };
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
  return group;
}

function style4duplicate(sortedArray: number[][]) {
  const group = grouping(sortedArray);
  let styles: Array<{ width: string; left: string }> = [];
  group.forEach((a) => {
    const maped = a.map((_: number, i: number) => {
      return {
        width: `calc(${Math.min((1 / a.length) * 100, 90) + '%'} - 2px)`,
        left: (1 / a.length) * 100 * i + '%',
      };
    });
    styles = [...styles, ...maped];
  });
  return styles;
}

export { generateStyle, style4duplicate };
