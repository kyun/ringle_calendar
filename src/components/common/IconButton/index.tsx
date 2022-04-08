import React from 'react';
import './IconButton.scss';

interface Props {
  color?: string;
  size?: number;
  style?: React.CSSProperties;
}
const IconButton: React.FC<Props> = ({
  children,
  color = '#000',
  size = 40,
  style,
}) => {
  return (
    <button
      className="IconButton"
      style={{ color, width: size, height: size, ...style }}
    >
      {children}
    </button>
  );
};

export default IconButton;
