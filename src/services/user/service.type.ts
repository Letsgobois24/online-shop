import type { RoleType } from "next-auth";

export type ChangePasswordType = {
  oldPassword?: string;
  newPassword: string;
  encryptedPassword?: string;
};

export type ChangeProfileType = {
  fullname: string;
  phone: string;
};

export type UserUpdateType = {
  role: RoleType;
};
