import React from 'react';
import { Slot, Link, usePathname } from 'expo-router';
import { StyleSheet, Text, View, ScrollView, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const pathname = usePathname();
  const isGroupStage = pathname === '/' || pathname === '/index';
  const isTeams = pathname === '/teams';

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
              <Link href={"/teams" as any} asChild>
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  header: {
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#2D3748',
    paddingVertical: 16,
    paddingHorizontal: 20,
    ...Platform.select({
      web: {
        position: 'sticky' as any,
        top: 0,
        zIndex: 50,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
      },
    }),
  },
  headerContent: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trophy: {
    fontSize: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700', // Gold
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 10,
    color: '#00E676', // Pitch Green
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 2,
  },
  navBar: {
    flexDirection: 'row',
    gap: 8,
  },
  navItem: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
    textAlign: 'center',
    cursor: 'pointer',
    ...Platform.select({
      web: {
        transitionProperty: 'all',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-in-out',
      },
    }) as any,
  },
  navItemActive: {
    color: '#0A0E1A',
    backgroundColor: '#FFD700', // Gold active background
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#0A0E1A',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  container: {
    maxWidth: 1200,
    width: '100%',
    padding: 20,
    flex: 1,
  },
  footer: {
    width: '100%',
    maxWidth: 1200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    marginTop: 'auto',
  },
  footerText: {
    color: '#475569',
    fontSize: 12,
    textAlign: 'center',
  },
});
