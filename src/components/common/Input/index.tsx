import React from 'react';
import './Input.scss';

interface Props {
  maxLength?: number;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (v: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<Props> = ({
  placeholder = '제목 추가',
  value,
  onChange,
  defaultValue,
  maxLength = 20,
}) => {
  return (
    <input
      maxLength={maxLength}
      defaultValue={defaultValue}
      className="Input"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
