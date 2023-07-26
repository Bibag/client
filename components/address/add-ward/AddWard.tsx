import { FC, useState } from 'react';
import CustomInput from '../custom-inputs/CustomInput';
import { Button } from 'antd';
import { post } from '@/services/fetch';

const AddWardFC: FC = () => {
  const [name, setName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [cityCode, setCityCode] = useState<string>('');
  const [districtCode, setDistrictCode] = useState<string>('');
  const [donVi, setDonVi] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async () => {
    if (name && code) {
      const response = await post('/api/address/ward', {
        name,
        code,
        district_code: districtCode,
        city_code: cityCode,
        don_vi: donVi,
      });
      if (response && response.data) {
        setName('');
        setCode('');
      }
    }
  };

  return (
    <div className="add-city-wrapper">
      <h1>Add new Ward</h1>
      <section>
        <CustomInput label="Code" name="add-code" value={code} onChange={(value) => setCode(value)} />
        <CustomInput label="City Code" name="add-city-code" value={cityCode} onChange={(value) => setCityCode(value)} />
        <CustomInput
          label="District Code"
          name="add-district-code"
          value={districtCode}
          onChange={(value) => setDistrictCode(value)}
        />
        <CustomInput label="Unit" name="add-unit" value={donVi} onChange={(value) => setDonVi(value)} />
        <CustomInput label="Name" name="add-name" value={name} onChange={(value) => setName(value)} />
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Button style={{ marginTop: '1rem' }} onClick={handleSubmit}>
          Submit
        </Button>
      </section>
    </div>
  );
};

export default AddWardFC;
