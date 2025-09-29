import instance from "@/lib/axios/instance";

const endpoint = "/api/transaction";

export const transactionServices = {
  generateTransaction: (data: any) => instance.post(endpoint, data),
};

export default transactionServices;
