import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { loginSuccess } from '@/store/authSlice';
import api from '@/api';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'Customer' | 'Vendor'>('Customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useDispatch();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const handleAuth = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      const endpoint = isLogin ? '/users/login' : '/users/signup';
      const response = await api.post(endpoint, { email, passwordHash: password, role });
      const { token, userId, role: returnedRole } = response.data;
      dispatch(loginSuccess({ token, userId, role: returnedRole ?? role }));
      router.replace('/(tabs)');
    } catch (e: any) {
      const msg = e?.response?.status === 401
        ? 'Invalid email or password.'
        : 'Could not connect to server. Please try again.';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const TabButton = ({ title, active, onPress }: { title: string, active: boolean, onPress: () => void }) => (
    <TouchableOpacity
      style={[styles.tabButton, active ? { backgroundColor: colors.primary } : { backgroundColor: colors.border }]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, { color: active ? '#fff' : colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );

  const RoleButton = ({ title, active, onPress }: { title: string, active: boolean, onPress: () => void }) => (
    <TouchableOpacity
      style={[
        styles.roleButton, 
        active ? { borderColor: colors.primary, backgroundColor: colors.primary + '10' } : { borderColor: colors.border }
      ]}
      onPress={onPress}
    >
      <Text style={[styles.roleText, { color: active ? colors.primary : colors.text }]}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <View style={[styles.logoContainer, { backgroundColor: colors.primary }]}>
          <Ionicons name="heart" size={32} color="#fff" />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Wedding Services</Text>
        <Text style={styles.subtitle}>Your perfect celebration starts here</Text>
      </View>

      <Card style={styles.card}>
        <View style={styles.tabsRow}>
          <TabButton title="Login" active={isLogin} onPress={() => setIsLogin(true)} />
          <TabButton title="Sign Up" active={!isLogin} onPress={() => setIsLogin(false)} />
        </View>

        <Text style={[styles.roleLabel, { color: colors.text }]}>I am a:</Text>
        <View style={styles.roleRow}>
          <RoleButton title="Customer" active={role === 'Customer'} onPress={() => setRole('Customer')} />
          <RoleButton title="Vendor" active={role === 'Vendor'} onPress={() => setRole('Vendor')} />
        </View>

        <Input 
          label="Email" 
          placeholder="your@email.com" 
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        
        <Input 
          label="Password" 
          placeholder="••••••••" 
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button 
          title={isLogin ? 'Login' : 'Sign Up'} 
          onPress={handleAuth} 
          loading={loading}
          style={{ marginTop: 10 }}
        />

        {isLogin && (
          <TouchableOpacity style={styles.forgotButton}>
            <Text style={{ color: colors.primary, textAlign: 'center' }}>Forgot password?</Text>
          </TouchableOpacity>
        )}
      </Card>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#687076',
  },
  card: {
    padding: 24,
  },
  tabsRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabText: {
    fontWeight: '600',
    fontSize: 16,
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  roleRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  roleText: {
    fontWeight: '500',
  },
  forgotButton: {
    marginTop: 20,
  },
});
