function hexToRgba(hexCode: string, opacity = 1): string {
  const hex = hexCode.replace('#', '');
  switch (hex.length) {
    case 8: {
      const alpha = parseInt(hex.slice(0, 2), 16);
      const r = parseInt(hex.slice(2, 4), 16);
      const g = parseInt(hex.slice(4, 6), 16);
      const b = parseInt(hex.slice(6, 8), 16);
      const a = alpha / 255;
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    case 6: {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    case 3: {
      const r = parseInt(hex.slice(0, 1).repeat(2), 16);
      const g = parseInt(hex.slice(1, 2).repeat(2), 16);
      const b = parseInt(hex.slice(2, 3).repeat(2), 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    default:
      return hexCode;
  }
}
export { hexToRgba };
