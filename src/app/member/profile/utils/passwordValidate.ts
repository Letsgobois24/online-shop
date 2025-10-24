import { PasswordErrorType } from "../page";
import validation from "@/utils/validation";

type DataType = {
  oldPassword?: string;
  newPassword: string;
};

// Validasi Form
const passwordValidate = (data: DataType) => {
  const newError: PasswordErrorType | null = {};

  if (data.oldPassword === "") {
    newError.oldPassword = "Old password is required";
  }
  newError.newPassword = validation.password(data.newPassword);

  const isNotValid = Object.values(newError).find((err) => err !== undefined);
  if (isNotValid) {
    return newError;
  }
  return null;
};

export default passwordValidate;
