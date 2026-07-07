import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { confederationsList } from '../../../shared/data/confederations';
import { teams } from '../../../shared/data/worldCupData';
import type { Confederation } from '../../../shared/domain/entities';
import { teamsStyles as styles } from './styles/teamsStyles';

export default function TeamsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConfed, setSelectedConfed] = useState<Confederation | 'ALL'>('ALL');

  // Filter logic
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConfed = selectedConfed === 'ALL' || team.confederation === selectedConfed;
    return matchesSearch && matchesConfed;
  });

  return (
    <View style={styles.screen}>
      <View style={styles.heroSection}>
        <Text style={styles.headerTitle}>Seleções Participantes</Text>
        <Text style={styles.headerSubtitle}>
          Explore os 48 países classificados para a Copa do Mundo FIFA 2026.
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar seleção por nome..."
          placeholderTextColor="#64748B"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Confederation Filter Buttons */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Filtrar por Confederação:</Text>
        <View style={styles.filterGrid}>
          {confederationsList.map(confed => {
            const isActive = selectedConfed === confed.key;
            return (
              <TouchableOpacity
                key={confed.key}
                style={[styles.filterButton, isActive && styles.filterButtonActive]}
                onPress={() => setSelectedConfed(confed.key)}
              >
                <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
                  {confed.label}
                </Text>
                <Text style={[styles.filterButtonDesc, isActive && styles.filterButtonDescActive]}>
                  {confed.desc}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Count Indicator */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          Mostrando <Text style={styles.countHighlight}>{filteredTeams.length}</Text> das 48 seleções
        </Text>
      </View>

      {/* Teams Grid */}
      {filteredTeams.length > 0 ? (
        <View style={styles.grid}>
          {filteredTeams.map(team => (
            <View key={team.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardFlag}>{team.flag}</Text>
                <View style={styles.groupBadge}>
                  <Text style={styles.groupBadgeText}>GRUPO {team.group}</Text>
                </View>
              </View>
              <Text style={styles.cardName}>{team.name}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.confedBadge}>{team.confederation}</Text>
                <Text style={styles.teamIdCode}>{team.id}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>⚽</Text>
          <Text style={styles.emptyTitle}>Nenhuma seleção encontrada</Text>
          <Text style={styles.emptySubtitle}>
            Tente mudar a pesquisa ou escolher outra confederação para filtrar.
          </Text>
        </View>
      )}
    </View>
  );
}
