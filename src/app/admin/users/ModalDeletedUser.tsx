import Button from "@/components/Elements/Button";
import Icon from "@/components/Elements/Icon";
import Modal from "@/components/Fragments/Modal";
import userServices from "@/services/user";
import { User } from "next-auth";
import { FormEvent, useState } from "react";

export default function ModalDeletedUser({
  setDeletedUser,
  deletedUser,
  setUpdateData,
}: {
  setDeletedUser: any;
  deletedUser: User;
  setUpdateData: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDeleteUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await userServices.deleteUser(deletedUser.id || "");
    if (res.status === 200) {
      setDeletedUser({});
      setUpdateData(true);
    }
    setIsLoading(false);
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="p-4 md:p-5 text-center">
          <Icon
            icon="danger"
            size={48}
            className="mx-auto mb-4 text-gray-400"
          />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete user {deletedUser.fullname} ?
          </h3>
          <div className="flex justify-center space-x-4">
            <Button
              variant="danger"
              isLoading={isLoading}
              onClick={handleDeleteUser}
            >
              Yes, I&apos;m sure
            </Button>
            <Button variant="white" onClick={() => setDeletedUser({})}>
              No, cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
