import React, {useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {styles} from '../styles';
import {formatMoney} from '../formatMoney';
import type {Product, ProductVariant} from '../types';

type Props = {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
  onOpenCart: () => void;
  totalItemCount: number;
};

const ProductDetails: React.FC<Props> = ({
  product,
  onBack,
  onAddToCart,
  onOpenCart,
  totalItemCount,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => {
      const initial: Record<string, string> = {};
      product.options.forEach(option => {
        if (option.values.length > 0) {
          initial[option.name] = option.values[0];
        }
      });
      return initial;
    },
  );

  const selectedVariant = useMemo(() => {
    if (product.variants.length === 0) {
      return undefined;
    }

    const match = product.variants.find(variant =>
      variant.selectedOptions.every(
        opt => selectedOptions[opt.name] === opt.value,
      ),
    );

    return match ?? product.variants[0];
  }, [product.variants, selectedOptions]);

  const handleSelectOption = (name: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const heroImage =
    selectedVariant?.image ?? (product.images.length > 0
      ? product.images[0]
      : undefined);

  const availabilityLabel = selectedVariant
    ? selectedVariant.availableForSale && !selectedVariant.currentlyNotInStock
      ? 'In stock'
      : 'Out of stock'
    : '';

  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailsHeader}>
        <Pressable
          onPress={onBack}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Back to product list">
          <Text style={styles.backButton}>{'‹ Back'}</Text>
        </Pressable>
        <Text style={styles.detailsTitle} numberOfLines={1}>
          {product.title}
        </Text>
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

      <ScrollView contentContainerStyle={styles.detailsContent}>
        {heroImage?.url ? (
          <Image
            source={{uri: heroImage.url}}
            style={styles.detailsImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.detailsImage, styles.imagePlaceholder]}>
            <Text style={styles.imagePlaceholderText}>No image</Text>
          </View>
        )}

        <Text style={styles.detailsProductType}>{product.productType}</Text>
        <Text style={styles.detailsPrice}>
          {selectedVariant
            ? formatMoney(selectedVariant.price)
            : formatMoney(product.priceRange.minVariantPrice)}
        </Text>
        {availabilityLabel ? (
          <Text
            style={[
              styles.availability,
              availabilityLabel === 'In stock'
                ? styles.availabilityInStock
                : styles.availabilityOutOfStock,
            ]}>
            {availabilityLabel}
          </Text>
        ) : null}

        <Text style={styles.sectionHeading}>Description</Text>
        <Text style={styles.detailsDescription}>{product.description}</Text>

        {product.options.map(option => (
          <View key={option.id} style={styles.optionSection}>
            <Text style={styles.sectionHeading}>{option.name}</Text>
            <View style={styles.optionValuesRow}>
              {option.values.map(value => {
                const isSelected = selectedOptions[option.name] === value;
                return (
                  <Pressable
                    key={value}
                    onPress={() => handleSelectOption(option.name, value)}
                    style={[
                      styles.optionPill,
                      isSelected && styles.optionPillSelected,
                    ]}>
                    <Text
                      style={[
                        styles.optionPillText,
                        isSelected && styles.optionPillTextSelected,
                      ]}>
                      {value}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}

        {selectedVariant ? (
          <>
            <View style={styles.variantSummary}>
              <Text style={styles.sectionHeading}>Selected variant</Text>
              <Text style={styles.variantText}>{selectedVariant.title}</Text>
              <Text style={styles.variantText}>
                Price: {formatMoney(selectedVariant.price)}
              </Text>
              {selectedVariant.compareAtPrice && (
                <Text style={styles.variantCompareAt}>
                  Compare at: {formatMoney(selectedVariant.compareAtPrice)}
                </Text>
              )}
            </View>
            <Pressable
              style={[
                styles.addToCartButton,
                availabilityLabel !== 'In stock' &&
                  styles.addToCartButtonDisabled,
              ]}
              onPress={() => onAddToCart(product, selectedVariant)}
              disabled={availabilityLabel !== 'In stock'}
              accessibilityRole="button"
              accessibilityLabel={
                availabilityLabel === 'In stock'
                  ? 'Add selected variant to cart'
                  : 'Variant unavailable'
              }>
              <Text style={styles.addToCartButtonText}>
                {availabilityLabel === 'In stock'
                  ? 'Add to cart'
                  : 'Unavailable'}
              </Text>
            </Pressable>
          </>
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ProductDetails;

