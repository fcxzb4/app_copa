import { useColorScheme } from '@/presentation/hooks/use-color-scheme';
import { useMemo } from 'react';

export const useThemeStyles = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const styles = useMemo(() => ({
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
  }), [isDark]);

  return styles;
};

