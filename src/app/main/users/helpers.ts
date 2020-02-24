import { AboutTabFragment_address as AddressType } from './detail/tabs/__generated__/AboutTabFragment';

type Gender = 'm' | 'f' | 'o';

const genderDict: { [key: string]: { [key: string]: string } } = {
  en: {
    m: 'Male',
    f: 'Female',
    o: 'Other',
  },
};

export const parseGender = (gender: string, lang = 'en'): string =>
  genderDict[lang][gender];

export const formatAdress = ({ street, zip, city, country }: AddressType) => {
  return `${street}, ${city}, ${zip}, ${country}`;
};
