import snap from "./init";

export type TransactionType = {
  token: string;
  redirect_url: string;
};

const createTransaction = async (params: any) => {
  const transaction = await snap.createTransaction(params);
  return transaction;
};

export default createTransaction;
