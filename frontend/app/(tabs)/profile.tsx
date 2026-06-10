import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/authSlice';
import { Button } from '@/components/ui/Button';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import api from '@/api';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { role, userId } = useSelector((state: RootState) => state.auth);
  const [profile, setProfile] = useState<any>(null);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  useEffect(() => {
    if (userId) {
      api.get(`/users/${userId}/profile`)
        .then(res => setProfile(res.data))
        .catch(() => {});
    }
  }, [userId]);

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
  };

  const displayName = profile?.name || `User #${userId || 'Demo'}`;
  const displayEmail = profile?.email || '';
  const displayCity = profile?.city || '';

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={80} color={colors.primary} />
        <Text style={[styles.name, { color: colors.text }]}>{displayName}</Text>
        <Text style={styles.role}>{role || 'Customer'}</Text>
        {displayEmail ? <Text style={[styles.meta, { color: colors.textSecondary }]}>{displayEmail}</Text> : null}
        {displayCity ? <Text style={[styles.meta, { color: colors.textSecondary }]}>{displayCity}</Text> : null}
      </View>

      <Button title="Logout" variant="outline" onPress={handleLogout} style={styles.logoutButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginVertical: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  role: {
    fontSize: 16,
    color: '#687076',
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  meta: {
    fontSize: 14,
    marginTop: 4,
  },
});
