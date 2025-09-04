import Button from "@/components/Elements/Button";
import Icon from "@/components/Elements/Icon";
import Modal from "@/components/Fragments/Modal";
import InputField from "@/components/Elements/Input/InputField";
import { type User } from "next-auth";
import Select from "@/components/Elements/Input/Select";
import { FormEvent, useState } from "react";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";

export default function ModalUpdatedUser({
  setUpdatedUser,
  updatedUser,
  setUpdateData,
}: {
  setUpdatedUser: any;
  updatedUser: User;
  setUpdateData: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();

  const handleUpdateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      role: formData.get("role") as string,
    };
    console.log(data);
    const res = await userServices.updateUser(
      updatedUser.id || "",
      data,
      session.data?.accessToken || ""
    );
    if (res.status === 200) {
      setUpdatedUser({});
      setUpdateData(true);
    }
    setIsLoading(false);
  };

  return (
    <Modal title="Edit User" onClose={() => setUpdatedUser({})}>
      <form className="p-4 md:p-5" onSubmit={handleUpdateUser}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <InputField
              name="email"
              label="Email"
              className="text-sm"
              defaultValue={updatedUser.email}
              disabled
            />
          </div>
          <div className="col-span-2">
            <InputField
              name="fullname"
              label="Fullname"
              className="text-sm"
              defaultValue={updatedUser.fullname || ""}
              disabled
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <InputField
              name="phone"
              label="Phone"
              className="text-sm"
              defaultValue={updatedUser.phone || ""}
              disabled
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Select
              name="role"
              defaultValue={updatedUser.role}
              label="Role"
              options={[
                { label: "Member", value: "member" },
                { label: "Admin", value: "admin" },
              ]}
            />
          </div>
        </div>
        <Button type="submit" isLoading={isLoading}>
          <Icon icon="edit" size={18} />
          <span className="ml-1.5 font-semibold text-sm">Edit User</span>
        </Button>
      </form>
    </Modal>
  );
}
