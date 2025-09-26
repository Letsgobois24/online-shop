import Modal from "@/components/Fragments/Modal";
import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";
import { useToaster } from "@/context/ToasterContext";
import { AddressType } from "@/types/user.type";

export default function ModalChangeAddress({
  selectedAddress,
  setSelectedAddress,
  address,
  setModalChangeAddress,
}: {
  selectedAddress: number;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  address?: AddressType[];
  setModalChangeAddress: Dispatch<SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToaster } = useToaster();

  const handleDeleteUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsLoading(true);

    // const res = await userServices.deleteUser(deletedUser.id || "");

    // if (res.status === 200) {
    //   setDeletedUser({});
    //   setUpdateData(true);
    // }
    // setIsLoading(false);
    // showToaster(res.data.success ? "success" : "danger", res.data.message);
  };

  return (
    <Modal title="Change Address" onClose={() => setModalChangeAddress(false)}>
      <div className="p-4 w-full max-h-full">
        <div className="flex flex-col space-y-3">
          {address?.map((item, idx) => (
            <div
              key={idx}
              className={`${
                selectedAddress == idx ? "border-gray-900" : "border-gray-400"
              } flex p-2 border-2 rounded-md cursor-pointer`}
              onClick={() => {
                setSelectedAddress(idx);
                setModalChangeAddress(false);
              }}
            >
              <div>
                <h6 className="font-semibold">Recipient</h6>
                <p>Phone</p>
                <p>Address</p>
                <p>Note</p>
              </div>
              <div className="ml-1 mr-3">
                <h6 className="font-semibold">:</h6>
                <p>:</p>
                <p>:</p>
                <p>:</p>
              </div>
              <div>
                <h6 className="font-semibold">{item.recipient}</h6>
                <p>{item.phone}</p>
                <p>{item.addressLine}</p>
                <p>{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
