import React, { useMemo, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { myCollectionStyles as styles } from './styles/my_collection_styles';
import { useStickerDatabase } from '../data/useStickerDatabase';
import { teams } from '../../../shared/data/worldCupData';

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface CollectionCategory {
  id: string;
  title: string;
  category: string;
  label: 'FIGURINHAS' | 'CONCLUÍDO';
  collected: number;
  total: number;
  emoji: string;
  colorAccent: string;
}

type FilterType = 'TODOS' | 'SELEÇÕES' | 'LENDAS' | 'ESTÁDIOS';

// ─── Constantes ───────────────────────────────────────────────────────────────

/** Figurinhas por seleção (1 figurinha por jogador, 23 jogadores + capa) */
const STICKERS_PER_TEAM = 20;

/** Categorias especiais fixas com metas definidas */
const SPECIAL_CATEGORIES = [
  {
    id: 'LENDAS',
    title: 'LENDAS ETERNAS',
    category: 'ESPECIAIS',
    total: 50,
    emoji: '👑',
    colorAccent: '#FACC15',
  },
  {
    id: 'ESTADIOS',
    title: 'TEMPLOS DO FUTEBOL',
    category: 'ESTÁDIOS',
    total: 20,
    emoji: '🏟️',
    colorAccent: '#10B981',
  },
  {
    id: 'TROFEUS',
    title: 'TROFÉUS HISTÓRICOS',
    category: 'ESPECIAIS',
    total: 20,
    emoji: '🏆',
    colorAccent: '#FACC15',
  },
];

// ─── Componente Principal ─────────────────────────────────────────────────────

export default function MyCollectionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('TODOS');

  const { collectedStickers, countByTeam, totalCollected, isLoading, error } =
    useStickerDatabase();

  // ── Montar categorias a partir dos dados do banco ─────────────────────────

  const categories = useMemo<CollectionCategory[]>(() => {
    const teamCategories: CollectionCategory[] = teams.map((team) => {
      const collected = countByTeam[team.id] ?? 0;
      const isCompleted = collected >= STICKERS_PER_TEAM;
      return {
        id: team.id,
        title: team.name.toUpperCase(),
        category: 'SELEÇÕES',
        label: isCompleted ? 'CONCLUÍDO' : 'FIGURINHAS',
        collected,
        total: STICKERS_PER_TEAM,
        emoji: team.flag,
        colorAccent: '#10B981',
      };
    });

    // Categorias especiais — contabilizam figurinhas com group_name específico
    const specialCategories: CollectionCategory[] = SPECIAL_CATEGORIES.map((special) => {
      const collected = collectedStickers.filter(
        (s) => s.group_name === special.id && s.is_duplicate === 0
      ).length;
      const isCompleted = collected >= special.total;
      return {
        id: special.id,
        title: special.title,
        category: special.category,
        label: isCompleted ? 'CONCLUÍDO' : 'FIGURINHAS',
        collected,
        total: special.total,
        emoji: special.emoji,
        colorAccent: special.colorAccent,
      };
    });

    // Junta tudo, ordenando: com figurinhas primeiro, depois por progresso desc
    return [...teamCategories, ...specialCategories].sort((a, b) => {
      if (a.collected !== b.collected) return b.collected - a.collected;
      return a.title.localeCompare(b.title);
    });
  }, [collectedStickers, countByTeam]);

  // ── Filtro e busca ─────────────────────────────────────────────────────────

  const filteredCategories = useMemo(() => {
    return categories.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = true;
      if (activeFilter === 'SELEÇÕES') {
        matchesFilter = item.category === 'SELEÇÕES';
      } else if (activeFilter === 'LENDAS') {
        matchesFilter = item.category === 'ESPECIAIS';
      } else if (activeFilter === 'ESTÁDIOS') {
        matchesFilter = item.category === 'ESTÁDIOS';
      }

      return matchesSearch && matchesFilter;
    });
  }, [categories, searchQuery, activeFilter]);

  // ── Renderização de cada item ──────────────────────────────────────────────

  const renderCategoryItem = ({ item }: { item: CollectionCategory }) => {
    const progressPercent = Math.round((item.collected / item.total) * 100);
    const isCompleted = item.collected >= item.total;
    const barColor = item.colorAccent;

    return (
      <View style={styles.card}>
        {/* Left vertical accent bar strip */}
        <View style={[styles.cardLeftAccent, { backgroundColor: item.colorAccent }]} />

        {/* Left: Thumbnail visual */}
        <View style={styles.thumbnailContainer}>
          <Text style={styles.thumbnailEmoji}>{item.emoji}</Text>
          <View style={styles.thumbnailImageOverlay} />
        </View>

        {/* Middle: Details */}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardCategory}>{item.category}</Text>

          <Text style={styles.cardFooterLabel}>
            {isCompleted ? 'CONCLUÍDO' : 'FIGURINHAS'}
          </Text>

          {/* Progress bar */}
          <View style={styles.cardProgressBarContainer}>
            <View
              style={[
                styles.cardProgressBarFill,
                { width: `${progressPercent}%`, backgroundColor: barColor },
              ]}
            />
          </View>
        </View>

        {/* Right: Stats & Badges */}
        <View style={styles.cardRightStats}>
          <Text
            style={[
              styles.percentageText,
              { color: isCompleted ? '#4ADE80' : item.colorAccent },
            ]}
          >
            {progressPercent < 10 ? `0${progressPercent}` : progressPercent}%
          </Text>

          {isCompleted ? (
            <View style={styles.completedBadge}>
              <Ionicons name="ribbon" size={24} color="#FACC15" />
            </View>
          ) : (
            <View style={{ height: 24 }} />
          )}

          <Text style={styles.countText}>
            {item.collected} / {item.total}
          </Text>
        </View>
      </View>
    );
  };

  // ── Estado de loading ──────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4ADE80" />
        <Text style={{ color: '#8CA185', marginTop: 12, fontSize: 13 }}>
          Carregando álbum...
        </Text>
      </View>
    );
  }

  // ── Estado de erro ─────────────────────────────────────────────────────────

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 40, marginBottom: 12 }}>⚠️</Text>
        <Text style={{ color: '#F87171', fontWeight: 'bold', textAlign: 'center' }}>
          {error}
        </Text>
      </View>
    );
  }

  // ── Render principal ───────────────────────────────────────────────────────

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Text */}
        <View>
          <Text style={styles.subHeaderLabel}>Meu Álbum Digital</Text>
          <Text style={styles.titleText}>Minhas Coleções</Text>
        </View>

        {/* Total de figurinhas coletadas */}
        {totalCollected > 0 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              marginBottom: 4,
              marginTop: -4,
            }}
          >
            <Ionicons name="albums" size={13} color="#4ADE80" />
            <Text style={{ color: '#4ADE80', fontSize: 12, fontWeight: '600' }}>
              {totalCollected} figurinha{totalCollected !== 1 ? 's' : ''} coletada{totalCollected !== 1 ? 's' : ''}
            </Text>
          </View>
        )}

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#8CA185" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar seleção ou categoria..."
            placeholderTextColor="#8CA185"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filters (Pills) */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterPillsBar}
          contentContainerStyle={styles.filterPillsContainer}
        >
          {(['TODOS', 'SELEÇÕES', 'LENDAS', 'ESTÁDIOS'] as FilterType[]).map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[styles.pillButton, isActive && styles.pillButtonActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[styles.pillButtonText, isActive && styles.pillButtonTextActive]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Collection items list */}
        <FlatList
          data={filteredCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.cardsList}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              {totalCollected === 0 ? (
                <>
                  <Text style={{ fontSize: 40, marginBottom: 12 }}>📦</Text>
                  <Text style={{ color: '#8CA185', fontWeight: 'bold', textAlign: 'center' }}>
                    Nenhuma figurinha ainda!
                  </Text>
                  <Text style={{ color: '#4A6A4A', fontSize: 12, marginTop: 6, textAlign: 'center' }}>
                    Vá em Figurinhas e rasgar um pacote para começar.
                  </Text>
                </>
              ) : (
                <>
                  <Text style={{ fontSize: 40, marginBottom: 12 }}>🔍</Text>
                  <Text style={{ color: '#8CA185', fontWeight: 'bold' }}>
                    Nenhuma coleção encontrada
                  </Text>
                </>
              )}
            </View>
          }
        />
      </ScrollView>
    </View>
  );
}
