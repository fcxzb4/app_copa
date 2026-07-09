import { Link, Slot, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { layoutStyles } from '../shared/presentation/components/layout/layoutStyles';
import { Ionicons } from '@expo/vector-icons';

export default function RootLayout() {
  const styles = layoutStyles;
  const pathname = usePathname();

  // Check active routes
  const isHome = pathname === '/' || pathname === '/index';
  const isGroups = pathname === '/groups';
  const isTeams = pathname === '/teams';
  const isStickers = pathname === '/sticker';
  const isBets = pathname === '/bets';

  const handleHamburgerPress = () => {
    Alert.alert('Menu', 'Funcionalidade de menu lateral disponível em breve!');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="light" backgroundColor="#030A06" />

        {/* Global Top Header (1-to-1 design matching "POPULAR DA COPA") */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={handleHamburgerPress} style={styles.hamburgerButton}>
              <Ionicons name="menu" size={24} color="#8CA185" />
            </TouchableOpacity>

            <View style={styles.brand}>
              <Text style={styles.title}>Popular da Copa</Text>
            </View>

            <TouchableOpacity 
              style={styles.avatarContainer}
              onPress={() => Alert.alert('Perfil', 'Configurações de perfil em breve!')}
            >
              <Text style={styles.avatarEmoji}>👤</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main scroll content for screens */}
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <Slot />
          </View>
        </ScrollView>

        {/* Global Bottom Navigation Bar (1-to-1 design matching mockup) */}
        <View style={styles.bottomNav}>
          {/* HOME Tab */}
          <Link href="/" asChild>
            <TouchableOpacity style={styles.navItem}>
              {isHome ? (
                <View style={styles.activeTabCapsule}>
                  <Ionicons name="home" size={16} color="#05110B" />
                  <Text style={styles.activeNavLabel}>Home</Text>
                </View>
              ) : (
                <>
                  <Ionicons name="home-outline" size={18} color="#8CA185" />
                  <Text style={styles.navLabel}>Home</Text>
                </>
              )}
            </TouchableOpacity>
          </Link>

          {/* GRUPOS Tab */}
          <Link href="/groups" asChild>
            <TouchableOpacity style={styles.navItem}>
              {isGroups ? (
                <View style={styles.activeTabCapsule}>
                  <Ionicons name="people" size={16} color="#05110B" />
                  <Text style={styles.activeNavLabel}>Grupos</Text>
                </View>
              ) : (
                <>
                  <Ionicons name="people-outline" size={18} color="#8CA185" />
                  <Text style={styles.navLabel}>Grupos</Text>
                </>
              )}
            </TouchableOpacity>
          </Link>

          {/* TIMES Tab */}
          <Link href="/teams" asChild>
            <TouchableOpacity style={styles.navItem}>
              {isTeams ? (
                <View style={styles.activeTabCapsule}>
                  <Ionicons name="football" size={16} color="#05110B" />
                  <Text style={styles.activeNavLabel}>Times</Text>
                </View>
              ) : (
                <>
                  <Ionicons name="football-outline" size={18} color="#8CA185" />
                  <Text style={styles.navLabel}>Times</Text>
                </>
              )}
            </TouchableOpacity>
          </Link>

          {/* FIGURINHAS Tab */}
          <Link href="/sticker" asChild>
            <TouchableOpacity style={styles.navItem}>
              {isStickers ? (
                <View style={styles.activeTabCapsule}>
                  <Ionicons name="albums" size={16} color="#05110B" />
                  <Text style={styles.activeNavLabel}>Figurinhas</Text>
                </View>
              ) : (
                <>
                  <Ionicons name="albums-outline" size={18} color="#8CA185" />
                  <Text style={styles.navLabel}>Figurinhas</Text>
                </>
              )}
            </TouchableOpacity>
          </Link>

          {/* APOSTAS Tab */}
          <TouchableOpacity 
            style={styles.navItem} 
            onPress={() => Alert.alert('Apostas', 'Sistema de palpites e apostas da copa em desenvolvimento!')}
          >
            {isBets ? (
              <View style={styles.activeTabCapsule}>
                <Ionicons name="ticket" size={16} color="#05110B" />
                <Text style={styles.activeNavLabel}>Apostas</Text>
              </View>
            ) : (
              <>
                <Ionicons name="ticket-outline" size={18} color="#8CA185" />
                <Text style={styles.navLabel}>Apostas</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}
