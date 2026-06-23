import { DEFAULT_FALLBACK_RATES, ExchangeRates } from '../../domain/entities/currency';
import { ExchangeRatesRepository } from '../../domain/repositories/exchange-rates-repository';
import { ExchangeRatesDataSource } from '../../infra/exchange-rates-data-source';
import { ExchangeRatesModel } from '../models/exchange-rates-model';

export class ExchangeRatesRepositoryImpl implements ExchangeRatesRepository {
  constructor(private readonly dataSource: ExchangeRatesDataSource) { }

  async getExchangeRates(): Promise<ExchangeRates> {
    try {
      const rawData = await this.dataSource.fetchLatestRates('USD');
      return ExchangeRatesModel.toDomain(rawData, DEFAULT_FALLBACK_RATES);
    } catch (error) {
      console.warn('Erro ao buscar taxas, usando fallback:', error);

      const offlineDate = new Date().toLocaleDateString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }) + ' (Offline)';

      return {
        rates: DEFAULT_FALLBACK_RATES,
        lastUpdate: offlineDate,
      };
    }
  }
}
