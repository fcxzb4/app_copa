import React, { useState, useMemo } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { CURRENCY_LIST, Currency as CurrencyInfo } from '@/src/domain/entities/currency';

interface CurrencyPickerModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCurrency: string;
  onSelect: (currencyCode: string) => void;
  title: string;
}

export function CurrencyPickerModal({
  visible,
  onClose,
  selectedCurrency,
  onSelect,
  title,
}: CurrencyPickerModalProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [searchQuery, setSearchQuery] = useState('');

  // Styles based on theme
  const themeStyles = useMemo(() => {
    return {
      modalBg: isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
      container: isDark ? '#1C1C1E' : '#FFFFFF',
      text: isDark ? '#FFFFFF' : '#000000',
      subtext: isDark ? '#8E8E93' : '#636366',
      inputBg: isDark ? '#2C2C2E' : '#F2F2F7',
      inputText: isDark ? '#FFFFFF' : '#000000',
      inputPlaceholder: isDark ? '#8E8E93' : '#AEAEB2',
      border: isDark ? '#38383A' : '#E5E5EA',
      itemHover: isDark ? '#2C2C2E' : '#F2F2F7',
      accent: '#0A7EA4', // Theme Blue
    };
  }, [isDark]);

  // Filter currencies based on query
  const filteredCurrencies = useMemo(() => {
    if (!searchQuery.trim()) return CURRENCY_LIST;
    const query = searchQuery.toLowerCase().trim();
    return CURRENCY_LIST.filter(
      (currency) =>
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSelect = (code: string) => {
    onSelect(code);
    setSearchQuery('');
    onClose();
  };

  const renderItem = ({ item }: { item: CurrencyInfo }) => {
    const isSelected = item.code === selectedCurrency;

    return (
      <TouchableOpacity
        style={[
          styles.item,
          { borderBottomColor: themeStyles.border },
          isSelected && { backgroundColor: isDark ? '#2A3C44' : '#E6F4F8' },
        ]}
        onPress={() => handleSelect(item.code)}
        activeOpacity={0.7}
      >
        <Text style={styles.flag}>{item.flag}</Text>
        <View style={styles.itemMeta}>
          <Text style={[styles.itemCode, { color: themeStyles.text }]}>
            {item.code}
          </Text>
          <Text style={[styles.itemName, { color: themeStyles.subtext }]}>
            {item.name}
          </Text>
        </View>
        {isSelected && (
          <Ionicons name="checkmark-circle" size={24} color={themeStyles.accent} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <Pressable
          style={[styles.backdrop, { backgroundColor: themeStyles.modalBg }]}
          onPress={onClose}
        />

        <View style={[styles.modalContainer, { backgroundColor: themeStyles.container }]}>
          {/* Header Drag Line / Notch */}
          <View style={[styles.notch, { backgroundColor: themeStyles.border }]} />

          <View style={styles.header}>
            <Text style={[styles.title, { color: themeStyles.text }]}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={themeStyles.subtext} />
            </TouchableOpacity>
          </View>

          {/* Search Input */}
          <View style={[styles.searchContainer, { backgroundColor: themeStyles.inputBg }]}>
            <Ionicons
              name="search"
              size={18}
              color={themeStyles.subtext}
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.searchInput, { color: themeStyles.inputText }]}
              placeholder="Buscar moeda..."
              placeholderTextColor={themeStyles.inputPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              clearButtonMode="while-editing"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={themeStyles.subtext} />
              </TouchableOpacity>
            )}
          </View>

          {/* List */}
          <FlatList
            data={filteredCurrencies}
            keyExtractor={(item) => item.code}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons name="alert-circle-outline" size={48} color={themeStyles.subtext} />
                <Text style={[styles.emptyText, { color: themeStyles.subtext }]}>
                  Nenhuma moeda encontrada para "{searchQuery}"
                </Text>
              </View>
            }
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '65%',
    paddingTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  notch: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    padding: 0,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderBottomWidth: 1,
  },
  flag: {
    fontSize: 28,
    marginRight: 14,
  },
  itemMeta: {
    flex: 1,
  },
  itemCode: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  itemName: {
    fontSize: 13,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
