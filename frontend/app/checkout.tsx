import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { clearCart, removeFromCart } from '@/store/cartSlice';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Button } from '@/components/ui/Button';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CheckoutScreen() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
    Alert.alert("Success", "Your booking has been placed and payment is processing!", [
      { 
        text: "OK", 
        onPress: () => {
          dispatch(clearCart());
          router.replace('/(tabs)');
        } 
      }
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.cartItem, { borderBottomColor: colors.border }]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.itemTitle, { color: colors.text }]}>{item.title}</Text>
        <Text style={{ color: colors.textSecondary }}>{item.vendorName}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={[styles.itemPrice, { color: colors.primary }]}>${item.price}</Text>
        <TouchableOpacity onPress={() => dispatch(removeFromCart(item.serviceId))}>
          <Ionicons name="trash-outline" size={20} color="red" style={{ marginTop: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={64} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.text }]}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 20 }}
          />
          <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
             <View style={styles.totalRow}>
               <Text style={[styles.totalLabel, { color: colors.text }]}>Total:</Text>
               <Text style={[styles.totalAmount, { color: colors.primary }]}>${total.toLocaleString()}</Text>
             </View>
             <Button title="Proceed to Payment" onPress={handleCheckout} />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  itemPrice: { fontSize: 16, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, marginTop: 16 },
  footer: { padding: 20, paddingBottom: 30, borderTopWidth: 1 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  totalLabel: { fontSize: 20, fontWeight: 'bold' },
  totalAmount: { fontSize: 24, fontWeight: 'bold' }
});
