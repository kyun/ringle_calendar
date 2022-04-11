/* eslint-disable no-unused-vars */
import React from 'react';
import './SwitchButton.scss';

interface Props {
  style?: React.CSSProperties;
  id: string[];
  onChange: (s: string) => void;
  value: boolean;
}
const SwitchButton: React.FC<Props> = ({ style, id, onChange, value }) => {
  const handleChange = (e: any) => {
    onChange(e.target.value);
  };
  return (
    <div className="SwitchButton" style={style}>
      <input
        type="radio"
        id={id[0]}
        name="switch"
        checked={value}
        value={id[0]}
        onChange={handleChange}
      />
      <label htmlFor={id[0]}>주</label>

      <input
        type="radio"
        id={id[1]}
        name="switch"
        checked={!value}
        value={id[1]}
        onChange={handleChange}
      />
      <label htmlFor={id[1]}>월</label>
    </div>
  );
};

export default SwitchButton;
