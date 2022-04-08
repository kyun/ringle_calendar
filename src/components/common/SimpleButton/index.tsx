import React from 'react';
import './SimpleButton.scss';

interface Props {
  theme: 'primary' | 'border';
  style?: React.CSSProperties;
}
const SimpleButton: React.FC<Props> = ({
  children,
  style,
  theme = 'primary',
}) => {
  return (
    <button className={`SimpleButton --${theme}`} style={style}>
      {children}
    </button>
  );
};

export default SimpleButton;
