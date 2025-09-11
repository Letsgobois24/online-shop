"use client";

import Button from "@/components/Elements/Button";
import Icon from "@/components/Elements/Icon";
import Title from "@/components/Elements/Title";
import userServices from "@/services/user/service";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import ModalUpdatedUser from "./ModalUpdatedUser";
import ModalDeletedUser from "./ModalDeletedUser";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [updatedUser, setUpdatedUser] = useState<User>({});
  const [deletedUser, setDeletedUser] = useState<User>({});
  const [updateData, setUpdateData] = useState(false);

  const getAllData = async () => {
    const res = await userServices.getAllUsers();
    setUsers(res.data.data);
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    if (updateData) {
      getAllData();
      setUpdateData(false);
    }
  }, [updateData]);

  return (
    <>
      <div className="w-full">
        <Title>Users Management</Title>
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
                {users.map((user, index) => (
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
                      <Button
                        onClick={() => setUpdatedUser(user)}
                        padding="small"
                        className="h-fit"
                      >
                        <Icon icon="edit" size={20} />
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setDeletedUser(user)}
                        padding="small"
                        variant="danger"
                        className="h-fit"
                      >
                        <Icon icon="delete" size={20} />
                      </Button>
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
      {Object.keys(updatedUser).length > 0 && (
        <ModalUpdatedUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUpdateData={setUpdateData}
        />
      )}
      {Object.keys(deletedUser).length > 0 && (
        <ModalDeletedUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
          setUpdateData={setUpdateData}
        />
      )}
    </>
  );
}
