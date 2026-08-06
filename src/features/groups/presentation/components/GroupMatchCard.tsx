import React from 'react';
import { Text, View } from 'react-native';
import { groupStageStyles as styles } from '../styles/groupStageStyles';
import { MatchStatusBadge, StatusType } from './MatchStatusBadge';

export interface MatchRecord {
    id: string;
    stadium: string;
    status: string;
    statusType: StatusType;
    team1: string;
    flag1: string;
    team2: string;
    flag2: string;
    score1?: number;
    score2?: number;
}

interface GroupMatchCardProps {
    match: MatchRecord;
}

export function GroupMatchCard({ match }: GroupMatchCardProps) {
    const isUpcoming = match.statusType === 'upcoming';

    return (
        <View style={styles.matchCard}>
            <View style={styles.matchCardHeader}>
                <Text style={styles.stadiumText}>{match.stadium}</Text>
                <MatchStatusBadge status={match.status} statusType={match.statusType} />
            </View>

            <View style={styles.matchBody}>
                {/* Team 1 */}
                <View style={styles.matchTeamColumn}>
                    <View style={styles.matchFlagCircle}>
                        <Text style={{ fontSize: 20 }}>{match.flag1}</Text>
                    </View>
                    <Text style={styles.matchTeamName} numberOfLines={1}>
                        {match.team1}
                    </Text>
                </View>

                {/* Score / VS Center */}
                <View style={styles.scoreCenter}>
                    {isUpcoming ? (
                        <Text style={styles.vsText}>X</Text>
                    ) : (
                        <Text style={styles.scoreText}>
                            {match.score1} {match.score2}
                        </Text>
                    )}
                </View>

                {/* Team 2 */}
                <View style={styles.matchTeamColumn}>
                    <View style={styles.matchFlagCircle}>
                        <Text style={{ fontSize: 20 }}>{match.flag2}</Text>
                    </View>
                    <Text style={styles.matchTeamName} numberOfLines={1}>
                        {match.team2}
                    </Text>
                </View>
            </View>
        </View>
    );
}
