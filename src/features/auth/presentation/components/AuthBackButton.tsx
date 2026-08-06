import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { authStyles as styles } from '../styles/authStyles';

interface AuthBackButtonProps {
    onPress?: () => void;
}

export function AuthBackButton({ onPress }: AuthBackButtonProps) {
    const router = useRouter();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            router.back();
        }
    };

    return (
        <TouchableOpacity style={styles.backButton} onPress={handlePress}>
            <Ionicons name="arrow-back" size={18} color="#8CA185" />
            <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
    );
}
