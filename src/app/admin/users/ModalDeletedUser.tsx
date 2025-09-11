import Button from "@/components/Elements/Button";
import Icon from "@/components/Elements/Icon";
import Modal from "@/components/Fragments/Modal";
import userServices from "@/services/user/service";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";
import { useToaster } from "@/context/ToasterContext";

export default function ModalDeletedUser({
  setDeletedUser,
  deletedUser,
  setUpdateData,
}: {
  setDeletedUser: Dispatch<SetStateAction<User>>;
  deletedUser: User;
  setUpdateData: Dispatch<SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const { showToaster } = useToaster();

  const handleDeleteUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await userServices.deleteUser(
      deletedUser.id || "",
      session.data?.accessToken || ""
    );

    if (res.status === 200) {
      setDeletedUser({});
      setUpdateData(true);
    }
    setIsLoading(false);
    showToaster(res.data.success ? "success" : "danger", res.data.message);
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
              size="medium"
            >
              Yes, I&apos;m sure
            </Button>
            <Button
              variant="white"
              size="medium"
              onClick={() => setDeletedUser({})}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
