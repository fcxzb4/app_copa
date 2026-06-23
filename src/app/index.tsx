import { styles } from '@/app/app_styles';
import { useAppTheme } from '@/app/app_theme';
import { CurrencyPickerModal } from '@/presentation/components/currency-picker-modal';
import { useColorScheme } from '@/presentation/hooks/use-color-scheme';
import { useCurrencyConverter } from '@/presentation/hooks/use-currency-converter';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Keyboard, RefreshControl, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function CurrencyConverterScreen() {
  const colorScheme = useColorScheme();
  const theme = useAppTheme();

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

