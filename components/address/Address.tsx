import { FC, useEffect, useState } from 'react';
import CustomInput from './custom-inputs/CustomInput';
import CustomSelect from './custom-inputs/CustomSelect';
import { get } from '@/services/fetch';
import SearchAddress from './search/SearchAddress';
import { CityData, DistrictData, SearchData, WardData } from './Address.interface';
import { searchOptions } from './Address.data';

const AddressFC: FC = () => {
  const [cities, setCities] = useState<CityData[]>([]);
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [wards, setWards] = useState<WardData[]>([]);
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [ward, setWard] = useState<string>('');
  const [inputAddress, setInputAddress] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchKey, setSearchKey] = useState<string>(searchOptions[0].value);
  const [searchResult, setSearchResult] = useState<SearchData[]>([]);

  useEffect(() => {
    let ignore = false;
    const getCities = async () => {
      const res = await get<CityData[]>('/api/address/city');
      if (res && res.data && !ignore) {
        setCities(res.data);
      }
    };
    getCities();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    setDistrict('');
    setWard('');
    const getDistricts = async () => {
      const res = await get<DistrictData[]>('/api/address/district', { city_code: city });
      if (res && res.data && !ignore) {
        setDistricts(res.data);
      }
    };
    getDistricts();
    return () => {
      ignore = true;
    };
  }, [city]);

  useEffect(() => {
    let ignore = false;
    setWard('');
    const getWards = async () => {
      const res = await get<WardData[]>('/api/address/ward', { city_code: city, district_code: district });
      if (res && res.data && !ignore) {
        setWards(res.data);
      }
    };
    getWards();
    return () => {
      ignore = true;
    };
  }, [city, district]);

  useEffect(() => {
    let ignore = false;
    if (city && district && ward && !ignore) {
      setInputAddress([city, district, ward, address].filter((e) => !!e).join(', '));
    } else {
      setInputAddress('');
    }
    return () => {
      ignore = true;
    };
  }, [city, district, ward, address]);

  const handleSearch = () => {
    setSearchResult([]);
    let ignore = false;
    const searchAddress = async () => {
      const res = await get<SearchData[]>('/api/address/search', { search_key: searchKey, search_term: searchTerm });
      if (res && res.data && !ignore) {
        setSearchResult(res.data);
      }
    };

    searchAddress();
    return () => {
      ignore = true;
    };
  };

  return (
    <div style={{ padding: '50px 0', margin: '0 auto', display: 'block', width: '50%' }} className="address-container">
      <SearchAddress
        searchKey={searchKey}
        searchTerm={searchTerm}
        onChangeSearchKey={setSearchKey}
        onChangeSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        searchResult={searchResult}
      />
      <div className="form-input-wrapper">
        <CustomSelect
          name="city"
          label="Tỉnh/Thành phố"
          options={
            cities.length &&
            cities.map((city) => {
              return { value: city.code, label: city.name };
            })
          }
          value={city}
          onChange={setCity}
        />
        <CustomSelect
          name="district"
          label="Quận/Huyện"
          options={
            districts.length &&
            districts.map((district) => {
              return { value: district.code, label: district.name };
            })
          }
          value={district}
          onChange={setDistrict}
        />
        <CustomSelect
          name="ward"
          label="Xã/Phường"
          options={
            wards.length &&
            wards.map((ward) => {
              return { value: ward.code, label: ward.name };
            })
          }
          value={ward}
          onChange={setWard}
        />
        <CustomInput name="address" label="Địa chỉ cụ thể" value={address} onChange={setAddress} />
        <div>Địa chỉ đã nhập</div>
        {inputAddress}
      </div>
    </div>
  );
};

export default AddressFC;
