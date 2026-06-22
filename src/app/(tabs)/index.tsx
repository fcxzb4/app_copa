import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/presentation/hooks/use-color-scheme';
import { useCurrencyConverter } from '@/presentation/hooks/use-currency-converter';
import { CurrencyPickerModal } from '@/presentation/components/currency-picker-modal';

export default function CurrencyConverterScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Local View States (Pure UI Modal management)
  const [fromModalVisible, setFromModalVisible] = useState<boolean>(false);
  const [toModalVisible, setToModalVisible] = useState<boolean>(false);

  // Consume Clean Architecture logic through the presentation hook
  const {
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
    lastUpdate,
    loading,
    refreshing,
    error,
    loadRates,
    handleSwap,
    handleQuickSelect,
  } = useCurrencyConverter();

  // Custom colors for themes
  const theme = useMemo(() => {
    return {
      background: isDark ? '#12141C' : '#F4F6FA',
      card: isDark ? '#1B1E2E' : '#FFFFFF',
      text: isDark ? '#FFFFFF' : '#0F172A',
      textSecondary: isDark ? '#94A3B8' : '#64748B',
      border: isDark ? '#2E334D' : '#E2E8F0',
      activeBorder: '#0A7EA4',
      buttonBg: isDark ? '#25293C' : '#E2E8F0',
      inputBg: isDark ? '#25293C' : '#F8FAFC',
      swapBtnBg: '#0A7EA4',
    };
  }, [isDark]);

  if (loading) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.activeBorder} />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Carregando cotações em tempo real...
        </Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadRates(true)}
              tintColor={theme.activeBorder}
              colors={[theme.activeBorder]}
            />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={[styles.headerTitle, { color: theme.text }]}>Conversor</Text>
              <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
                Cotações Globais (Clean Arch)
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.refreshButton, { backgroundColor: theme.buttonBg }]}
              onPress={() => loadRates(true)}
            >
              <Ionicons name="refresh" size={20} color={theme.text} />
            </TouchableOpacity>
          </View>

          {/* Main Card */}
          <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}>
            
            {/* Input "FROM" */}
            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>De (Origem)</Text>
            <View style={[styles.rowContainer, { backgroundColor: theme.inputBg }]}>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
                placeholder="0,00"
                placeholderTextColor={theme.textSecondary}
              />
              <TouchableOpacity
                style={[styles.currencySelector, { borderLeftColor: theme.border }]}
                onPress={() => setFromModalVisible(true)}
              >
                <Text style={styles.flagText}>{fromInfo.flag}</Text>
                <Text style={[styles.currencyCodeText, { color: theme.text }]}>{fromCurrency}</Text>
                <Ionicons name="chevron-down" size={14} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Swap Divider Line with Swap Button */}
            <View style={styles.swapDividerRow}>
              <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
              <TouchableOpacity
                style={[styles.swapButton, { backgroundColor: theme.swapBtnBg }]}
                onPress={handleSwap}
                activeOpacity={0.8}
              >
                <Ionicons name="swap-vertical" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
            </View>

            {/* Display "TO" */}
            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Para (Destino)</Text>
            <View style={[styles.rowContainer, { backgroundColor: theme.inputBg }]}>
              <View style={styles.resultContainer}>
                <Text
                  style={[styles.resultText, { color: theme.text }]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {convertedAmount}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.currencySelector, { borderLeftColor: theme.border }]}
                onPress={() => setToModalVisible(true)}
              >
                <Text style={styles.flagText}>{toInfo.flag}</Text>
                <Text style={[styles.currencyCodeText, { color: theme.text }]}>{toCurrency}</Text>
                <Ionicons name="chevron-down" size={14} color={theme.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Quick Shortcuts */}
            <View style={styles.shortcutsRow}>
              {[10, 50, 100, 500, 1000].map((val) => (
                <TouchableOpacity
                  key={val}
                  style={[styles.shortcutBtn, { backgroundColor: theme.buttonBg }]}
                  onPress={() => handleQuickSelect(val)}
                >
                  <Text style={[styles.shortcutText, { color: theme.text }]}>
                    {fromInfo.symbol} {val.toLocaleString('pt-BR')}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Details Card */}
          <View style={[styles.detailsCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                Cotação Atual:
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {currentRateString}
              </Text>
            </View>
            <View style={[styles.detailSeparator, { backgroundColor: theme.border }]} />
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                Última Atualização:
              </Text>
              <Text style={[styles.detailValue, { color: theme.textSecondary }]}>
                {lastUpdate}
              </Text>
            </View>
          </View>

          {error && (
            <View style={styles.errorBanner}>
              <Ionicons name="warning" size={18} color="#D97706" style={{ marginRight: 8 }} />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </ScrollView>

        {/* Currency Select Modals */}
        <CurrencyPickerModal
          visible={fromModalVisible}
          onClose={() => setFromModalVisible(false)}
          selectedCurrency={fromCurrency}
          onSelect={setFromCurrency}
          title="Converter de"
        />

        <CurrencyPickerModal
          visible={toModalVisible}
          onClose={() => setToModalVisible(false)}
          selectedCurrency={toCurrency}
          onSelect={setToCurrency}
          title="Converter para"
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 24 : 12,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    marginTop: 2,
  },
  refreshButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    height: 64,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 22,
    fontWeight: '700',
    height: '100%',
    padding: 0,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  resultText: {
    fontSize: 22,
    fontWeight: '700',
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 1,
    paddingLeft: 16,
    height: 40,
  },
  flagText: {
    fontSize: 24,
    marginRight: 8,
  },
  currencyCodeText: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 6,
  },
  swapDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  swapButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  shortcutsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 8,
  },
  shortcutBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  shortcutText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailsCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  detailSeparator: {
    height: 1,
    marginVertical: 12,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  errorText: {
    fontSize: 13,
    color: '#92400E',
    fontWeight: '500',
    flex: 1,
  },
});
