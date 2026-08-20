import Image from "next/image";

import { WyrdFooter } from "@/components/wyrd-footer";

import styles from "./wyrd-landing.module.css";

type WyrdLandingProps = {
  onEnter: () => void;
};

export function WyrdLanding({ onEnter }: WyrdLandingProps) {
  return (
    <main className={styles.landing}>
      <Image
        className={styles.background}
        src="/assets/hero-background.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        draggable={false}
      />

      <div className={styles.logoFrame}>
        <Image
          className={`${styles.logo} ${styles.desktopLogo}`}
          src="/assets/wyrd-logo.svg"
          alt="WYRD"
          fill
          sizes="96.6146vw"
          priority
          draggable={false}
        />
        <Image
          className={`${styles.logo} ${styles.mobileLogo}`}
          src="/assets/wyrd-logo-mobile.svg"
          alt="WYRD"
          fill
          sizes="(max-width: 768px) calc(100vw - 34px), 0px"
          priority
          draggable={false}
        />
      </div>

      <button
        className={styles.enterButton}
        type="button"
        aria-label="Enter the KT2 product experience"
        onClick={onEnter}
      />

      <WyrdFooter />
    </main>
  );
}
