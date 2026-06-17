import { ExchangeRates } from '../../domain/entities/currency';

export interface RawRatesResponse {
  result: string;
  base_code: string;
  rates: Record<string, number>;
  time_last_update_utc?: string;
}

export class ExchangeRatesModel {
  static toDomain(raw: RawRatesResponse, fallbackRates: Record<string, number>): ExchangeRates {
    const rates: Record<string, number> = { ...fallbackRates };

    if (raw && raw.rates) {
      Object.keys(fallbackRates).forEach((code) => {
        if (raw.rates[code] !== undefined) {
          rates[code] = raw.rates[code];
        }
      });
    }

    const dateStr = raw.time_last_update_utc
      ? new Date(raw.time_last_update_utc).toLocaleDateString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      : new Date().toLocaleDateString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });

    return {
      rates,
      lastUpdate: dateStr,
    };
  }
}
