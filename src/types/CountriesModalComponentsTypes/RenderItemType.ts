export interface RenderItemTypes {
  searchInput: string;
  item: Country;
  index: number;
  setCountryCode: React.Dispatch<React.SetStateAction<string>>,
  setCountry: React.Dispatch<React.SetStateAction<string>>
}
export interface Country {
  name: string;
  code: string;
  capital: string;
  region: string;
  currency: {
    code: string;
    name: string;
    symbol?: string | null; // Make symbol property optional and accept null
  };
  language: {
    code: string | null;
    name: string;
  };
  flag: string;
  dialling_code: string;
  isoCode: string;
}

