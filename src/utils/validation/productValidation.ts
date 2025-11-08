import { StockType } from "@/types/product.type";

// Validasi Product Name
const name = (name: string) => {
  if (!name.trim()) {
    return "Product name is required";
  }
};

// Validasi Product Price
const price = (price: number) => {
  if (!price) {
    return "Price is required";
  }
};

// Validasi Description
const description = (description: string) => {
  if (description.trim() && description.length > 255) {
    return "Maximum letter is 255";
  }
};

// Validasi Stocks
const stocks = (stocks: StockType[]) => {
  if (stocks.length === 0) {
    return [
      {
        qty: "Qty is required",
        size: "Size is required",
      },
    ];
  }
  return stocks.map((stock) => {
    const error: any = {};
    if (!stock.qty) {
      error.qty = "Qty is required";
    }
    const sameSizeCount = stocks.filter(
      (item) => stock.size === item.size
    ).length;
    if (!stock.size) {
      error.size = "Size is required";
    } else if (sameSizeCount > 1) {
      error.size = "Size is same with others";
    }
    if (Object.keys(error).length > 0) {
      return error;
    }
    return undefined;
  });
};

// Validasi File
const file = (file: File) => {
  if (!file || !(file.size > 0)) {
    return "File has not uploaded";
  }
  if (file.size > 1048576) {
    return "File bigger than 1 MB";
  }
};

const validation = { name, price, description, stocks, file };
export default validation;
