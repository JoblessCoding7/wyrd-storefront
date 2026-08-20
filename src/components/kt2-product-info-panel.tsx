import type { ProductInformation } from "@/data/kt2-product";

import styles from "./kt2-product-info-panel.module.css";

type Kt2ProductInfoPanelProps = {
  product: ProductInformation;
  onAddToCart?: () => void;
};

export function Kt2ProductInfoPanel({
  product,
  onAddToCart,
}: Kt2ProductInfoPanelProps) {
  return (
    <aside className={styles.panel} aria-label="KT2 product information">
      <p className={styles.description}>{product.description}</p>
      <h2 className={styles.title}>{product.title}</h2>
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
  );
}
