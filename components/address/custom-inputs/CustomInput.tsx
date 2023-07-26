import { Input } from 'antd';
import { FC } from 'react';

interface Props {
  name: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
}

const CustomInput: FC<Props> = ({ name, label, value, onChange }) => {
  return (
    <div className="input-wrapper" style={{ marginBottom: '1rem' }}>
      <label htmlFor={name}>{label}</label>
      <Input value={value} onChange={(e) => onChange && onChange(e.target.value)} />
    </div>
  );
};

export default CustomInput;
