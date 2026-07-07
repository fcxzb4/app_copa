import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { calculateGroupStandings, matches, teams } from '../../../shared/data/worldCupData';
import type { Team } from '../../teams/domain/entities/Team';
import { groupStageStyles as styles } from './styles/groupStageStyles';

type SubTab = 'groups' | 'tables' | 'last_matches' | 'next_matches';

export default function GroupStageScreen() {
    const [activeTab, setActiveTab] = useState<SubTab>('groups');

    const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    const getTeam = (teamId: string): Team | undefined => {
        return teams.find(t => t.id === teamId);
    };

    const renderGroupsView = () => {
        return (
            <View style={styles.grid}>
                {groups.map(groupLetter => {
                    const groupTeams = teams.filter(t => t.group === groupLetter);
                    return (
                        <View key={groupLetter} style={styles.groupCard}>
                            <View style={styles.groupHeader}>
                                <Text style={styles.groupTitle}>GRUPO {groupLetter}</Text>
                            </View>
                            <View style={styles.groupTeamsList}>
                                {groupTeams.map((team, idx) => (
                                    <View key={team.id} style={styles.groupTeamItem}>
                                        <Text style={styles.groupTeamIndex}>{idx + 1}</Text>
                                        <Text style={styles.groupTeamFlag}>{team.flag}</Text>
                                        <Text style={styles.groupTeamName} numberOfLines={1}>
                                            {team.name}
                                        </Text>
                                        <Text style={styles.groupTeamConfed}>{team.confederation}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    };

    const renderTablesView = () => {
        return (
            <View style={styles.tablesContainer}>
                {groups.map(groupLetter => {
                    const standings = calculateGroupStandings(groupLetter);
                    return (
                        <View key={groupLetter} style={styles.tableCard}>
                            <View style={styles.tableHeaderZone}>
                                <Text style={styles.tableGroupTitle}>GRUPO {groupLetter}</Text>
                            </View>

                            {/* Table Column Headers */}
                            <View style={styles.tableRowHeader}>
                                <Text style={[styles.tableCol, styles.colTeamHeader]}>Classificação</Text>
                                <Text style={[styles.tableCol, styles.colNumberHeader, styles.colPts]}>P</Text>
                                <Text style={[styles.tableCol, styles.colNumberHeader]}>J</Text>
                                <Text style={[styles.tableCol, styles.colNumberHeader]}>V</Text>
                                <Text style={[styles.tableCol, styles.colNumberHeader]}>E</Text>
                                <Text style={[styles.tableCol, styles.colNumberHeader]}>D</Text>
                                <Text style={[styles.tableCol, styles.colNumberHeader]}>SG</Text>
                            </View>

                            {/* Table Body Rows */}
                            {standings.map((row, idx) => {
                                let posStyle = styles.posGeneral;
                                if (idx < 2) {
                                    posStyle = styles.posQualified;
                                } else if (idx === 2) {
                                    posStyle = styles.posPlayoff;
                                }

                                return (
                                    <View key={row.teamId} style={styles.tableRow}>
                                        <View style={styles.colTeam}>
                                            <View style={[styles.posBadge, posStyle]}>
                                                <Text style={styles.posText}>{idx + 1}</Text>
                                            </View>
                                            <Text style={styles.teamFlag}>{row.team.flag}</Text>
                                            <Text style={styles.teamName} numberOfLines={1}>
                                                {row.team.name}
                                            </Text>
                                        </View>
                                        <Text style={[styles.tableCol, styles.colNumber, styles.colPts, styles.boldText]}>{row.points}</Text>
                                        <Text style={[styles.tableCol, styles.colNumber]}>{row.played}</Text>
                                        <Text style={[styles.tableCol, styles.colNumber]}>{row.won}</Text>
                                        <Text style={[styles.tableCol, styles.colNumber]}>{row.drawn}</Text>
                                        <Text style={[styles.tableCol, styles.colNumber]}>{row.lost}</Text>
                                        <Text style={[styles.tableCol, styles.colNumber, row.goalDifference > 0 ? styles.positiveSG : row.goalDifference < 0 ? styles.negativeSG : {}]}>
                                            {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                                        </Text>
                                    </View>
                                );
                            })}

                            {/* Legend Indicator */}
                            <View style={styles.legendRow}>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                                    <Text style={styles.legendText}>Oitavas</Text>
                                </View>
                                <View style={styles.legendItem}>
                                    <View style={[styles.legendDot, { backgroundColor: '#D4AF37' }]} />
                                    <Text style={styles.legendText}>Repescagem (Melhores 3º)</Text>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    };

    const renderMatches = (completed: boolean) => {
        const filteredMatches = matches.filter(m => (completed ? m.status === 'completed' : m.status === 'upcoming'));

        if (filteredMatches.length === 0) {
            return (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>⚽</Text>
                    <Text style={styles.emptyTitle}>Nenhuma partida cadastrada</Text>
                </View>
            );
        }

        const sortedMatches = [...filteredMatches].sort((a, b) => {
            const parseDate = (dStr: string) => {
                const [day, month, year] = dStr.split('/').map(Number);
                return new Date(year, month - 1, day).getTime();
            };
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return completed ? dateB - dateA : dateA - dateB;
        });

        return (
            <View style={styles.matchesList}>
                {sortedMatches.map(match => {
                    const homeTeam = getTeam(match.homeTeamId);
                    const awayTeam = getTeam(match.awayTeamId);

                    if (!homeTeam || !awayTeam) return null;

                    const isHomeWinner = completed && (match.homeScore ?? 0) > (match.awayScore ?? 0);
                    const isAwayWinner = completed && (match.awayScore ?? 0) > (match.homeScore ?? 0);

                    return (
                        <View key={match.id} style={styles.matchCard}>
                            <View style={styles.matchCardHeader}>
                                <View style={styles.matchGroupBadge}>
                                    <Text style={styles.matchGroupBadgeText}>GRUPO {match.group}</Text>
                                </View>
                                <Text style={styles.matchDateInfo}>
                                    {match.date} às {match.time}
                                </Text>
                            </View>

                            <View style={styles.matchBody}>
                                {/* Home Team */}
                                <View style={[styles.matchTeam, styles.teamAlignRight]}>
                                    <Text style={[styles.matchTeamName, isHomeWinner && styles.winnerBold]}>{homeTeam.name}</Text>
                                    <Text style={styles.matchFlag}>{homeTeam.flag}</Text>
                                </View>

                                {/* Score / VS Center */}
                                <View style={styles.scoreContainer}>
                                    {completed ? (
                                        <View style={styles.scoreRow}>
                                            <Text style={[styles.scoreValue, isHomeWinner && styles.winnerScore]}>{match.homeScore}</Text>
                                            <Text style={styles.scoreDivider}>-</Text>
                                            <Text style={[styles.scoreValue, isAwayWinner && styles.winnerScore]}>{match.awayScore}</Text>
                                        </View>
                                    ) : (
                                        <View style={styles.vsContainer}>
                                            <Text style={styles.vsText}>VS</Text>
                                        </View>
                                    )}
                                </View>

                                {/* Away Team */}
                                <View style={[styles.matchTeam, styles.teamAlignLeft]}>
                                    <Text style={styles.matchFlag}>{awayTeam.flag}</Text>
                                    <Text style={[styles.matchTeamName, isAwayWinner && styles.winnerBold]}>{awayTeam.name}</Text>
                                </View>
                            </View>

                            <View style={styles.matchFooter}>
                                <Text style={styles.stadiumText}>📍 {match.stadium}</Text>
                            </View>
                        </View>
                    );
                })}
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <View style={styles.heroSection}>
                <Text style={styles.headerTitle}>Fase de Grupos</Text>
                <Text style={styles.headerSubtitle}>
                    Acompanhe os grupos, a tabela atualizada em tempo real e o calendário de jogos.
                </Text>
            </View>

            {/* Sub tabs Menu */}
            <View style={styles.tabsWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsBar}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'groups' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('groups')}
                    >
                        <Text style={styles.tabButtonIcon}>👥</Text>
                        <Text style={[styles.tabButtonText, activeTab === 'groups' && styles.tabButtonTextActive]}>
                            Grupos
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'tables' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('tables')}
                    >
                        <Text style={styles.tabButtonIcon}>📊</Text>
                        <Text style={[styles.tabButtonText, activeTab === 'tables' && styles.tabButtonTextActive]}>
                            Tabela dos Grupos
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'last_matches' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('last_matches')}
                    >
                        <Text style={styles.tabButtonIcon}>✅</Text>
                        <Text style={[styles.tabButtonText, activeTab === 'last_matches' && styles.tabButtonTextActive]}>
                            Últimos Jogos
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'next_matches' && styles.tabButtonActive]}
                        onPress={() => setActiveTab('next_matches')}
                    >
                        <Text style={styles.tabButtonIcon}>📅</Text>
                        <Text style={[styles.tabButtonText, activeTab === 'next_matches' && styles.tabButtonTextActive]}>
                            Próximos Jogos
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Active Tab View Rendering */}
            <View style={styles.tabContent}>
                {activeTab === 'groups' && renderGroupsView()}
                {activeTab === 'tables' && renderTablesView()}
                {activeTab === 'last_matches' && renderMatches(true)}
                {activeTab === 'next_matches' && renderMatches(false)}
            </View>
        </View>
    );
}
