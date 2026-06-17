export interface ExchangeRatesDataSource {
  fetchLatestRates(baseCurrency: string): Promise<any>;
}

export class ExchangeRatesDataSourceImpl implements ExchangeRatesDataSource {
  private readonly apiUrl = 'https://open.er-api.com/v6/latest';

  async fetchLatestRates(baseCurrency: string): Promise<any> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 6000); // 6 seconds timeout

    try {
      const response = await fetch(`${this.apiUrl}/${baseCurrency}`, {
        signal: controller.signal,
      });
      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      clearTimeout(id);
      throw err;
    }
  }
}
