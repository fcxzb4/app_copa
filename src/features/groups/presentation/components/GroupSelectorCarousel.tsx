import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { groupStageStyles as styles } from '../styles/groupStageStyles';

interface GroupSelectorCarouselProps {
    groups: string[];
    selectedGroup: string;
    onSelectGroup: (group: string) => void;
}

export function GroupSelectorCarousel({
    groups,
    selectedGroup,
    onSelectGroup,
}: GroupSelectorCarouselProps) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.groupScroll}
            contentContainerStyle={styles.groupScrollContent}
        >
            {groups.map((group) => {
                const isActive = selectedGroup === group;
                return (
                    <TouchableOpacity
                        key={group}
                        style={[styles.groupPill, isActive && styles.groupPillActive]}
                        onPress={() => onSelectGroup(group)}
                    >
                        <Text style={[styles.groupPillText, isActive && styles.groupPillTextActive]}>
                            Grupo {group}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}
