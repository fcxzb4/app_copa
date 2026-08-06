import React from 'react';
import { View } from 'react-native';
import { useAuth } from './AuthContext';
import { GuestProfile, LoggedInProfile } from './components';
import { authStyles as styles } from './styles/authStyles';

export default function ProfileScreen() {
    const { isLoggedIn } = useAuth();

    return (
        <View style={styles.screen}>
            {isLoggedIn ? <LoggedInProfile /> : <GuestProfile />}
        </View>
    );
}
