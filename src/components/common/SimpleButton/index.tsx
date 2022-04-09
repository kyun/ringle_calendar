import React from 'react';
import './SimpleButton.scss';

interface Props {
  theme: 'primary' | 'border';
  style?: React.CSSProperties;
  onClick?: any;
}
const SimpleButton: React.FC<Props> = ({
  children,
  style,
  theme = 'primary',
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`SimpleButton --${theme}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default SimpleButton;
