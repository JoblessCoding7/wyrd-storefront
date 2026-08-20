"use client";

import { useEffect, useRef } from "react";

import type { ProductInformation } from "@/data/kt2-product";

import styles from "./mobile-kt2-product-info-overlay.module.css";

type MobileKt2ProductInfoOverlayProps = {
  product: ProductInformation;
  onDismiss: () => void;
  onAddToCart: () => void;
};

export function MobileKt2ProductInfoOverlay({
  product,
  onDismiss,
  onAddToCart,
}: MobileKt2ProductInfoOverlayProps) {
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    if (!mobileQuery.matches) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onDismiss();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        panelRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onDismiss]);

  return (
    <div className={styles.overlay}>
      <button
        className={styles.backdrop}
        type="button"
        aria-label="Close product information"
        onClick={onDismiss}
      />

      <aside
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-label="KT2 product information"
        tabIndex={-1}
      >
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.purchaseRow}>
          <p className={styles.price}>{product.price}</p>
          <button
            className={styles.addToCart}
            type="button"
            onClick={onAddToCart}
          >
            {product.addToCartLabel}
          </button>
        </div>
      </aside>
    </div>
  );
}
