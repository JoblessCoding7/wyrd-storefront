import Image from "next/image";

const instagramUrl =
  "https://www.instagram.com/wyrdwyrdwyrdwyrd?igsh=MTN2eGd5ZXdrcW51Ng==&igsi=MTN2eGd5ZXdrcW51Ng==";

export default function Home() {
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

      <footer className="absolute inset-x-0 bottom-0 h-[5.8042vh] bg-black">
        <Image
          className="absolute left-[1.6841vw] top-1/2 h-auto w-[38.9583vw] -translate-y-1/2"
          src="/assets/brand-line.svg"
          alt="A creative label by THOME since 2025."
          width={748}
          height={21}
          draggable={false}
        />
        <a
          className="absolute right-[1.6927vw] top-[47.143%] block w-[1.25vw] -translate-y-1/2"
          href={instagramUrl}
          aria-label="WYRD on Instagram"
        >
          <Image
            className="block h-auto w-full"
            src="/assets/instagram.svg"
            alt=""
            width={24}
            height={24}
            draggable={false}
          />
        </a>
      </footer>
    </main>
  );
}
