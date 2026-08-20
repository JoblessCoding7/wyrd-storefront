import Image from "next/image";

import { WyrdFooter } from "@/components/wyrd-footer";

type WyrdLandingProps = {
  onEnter: () => void;
};

export function WyrdLanding({ onEnter }: WyrdLandingProps) {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <Image
        className="object-cover"
        src="/assets/hero-background.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        draggable={false}
      />

      <div className="absolute inset-x-[1.6927vw] top-[3.0198vh] bottom-[8.1967vh]">
        <Image
          className="object-contain"
          src="/assets/wyrd-logo.svg"
          alt="WYRD"
          fill
          sizes="96.6146vw"
          priority
          draggable={false}
        />
      </div>

      <button
        className="absolute inset-0 z-20 cursor-pointer border-0 bg-transparent"
        type="button"
        aria-label="Enter the KT2 product experience"
        onClick={onEnter}
      />

      <WyrdFooter />
    </main>
  );
}
