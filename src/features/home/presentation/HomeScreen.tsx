import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { homeStyles as styles } from './styles/home_styles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Section 1: JOGOS AO-VIVO */}
        <View>
          <Text style={styles.sectionTitle}>Jogos Ao-Vivo</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.liveScroll}
            contentContainerStyle={styles.liveScrollContent}
          >
            {/* Card 1: BRA x ARG */}
            <View style={styles.liveCard}>
              <View style={styles.liveCardHeader}>
                <Text style={styles.liveCardPhase}>Fase de Grupos • 82'</Text>
                <View style={styles.liveBadge}>
                  <Text style={styles.liveBadgeText}>● AO VIVO</Text>
                </View>
              </View>
              <View style={styles.liveTeamsContainer}>
                <View style={styles.liveTeamRow}>
                  <View style={styles.liveTeamLeft}>
                    <Text style={styles.liveTeamFlag}>🇧🇷</Text>
                    <Text style={styles.liveTeamCode}>BRA</Text>
                  </View>
                  <Text style={styles.liveTeamScore}>2</Text>
                </View>
                <View style={styles.liveTeamRow}>
                  <View style={styles.liveTeamLeft}>
                    <Text style={styles.liveTeamFlag}>🇦🇷</Text>
                    <Text style={styles.liveTeamCode}>ARG</Text>
                  </View>
                  <Text style={styles.liveTeamScore}>1</Text>
                </View>
              </View>
            </View>

            {/* Card 2: FRA x GER */}
            <View style={styles.liveCard}>
              <View style={styles.liveCardHeader}>
                <Text style={styles.liveCardPhase}>Fase de Grupos • 45'</Text>
                <View style={[styles.liveBadge, { backgroundColor: '#475569' }]}>
                  <Text style={styles.liveBadgeText}>Intervalo</Text>
                </View>
              </View>
              <View style={styles.liveTeamsContainer}>
                <View style={styles.liveTeamRow}>
                  <View style={styles.liveTeamLeft}>
                    <Text style={styles.liveTeamFlag}>🇫🇷</Text>
                    <Text style={styles.liveTeamCode}>FRA</Text>
                  </View>
                  <Text style={styles.liveTeamScore}>0</Text>
                </View>
                <View style={styles.liveTeamRow}>
                  <View style={styles.liveTeamLeft}>
                    <Text style={styles.liveTeamFlag}>🇩🇪</Text>
                    <Text style={styles.liveTeamCode}>GER</Text>
                  </View>
                  <Text style={styles.liveTeamScore}>0</Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* Section 2: GRUPOS Classificação preview */}
        <View>
          <Text style={styles.sectionTitle}>Grupos</Text>
          <View style={styles.groupsCard}>
            <View style={styles.groupsCardHeader}>
              <View>
                <Text style={styles.groupsCardTitle}>Classificação</Text>
                <Text style={styles.groupsCardSubtitle}>Grupo G • Atualizado Agora</Text>
              </View>
              <Ionicons name="bar-chart" size={24} color="#FACC15" />
            </View>

            <View style={styles.groupsRowsContainer}>
              {/* Row 1: Brasil */}
              <View style={styles.groupsRow}>
                <View style={styles.groupsRowLeft}>
                  <Text style={styles.groupsRowPos}>1</Text>
                  <Text style={styles.groupsRowFlag}>🇧🇷</Text>
                  <Text style={styles.groupsRowName}>Brasil</Text>
                </View>
                <View style={styles.groupsRowRight}>
                  <Text style={styles.groupsRowPts}>7 pts</Text>
                  <Text style={[styles.groupsRowSG, styles.sgPositive]}>+4 SG</Text>
                </View>
              </View>

              {/* Row 2: Suíça */}
              <View style={styles.groupsRow}>
                <View style={styles.groupsRowLeft}>
                  <Text style={styles.groupsRowPos}>2</Text>
                  <Text style={styles.groupsRowFlag}>🇨🇭</Text>
                  <Text style={styles.groupsRowName}>Suíça</Text>
                </View>
                <View style={styles.groupsRowRight}>
                  <Text style={styles.groupsRowPts}>4 pts</Text>
                  <Text style={[styles.groupsRowSG, styles.sgPositive]}>+1 SG</Text>
                </View>
              </View>

              {/* Row 3: Camarões */}
              <View style={styles.groupsRow}>
                <View style={styles.groupsRowLeft}>
                  <Text style={styles.groupsRowPos}>3</Text>
                  <Text style={styles.groupsRowFlag}>🇨🇲</Text>
                  <Text style={styles.groupsRowName}>Camarões</Text>
                </View>
                <View style={styles.groupsRowRight}>
                  <Text style={styles.groupsRowPts}>3 pts</Text>
                  <Text style={[styles.groupsRowSG, styles.sgNegative]}>-2 SG</Text>
                </View>
              </View>
            </View>

            <Link href="/groups" asChild>
              <TouchableOpacity style={styles.viewTableBtn}>
                <Text style={styles.viewTableBtnText}>Ver Tabela Completa</Text>
                <Ionicons name="arrow-forward" size={16} color="#05110B" />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        {/* Section 3: Bottom shortcuts */}
        <View style={styles.shortcutsGrid}>
          {/* Card 1: Conheça os Times */}
          <Link href="/teams" asChild>
            <TouchableOpacity style={styles.shortcutCard}>
              <View style={styles.shortcutIconContainer}>
                <Ionicons name="football" size={18} color="#4ADE80" />
              </View>
              <View>
                <Text style={styles.shortcutTitle}>Conheça os Times</Text>
                <Text style={styles.shortcutSubtitle}>Análise Técnica</Text>
              </View>
            </TouchableOpacity>
          </Link>

          {/* Card 2: Álbum Digital */}
          <Link href="/sticker" asChild>
            <TouchableOpacity style={styles.shortcutCard}>
              <View style={styles.shortcutIconContainer}>
                <Ionicons name="copy" size={18} color="#FACC15" />
              </View>
              <View>
                <Text style={[styles.shortcutTitle, { color: '#4ADE80' }]}>Álbum Digital</Text>
                <Text style={styles.shortcutSubtitle}>Suas Figurinhas</Text>
              </View>
            </TouchableOpacity>
          </Link>
        </View>

      </ScrollView>
    </View>
  );
}
