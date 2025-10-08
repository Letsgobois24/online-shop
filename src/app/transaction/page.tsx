"use client";

import Button from "@/components/Elements/Button";
import Title from "@/components/Elements/Title";
import transactionServices from "@/services/transaction/services";
import React, { useEffect } from "react";
import { useToaster } from "@/context/ToasterContext";
import { useRouter } from "next/navigation";

export default function TransactionPage({
  searchParams,
}: {
  searchParams: Promise<{ order_id: string }>;
}) {
  const { showToaster } = useToaster();
  const { push } = useRouter();
  const params = React.use(searchParams);
  const order_id = params.order_id;

  const checkPayment = async () => {
    const res = await transactionServices.updateTransaction(order_id || "");
    if (res.status === 200) {
      showToaster("success", "Success payment");
    }
  };

  useEffect(() => {
    checkPayment();
  }, []);

  return (
    <main className="flex flex-col items-center">
      <Title size="extraLarge">Payment Success</Title>
      <Button
        className="w-fit"
        padding="medium"
        onClick={() => push("/member/orders")}
      >
        Check Your Order Here
      </Button>
    </main>
  );
}
