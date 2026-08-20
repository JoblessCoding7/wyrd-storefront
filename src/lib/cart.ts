import type { CartLineItemPresentation } from "../data/cart";

export function addCartLineItem(
  lineItems: CartLineItemPresentation[],
  lineItem: CartLineItemPresentation,
) {
  const existingLineItem = lineItems.find((item) => item.id === lineItem.id);

  if (!existingLineItem) {
    return [...lineItems, { ...lineItem, quantity: 1 }];
  }

  return lineItems.map((item) =>
    item.id === lineItem.id ? { ...item, quantity: item.quantity + 1 } : item,
  );
}

export function increaseCartLineItemQuantity(
  lineItems: CartLineItemPresentation[],
  lineItemId: string,
) {
  return lineItems.map((item) =>
    item.id === lineItemId ? { ...item, quantity: item.quantity + 1 } : item,
  );
}

export function decreaseCartLineItemQuantity(
  lineItems: CartLineItemPresentation[],
  lineItemId: string,
) {
  return lineItems.flatMap((item) => {
    if (item.id !== lineItemId) {
      return item;
    }

    return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
  });
}

export function removeCartLineItem(
  lineItems: CartLineItemPresentation[],
  lineItemId: string,
) {
  return lineItems.filter((item) => item.id !== lineItemId);
}

export function getCartItemCount(lineItems: CartLineItemPresentation[]) {
  return lineItems.reduce((total, item) => total + item.quantity, 0);
}

export function getCartSubtotal(lineItems: CartLineItemPresentation[]) {
  return lineItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
}

export function formatCartPrice(amount: number) {
  return `CA$${amount.toFixed(2)}`;
}
