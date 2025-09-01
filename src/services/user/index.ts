import instance from "@/lib/axios/instance";

export const userServices = {
  getAllUsers: async () => await instance.get("/api/users"),
  // getAllUsers: async () => {
  //   try {
  //     const res = await instance.get("/api/users");
  //     return {
  //       success: true,
  //       status: res.status,
  //       message: res.data.message,
  //       data: res.data.data,
  //     };
  //   } catch (err: any) {
  //     return {
  //       success: false,
  //       status: err.response.status || "error",
  //       message: err.response.data.message || "Something went wrong",
  //     };
  //   }
  // },
};

export default userServices;
