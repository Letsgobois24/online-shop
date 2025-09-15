import instance from "@/lib/axios/instance";

export const productsServices = {
  getAllProducts: () => instance.get("/api/products"),
};

export default productsServices;
