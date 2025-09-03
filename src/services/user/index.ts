import instance from "@/lib/axios/instance";

export const userServices = {
  getAllUsers: () => instance.get("/api/users"),
  updateUser: (id: string, data: any) =>
    instance.put("/api/users", { id, data }),
  getUser: (id: string) => instance.get(`/api/users/${id}`),
  deleteUser: (id: string) => instance.delete(`/api/users/${id}`),
};

export default userServices;
