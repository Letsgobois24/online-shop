import { Metadata } from "next";
import CartView from "./CartView";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description:
    "Review your selected items. Proceed to checkout now before your favorite products run out of stock.",
};

export default function CartPage() {
  return (
    <div className="px-4 py-6">
      <CartView />
    </div>
  );
}
