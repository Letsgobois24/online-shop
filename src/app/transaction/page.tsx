import { Metadata } from "next";
import TransactionView from "./TransactionView";

export const metadata: Metadata = {
  title: "Transaction Status",
  description: "Track your order status and shipping progress.",
};

export default function TransactionPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id: string }>;
}) {
  return (
    <div className="h-main flex justify-center items-center">
      <TransactionView searchParams={searchParams} />;
    </div>
  );
}
