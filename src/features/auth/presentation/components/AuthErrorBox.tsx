import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { authStyles as styles } from '../styles/authStyles';

interface AuthErrorBoxProps {
    error: string | null;
}

export function AuthErrorBox({ error }: AuthErrorBoxProps) {
    if (!error) return null;

    return (
        <View style={styles.errorBox}>
            <Ionicons name="alert-circle-outline" size={16} color="#F87171" />
            <Text style={styles.errorText}>{error}</Text>
        </View>
    );
}
