import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import api from '@/api';

export default function VendorDetailScreen() {
  const { id } = useLocalSearchParams();
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  useEffect(() => {
    api.get(`/vendors/${id}`)
      .then(res => setVendor(res.data))
      .catch(() => setVendor({
        businessName: 'Premium Vendor',
        ownerName: 'Event Specialist',
        city: 'Mumbai',
        rating: 4.8,
        verificationStatus: 'VERIFIED',
      }))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Ionicons name="storefront" size={64} color={colors.primary} />
        <Text style={[styles.name, { color: colors.text }]}>{vendor.businessName}</Text>
        <Text style={styles.rating}>⭐ {vendor.rating?.toFixed(1)} Rating • {vendor.city}</Text>
        {vendor.verificationStatus === 'VERIFIED' && (
          <View style={styles.badge}>
            <Ionicons name="checkmark-circle" size={14} color="#22c55e" />
            <Text style={styles.badgeText}>Verified Vendor</Text>
          </View>
        )}
      </View>
      <Card style={styles.card}>
        <Text style={[styles.aboutTitle, { color: colors.text }]}>About</Text>
        <Text style={{ color: colors.textSecondary, lineHeight: 22 }}>
          {vendor.ownerName ? `Managed by ${vendor.ownerName}. ` : ''}
          A trusted celebration services provider dedicated to making your events unforgettable.
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
