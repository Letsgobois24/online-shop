import instance from "@/lib/axios/instance";
import type { ChangePasswordType, UserUpdateType } from "./service.type";

const adminEndpoint = "/api/users";
const memberEndpoint = {
  user: "/api/user",
  profile: "/api/user/profile",
  upload: "/api/user/upload",
  cart: "/api/user/cart",
  changePassword: "/api/user/change-password",
};

export const userServices = {
  getAllUsers: () => instance.get(adminEndpoint),
  updateUser: (id: string, data: UserUpdateType) =>
    instance.put(`${adminEndpoint}/${id}`, data),
  getUser: (id: string) => instance.get(`${adminEndpoint}/${id}`),
  deleteUser: (id: string) => instance.delete(`${adminEndpoint}/${id}`),

  getProfile: () => instance.get(memberEndpoint.profile),
  uploadProfile: (formData: FormData) =>
    instance.put(memberEndpoint.upload, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  updateProfile: (data: any) => instance.put(memberEndpoint.profile, data),
  changePassword: (data: ChangePasswordType) =>
    instance.put(memberEndpoint.changePassword, data),
  getCart: () => instance.get(memberEndpoint.cart),
  addToCart: (data: any) => instance.post(memberEndpoint.cart, data),
  updateCart: (data: any) => instance.put(memberEndpoint.cart, data),
};

export default userServices;
