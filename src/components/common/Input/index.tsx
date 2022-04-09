import React from 'react';
import './Input.scss';

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: () => void;
}
const Input: React.FC<Props> = ({
  placeholder = '제목 추가',
  value,
  onChange,
}) => {
  return (
    <input
      className="Input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
