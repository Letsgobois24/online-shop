"use client";

import Button from "@/components/Elements/Button";
import userServices from "@/services/user";
import { User } from "next-auth";
import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await userServices.getAllUsers();
      console.log(res);
      setUsers(res.data.data);
    };
    getAllUsers();
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold">Users Management</h1>
      <div className="relative overflow-x-auto mt-6">
        {users.length > 0 ? (
          <table className="w-full text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="py-1 px-2">#</th>
                <th className="py-1 px-2">Fullname</th>
                <th className="py-1 px-2">Email</th>
                <th className="py-1 px-2">Phone</th>
                <th className="py-1 px-2">Role</th>
                <th className="py-1 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User, index) => (
                <tr
                  key={user.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <td className="py-1 px-2">{index + 1}</td>
                  <td className="py-1 px-2">{user.fullname}</td>
                  <td className="py-1 px-2">{user.email}</td>
                  <td className="py-1 px-2">{user.phone}</td>
                  <td className="py-1 px-2">{user.role}</td>
                  <td className="py-1 px-2 flex space-x-2">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
