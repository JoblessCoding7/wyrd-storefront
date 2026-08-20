"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import type {
  CartLineItemPresentation,
  CartPresentation,
} from "@/data/cart";
import { getCartItemCount } from "@/lib/cart";

import styles from "./cart-drawer.module.css";

type CartDrawerProps = {
  isOpen: boolean;
  cart: CartPresentation;
  onClose: () => void;
  onDecreaseQuantity?: (lineItemId: string) => void;
  onIncreaseQuantity?: (lineItemId: string) => void;
  onRemove?: (lineItemId: string) => void;
  onCheckout?: () => void;
};

type CartLineItemProps = {
  item: CartLineItemPresentation;
  onDecreaseQuantity?: (lineItemId: string) => void;
  onIncreaseQuantity?: (lineItemId: string) => void;
  onRemove?: (lineItemId: string) => void;
};

function CartLineItem({
  item,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemove,
}: CartLineItemProps) {
  return (
    <article className={styles.lineItem}>
      <Image
        className={styles.productImage}
        src={item.image.src}
        alt={item.image.alt}
        width={item.image.width}
        height={item.image.height}
        sizes="(max-height: 1159px) 13vh, 8vw"
        draggable={false}
      />

      <h3 className={styles.productTitle}>{item.title}</h3>
      <p className={styles.productPrice}>{item.price}</p>
      {item.preorderLabel ? (
        <p className={styles.preorder}>{item.preorderLabel}</p>
      ) : null}

      <div className={styles.quantity} aria-label="Quantity controls">
        <button
          className={styles.quantityButton}
          type="button"
          aria-label={`Decrease quantity for ${item.title.replace("\n", " ")}`}
          onClick={() => onDecreaseQuantity?.(item.id)}
        >
          −
        </button>
        <span
          className={styles.quantityValue}
          aria-label="Quantity"
          aria-live="polite"
        >
          {item.quantity}
        </span>
        <button
          className={styles.quantityButton}
          type="button"
          aria-label={`Increase quantity for ${item.title.replace("\n", " ")}`}
          onClick={() => onIncreaseQuantity?.(item.id)}
        >
          +
        </button>
      </div>

      <button
        className={styles.remove}
        type="button"
        onClick={() => onRemove?.(item.id)}
      >
        Remove
      </button>
    </article>
  );
}

export function CartDrawer({
  isOpen,
  cart,
  onClose,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemove,
  onCheckout,
}: CartDrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const itemCount = getCartItemCount(cart.lineItems);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocusedElement = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) {
        return;
      }

      const focusableElements = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isOpen, onClose]);

  return (
    <div
      className={styles.layer}
      data-open={isOpen}
      aria-hidden={!isOpen}
      inert={isOpen ? undefined : true}
    >
      <button
        className={styles.backdrop}
        type="button"
        aria-label="Close cart"
        tabIndex={-1}
        onClick={onClose}
      />
      <button
        className={styles.footerShield}
        type="button"
        aria-label="Close cart"
        tabIndex={-1}
        onClick={onClose}
      />

      <aside
        ref={drawerRef}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        tabIndex={-1}
      >
        <header className={styles.header}>
          <h2
            id="cart-drawer-title"
            className={styles.cartTitle}
            aria-live="polite"
          >
            CART [{itemCount}]
          </h2>
          <button
            className={styles.close}
            type="button"
            onClick={onClose}
          >
            CLOSE
          </button>
        </header>

        <div className={styles.items}>
          {cart.lineItems.map((item) => (
            <CartLineItem
              key={item.id}
              item={item}
              onDecreaseQuantity={onDecreaseQuantity}
              onIncreaseQuantity={onIncreaseQuantity}
              onRemove={onRemove}
            />
          ))}
        </div>

        <div className={styles.subtotal}>
          <p>SUBTOTAL</p>
          <p className={styles.subtotalValue} aria-live="polite">
            {cart.subtotal}
          </p>
        </div>

        <div className={styles.checkoutArea}>
          <button
            className={styles.checkout}
            type="button"
            disabled={itemCount === 0}
            onClick={onCheckout}
          >
            CONTINUE TO CHECKOUT
          </button>
        </div>
      </aside>
    </div>
  );
}
