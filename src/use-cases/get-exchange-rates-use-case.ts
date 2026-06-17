import { ExchangeRatesRepository } from '../domain/repositories/exchange-rates-repository';
import { ExchangeRates } from '../domain/entities/currency';

export class GetExchangeRatesUseCase {
  constructor(private readonly repository: ExchangeRatesRepository) {}

  async execute(): Promise<ExchangeRates> {
    return this.repository.getExchangeRates();
  }
}
