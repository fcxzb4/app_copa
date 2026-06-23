import { useColorScheme } from "@/presentation/hooks/use-color-scheme";
import { useMemo } from "react";

/**
 * Hook that returns a memoised theme object based on the current colour scheme.
 */
export const useAppTheme = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return useMemo(
    () => ({
      background: isDark ? "#12141C" : "#F4F6FA",
      card: isDark ? "#1B1E2E" : "#FFFFFF",
      text: isDark ? "#FFFFFF" : "#0F172A",
      textSecondary: isDark ? "#94A3B8" : "#64748B",
      border: isDark ? "#2E334D" : "#E2E8F0",
      activeBorder: "#0A7EA4",
      buttonBg: isDark ? "#25293C" : "#E2E8F0",
      inputBg: isDark ? "#25293C" : "#F8FAFC",
      swapBtnBg: "#0A7EA4",
    }),
    [isDark]
  );
};