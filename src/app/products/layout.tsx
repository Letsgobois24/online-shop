import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Shop Fashion",
  description:
    "Browse our complete catalog. Get exclusive offers, special discounts, and the latest trending items only at Letsgobois Shop.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
