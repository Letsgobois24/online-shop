import validation from "@/utils/validation/profileValidation";
import { ErrorType } from "../page";

type DataType = {
  email: string;
  password: string;
};

// Validasi Form
const formValidate = (data: DataType): ErrorType | null => {
  const newError: ErrorType = {};

  newError.email = validation.email(data.email);
  if (!data.password) {
    newError.password = "Password is required";
  }

  const isNotValid = Object.values(newError).find((err) => err !== undefined);
  if (isNotValid) {
    return newError;
  }
  return null;
};

export default formValidate;
