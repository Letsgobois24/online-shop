import snap from "./init";

export type TransactionType = {
  token: string;
  redirect_url: string;
};

export const createTransaction = async (params: any) => {
  const transaction = await snap.createTransaction(params);
  return transaction;
};

export const getTransaction = async (token: string) => {
  return await snap.transaction.status(token);
};
