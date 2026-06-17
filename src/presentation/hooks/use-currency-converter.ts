import { useState, useEffect, useCallback, useMemo } from 'react';
import { ExchangeRatesDataSourceImpl } from '../../infra/data-sources/exchange-rates-data-source';
import { ExchangeRatesRepositoryImpl } from '../../data/repositories/exchange-rates-repository-impl';
import { GetExchangeRatesUseCase } from '../../use-cases/get-exchange-rates-use-case';
import { ConvertCurrencyUseCase } from '../../use-cases/convert-currency-use-case';
import { CURRENCY_LIST, Currency } from '../../domain/entities/currency';

// Instantiate singletons of architecture layers
const dataSource = new ExchangeRatesDataSourceImpl();
const repository = new ExchangeRatesRepositoryImpl(dataSource);
const getRatesUseCase = new GetExchangeRatesUseCase(repository);
const convertUseCase = new ConvertCurrencyUseCase();

export function useCurrencyConverter() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('BRL');

  const loadRates = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const data = await getRatesUseCase.execute();
      setRates(data.rates);
      setLastUpdate(data.lastUpdate);
    } catch (err) {
      setError('Não foi possível carregar as cotações. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadRates();
  }, [loadRates]);

  const getCurrencyInfo = useCallback((code: string): Currency => {
    return CURRENCY_LIST.find((c) => c.code === code) || {
      code,
      name: code,
      symbol: '$',
      flag: '🌐',
    };
  }, []);

  const fromInfo = useMemo(() => getCurrencyInfo(fromCurrency), [fromCurrency, getCurrencyInfo]);
  const toInfo = useMemo(() => getCurrencyInfo(toCurrency), [toCurrency, getCurrencyInfo]);

  // Perform conversions through ConvertCurrencyUseCase
  const convertedAmount = useMemo(() => {
    const result = convertUseCase.execute(amount, fromCurrency, toCurrency, rates);
    return result.formatted;
  }, [amount, fromCurrency, toCurrency, rates]);

  const currentRateString = useMemo(() => {
    const result = convertUseCase.execute('1', fromCurrency, toCurrency, rates);
    return `1 ${fromCurrency} = ${result.formatted} ${toCurrency}`;
  }, [fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    const numericAmount = parseFloat(amount.replace(',', '.'));
    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    if (!isNaN(numericAmount) && fromRate && toRate) {
      // Calculate and format the swapped conversion value so inputs match target currency
      const result = convertUseCase.execute(amount, fromCurrency, toCurrency, rates);
      setAmount(result.formatted);
    }
  };

  const handleQuickSelect = (value: number) => {
    setAmount(value.toString());
  };

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    fromInfo,
    toInfo,
    convertedAmount,
    currentRateString,
    rates,
    lastUpdate,
    loading,
    refreshing,
    error,
    loadRates,
    handleSwap,
    handleQuickSelect,
  };
}
