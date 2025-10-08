import instance from "@/lib/axios/instance";

const endpoint = "/api/transaction";

export const transactionServices = {
  generateTransaction: (data: any) => instance.post(endpoint, data),
  getAllTransaction: () => instance.get(`${endpoint}/admin`),
  getTransaction: (order_id: string) =>
    instance.get(`${endpoint}?order_id=${order_id}`),
  updateTransaction: (order_id: string) =>
    instance.put(`${endpoint}?order_id=${order_id}`),
};

export default transactionServices;
