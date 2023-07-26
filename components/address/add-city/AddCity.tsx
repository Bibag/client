import { FC, useState } from 'react';
import CustomInput from '../custom-inputs/CustomInput';
import { Button } from 'antd';
import { post } from '@/services/fetch';

const AddCityFC: FC = () => {
  const [name, setName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    if (name && code) {
      const response = await post('/api/address/city', { name, code });
      if (response && response.data) {
        setName('');
        setCode('');
        setError('');
      }
    }
  };

  return (
    <div className="add-city-wrapper">
      <h1>Add new City</h1>
      <section>
        <CustomInput label="Code" name="add-code" value={code} onChange={(value) => setCode(value)} />
        <CustomInput label="Name" name="add-name" value={name} onChange={(value) => setName(value)} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Button style={{ marginTop: '1rem' }} onClick={handleSubmit}>
          Submit
        </Button>
      </section>
    </div>
  );
};

export default AddCityFC;
