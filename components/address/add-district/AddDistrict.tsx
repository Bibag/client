import { FC, useState } from 'react';
import CustomInput from '../custom-inputs/CustomInput';
import { Button } from 'antd';
import { post } from '@/services/fetch';

const AddDistrictFC: FC = () => {
  const [name, setName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [cityCode, setCityCode] = useState<string>('');
  const [donVi, setDonVi] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    if (name && code) {
      const response = await post('/api/address/district', {
        name,
        code,
        city_code: cityCode,
        don_vi: donVi,
        full_name: fullName,
      });
      console.log(response);
    }
  };

  return (
    <div className="add-city-wrapper">
      <h1>Add new District</h1>
      <section>
        <CustomInput label="Code" name="add-code" value={code} onChange={(value) => setCode(value)} />
        <CustomInput label="City Code" name="add-city-code" value={cityCode} onChange={(value) => setCityCode(value)} />
        <CustomInput label="Unit" name="add-unit-code" value={donVi} onChange={(value) => setDonVi(value)} />
        <CustomInput label="Name" name="add-name" value={name} onChange={(value) => setName(value)} />
        <CustomInput label="Full name" name="add-full-name" value={fullName} onChange={(value) => setFullName(value)} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Button style={{ marginTop: '1rem' }} onClick={handleSubmit}>
          Submit
        </Button>
      </section>
    </div>
  );
};

export default AddDistrictFC;
