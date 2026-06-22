import { Currency as CurrencyInfo } from '@/domain/entities/currency';

import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './currency-picker-modal';

/**
 * Creates a renderItem function for FlatList that has access to the required props.
 *
 * @param isDark - Current theme mode.
 * @param selectedCurrency - Currently selected currency code.
 * @param handleSelect - Callback when a currency is selected.
 * @returns A function compatible with ListRenderItem<CurrencyInfo>.
 */
export const createRenderItem = (
  isDark: boolean,
  selectedCurrency: string,
  handleSelect: (code: string) => void
) => {
  // Compute theme‑aware colors based on isDark
  const colors = {
    border: isDark ? '#38383A' : '#E5E5EA',
    text: isDark ? '#FFFFFF' : '#000000',
    subtext: isDark ? '#8E8E93' : '#636366',
    accent: '#0A7EA4', // Theme Blue
  };

  return ({ item }: { item: CurrencyInfo }) => {
    const isSelected = item.code === selectedCurrency;
    return (
      <TouchableOpacity
        style={[
          styles.item,
          { borderBottomColor: colors.border },
          isSelected && { backgroundColor: isDark ? '#2A3C44' : '#E6F4F8' },
        ]}
        onPress={() => handleSelect(item.code)}
        activeOpacity={0.7}
      >
        <Text style={styles.flag}>{item.flag}</Text>
        <View style={styles.itemMeta}>
          <Text style={[styles.itemCode, { color: colors.text }]}>{item.code}</Text>
          <Text style={[styles.itemName, { color: colors.subtext }]}>{item.name}</Text>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color={colors.accent} />
        )}
      </TouchableOpacity>
    );
  };
};