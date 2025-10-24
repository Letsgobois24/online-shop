import { ProfileErrorType } from "../page";
import validation from "@/utils/validation";

type DataType = {
  fullname: string;
  phone: string;
};

// Validasi Form
const profileValidate = (data: DataType): ProfileErrorType | null => {
  const newError: ProfileErrorType = {};

  newError.fullname = validation.fullname(data.fullname);
  newError.phone = validation.phone(data.phone);

  const isNotValid = Object.values(newError).find((err) => err !== undefined);
  if (isNotValid) {
    return newError;
  }
  return null;
};

export default profileValidate;
