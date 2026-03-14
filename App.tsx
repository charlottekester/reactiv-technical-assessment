import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addItemToCart,
  calculateSubtotal,
  CartItem,
  decrementCartItem,
  incrementCartItem,
} from './cart';
import type {Product, ProductVariant} from './types';
import type ScreenState from './navigation';
import {styles} from './styles';
import ProductCatalog from './screens/ProductCatalog';
import ProductDetails from './screens/ProductDetails';
import CartScreen from './screens/CartScreen';

// use centralized, serializable navigation state
type LocalScreenState = ScreenState;

const PRODUCTS_URL =
  'https://gist.githubusercontent.com/agorovyi/40dcd166a38b4d1e9156ad66c87111b7/raw/36f1c815dd83ed8189e55e6e6619b5d7c7c4e7d6/testProducts.json';

const STORAGE_KEYS = {
  products: 'reactiv.productsCache',
  cart: 'reactiv.cart',
} as const;

const App = (): React.JSX.Element => {
  const [products, setProducts] = useState<Product[]>([]);
  const [screen, setScreen] = useState<LocalScreenState>({type: 'catalog'});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const totalItemCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const subtotal = useMemo(() => calculateSubtotal(cartItems), [cartItems]);
  const currencyCode = cartItems[0]?.price.currencyCode ?? 'CAD';

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // hydrate from cache
        try {
          const cached = await AsyncStorage.getItem(STORAGE_KEYS.products);
          if (cached && isMounted) {
            const parsed = JSON.parse(cached) as Product[];
            setProducts(parsed);
          }
        } catch {
          // ignore
        }

        // refresh from network
        try {
          const response = await fetch(PRODUCTS_URL);
          if (response.ok) {
            const data = (await response.json()) as Product[];
            if (isMounted) setProducts(data);
            await AsyncStorage.setItem(STORAGE_KEYS.products, JSON.stringify(data));
          } else if (!products.length) {
            throw new Error(`Request failed with status ${response.status}`);
          }
        } catch (networkError) {
          if (!products.length) throw networkError;
        }
      } catch (e) {
        if (isMounted) setError(e instanceof Error ? e.message : 'Failed to load products.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [products.length]);

  // hydrate cart
  useEffect(() => {
    let isMounted = true;
    const hydrateCart = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEYS.cart);
        if (stored && isMounted) {
          const parsed = JSON.parse(stored) as CartItem[];
          setCartItems(parsed);
        }
      } catch {
        // ignore
      }
    };
    hydrateCart();
    return () => {
      isMounted = false;
    };
  }, []);

  // persist cart
  useEffect(() => {
    const persist = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cartItems));
      } catch {
        // ignore
      }
    };
    if (cartItems) persist();
  }, [cartItems]);

  const handleSelectProduct = (product: Product) => setScreen({type: 'details', productId: product.id});
  const goToCatalog = () => setScreen({type: 'catalog'});
  const goToCart = () => setScreen({type: 'cart'});

  const handleAddToCart = (product: Product, variant: ProductVariant) => {
    if (!variant) return;
    setCartItems(prev =>
      addItemToCart(prev, {
        id: `${product.id}-${variant.id}`,
        productId: product.id,
        variantId: variant.id,
        title: product.title,
        variantTitle: variant.title,
        price: variant.price,
        compareAtPrice: variant.compareAtPrice,
        imageUrl: variant.image?.url ?? product.images[0]?.url,
      }),
    );
  };

  const handleIncrementQuantity = (itemId: string) => setCartItems(prev => incrementCartItem(prev, itemId));
  const handleDecrementQuantity = (itemId: string) => setCartItems(prev => decrementCartItem(prev, itemId));
  const handleClearCart = () => setCartItems([]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {screen.type === 'catalog' && (
        <ProductCatalog
          products={products}
          isLoading={isLoading}
          error={error}
          onSelectProduct={handleSelectProduct}
          onOpenCart={goToCart}
          totalItemCount={totalItemCount}
        />
      )}

      {screen.type === 'details' && (() => {
        const product = products.find(p => p.id === screen.productId);
        if (!product) {
          goToCatalog();
          return null;
        }
        return (
          <ProductDetails
            product={product}
            onBack={goToCatalog}
            onAddToCart={handleAddToCart}
            onOpenCart={goToCart}
            totalItemCount={totalItemCount}
          />
        );
      })()}

      {screen.type === 'cart' && (
        <CartScreen
          items={cartItems}
          currencyCode={currencyCode}
          subtotal={subtotal}
          onBack={goToCatalog}
          onIncrementQuantity={handleIncrementQuantity}
          onDecrementQuantity={handleDecrementQuantity}
          onClearCart={handleClearCart}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
