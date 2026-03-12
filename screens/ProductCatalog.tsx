import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import {styles} from '../styles';
import {formatMoney} from '../formatMoney';
import type {Product} from '../types';

type Props = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  onSelectProduct: (product: Product) => void;
  onOpenCart: () => void;
  totalItemCount: number;
};

const ProductCatalog: React.FC<Props> = ({
  products,
  isLoading,
  error,
  onSelectProduct,
  onOpenCart,
  totalItemCount,
}) => {
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          size="large"
          accessibilityRole="progressbar"
          accessibilityLabel="Loading products"
        />
        <Text style={styles.muted}>Loading products…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>We couldn&apos;t load products.</Text>
        <Text style={styles.muted}>
          Check your internet connection and try again. The last loaded catalog
          will stay visible if available.
        </Text>
      </View>
    );
  }

  if (!products.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No products available</Text>
        <Text style={styles.muted}>
          Products will appear here once they&apos;re available or once you
          reconnect.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.catalogContainer}>
      <View style={styles.catalogHeaderRow}>
        <Text style={styles.headerTitle}>Products</Text>
        <Pressable
          style={styles.cartButton}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={
            totalItemCount > 0
              ? `Cart, ${totalItemCount} items`
              : 'Cart, empty'
          }
          onPress={onOpenCart}>
          <Text style={styles.cartButtonText}>Cart</Text>
          {totalItemCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalItemCount}</Text>
            </View>
          )}
        </Pressable>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <Pressable
            style={styles.productCard}
            android_ripple={{color: '#e0e0e0'}}
            onPress={() => onSelectProduct(item)}>
            {item.images?.[0]?.url ? (
              <Image
                source={{uri: item.images[0].url}}
                style={styles.productImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.productImage, styles.imagePlaceholder]}>
                <Text style={styles.imagePlaceholderText}>No image</Text>
              </View>
            )}
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productType}>{item.productType}</Text>
              <Text style={styles.productPrice}>
                {formatMoney(item.priceRange.minVariantPrice)}
                {item.priceRange.maxVariantPrice.amount !==
                  item.priceRange.minVariantPrice.amount && (
                  <Text>{` – ${formatMoney(
                    item.priceRange.maxVariantPrice,
                  )}`}</Text>
                )}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

export default ProductCatalog;

