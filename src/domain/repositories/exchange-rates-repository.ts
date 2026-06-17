import { ExchangeRates } from '../entities/currency';

export interface ExchangeRatesRepository {
  getExchangeRates(): Promise<ExchangeRates>;
}
