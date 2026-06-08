import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/authSlice';
import { Button } from '@/components/ui/Button';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { role, userId } = useSelector((state: RootState) => state.auth);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={80} color={colors.primary} />
        <Text style={[styles.name, { color: colors.text }]}>User #{userId || 'Demo'}</Text>
        <Text style={styles.role}>{role || 'Customer'}</Text>
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
});
