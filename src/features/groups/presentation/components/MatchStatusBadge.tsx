import React from 'react';
import { Text, View } from 'react-native';
import { groupStageStyles as styles } from '../styles/groupStageStyles';

export type StatusType = 'finalizado' | 'live' | 'upcoming';

interface MatchStatusBadgeProps {
    status: string;
    statusType: StatusType;
}

const getStatusBadgeStyle = (type: StatusType) => {
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

export function MatchStatusBadge({ status, statusType }: MatchStatusBadgeProps) {
    const badgeStyle = getStatusBadgeStyle(statusType);

    return (
        <View style={[styles.statusBadge, { backgroundColor: badgeStyle.bg }]}>
            <Text style={[styles.statusBadgeText, { color: badgeStyle.text }]}>
                {status}
            </Text>
        </View>
    );
}
