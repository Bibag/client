import { Select } from 'antd';
import { FC } from 'react';
import { OptionData } from '../Address.interface';

interface Props {
  name: string;
  label: string;
  value: string;
  options: OptionData[];
  onChange: (value: string) => void;
  width?: number;
}

const CustomSelect: FC<Props> = ({ name, label, value, options, onChange, width }) => {
  return (
    <div className="select-wrapper" style={{ marginBottom: '1rem' }}>
      <label htmlFor={name}>{label}</label>
      <Select
        id={name}
        style={{ width: width ? width + 'px' : '100%', display: 'block' }}
        value={value}
        options={options}
        onChange={(value) => onChange(value)}
      />
    </div>
  );
};

export default CustomSelect;
