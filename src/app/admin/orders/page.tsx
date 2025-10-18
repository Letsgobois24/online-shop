"use client";

import ModalDetailOrder from "@/components/Fragments/Modal/ModalDetailOrder";
import Button from "@/components/Elements/Button";
import Icon from "@/components/Elements/Icon";
import transactionServices from "@/services/transaction/services";
import { TransactionType } from "@/types/user.type";
import { convertToIDR } from "@/utils/currency";
import Script from "next/script";
import { useEffect, useState } from "react";

type AdminTransactionType = TransactionType & {
  userId: string;
};

export default function OrderPage() {
  const [transactions, setTransactions] = useState<[] | AdminTransactionType[]>(
    []
  );
  const [detailModal, setDetailModal] = useState<number | null>(null);

  const getAllTransaction = async () => {
    const { data } = await transactionServices.getAllTransaction();
    setTransactions(data.data);
  };

  useEffect(() => {
    getAllTransaction();
  }, []);

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />

      <div className="relative overflow-x-auto mt-6">
        {transactions.length > 0 ? (
          <table className="w-full text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-1 px-2">#</th>
                <th className="py-1 px-2">Order id</th>
                <th className="py-1 px-2">User id</th>
                <th className="py-1 px-2">Total</th>
                <th className="py-1 px-2">Status</th>
                <th className="py-1 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction.orderId}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <td className="py-1 px-2">{index + 1}</td>
                  <td className="py-1 px-2">{transaction.orderId}</td>
                  <td className="py-1 px-2">{transaction.userId}</td>
                  <td className="py-1 px-2">
                    {convertToIDR(transaction.total)}
                  </td>
                  <td className="py-1 px-2">{transaction.status}</td>
                  <td className="py-1 px-2 flex space-x-2">
                    <Button
                      padding="small"
                      variant="warning"
                      className="h-fit"
                      onClick={() => setDetailModal(index)}
                    >
                      <Icon icon="detail" className="rotate-90" size={20} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="h-[88vh] flex justify-center items-center">
            <Icon icon="loading" size={32} />
          </div>
        )}
      </div>
      {detailModal != null && (
        <ModalDetailOrder
          setDetailModal={setDetailModal}
          details={transactions[detailModal]}
        />
      )}
    </>
  );
}
