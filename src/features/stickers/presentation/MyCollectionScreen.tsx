import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { myCollectionStyles as styles } from './styles/my_collection_styles';

interface CollectionCategory {
  id: string;
  title: string;
  category: string; // "SELEÇÕES" | "ESPECIAIS" | "ESTÁDIOS"
  label: 'FIGURINHAS' | 'CONCLUÍDO';
  collected: number;
  total: number;
  emoji: string;
  colorAccent: string; // Hex for left border strip
}

const mockCategories: CollectionCategory[] = [
  {
    id: '1',
    title: 'BRASIL',
    category: 'SELEÇÕES',
    label: 'FIGURINHAS',
    collected: 18,
    total: 32,
    emoji: '🇧🇷',
    colorAccent: '#10B981', // Green
  },
  {
    id: '2',
    title: 'LENDAS ETERNAS',
    category: 'ESPECIAIS',
    label: 'FIGURINHAS',
    collected: 41,
    total: 50,
    emoji: '👑',
    colorAccent: '#FACC15', // Yellow
  },
  {
    id: '3',
    title: 'TEMPLOS DO FUTEBOL',
    category: 'ESTÁDIOS',
    label: 'FIGURINHAS',
    collected: 3,
    total: 20,
    emoji: '🏟️',
    colorAccent: '#10B981', // Green
  },
  {
    id: '4',
    title: 'ARGENTINA',
    category: 'SELEÇÕES',
    label: 'CONCLUÍDO',
    collected: 32,
    total: 32,
    emoji: '🇦🇷',
    colorAccent: '#10B981', // Green
  },
  {
    id: '5',
    title: 'ALEMANHA',
    category: 'SELEÇÕES',
    label: 'FIGURINHAS',
    collected: 10,
    total: 32,
    emoji: '🇩🇪',
    colorAccent: '#10B981', // Green
  },
  {
    id: '6',
    title: 'TROFÉUS HISTÓRICOS',
    category: 'ESPECIAIS',
    label: 'FIGURINHAS',
    collected: 1,
    total: 20,
    emoji: '🏆',
    colorAccent: '#FACC15', // Yellow
  },
];

type FilterType = 'TODOS' | 'SELEÇÕES' | 'LENDAS' | 'ESTÁDIOS';

export default function MyCollectionScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('TODOS');

  // Filter and Search logic
  const filteredCategories = mockCategories.filter((item) => {
    // Search filter
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category pill filter
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

  const renderCategoryItem = ({ item }: { item: CollectionCategory }) => {
    const progressPercent = Math.round((item.collected / item.total) * 100);
    const isCompleted = item.collected === item.total;
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
                { width: `${progressPercent}%`, backgroundColor: barColor }
              ]} 
            />
          </View>
        </View>

        {/* Right: Stats & Badges */}
        <View style={styles.cardRightStats}>
          <Text 
            style={[
              styles.percentageText, 
              { color: isCompleted ? '#4ADE80' : item.colorAccent }
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

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#8CA185" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Neymar"
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
                  style={[
                    styles.pillButtonText, 
                    isActive && styles.pillButtonTextActive
                  ]}
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
          scrollEnabled={false} // Handles list inside ScrollView
          contentContainerStyle={styles.cardsList}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', paddingVertical: 40 }}>
              <Text style={{ fontSize: 40, marginBottom: 12 }}>🔍</Text>
              <Text style={{ color: '#8CA185', fontWeight: 'bold' }}>Nenhuma coleção encontrada</Text>
            </View>
          }
        />

      </ScrollView>
    </View>
  );
}
