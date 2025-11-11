import { StockType } from "@/types/product.type";
import validation from "@/utils/validation/productValidation";

export type DataType = {
  name: string;
  price: number;
  category: string;
  image: string;
  stocks: StockType[];
  fileName: string;
  "product-image": File;
  description: string;
};

type StockErrorType = { size?: string; qty?: string };

export type ErrorType = {
  name?: string;
  price?: string;
  category?: string;
  stocks?: StockErrorType[];
  description?: string;
  "product-image"?: string;
};

// Validasi Form
const saveValidate = (
  formData: FormData,
  checkImg: boolean = true
): ErrorType | null => {
  const newError: ErrorType = {};
  const rawData = Object.fromEntries(formData.entries());
  const data = {
    ...rawData,
    stocks: JSON.parse(rawData.stock as string),
    price: Number(rawData.price as string),
  } as DataType;

  newError.name = validation.name(data.name);
  newError.price = validation.price(data.price);
  newError.description = validation.description(data.description);
  newError.stocks = validation.stocks(data.stocks);
  if (checkImg) {
    newError["product-image"] = validation.file(data["product-image"]);
  }
  const isValid = Object.values(newError)
    .flat()
    .every((value) => value == undefined);
  if (!isValid) {
    return newError; //Jika masih ada error
  }
  return null; //Jika sudah tidak ada error
};

export default saveValidate;
