import React from 'react';
import {FlatList, Image, Pressable, Text, View} from 'react-native';
import {styles} from '../styles';
import {formatMoney} from '../formatMoney';
import type {CartItem, Money} from '../cart';

type Props = {
  items: CartItem[];
  currencyCode: string;
  subtotal: number;
  onBack: () => void;
  onIncrementQuantity: (itemId: string) => void;
  onDecrementQuantity: (itemId: string) => void;
  onClearCart: () => void;
};

const CartScreen: React.FC<Props> = ({
  items,
  currencyCode,
  subtotal,
  onBack,
  onIncrementQuantity,
  onDecrementQuantity,
  onClearCart,
}) => {
  const totalItemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const subtotalMoney: Money = {
    amount: String(subtotal.toFixed(2)),
    currencyCode,
  };

  // For now, total equals subtotal (no tax/shipping).
  const totalMoney = subtotalMoney;

  return (
    <View style={styles.cartContainer}>
      <View style={styles.detailsHeader}>
        <Pressable
          onPress={onBack}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Back to product list">
          <Text style={styles.backButton}>{'‹ Back'}</Text>
        </Pressable>
        <Text style={styles.detailsTitle}>Cart</Text>
        <View style={{width: 48}} />
      </View>

      {items.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.muted}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({item}) => (
              <View style={styles.cartItemRow}>
                {item.imageUrl ? (
                  <Image
                    source={{uri: item.imageUrl}}
                    style={styles.cartItemImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.cartItemImage, styles.imagePlaceholder]}>
                    <Text style={styles.imagePlaceholderText}>No image</Text>
                  </View>
                )}
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemTitle}>{item.title}</Text>
                  <Text style={styles.cartItemVariant}>{item.variantTitle}</Text>
                  <Text style={styles.cartItemPrice}>
                    {formatMoney(item.price)}
                  </Text>
                  {item.compareAtPrice && (
                    <Text style={styles.variantCompareAt}>
                      {formatMoney(item.compareAtPrice)}
                    </Text>
                  )}
                  <View style={styles.cartQuantityRow}>
                    <Pressable
                      style={styles.qtyButton}
                      onPress={() => onDecrementQuantity(item.id)}
                      hitSlop={8}
                      accessibilityRole="button"
                      accessibilityLabel={`Decrease quantity of ${item.title} ${item.variantTitle}`}>
                      <Text style={styles.qtyButtonText}>-</Text>
                    </Pressable>
                    <Text style={styles.cartQuantityText}>
                      {item.quantity}
                    </Text>
                    <Pressable
                      style={styles.qtyButton}
                      onPress={() => onIncrementQuantity(item.id)}
                      hitSlop={8}
                      accessibilityRole="button"
                      accessibilityLabel={`Increase quantity of ${item.title} ${item.variantTitle}`}>
                      <Text style={styles.qtyButtonText}>+</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
          />

          <View style={styles.cartSummary}>
            <Text style={styles.sectionHeading}>Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Items</Text>
              <Text style={styles.summaryValue}>{totalItemCount}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                {formatMoney(subtotalMoney)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryTotal}>
                {formatMoney(totalMoney)}
              </Text>
            </View>
            <Pressable style={styles.clearCartButton} onPress={onClearCart}>
              <Text style={styles.clearCartButtonText}>Clear cart</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

