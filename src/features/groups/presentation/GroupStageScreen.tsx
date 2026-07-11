import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { groupStageStyles as styles } from './styles/groupStageStyles';

interface StandingRow {
  pos: number;
  flag: string;
  name: string;
  p: number;
  j: number;
  sg: number;
}

interface MatchRecord {
  id: string;
  stadium: string;
  status: string;
  statusType: 'finalizado' | 'live' | 'upcoming';
  team1: string;
  flag1: string;
  team2: string;
  flag2: string;
  score1?: number;
  score2?: number;
}

interface GroupData {
  standings: StandingRow[];
  lastMatches: MatchRecord[];
  upcomingMatches: MatchRecord[];
}

const groupsMockData: { [key: string]: GroupData } = {
  A: {
    standings: [
      { pos: 1, flag: '🇧🇷', name: 'Brasil', p: 9, j: 3, sg: 6 },
      { pos: 2, flag: '🇨🇭', name: 'Suíça', p: 6, j: 3, sg: 1 },
      { pos: 3, flag: '🇨🇲', name: 'Camarões', p: 3, j: 3, sg: -1 },
      { pos: 4, flag: '🇷🇸', name: 'Sérvia', p: 0, j: 3, sg: -6 },
    ],
    lastMatches: [
      { id: 'a-l1', stadium: 'Estádio Lusail', status: 'Finalizado', statusType: 'finalizado', team1: 'Brasil', flag1: '🇧🇷', team2: 'Sérvia', flag2: '🇷🇸', score1: 2, score2: 0 },
      { id: 'a-l2', stadium: 'Estádio 974', status: "Live 75'", statusType: 'live', team1: 'Suíça', flag1: '🇨🇭', team2: 'Camarões', flag2: '🇨🇲', score1: 1, score2: 1 },
    ],
    upcomingMatches: [
      { id: 'a-u1', stadium: 'Estádio Vampeta Revista G-Magazine', status: 'Sab 13/10', statusType: 'upcoming', team1: 'Brasuca', flag1: '🇧🇷', team2: 'Servical', flag2: '🇷🇸' },
      { id: 'a-u2', stadium: 'Estádio Van Daime', status: 'Dom 14/10', statusType: 'upcoming', team1: 'Suica', flag1: '🇨🇭', team2: 'Camarões', flag2: '🇨🇲' },
    ],
  },
  B: {
    standings: [
      { pos: 1, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'Inglaterra', p: 7, j: 3, sg: 4 },
      { pos: 2, flag: '🇺🇸', name: 'Estados Unidos', p: 5, j: 3, sg: 2 },
      { pos: 3, flag: '🇮🇷', name: 'Irã', p: 3, j: 3, sg: -2 },
      { pos: 4, flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', name: 'País de Gales', p: 1, j: 3, sg: -4 },
    ],
    lastMatches: [
      { id: 'b-l1', stadium: 'Estádio Al Bayt', status: 'Finalizado', statusType: 'finalizado', team1: 'Inglaterra', flag1: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', team2: 'País de Gales', flag2: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', score1: 3, score2: 0 },
      { id: 'b-l2', stadium: 'Estádio Ahmad bin Ali', status: 'Finalizado', statusType: 'finalizado', team1: 'Estados Unidos', flag1: '🇺🇸', team2: 'Irã', flag2: '🇮🇷', score1: 1, score2: 0 },
    ],
    upcomingMatches: [
      { id: 'b-u1', stadium: 'Estádio Internacional Khalifa', status: 'Sab 20/10', statusType: 'upcoming', team1: 'Inglaterra', flag1: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', team2: 'Estados Unidos', flag2: '🇺🇸' },
      { id: 'b-u2', stadium: 'Estádio Education City', status: 'Dom 21/10', statusType: 'upcoming', team1: 'Irã', flag1: '🇮🇷', team2: 'País de Gales', flag2: '🏴󠁧󠁢󠁷󠁬󠁳󠁿' },
    ],
  },
  C: {
    standings: [
      { pos: 1, flag: '🇦🇷', name: 'Argentina', p: 9, j: 3, sg: 5 },
      { pos: 2, flag: '🇵🇱', name: 'Polônia', p: 4, j: 3, sg: 0 },
      { pos: 3, flag: '🇲🇽', name: 'México', p: 4, j: 3, sg: -1 },
      { pos: 4, flag: '🇸🇦', name: 'Arábia Saudita', p: 0, j: 3, sg: -4 },
    ],
    lastMatches: [
      { id: 'c-l1', stadium: 'Estádio Lusail', status: 'Finalizado', statusType: 'finalizado', team1: 'Argentina', flag1: '🇦🇷', team2: 'México', flag2: '🇲🇽', score1: 2, score2: 0 },
      { id: 'c-l2', stadium: 'Estádio 974', status: 'Finalizado', statusType: 'finalizado', team1: 'Polônia', flag1: '🇵🇱', team2: 'Arábia Saudita', flag2: '🇸🇦', score1: 2, score2: 0 },
    ],
    upcomingMatches: [
      { id: 'c-u1', stadium: 'Estádio Al Bayt', status: 'Qua 24/10', statusType: 'upcoming', team1: 'Argentina', flag1: '🇦🇷', team2: 'Polônia', flag2: '🇵🇱' },
      { id: 'c-u2', stadium: 'Estádio Ahmad bin Ali', status: 'Qua 24/10', statusType: 'upcoming', team1: 'México', flag1: '🇲🇽', team2: 'Arábia Saudita', flag2: '🇸🇦' },
    ],
  },
};

const groupsList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export default function GroupStageScreen() {
  const [selectedGroup, setSelectedGroup] = useState('A');

  // Fallback to Group A if mock data doesn't exist for selected group
  const activeGroupData = groupsMockData[selectedGroup] || groupsMockData['A'];

  const getStatusBadgeStyle = (type: string) => {
    switch (type) {
      case 'finalizado':
        return { bg: '#1E293B', text: '#8CA185' };
      case 'live':
        return { bg: '#EF4444', text: '#FFFFFF' };
      case 'upcoming':
      default:
        return { bg: 'rgba(250, 204, 21, 0.1)', text: '#FACC15' };
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Titles */}
        <View>
          <Text style={styles.subHeaderLabel}>Classificação Geral</Text>
          <Text style={styles.titleText}>Fase de Grupos</Text>
        </View>

        {/* Group Selector Horizontal Carousel */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.groupScroll}
          contentContainerStyle={styles.groupScrollContent}
        >
          {groupsList.map((group) => {
            const isActive = selectedGroup === group;
            return (
              <TouchableOpacity
                key={group}
                style={[styles.groupPill, isActive && styles.groupPillActive]}
                onPress={() => setSelectedGroup(group)}
              >
                <Text style={[styles.groupPillText, isActive && styles.groupPillTextActive]}>
                  Grupo {group}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Standings Table Card */}
        <View style={styles.tableCard}>
          <View style={styles.tableCardHeader}>
            <Text style={styles.tableCardTitle}>Tabela Grupo {selectedGroup}</Text>
            <Ionicons name="bar-chart" size={18} color="#4ADE80" />
          </View>

          {/* Table Row Headers */}
          <View style={styles.tableRowHeader}>
            <Text style={[styles.colHeaderLabel, styles.colTeam]}>#     Time</Text>
            <Text style={[styles.colHeaderLabel, styles.colStatHeader]}>P</Text>
            <Text style={[styles.colHeaderLabel, styles.colStatHeader]}>J</Text>
            <Text style={[styles.colHeaderLabel, styles.colStatHeader]}>SG</Text>
          </View>

          {/* Table Body rows */}
          {activeGroupData.standings.map((row) => {
            const isQualifying = row.pos <= 2;
            return (
              <View key={row.name} style={styles.tableRow}>
                <View style={styles.tableTeamInfo}>
                  <View 
                    style={[
                      styles.posBadge, 
                      isQualifying ? styles.posBadgeQualify : styles.posBadgeNormal
                    ]}
                  >
                    <Text style={styles.posBadgeText}>{row.pos}</Text>
                  </View>
                  <Text style={styles.teamFlag}>{row.flag}</Text>
                  <Text style={styles.teamNameText}>{row.name}</Text>
                </View>
                
                <Text style={[styles.colStatValue, styles.colPtsValue]}>{row.p}</Text>
                <Text style={styles.colStatValue}>{row.j}</Text>
                <Text 
                  style={[
                    styles.colStatValue, 
                    row.sg > 0 ? styles.sgPositive : row.sg < 0 ? styles.sgNegative : {}
                  ]}
                >
                  {row.sg > 0 ? `+${row.sg}` : row.sg}
                </Text>
              </View>
            );
          })}
        </View>

        {/* ÚLTIMOS JOGOS Section */}
        <View>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar-outline" size={18} color="#4ADE80" />
            <Text style={styles.sectionTitle}>Últimos Jogos</Text>
          </View>

          <View style={styles.matchesContainer}>
            {activeGroupData.lastMatches.map((match) => {
              const badgeStyle = getStatusBadgeStyle(match.statusType);
              return (
                <View key={match.id} style={styles.matchCard}>
                  <View style={styles.matchCardHeader}>
                    <Text style={styles.stadiumText}>{match.stadium}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: badgeStyle.bg }]}>
                      <Text style={[styles.statusBadgeText, { color: badgeStyle.text }]}>
                        {match.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.matchBody}>
                    {/* Team 1 */}
                    <View style={styles.matchTeamColumn}>
                      <View style={styles.matchFlagCircle}>
                        <Text style={{ fontSize: 20 }}>{match.flag1}</Text>
                      </View>
                      <Text style={styles.matchTeamName} numberOfLines={1}>{match.team1}</Text>
                    </View>

                    {/* Score Center */}
                    <View style={styles.scoreCenter}>
                      <Text style={styles.scoreText}>
                        {match.score1} {match.score2}
                      </Text>
                    </View>

                    {/* Team 2 */}
                    <View style={styles.matchTeamColumn}>
                      <View style={styles.matchFlagCircle}>
                        <Text style={{ fontSize: 20 }}>{match.flag2}</Text>
                      </View>
                      <Text style={styles.matchTeamName} numberOfLines={1}>{match.team2}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* PRÓXIMOS JOGOS Section */}
        <View>
          <View style={styles.sectionHeader}>
            <Ionicons name="time-outline" size={18} color="#4ADE80" />
            <Text style={styles.sectionTitle}>Próximos Jogos</Text>
          </View>

          <View style={styles.matchesContainer}>
            {activeGroupData.upcomingMatches.map((match) => {
              const badgeStyle = getStatusBadgeStyle(match.statusType);
              return (
                <View key={match.id} style={styles.matchCard}>
                  <View style={styles.matchCardHeader}>
                    <Text style={styles.stadiumText}>{match.stadium}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: badgeStyle.bg }]}>
                      <Text style={[styles.statusBadgeText, { color: badgeStyle.text }]}>
                        {match.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.matchBody}>
                    {/* Team 1 */}
                    <View style={styles.matchTeamColumn}>
                      <View style={styles.matchFlagCircle}>
                        <Text style={{ fontSize: 20 }}>{match.flag1}</Text>
                      </View>
                      <Text style={styles.matchTeamName} numberOfLines={1}>{match.team1}</Text>
                    </View>

                    {/* VS Center */}
                    <View style={styles.scoreCenter}>
                      <Text style={styles.vsText}>X</Text>
                    </View>

                    {/* Team 2 */}
                    <View style={styles.matchTeamColumn}>
                      <View style={styles.matchFlagCircle}>
                        <Text style={{ fontSize: 20 }}>{match.flag2}</Text>
                      </View>
                      <Text style={styles.matchTeamName} numberOfLines={1}>{match.team2}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
