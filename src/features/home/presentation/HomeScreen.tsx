import React, { useMemo } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { calculateGroupStandings } from '../../../shared/data/worldCupData';
import { homeStyles as styles } from './styles/home_styles';

export default function HomeScreen() {
  // Obtém a classificação atualizada do Grupo C (Grupo do Brasil na Copa 2026)
  const groupCStandings = useMemo(() => {
    return calculateGroupStandings('C');
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Section 1: JOGOS AO-VIVO (3 jogos dos 16-avos de final) */}
        <View>
          <Text style={styles.sectionTitle}>Jogos Ao-Vivo</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.liveScroll}
            contentContainerStyle={styles.liveScrollContent}
          >
            {/* Card 1: BRA x JPN (16-avos de Final) */}
            <View style={styles.liveCard}>
              <View style={styles.liveCardHeader}>
                <Text style={styles.liveCardPhase}>{"16-avos de Final • 78'"}</Text>
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
                    <Text style={styles.liveTeamFlag}>🇯🇵</Text>
                    <Text style={styles.liveTeamCode}>JPN</Text>
                  </View>
                  <Text style={styles.liveTeamScore}>1</Text>
                </View>
              </View>
            </View>

            {/* Card 2: MEX x ECU (16-avos de Final) */}
            <View style={styles.liveCard}>
              <View style={styles.liveCardHeader}>
                <Text style={styles.liveCardPhase}>{"16-avos de Final • 45'"}</Text>
                <View style={[styles.liveBadge, { backgroundColor: '#475569' }]}>
                  <Text style={styles.liveBadgeText}>Intervalo</Text>
                </View>
              </View>
              <View style={styles.liveTeamsContainer}>
                <View style={styles.liveTeamRow}>
                  <View style={styles.liveTeamLeft}>
                    <Text style={styles.liveTeamFlag}>🇲🇽</Text>
                    <Text style={styles.liveTeamCode}>MEX</Text>
                  </View>
                  <Text style={styles.liveTeamScore}>1</Text>
                </View>
                <View style={styles.liveTeamRow}>
                  <View style={styles.liveTeamLeft}>
                    <Text style={styles.liveTeamFlag}>🇪🇨</Text>
                    <Text style={styles.liveTeamCode}>ECU</Text>
                  </View>
                  <Text style={styles.liveTeamScore}>0</Text>
                </View>
              </View>
            </View>

            {/* Card 3: ARG x CPV (16-avos de Final) */}
            <View style={styles.liveCard}>
              <View style={styles.liveCardHeader}>
                <Text style={styles.liveCardPhase}>{"16-avos de Final • 32'"}</Text>
                <View style={styles.liveBadge}>
                  <Text style={styles.liveBadgeText}>● AO VIVO</Text>
                </View>
              </View>
              <View style={styles.liveTeamsContainer}>
                <View style={styles.liveTeamRow}>
                  <View style={styles.liveTeamLeft}>
                    <Text style={styles.liveTeamFlag}>🇦🇷</Text>
                    <Text style={styles.liveTeamCode}>ARG</Text>
                  </View>
                  <Text style={styles.liveTeamScore}>3</Text>
                </View>
                <View style={styles.liveTeamRow}>
                  <View style={styles.liveTeamLeft}>
                    <Text style={styles.liveTeamFlag}>🇨🇻</Text>
                    <Text style={styles.liveTeamCode}>CPV</Text>
                  </View>
                  <Text style={styles.liveTeamScore}>0</Text>
                </View>
              </View>
            </View>

          </ScrollView>
        </View>

        {/* Section 2: GRUPOS Classificação preview (Grupo C - Grupo do Brasil em 2026) */}
        <View>
          <Text style={styles.sectionTitle}>Grupos</Text>
          <View style={styles.groupsCard}>
            <View style={styles.groupsCardHeader}>
              <View>
                <Text style={styles.groupsCardTitle}>Classificação</Text>
                <Text style={styles.groupsCardSubtitle}>Grupo C • Atualizado Agora</Text>
              </View>
              <Ionicons name="bar-chart" size={24} color="#FACC15" />
            </View>

            <View style={styles.groupsRowsContainer}>
              {groupCStandings.map((standing, index) => {
                const sg = standing.goalDifference;
                const sgFormatted = sg > 0 ? `+${sg} SG` : `${sg} SG`;
                const isPositive = sg >= 0;

                return (
                  <View key={standing.teamId} style={styles.groupsRow}>
                    <View style={styles.groupsRowLeft}>
                      <Text style={styles.groupsRowPos}>{index + 1}</Text>
                      <Text style={styles.groupsRowFlag}>{standing.team.flag}</Text>
                      <Text style={styles.groupsRowName}>{standing.team.name}</Text>
                    </View>
                    <View style={styles.groupsRowRight}>
                      <Text style={styles.groupsRowPts}>{standing.points} pts</Text>
                      <Text style={[styles.groupsRowSG, isPositive ? styles.sgPositive : styles.sgNegative]}>
                        {sgFormatted}
                      </Text>
                    </View>
                  </View>
                );
              })}
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
