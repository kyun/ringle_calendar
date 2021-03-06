export const HOUR_HEIGHT = 48;
export const HALF_HOUR_HEIGHT = HOUR_HEIGHT / 2;
export const HEADER_HEIGHT = 64;
export const SCHEDULER_HEIGHT = 100;

export const DAY_NAME = ['일', '월', '화', '수', '목', '금', '토'];
export const DAY_NAME_EN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
export const COLORS = ['#7d5df5', '#2ebcb2', '#f8d548', '#e7737d', '#5472ec'];
export const TIME_NAME = [
  '오전 12:00',
  '오전 12:30',
  '오전 1:00',
  '오전 1:30',
  '오전 2:00',
  '오전 2:30',
  '오전 3:00',
  '오전 3:30',
  '오전 4:00',
  '오전 4:30',
  '오전 5:00',
  '오전 5:30',
  '오전 6:00',
  '오전 6:30',
  '오전 7:00',
  '오전 7:30',
  '오전 8:00',
  '오전 8:30',
  '오전 9:00',
  '오전 9:30',
  '오전 10:00',
  '오전 10:30',
  '오전 11:00',
  '오전 11:30',
  '오후 12:00',
  '오후 12:30',
  '오후 1:00',
  '오후 1:30',
  '오후 2:00',
  '오후 2:30',
  '오후 3:00',
  '오후 3:30',
  '오후 4:00',
  '오후 4:30',
  '오후 5:00',
  '오후 5:30',
  '오후 6:00',
  '오후 6:30',
  '오후 7:00',
  '오후 7:30',
  '오후 8:00',
  '오후 8:30',
  '오후 9:00',
  '오후 9:30',
  '오후 10:00',
  '오후 10:30',
  '오후 11:00',
  '오후 11:30',
  '오전 12:00',
];
export const HOUR_NAME = Array(24)
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
