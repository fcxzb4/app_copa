import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { groupStageStyles as styles } from '../styles/groupStageStyles';
import { GroupStandingsRow, StandingRow } from './GroupStandingsRow';

interface GroupStandingsTableProps {
    groupName: string;
    standings: StandingRow[];
}

export function GroupStandingsTable({ groupName, standings }: GroupStandingsTableProps) {
    return (
        <View style={styles.tableCard}>
            <View style={styles.tableCardHeader}>
                <Text style={styles.tableCardTitle}>Tabela Grupo {groupName}</Text>
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
            {standings.map((row) => (
                <GroupStandingsRow key={row.name} row={row} />
            ))}
        </View>
    );
}
