import instance from "@/lib/axios/instance";

const endpoint = "/api/products";

export const productsServices = {
  getAllProducts: () => instance.get(endpoint),
  getProduct: (id: string) => instance.get(`${endpoint}/${id}`),
  addProduct: (formData: FormData) =>
    instance.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteProduct: (id: string) => instance.delete(`${endpoint}/${id}`),
  updateProduct: (id: string, formData: FormData) =>
    instance.put(`${endpoint}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default productsServices;
