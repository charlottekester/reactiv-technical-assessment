import {
  addItemToCart,
  calculateSubtotal,
  CartItem,
  decrementCartItem,
  incrementCartItem,
} from '../cart';

const makeItem = (overrides: Partial<CartItem> = {}): CartItem => ({
  id: 'p1-v1',
  productId: 'p1',
  variantId: 'v1',
  title: 'Product',
  variantTitle: 'Variant',
  price: {amount: '10.00', currencyCode: 'CAD'},
  quantity: 1,
  ...overrides,
});

describe('cart helpers', () => {
  it('adds a new item when variant not present', () => {
    const items: CartItem[] = [];
    const {quantity: _q, ...newItem} = makeItem();
    const result = addItemToCart(items, newItem);

    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(1);
  });

  it('increments quantity when same variant added again', () => {
    const existing = makeItem();
    const {quantity: _q2, ...newItem2} = existing;
    const result = addItemToCart([existing], newItem2);

    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
  });

  it('increments and decrements item quantity', () => {
    const existing = makeItem({quantity: 1});
    const incremented = incrementCartItem([existing], existing.id);
    expect(incremented[0].quantity).toBe(2);

    const decremented = decrementCartItem(incremented, existing.id);
    expect(decremented[0].quantity).toBe(1);
  });

  it('calculates subtotal correctly', () => {
    const items: CartItem[] = [
      makeItem({id: '1', quantity: 2, price: {amount: '10.00', currencyCode: 'CAD'}}),
      makeItem({id: '2', quantity: 1, price: {amount: '5.50', currencyCode: 'CAD'}}),
    ];

    const subtotal = calculateSubtotal(items);
    expect(subtotal).toBeCloseTo(25.5);
  });
});

