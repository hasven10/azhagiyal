import { writable } from 'svelte/store';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

function loadInitial(): CartItem[] {
  if (typeof localStorage === 'undefined') return [];
  const saved = localStorage.getItem('azhagiyal-cart');
  return saved ? JSON.parse(saved) : [];
}

export const cartItems = writable<CartItem[]>(loadInitial());
export const cartAnim = writable(false);
export const cartToast = writable(false);

cartItems.subscribe((value) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('azhagiyal-cart', JSON.stringify(value));
  }
});

export function cart(item: Omit<CartItem, 'quantity'>) {
  cartItems.update((items) => {
    cartAnim.set(true);
    cartToast.set(true);

    setTimeout(() => cartAnim.set(false), 400);
    setTimeout(() => cartToast.set(false), 2000);

    const existing = items.find((i) => i.name === item.name);

    if (existing) {
      return items.map((i) =>
        i.name === item.name
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }

    return [...items, { ...item, quantity: 1 }];
  });
}

export function removeFromCart(name: string) {
  cartItems.update((items) =>
    items.filter((i) => i.name !== name)
  );
}

export function clearCart() {
  cartItems.set([]);
}
