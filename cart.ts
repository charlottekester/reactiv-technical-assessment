export type Money = {
  amount: string;
  currencyCode: string;
};

export type CartItem = {
  id: string;
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: Money;
  compareAtPrice?: Money | null;
  quantity: number;
  imageUrl?: string;
};

export function addItemToCart(
  items: CartItem[],
  newItem: Omit<CartItem, 'quantity'>,
): CartItem[] {
  const existing = items.find(
    item =>
      item.productId === newItem.productId &&
      item.variantId === newItem.variantId,
  );

  if (existing) {
    return items.map(item =>
      item.id === existing.id
        ? {...item, quantity: item.quantity + 1}
        : item,
    );
  }

  return [...items, {...newItem, quantity: 1}];
}

export function incrementCartItem(items: CartItem[], itemId: string): CartItem[] {
  return items.map(item =>
    item.id === itemId ? {...item, quantity: item.quantity + 1} : item,
  );
}

export function decrementCartItem(items: CartItem[], itemId: string): CartItem[] {
  return items
    .map(item =>
      item.id === itemId
        ? {...item, quantity: Math.max(0, item.quantity - 1)}
        : item,
    )
    .filter(item => item.quantity > 0);
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const price = Number(item.price.amount) || 0;
    return sum + price * item.quantity;
  }, 0);
}

