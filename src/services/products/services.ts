import instance from "@/lib/axios/instance";

export const productsServices = {
  getAllProducts: () => instance.get("/api/products"),
  getProduct: (id: string) => instance.get("/api/products/" + id),
  addProduct: (formData: FormData, token: string) =>
    instance.post("/api/products", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }),
  deleteProduct: (id: string, token: string) =>
    instance.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProduct: (id: string, formData: FormData, token: string) =>
    instance.put(`/api/products/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default productsServices;
