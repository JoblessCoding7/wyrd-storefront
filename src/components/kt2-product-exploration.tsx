"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

import { Kt2ProductInfoPanel } from "@/components/kt2-product-info-panel";
import { WyrdFooter } from "@/components/wyrd-footer";
import { kt2ProductInformation } from "@/data/kt2-product";

import styles from "./kt2-product-exploration.module.css";

const productObjects = [
  {
    key: "box",
    src: "/assets/kt2-box.svg",
    alt: "KT2 product box",
    width: 605,
    height: 443,
  },
  {
    key: "card",
    src: "/assets/kt2-id-card-usb.svg",
    alt: "KT2 identification card and card-sized USB drive",
    width: 595,
    height: 281,
  },
  {
    key: "notebook",
    src: "/assets/kt2-notebook.svg",
    alt: "KT2 notebook",
    width: 332,
    height: 434,
  },
  {
    key: "stickers",
    src: "/assets/kt2-stickers.svg",
    alt: "KT2 stickers and printed materials",
    width: 694,
    height: 415,
  },
  {
    key: "report",
    src: "/assets/kt2-printed-materials.svg",
    alt: "KT2 crumpled report sheet",
    width: 428,
    height: 394,
  },
] as const;

type Kt2ProductExplorationProps = {
  cartItemCount: number;
  onCartOpen: () => void;
  onAddToCart: () => void;
};

export function Kt2ProductExploration({
  cartItemCount,
  onCartOpen,
  onAddToCart,
}: Kt2ProductExplorationProps) {
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const [isProductInfoVisible, setIsProductInfoVisible] = useState(false);

  useLayoutEffect(() => {
    const scrollViewport = scrollViewportRef.current;

    if (!scrollViewport) {
      return;
    }

    const notebook = scrollViewport.querySelector<HTMLElement>(
      '[data-product-object="notebook"]',
    );

    if (notebook) {
      scrollViewport.style.scrollBehavior = "auto";
      scrollViewport.scrollLeft =
        notebook.offsetLeft +
        notebook.offsetWidth / 2 -
        scrollViewport.clientWidth / 2;
      scrollViewport.style.removeProperty("scroll-behavior");
    }

    function handleWheel(event: WheelEvent) {
      if (
        !scrollViewport ||
        Math.abs(event.deltaX) >= Math.abs(event.deltaY) ||
        scrollViewport.scrollWidth <= scrollViewport.clientWidth
      ) {
        return;
      }

      event.preventDefault();
      scrollViewport.scrollLeft += event.deltaY;
    }

    scrollViewport.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      scrollViewport.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <main className={styles.exploration}>
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

      <div
        ref={scrollViewportRef}
        className={styles.scrollViewport}
        role="region"
        aria-label="KT2 product objects"
        tabIndex={0}
      >
        <div className={styles.productTrack}>
          {productObjects.map((product) => (
            <button
              className={`${styles.productObject} ${styles[product.key]}`}
              key={product.key}
              data-product-object={product.key}
              type="button"
              aria-label={`Show ${product.alt} information`}
              onClick={() => setIsProductInfoVisible(true)}
            >
              <Image
                className={styles.productArtwork}
                src={product.src}
                alt={product.alt}
                width={product.width}
                height={product.height}
                sizes="(max-height: 1159px) 60vh, 37vw"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      {isProductInfoVisible ? (
        <Kt2ProductInfoPanel
          product={kt2ProductInformation}
          onAddToCart={onAddToCart}
        />
      ) : null}

      <WyrdFooter />
    </main>
  );
}
