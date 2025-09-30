import { CartType } from "./cart.type";

export type AddressType = {
  addressLine: string;
  isMain: boolean;
  note: string;
  phone: string;
  recipient: string;
};

export type TransactionType = {
  orderId: string;
  address: AddressType;
  items: CartType[];
  redirect_url: string;
  status: string;
  token: string;
  total: number;
};

export type UserType = {
  id: string;
  fullname: string;
  role: "member" | "admin";
  email: string;
  phone?: string;
  password: string;
  type?: "google";
  image?: string;
  created_at: Date;
  updated_at: Date;
  cart: CartType[];
  address: AddressType[];
  transaction?: TransactionType[];
};
