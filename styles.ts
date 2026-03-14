import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  muted: {
    marginTop: 8,
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#c62828',
    fontWeight: '500',
    textAlign: 'center',
  },
  catalogContainer: {
    flex: 1,
  },
  catalogHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  productCard: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#e0e0e0',
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    color: '#777777',
    fontSize: 12,
  },
  productInfo: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  productType: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '500',
  },
  detailsContainer: {
    flex: 1,
  },
  cartContainer: {
    flex: 1,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    fontSize: 16,
    color: '#007aff',
    width: 48,
  },
  detailsTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  detailsContent: {
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  detailsImage: {
    width: '100%',
    height: 260,
    backgroundColor: '#e0e0e0',
  },
  detailsProductType: {
    marginTop: 12,
    fontSize: 14,
    color: '#777777',
  },
  detailsPrice: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '700',
  },
  availability: {
    marginTop: 4,
    fontSize: 14,
  },
  availabilityInStock: {
    color: '#2e7d32',
  },
  availabilityOutOfStock: {
    color: '#c62828',
  },
  sectionHeading: {
    marginTop: 16,
    paddingHorizontal: 0,
    fontSize: 16,
    fontWeight: '600',
  },
  detailsDescription: {
    paddingHorizontal: 0,
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: '#333333',
  },
  optionSection: {
    marginTop: 8,
  },
  optionValuesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  optionPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginRight: 8,
    marginBottom: 8,
  },
  optionPillSelected: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  optionPillText: {
    fontSize: 13,
    color: '#333333',
  },
  optionPillTextSelected: {
    color: '#ffffff',
  },
  variantSummary: {
    marginTop: 8,
    marginBottom: 16,
  },
  variantText: {
    fontSize: 14,
    marginTop: 4,
  },
  variantCompareAt: {
    fontSize: 13,
    marginTop: 2,
    color: '#777777',
    textDecorationLine: 'line-through',
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#000000',
  },
  cartButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  cartBadge: {
    marginLeft: 6,
    minWidth: 20,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  addToCartButton: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
    backgroundColor: '#000000',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartButtonDisabled: {
    opacity: 0.4,
  },
  addToCartButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cartItemRow: {
    flexDirection: 'row',
    backgroundColor: '#fafafa',
    borderRadius: 12,
    marginTop: 12,
    overflow: 'hidden',
  },
  cartItemImage: {
    width: 90,
    height: 90,
    backgroundColor: '#e0e0e0',
  },
  cartItemInfo: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cartItemTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  cartItemVariant: {
    fontSize: 13,
    color: '#777777',
    marginTop: 2,
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  cartQuantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  cartQuantityText: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  cartSummary: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555555',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: '700',
  },
  clearCartButton: {
    marginTop: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#c62828',
  },
  clearCartButtonText: {
    fontSize: 13,
    color: '#c62828',
    fontWeight: '500',
  },
});

