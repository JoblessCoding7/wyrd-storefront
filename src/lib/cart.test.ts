import { describe, expect, it } from "vitest";

import { sampleKt2LineItem } from "../data/cart";

import {
  addCartLineItem,
  decreaseCartLineItemQuantity,
  formatCartPrice,
  getCartItemCount,
  getCartSubtotal,
  increaseCartLineItemQuantity,
  removeCartLineItem,
} from "./cart";

describe("cart state helpers", () => {
  it("adds and increases a line item", () => {
    const added = addCartLineItem([], sampleKt2LineItem);
    const increased = increaseCartLineItemQuantity(
      added,
      sampleKt2LineItem.id,
    );

    expect(getCartItemCount(increased)).toBe(2);
    expect(formatCartPrice(getCartSubtotal(increased))).toBe("CA$119.68");
  });

  it("removes a line item when its quantity reaches zero", () => {
    const added = addCartLineItem([], sampleKt2LineItem);
    const decreased = decreaseCartLineItemQuantity(
      added,
      sampleKt2LineItem.id,
    );

    expect(decreased).toEqual([]);
    expect(formatCartPrice(getCartSubtotal(decreased))).toBe("CA$0.00");
  });

  it("removes a line item directly", () => {
    const added = addCartLineItem([], sampleKt2LineItem);

    expect(removeCartLineItem(added, sampleKt2LineItem.id)).toEqual([]);
  });
});
