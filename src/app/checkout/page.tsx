import Script from "next/script";
import CheckoutView from "./CheckoutView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout & Payment",
  description:
    "Complete your order securely. Choose the payment method and shipping option that suits you best.",
};

declare global {
  interface Window {
    snap: any;
  }
}

export default function CheckoutPage() {
  return (
    <div className="px-4 py-6">
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <CheckoutView />;
    </div>
  );
}
