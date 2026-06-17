export class ConvertCurrencyUseCase {
  execute(
    amount: string,
    fromCurrency: string,
    toCurrency: string,
    rates: Record<string, number>
  ): { formatted: string; raw: number } {
    const numericAmount = parseFloat(amount.replace(',', '.'));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return { formatted: '0,00', raw: 0 };
    }

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (!fromRate || !toRate) {
      return { formatted: '0,00', raw: 0 };
    }

    // conversion = amount * (toRate / fromRate)
    const result = numericAmount * (toRate / fromRate);
    let formatted = '0,00';

    if (toCurrency === 'BTC') {
      formatted = result.toFixed(6).replace('.', ',');
    } else if (result < 1) {
      formatted = result.toFixed(4).replace('.', ',');
    } else {
      formatted = result.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    return { formatted, raw: result };
  }
}
