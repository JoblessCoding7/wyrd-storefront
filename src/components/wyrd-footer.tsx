import Image from "next/image";

import styles from "./wyrd-footer.module.css";

const instagramUrl =
  "https://www.instagram.com/wyrdwyrdwyrdwyrd?igsh=MTN2eGd5ZXdrcW51Ng==&igsi=MTN2eGd5ZXdrcW51Ng==";

export function WyrdFooter() {
  return (
    <footer className={styles.footer}>
      <Image
        className={styles.desktopBrandLine}
        src="/assets/brand-line.svg"
        alt="A creative label by THOME since 2025."
        width={748}
        height={21}
        draggable={false}
      />
      <p className={styles.mobileBrandLine}>
        A CREATIVE LABEL BY
        <br />
        THOME SINCE 2025.
      </p>
      <a
        className={styles.instagramLink}
        href={instagramUrl}
        aria-label="WYRD on Instagram"
      >
        <Image
          className={styles.instagramIcon}
          src="/assets/instagram.svg"
          alt=""
          width={24}
          height={24}
          draggable={false}
        />
      </a>
    </footer>
  );
}
