import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';
import { authStyles as styles } from '../styles/authStyles';

interface AuthInputProps extends TextInputProps {
    iconName: keyof typeof Ionicons.glyphMap;
    isPassword?: boolean;
    hasError?: boolean;
}

export function AuthInput({
    iconName,
    isPassword = false,
    hasError = false,
    ...rest
}: AuthInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View
            style={[
                styles.inputWrapper,
                isFocused && styles.inputWrapperFocused,
                hasError && styles.inputWrapperError,
            ]}
        >
            <Ionicons
                name={iconName}
                size={18}
                color={isFocused ? '#4ADE80' : '#4A6741'}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#4A6741"
                {...rest}
                onFocus={(e) => {
                    setIsFocused(true);
                    rest.onFocus?.(e);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                    rest.onBlur?.(e);
                }}
                secureTextEntry={isPassword && !showPassword}
            />
            {isPassword && (
                <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
                    <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={18}
                        color="#4A6741"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}
