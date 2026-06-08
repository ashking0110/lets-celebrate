import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { addToCart } from '@/store/cartSlice';
import api from '@/api';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const [service, setService] = useState<any>(null);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        setService(res.data);
      } catch (err) {
        // Fallback mock
        setService({
          serviceId: Number(id),
          title: 'Premium Service Detail View',
          description: 'This is a premium wedding service perfectly crafted to meet your unique needs. Enjoy a customized experience that will make your day unforgettable.',
          basePrice: 500,
          vendor: { vendorId: 1, businessName: 'Mighty Vendors Co.', rating: 4.8 },
          rating: 4.9,
          reviews: [
            { id: 1, user: 'Sarah L.', text: 'Absolutely wonderful experience! Highly recommended.', rating: 5 },
            { id: 2, user: 'Mark T.', text: 'Great service but slightly expensive.', rating: 4 }
          ],
          image: require('../../assets/images/venue.png')
        });
      }
    };
    fetchService();
  }, [id]);

  const handleAddToCart = () => {
    if (service) {
      dispatch(addToCart({
        id: Math.floor(Math.random() * 10000), // Cart item unique id
        serviceId: service.serviceId,
        title: service.title,
        price: service.basePrice,
        vendorName: service.vendor?.businessName || 'Vendor'
      }));
      Alert.alert("Success", "Service added to cart!");
    }
  };

  if (!service) return <View style={styles.container}><Text>Loading...</Text></View>;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <Image source={service.image || require('../../assets/images/venue.png')} style={styles.heroImage} />
        
        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>{service.title}</Text>
          <Text style={[styles.price, { color: colors.primary }]}>Starting at ${service.basePrice}</Text>
          
          <View style={styles.ratingRow}>
             <Ionicons name="star" size={20} color={colors.rating} />
             <Text style={[styles.ratingText, { color: colors.text }]}>{service.rating} Rating</Text>
          </View>

          <Text style={[styles.description, { color: colors.textSecondary }]}>{service.description}</Text>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Vendor</Text>
          <TouchableOpacity onPress={() => router.push(`/vendor/${service.vendor?.vendorId || 1}`)}>
            <Card style={styles.vendorCard}>
              <Ionicons name="storefront" size={24} color={colors.primary} />
              <View style={styles.vendorInfo}>
                <Text style={[styles.vendorName, { color: colors.text }]}>{service.vendor?.businessName || 'Local Vendor'}</Text>
                <Text style={{ color: colors.textSecondary }}>View vendor profile &gt;</Text>
              </View>
            </Card>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Reviews</Text>
          {service.reviews?.map((review: any) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={{ fontWeight: 'bold', color: colors.text }}>{review.user}</Text>
                <View style={{ flexDirection: 'row' }}>
                  {[...Array(review.rating)].map((_, i) => <Ionicons key={i} name="star" size={14} color={colors.rating} />)}
                </View>
              </View>
              <Text style={{ color: colors.textSecondary, marginTop: 4 }}>{review.text}</Text>
            </View>
          ))}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        <Button title="Add to Cart" onPress={handleAddToCart} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroImage: { width: '100%', height: 260, resizeMode: 'cover' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  ratingText: { marginLeft: 8, fontSize: 16, fontWeight: '600' },
  description: { fontSize: 16, lineHeight: 24, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, marginTop: 10 },
  vendorCard: { flexDirection: 'row', alignItems: 'center', padding: 16, marginBottom: 20 },
  vendorInfo: { marginLeft: 16 },
  vendorName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  reviewItem: { marginBottom: 16, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 16 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    padding: 20, paddingBottom: 30, borderWidth: 1, 
    borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0 
  }
});
