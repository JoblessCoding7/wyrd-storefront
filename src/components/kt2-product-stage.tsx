"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { WyrdFooter } from "@/components/wyrd-footer";

import styles from "./kt2-product-stage.module.css";

type Kt2ProductStageProps = {
  cartItemCount: number;
  onProductActivate: () => void;
  onCartOpen: () => void;
};

export function Kt2ProductStage({
  cartItemCount,
  onProductActivate,
  onCartOpen,
}: Kt2ProductStageProps) {
  const productArtRef = useRef<HTMLDivElement>(null);
  const cursorPromptRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isProductHovered, setIsProductHovered] = useState(false);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  function handlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const trigger = event.currentTarget;
    const bounds = trigger.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    const normalizedX = pointerX / bounds.width - 0.5;
    const normalizedY = pointerY / bounds.height - 0.5;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (cursorPromptRef.current) {
        cursorPromptRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
      }

      if (productArtRef.current && !prefersReducedMotion) {
        const translateX = normalizedX * 16;
        const translateY = normalizedY * 12;
        const rotateX = normalizedY * -3;
        const rotateY = normalizedX * 3;

        productArtRef.current.style.transform =
          `translate3d(${translateX}px, ${translateY}px, 0) ` +
          `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });
  }

  function handlePointerEnter(event: ReactPointerEvent<HTMLButtonElement>) {
    setIsProductHovered(true);
    handlePointerMove(event);
  }

  function handlePointerLeave() {
    setIsProductHovered(false);

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (productArtRef.current) {
      productArtRef.current.style.transform = "";
    }
  }

  return (
    <main className={styles.stage}>
      <Image
        className={styles.background}
        src="/assets/hero-background.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        draggable={false}
      />

      <Image
        className={styles.logo}
        src="/assets/wyrd-logo-small.svg"
        alt="WYRD"
        width={179}
        height={65}
        priority
        draggable={false}
      />

      <button
        className={styles.cartTrigger}
        type="button"
        aria-label="Open cart"
        onClick={onCartOpen}
      >
        <span className={styles.cart}>CART[{cartItemCount}]</span>
      </button>

      <button
        className={styles.productTrigger}
        type="button"
        aria-label="Open the KT2 product experience"
        data-product-detail-trigger="kt2"
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onBlur={handlePointerLeave}
        onClick={onProductActivate}
      >
        <div ref={productArtRef} className={styles.productArt}>
          <Image
            className={styles.productImage}
            src="/assets/kt2-box.svg"
            alt="KT2 product box"
            fill
            sizes="31.5104vw"
            priority
            draggable={false}
          />
        </div>

        <div
          ref={cursorPromptRef}
          className={`${styles.cursorPrompt} ${
            isProductHovered ? styles.cursorPromptVisible : ""
          }`}
          aria-hidden="true"
        >
          <Image
            className={`${styles.cursorPromptImage} ${styles.desktopPromptImage}`}
            src="/assets/kt2-hover-prompt.svg"
            alt=""
            width={449}
            height={46}
            draggable={false}
          />
          <Image
            className={`${styles.cursorPromptImage} ${styles.mobilePromptImage}`}
            src="/assets/kt2-hover-prompt-mobile.svg"
            alt=""
            width={352}
            height={37}
            priority
            draggable={false}
          />
        </div>
      </button>

      <WyrdFooter />
    </main>
  );
}
