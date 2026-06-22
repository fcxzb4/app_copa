export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}


export interface CurrencyPickerModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCurrency: string;
  onSelect: (currencyCode: string) => void;
  title: string;
}


export interface ExchangeRates {
  rates: Record<string, number>;
  lastUpdate: string;
}

export const CURRENCY_LIST: Currency[] = [
  { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$', flag: '🇧🇷' },
  { code: 'USD', name: 'Dólar Americano', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'Libra Esterlina', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Iene Japonês', symbol: '¥', flag: '🇯🇵' },
  { code: 'CAD', name: 'Dólar Canadense', symbol: 'C$', flag: '🇨🇦' },
  { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$', flag: '🇦🇺' },
  { code: 'ARS', name: 'Peso Argentino', symbol: '$', flag: '🇦🇷' },
  { code: 'CLP', name: 'Peso Chileno', symbol: '$', flag: '🇨🇱' },
  { code: 'COP', name: 'Peso Colombiano', symbol: '$', flag: '🇨🇴' },
  { code: 'MXN', name: 'Peso Mexicano', symbol: '$', flag: '🇲🇽' },
  { code: 'CNY', name: 'Yuan Chinês', symbol: '¥', flag: '🇨🇳' },
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', flag: '🪙' }
];

export const DEFAULT_FALLBACK_RATES: Record<string, number> = {
  USD: 1.0,
  BRL: 5.42,
  EUR: 0.93,
  GBP: 0.79,
  JPY: 158.0,
  CAD: 1.37,
  AUD: 1.51,
  ARS: 905.0,
  CLP: 935.0,
  COP: 4150.0,
  MXN: 18.4,
  CNY: 7.26,
  BTC: 0.000015,
};
