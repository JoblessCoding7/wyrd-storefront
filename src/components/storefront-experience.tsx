"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CartDrawer } from "@/components/cart-drawer";
import { Kt2ProductStage } from "@/components/kt2-product-stage";
import { Kt2ProductExploration } from "@/components/kt2-product-exploration";
import { WyrdLanding } from "@/components/wyrd-landing";
import {
  sampleKt2LineItem,
  type CartLineItemPresentation,
} from "@/data/cart";
import {
  addCartLineItem,
  decreaseCartLineItemQuantity,
  formatCartPrice,
  getCartItemCount,
  getCartSubtotal,
  increaseCartLineItemQuantity,
  removeCartLineItem,
} from "@/lib/cart";

import styles from "./storefront-experience.module.css";

const landingDurationMs = 10_000;
const coverDurationMs = 500;
const revealDurationMs = 1_200;

type TransitionPhase = "idle" | "covering" | "revealing";

export function StorefrontExperience() {
  const [isProductStageVisible, setIsProductStageVisible] = useState(false);
  const [isProductExplorationVisible, setIsProductExplorationVisible] =
    useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartLineItems, setCartLineItems] = useState<
    CartLineItemPresentation[]
  >([]);
  const [transitionPhase, setTransitionPhase] =
    useState<TransitionPhase>("idle");
  const transitionStartedRef = useRef(false);
  const explorationTransitionStartedRef = useRef(false);
  const transitionTimersRef = useRef<number[]>([]);
  const cartItemCount = useMemo(
    () => getCartItemCount(cartLineItems),
    [cartLineItems],
  );
  const cart = useMemo(
    () => ({
      lineItems: cartLineItems,
      subtotal: formatCartPrice(getCartSubtotal(cartLineItems)),
    }),
    [cartLineItems],
  );

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const addKt2ToCart = useCallback(() => {
    setCartLineItems((lineItems) =>
      addCartLineItem(lineItems, sampleKt2LineItem),
    );
    setIsCartOpen(true);
  }, []);
  const decreaseQuantity = useCallback((lineItemId: string) => {
    setCartLineItems((lineItems) =>
      decreaseCartLineItemQuantity(lineItems, lineItemId),
    );
  }, []);
  const increaseQuantity = useCallback((lineItemId: string) => {
    setCartLineItems((lineItems) =>
      increaseCartLineItemQuantity(lineItems, lineItemId),
    );
  }, []);
  const removeLineItem = useCallback((lineItemId: string) => {
    setCartLineItems((lineItems) =>
      removeCartLineItem(lineItems, lineItemId),
    );
  }, []);

  const showProductStage = useCallback(() => {
    if (transitionStartedRef.current) {
      return;
    }

    transitionStartedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsProductStageVisible(true);
      return;
    }

    setTransitionPhase("covering");

    const coverTimer = window.setTimeout(() => {
      setIsProductStageVisible(true);
      setTransitionPhase("revealing");

      const revealTimer = window.setTimeout(() => {
        setTransitionPhase("idle");
      }, revealDurationMs);

      transitionTimersRef.current.push(revealTimer);
    }, coverDurationMs);

    transitionTimersRef.current.push(coverTimer);
  }, []);

  const showProductExploration = useCallback(() => {
    if (explorationTransitionStartedRef.current) {
      return;
    }

    explorationTransitionStartedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsProductExplorationVisible(true);
      return;
    }

    setTransitionPhase("covering");

    const coverTimer = window.setTimeout(() => {
      setIsProductExplorationVisible(true);
      setTransitionPhase("revealing");

      const revealTimer = window.setTimeout(() => {
        setTransitionPhase("idle");
      }, revealDurationMs);

      transitionTimersRef.current.push(revealTimer);
    }, coverDurationMs);

    transitionTimersRef.current.push(coverTimer);
  }, []);

  useEffect(() => {
    const transitionTimers = transitionTimersRef.current;
    const timer = window.setTimeout(showProductStage, landingDurationMs);

    return () => {
      window.clearTimeout(timer);
      transitionTimers.forEach(window.clearTimeout);
    };
  }, [showProductStage]);

  return (
    <div className={styles.experience}>
      {isProductExplorationVisible ? (
        <Kt2ProductExploration
          cartItemCount={cartItemCount}
          onCartOpen={openCart}
          onAddToCart={addKt2ToCart}
        />
      ) : isProductStageVisible ? (
        <Kt2ProductStage
          cartItemCount={cartItemCount}
          onProductActivate={showProductExploration}
          onCartOpen={openCart}
        />
      ) : (
        <WyrdLanding onEnter={showProductStage} />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={closeCart}
        onDecreaseQuantity={decreaseQuantity}
        onIncreaseQuantity={increaseQuantity}
        onRemove={removeLineItem}
      />

      <div
        className={`${styles.blackout} ${styles[transitionPhase]}`}
        aria-hidden="true"
      />
    </div>
  );
}
