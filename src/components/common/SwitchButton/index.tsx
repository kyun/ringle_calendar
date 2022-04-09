import React from 'react';
import './SwitchButton.scss';

interface Props {
  style?: React.CSSProperties;
  id?: string[];
  value: boolean;
  onChange: any;
}
const SwitchButton: React.FC<Props> = ({
  children,
  style,
  id,
  value,
  onChange,
}) => {
  const [id1, id2] = React.useMemo(
    () => [
      id?.[0] ?? Date.now().toString(),
      id?.[1] ?? (Date.now() + 111).toString(),
    ],
    []
  );
  const handleChange = (f: boolean) => {
    onChange(f);
  };
  return (
    <div className="SwitchButton" style={style}>
      <input
        type="radio"
        id={id1}
        name="switch"
        checked={value}
        onChange={() => handleChange(true)}
      />
      <label htmlFor={id1}>주</label>

      <input
        type="radio"
        id={id2}
        name="switch"
        checked={!value}
        onChange={() => handleChange(false)}
      />
      <label htmlFor={id2}>월</label>
    </div>
  );
};

export default SwitchButton;
