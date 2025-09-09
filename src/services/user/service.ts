import instance from "@/lib/axios/instance";

export const userServices = {
  getAllUsers: () => instance.get("/api/users"),
  updateUser: (id: string, data: any, token: string) =>
    instance.put(`/api/users/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getUser: (id: string) => instance.get(`/api/users/${id}`),
  deleteUser: (id: string, token: string) =>
    instance.delete(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getProfile: (token: string) =>
    instance.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  uploadProfile: (formData: FormData, token: string) =>
    instance.put("/api/user/upload", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }),
  updateProfile: (data: any, token: string) =>
    instance.put(`/api/user/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  changePassword: (data: any, token: string) =>
    instance.put(`/api/user/change-password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default userServices;
