import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Input } from '@/components/ui/Input';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const requireImages = {
  venue: require('../../assets/images/venue.png'),
  photography: require('../../assets/images/photography.png'),
  catering: require('../../assets/images/cake.png'),
  flowers: require('../../assets/images/venue.png'),
  cake: require('../../assets/images/cake.png'),
};

const CATEGORIES = [
  { id: 'all', name: 'All', image: requireImages.venue },
  { id: 'venue', name: 'Venue', image: requireImages.venue },
  { id: 'photography', name: 'Photography', image: requireImages.photography },
  { id: 'catering', name: 'Catering', image: requireImages.catering },
  { id: 'flowers', name: 'Flowers', image: requireImages.flowers },
  { id: 'cake', name: 'Cake', image: requireImages.cake },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const renderCategory = ({ item, index }: { item: any, index: number }) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => {
        // Mock routing to a filtered list or just home with active param
        router.push(`/?category=${item.id}`);
      }}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <View style={styles.categoryOverlay}>
        <Text style={styles.categoryText}>{item.name}</Text>
      </View>
      {index === 0 && <View style={[styles.activeBorder, { borderColor: colors.primary }]} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.searchContainer}>
        <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <Input 
            placeholder="Search services or vendors..." 
             autoCapitalize="none"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderCategory}
        ListHeaderComponent={<Text style={[styles.sectionTitle, { color: colors.text }]}>Categories</Text>}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 0,
    height: 48,
    paddingHorizontal: 0,
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (width - 32) / 2 - 8,
    height: 180,
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
    padding: 16,
  },
  categoryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  activeBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 3,
    borderRadius: 12,
  },
});
