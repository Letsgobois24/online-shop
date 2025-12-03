import HomeView from "./HomeView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Belanja Online Terlengkap & Termurah",
  description:
    "Temukan berbagai produk berkualitas dengan harga terbaik di Letsgobois Shop. Nikmati kemudahan belanja online aman, cepat, dan banyak promo menarik setiap hari.",
};

export default function HomePage() {
  return <HomeView />;
}
