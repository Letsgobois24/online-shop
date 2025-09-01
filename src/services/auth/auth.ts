import instance from "@/lib/axios/instance";

export const authServices = {
  registerAccount: async (data: any) => {
    try {
      const res = await instance.post("/api/auth/signup", data);
      return {
        success: true,
        status: res.status,
        message: res.data.message,
      };
    } catch (err: any) {
      return {
        success: false,
        status: err.response.status || "error",
        message: err.response.data.message || "Something went wrong",
      };
    }
  },
};

export default authServices;
