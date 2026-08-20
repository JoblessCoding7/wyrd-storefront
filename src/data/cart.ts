export type CartLineItemPresentation = {
  id: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
  unitPrice: number;
  price: string;
  preorderLabel?: string;
  quantity: number;
};

export type CartPresentation = {
  lineItems: CartLineItemPresentation[];
  subtotal: string;
};

export const sampleKt2LineItem: CartLineItemPresentation = {
  id: "kt2-limited-edition-merch",
  image: {
    src: "/assets/kt2-box.svg",
    alt: "KT2 limited edition merchandise box",
    width: 605,
    height: 443,
  },
  title: "KILL THOME 2 LIMITED\nEDITION MERCH",
  unitPrice: 59.84,
  price: "CA$59.84",
  preorderLabel: "Pre-order",
  quantity: 1,
};
