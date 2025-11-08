import { ErrorType } from "../page";
import validation from "@/utils/validation/profileValidation";

type DataType = {
  fullname: string;
  email: string;
  phone: string;
  password: string;
  "confirm-password": string;
};

// Validasi Form
const formValidate = (data: DataType): ErrorType | null => {
  const newError: ErrorType = {};

  newError.fullname = validation.fullname(data.fullname);
  newError.email = validation.email(data.email);
  newError.phone = validation.phone(data.phone);
  newError.password = validation.password(data.password);
  newError["confirm-password"] = validation.confirmPassword(
    data["confirm-password"],
    data.password
  );
  const isNotValid = Object.values(newError).find((err) => err !== undefined);
  if (isNotValid) {
    return newError;
  }
  return null;
};

export default formValidate;
