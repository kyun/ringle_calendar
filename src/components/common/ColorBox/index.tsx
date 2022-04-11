import React from 'react';
import './ColorBox.scss';

interface Props {
  //
  colors: string[];
  value: string;
  onChange: (v: string) => void;
}
const ColorBox: React.FC<Props> = ({ colors, value, onChange }) => {
  const handleClick = (color: string) => {
    if (value === color) return;
    onChange(color);
  };
  return (
    <div className="ColorBox">
      {colors.map((color, index) => {
        return (
          <button
            onClick={() => handleClick(color)}
            className={`color-button ${value === color ? '--selected' : ''}`}
            key={index}
            style={{ background: color }}
          />
        );
      })}
    </div>
  );
};

export default ColorBox;
