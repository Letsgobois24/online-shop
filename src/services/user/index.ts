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
};

export default userServices;
