import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Card } from '@/components/ui/Card';
import api from '@/api';

const { width } = Dimensions.get('window');

// Local imports of generated images, if available
const requireImages = {
  all: require('../../assets/images/venue.png'),
  venue: require('../../assets/images/venue.png'),
  photography: require('../../assets/images/photography.png'),
  catering: require('../../assets/images/cake.png'), // fallback to cake
  flowers: require('../../assets/images/venue.png'),
  cake: require('../../assets/images/cake.png'),
};

const CATEGORIES = [
  { id: 'all', name: 'All', image: requireImages.all },
  { id: 'venue', name: 'Venue', image: requireImages.venue },
  { id: 'photography', name: 'Photography', image: requireImages.photography },
  { id: 'catering', name: 'Catering', image: requireImages.catering },
  { id: 'flowers', name: 'Flowers', image: requireImages.flowers },
  { id: 'cake', name: 'Cake', image: requireImages.cake },
];

const DUMMY_SERVICES = [
  {
    serviceId: 101,
    title: 'Custom Wedding Cake Design',
    vendor: { businessName: 'Sweet Celebrations' },
    basePrice: 400.0,
    maxPrice: 800.0,
    rating: 4.9,
    image: requireImages.cake,
  },
  {
    serviceId: 102,
    title: 'Garden Wedding Venue',
    vendor: { businessName: 'Elegant Venues Co.' },
    basePrice: 3500.0,
    maxPrice: 6000.0,
    rating: 4.9,
    image: requireImages.venue,
  },
  {
    serviceId: 103,
    title: 'Premium Wedding Photography',
    vendor: { businessName: 'Moments Photography' },
    basePrice: 2500.0,
    maxPrice: 4000.0,
    rating: 4.9,
    image: requireImages.photography,
  }
];

export default function HomeScreen() {
  const [services, setServices] = useState<any[]>(DUMMY_SERVICES);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  useEffect(() => {
    // Attempt to load from the real spring boot backend
    const fetchServices = async () => {
      try {
        const response = await api.get('/services?city=All&category=All');
        if (response.data && response.data.length > 0) {
          setServices(response.data);
        }
      } catch (err) {
        console.log("Using local mock data, backend not available or empty.");
      }
    };
    fetchServices();
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>
      <View style={styles.categoriesGrid}>
        {CATEGORIES.map((cat, idx) => (
          <TouchableOpacity 
            key={cat.id} 
            style={styles.categoryCard}
            onPress={() => router.push(`/search?category=${cat.id}`)}
          >
            <Image source={cat.image} style={styles.categoryImage} />
            <View style={styles.categoryOverlay}>
              <Text style={styles.categoryText}>{cat.name}</Text>
            </View>
            {idx === 0 && <View style={[styles.activeBorder, { borderColor: colors.primary }]} />}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Services</Text>
    </View>
  );

  const renderServiceCard = ({ item }: { item: any }) => {
    // Use fallback image if backend model
    const bgImage = item.image || requireImages.all;
    
    return (
      <TouchableOpacity onPress={() => router.push(`/service/${item.serviceId}`)}>
        <Card style={styles.serviceCard}>
          <Image source={bgImage} style={styles.serviceImage} />
          <View style={styles.serviceDetails}>
            <Text style={[styles.serviceTitle, { color: colors.text }]}>{item.title}</Text>
            <Text style={styles.vendorName}>by {item.vendor?.businessName || item.vendor?.name || 'Local Vendor'}</Text>
            
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={16} color={colors.rating} />
              <Text style={[styles.ratingText, { color: colors.text }]}>{item.rating || 4.5}</Text>
            </View>

            <Text style={[styles.priceText, { color: colors.primary }]}>
              ${item.basePrice} {item.maxPrice ? `- $${item.maxPrice}` : '+'}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.serviceId.toString()}
        renderItem={renderServiceCard}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryCard: {
    width: (width - 32) / 2 - 8,
    height: 140,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 3,
    borderRadius: 12,
  },
  serviceCard: {
    padding: 0, // remove default card padding
    overflow: 'hidden',
    marginBottom: 20,
  },
  serviceImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  serviceDetails: {
    padding: 16,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  vendorName: {
    fontSize: 14,
    color: '#687076',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 6,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
