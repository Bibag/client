export interface CityData {
  code: string;
  name: string;
}

export interface DistrictData {
  code: string;
  city_code: string;
  name: string;
  full_name: string;
  don_vi: string;
}

export interface WardData {
  code: string;
  name: string;
  city_code: string;
  district_code: string;
  don_vi: string;
}

export interface OptionData {
  value: string;
  label: string;
}

export type SearchData = CityData[] | DistrictData[] | WardData[];
