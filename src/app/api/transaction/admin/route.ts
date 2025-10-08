import { type NextRequest } from "next/server";
import { getAllData } from "@/lib/firebase/service";
import { User } from "next-auth";
import { verifyToken } from "@/utils/verifyToken";
import { errorMessage, successMessage } from "@/utils/response";
import { TransactionType, UserType } from "@/types/user.type";

export async function GET(request: NextRequest) {
  try {
    const decoded = verifyToken(request, true);
    if (!decoded) {
      throw new Error();
    }

    const users: UserType[] = await getAllData("users");
    let allTransactions: [] | TransactionType[] = [];
    users.forEach((user) => {
      if (user.transaction) {
        const userTransactions = user.transaction.map((transaction) => {
          return {
            ...transaction,
            userId: user.id,
          };
        });
        allTransactions = [...allTransactions, ...userTransactions];
      }
    });

    return successMessage("Success to get users", 200, allTransactions);
  } catch {
    return errorMessage();
  }
}
