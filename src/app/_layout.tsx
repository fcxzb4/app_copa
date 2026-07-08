import { Link, Slot, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { layoutStyles } from '../shared/presentation/components/layout/layoutStyles';

export default function RootLayout() {
  const styles = layoutStyles;
  const pathname = usePathname();
  const isGroupStage = pathname === '/' || pathname === '/index';
  const isTeams = pathname === '/team';

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="light" backgroundColor="#0A0E1A" />

        {/* Main Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.brand}>
              <Text style={styles.trophy}>🏆</Text>
              <View>
                <Text style={styles.title}>COPA DO MUNDO</Text>
                <Text style={styles.subtitle}>EUA, CANADÁ & MÉXICO 2026</Text>
              </View>
            </View>

            {/* Navigation Tabs */}
            <View style={styles.navBar}>
              <Link href={"/" as any} asChild>
                <Text style={StyleSheet.flatten([
                  styles.navItem,
                  isGroupStage && styles.navItemActive
                ])}>
                  Fase de Grupos
                </Text>
              </Link>
              <Link href={"/team" as any} asChild>
                <Text style={StyleSheet.flatten([
                  styles.navItem,
                  isTeams && styles.navItemActive
                ])}>
                  Times
                </Text>
              </Link>
            </View>
          </View>
        </View>

        {/* Scrollable Content wrapper */}
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <Slot />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              🏆 Website Temático da Copa do Mundo 2026 • Desenvolvido com React Native Web
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

