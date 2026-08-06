import React from 'react';
import { Text, View } from 'react-native';
import { groupStageStyles as styles } from '../styles/groupStageStyles';

export interface StandingRow {
    pos: number;
    flag: string;
    name: string;
    p: number;
    j: number;
    sg: number;
}

interface GroupStandingsRowProps {
    row: StandingRow;
}

export function GroupStandingsRow({ row }: GroupStandingsRowProps) {
    const isQualifying = row.pos <= 2;

    return (
        <View style={styles.tableRow}>
            <View style={styles.tableTeamInfo}>
                <View
                    style={[
                        styles.posBadge,
                        isQualifying ? styles.posBadgeQualify : styles.posBadgeNormal,
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
                    row.sg > 0 ? styles.sgPositive : row.sg < 0 ? styles.sgNegative : {},
                ]}
            >
                {row.sg > 0 ? `+${row.sg}` : row.sg}
            </Text>
        </View>
    );
}
