import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { authStyles as styles } from '../styles/authStyles';

interface AuthSubmitButtonProps {
    title: string;
    loading: boolean;
    onPress: () => void;
}

export function AuthSubmitButton({ title, loading, onPress }: AuthSubmitButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.85}
        >
            {loading ? (
                <ActivityIndicator color="#05110B" />
            ) : (
                <Text style={styles.submitBtnText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}
