import React from 'react';
import { Text, View } from 'react-native';
import { authStyles as styles } from '../styles/authStyles';

interface AuthFormHeaderProps {
    emoji: string;
    title: string;
    subtitle: string;
}

export function AuthFormHeader({ emoji, title, subtitle }: AuthFormHeaderProps) {
    return (
        <View style={styles.formLogoArea}>
            <View style={styles.formLogoBadge}>
                <Text style={styles.formLogoEmoji}>{emoji}</Text>
            </View>
            <Text style={styles.formTitle}>{title}</Text>
            <Text style={styles.formSubtitle}>{subtitle}</Text>
        </View>
    );
}
