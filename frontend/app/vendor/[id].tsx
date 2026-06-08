import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';

export default function VendorDetailScreen() {
  const { id } = useLocalSearchParams();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Ionicons name="storefront" size={64} color={colors.primary} />
        <Text style={[styles.name, { color: colors.text }]}>Mighty Vendors Co. #{id}</Text>
        <Text style={styles.rating}>⭐ 4.8 Rating • 120+ Events</Text>
      </View>
      <Card style={styles.card}>
        <Text style={[styles.aboutTitle, { color: colors.text }]}>About Vendor</Text>
        <Text style={{ color: colors.textSecondary, lineHeight: 22 }}>
          We are a premium event management company dedicated to making your celebrations unforgettable. 
          With over a decade of experience, we specialize in high-end weddings.
        </Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  header: { alignItems: 'center', marginVertical: 32 },
  name: { fontSize: 24, fontWeight: 'bold', marginTop: 16, marginBottom: 8 },
  rating: { fontSize: 16, color: '#687076' },
  card: { padding: 20 },
  aboutTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 }
});
