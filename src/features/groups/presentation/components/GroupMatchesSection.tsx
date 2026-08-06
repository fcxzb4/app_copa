import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { groupStageStyles as styles } from '../styles/groupStageStyles';
import { GroupMatchCard, MatchRecord } from './GroupMatchCard';

interface GroupMatchesSectionProps {
    title: string;
    iconName: keyof typeof Ionicons.glyphMap;
    matches: MatchRecord[];
}

export function GroupMatchesSection({ title, iconName, matches }: GroupMatchesSectionProps) {
    return (
        <View>
            <View style={styles.sectionHeader}>
                <Ionicons name={iconName} size={18} color="#4ADE80" />
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>

            <View style={styles.matchesContainer}>
                {matches.map((match) => (
                    <GroupMatchCard key={match.id} match={match} />
                ))}
            </View>
        </View>
    );
}
