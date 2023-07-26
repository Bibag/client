import { FC } from 'react';
import CustomInput from '../custom-inputs/CustomInput';
import { Button } from 'antd';
import CustomSelect from '../custom-inputs/CustomSelect';
import { searchOptions } from '../Address.data';
import { SearchData } from '../Address.interface';

interface Props {
  searchTerm: string;
  searchKey: string;
  onChangeSearchTerm: (value: string) => void;
  onChangeSearchKey: (value: string) => void;
  onSearch: () => void;
  searchResult: SearchData;
}

const SearchAddress: FC<Props> = ({
  searchKey,
  searchTerm,
  onSearch,
  onChangeSearchKey,
  onChangeSearchTerm,
  searchResult,
}) => {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <CustomSelect
        width={200}
        name="searchKey"
        label="Search key"
        value={searchKey}
        options={searchOptions}
        onChange={(value) => onChangeSearchKey(value)}
      />
      <CustomInput
        name="search-address"
        label="Search"
        value={searchTerm}
        onChange={(value) => onChangeSearchTerm(value)}
      />
      <Button onClick={() => onSearch()}>Search</Button>
      <div className="search-result">
        {searchResult?.map((result) => (
          <div key={result.name}>{result.full_name ? result.full_name : result.name}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchAddress;
