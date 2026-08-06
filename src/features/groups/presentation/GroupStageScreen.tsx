import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { calculateGroupStandings, matches, teams } from '../../../shared/data/worldCupData';
import {
    GroupMatchesSection,
    GroupSelectorCarousel,
    GroupStandingsTable,
    MatchRecord,
    StandingRow,
} from './components';
import { groupStageStyles as styles } from './styles/groupStageStyles';

const groupsList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export default function GroupStageScreen() {
    const [selectedGroup, setSelectedGroup] = useState('A');

    const standingsData: StandingRow[] = useMemo(() => {
        const calculated = calculateGroupStandings(selectedGroup);
        return calculated.map((s, index) => ({
            pos: index + 1,
            flag: s.team.flag,
            name: s.team.name,
            p: s.points,
            j: s.played,
            sg: s.goalDifference,
        }));
    }, [selectedGroup]);

    const { lastMatches, upcomingMatches } = useMemo(() => {
        const groupMatches = matches.filter((m) => m.group === selectedGroup);

        const last: MatchRecord[] = [];
        const upcoming: MatchRecord[] = [];

        groupMatches.forEach((m) => {
            const homeTeam = teams.find((t) => t.id === m.homeTeamId);
            const awayTeam = teams.find((t) => t.id === m.awayTeamId);

            const record: MatchRecord = {
                id: m.id,
                stadium: m.stadium,
                status: m.status === 'completed' ? 'Finalizado' : `${m.date} - ${m.time}`,
                statusType: m.status === 'completed' ? 'finalizado' : 'upcoming',
                team1: homeTeam ? homeTeam.name : m.homeTeamId,
                flag1: homeTeam ? homeTeam.flag : '🏳️',
                team2: awayTeam ? awayTeam.name : m.awayTeamId,
                flag2: awayTeam ? awayTeam.flag : '🏳️',
                score1: m.homeScore,
                score2: m.awayScore,
            };

            if (m.status === 'completed') {
                last.push(record);
            } else {
                upcoming.push(record);
            }
        });

        return { lastMatches: last, upcomingMatches: upcoming };
    }, [selectedGroup]);

    return (
        <View style={styles.screen}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header Titles */}
                <View>
                    <Text style={styles.subHeaderLabel}>Classificação Geral</Text>
                    <Text style={styles.titleText}>Fase de Grupos</Text>
                </View>

                {/* Group Selector Horizontal Carousel */}
                <GroupSelectorCarousel
                    groups={groupsList}
                    selectedGroup={selectedGroup}
                    onSelectGroup={setSelectedGroup}
                />

                {/* Standings Table Card */}
                <GroupStandingsTable
                    groupName={selectedGroup}
                    standings={standingsData}
                />

                {/* ÚLTIMOS JOGOS Section */}
                {lastMatches.length > 0 && (
                    <GroupMatchesSection
                        title="Resultados dos Jogos"
                        iconName="calendar-outline"
                        matches={lastMatches}
                    />
                )}

                {/* PRÓXIMOS JOGOS Section */}
                {upcomingMatches.length > 0 && (
                    <GroupMatchesSection
                        title="Próximos Jogos"
                        iconName="time-outline"
                        matches={upcomingMatches}
                    />
                )}

            </ScrollView>
        </View>
    );
}
