type StockType = {
  size: number;
  qty: number;
};

export type ProductType = {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  status: boolean;
  stock: StockType[];
  created_at: Date;
  updated_at: Date;
};
