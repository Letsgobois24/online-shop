import Modal from "@/components/Fragments/Modal";
import {
  type Dispatch,
  FormEvent,
  MouseEvent,
  type SetStateAction,
  useState,
  Fragment,
} from "react";
import { AddressType, UserType } from "@/types/user.type";
import Button from "@/components/Elements/Button";
import InputField from "@/components/Elements/Input/InputField";
import TextAreaField from "@/components/Elements/Input/TextAreaField";
import userServices from "@/services/user/service";
import { useToaster } from "@/context/ToasterContext";
import Icon from "@/components/Elements/Icon";

export default function ModalChangeAddress({
  selectedAddress,
  setSelectedAddress,
  profile,
  setProfile,
  setModalChangeAddress,
}: {
  selectedAddress: number;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  profile: UserType;
  setProfile: Dispatch<SetStateAction<UserType | null>>;
  setModalChangeAddress: Dispatch<SetStateAction<boolean>>;
}) {
  const { showToaster } = useToaster();
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState<number | null>(null);
  const address = profile.address;

  const handleDeleteCart = async (
    e: MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.stopPropagation();
    const newAddress = address.filter((_, i) => idx !== i);
    const data = {
      address: newAddress,
    };

    try {
      await userServices.updateProfile(data);
      setProfile({ ...profile, address: newAddress });
      showToaster("success", "Success to delete address");
    } catch {
      showToaster("danger", "Failed to delete address");
    }
    setIsLoading(false);
  };

  const handleChangeMainAddress = async (
    e: MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.stopPropagation();
    setIsLoading(true);

    const newAddress = address.map((item, i) => {
      idx == i ? (item.isMain = true) : (item.isMain = false);
      return item;
    });

    const data = {
      address: newAddress,
    };

    try {
      await userServices.updateProfile(data);
      setProfile({ ...profile, address: newAddress });
      showToaster("success", "Success change main address");
    } catch {
      showToaster("danger", "Failed change main address");
    }

    setIsLoading(false);
  };

  const handleAddAddress = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const newAddress: AddressType[] = [
      ...address,
      {
        recipient: formData.get("recipient") as string,
        phone: formData.get("phone") as string,
        addressLine: formData.get("addressLine") as string,
        note: formData.get("note") as string,
        isMain: address.length == 0,
      },
    ];

    const data = {
      address: newAddress,
    };
    try {
      await userServices.updateProfile(data);
      setProfile({ ...profile, address: newAddress });
      selectedAddress == -1 && setSelectedAddress(0);
      setIsAddNew(false);
      showToaster("success", "Success add address");
    } catch {
      showToaster("danger", "Failed add address");
    }

    form.reset();
    setIsLoading(false);
  };

  const handleEditAddress = async (
    e: FormEvent<HTMLFormElement>,
    idx: number
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const newAddress: AddressType[] = address.map((item, i) => {
      if (idx == i) {
        return {
          recipient: formData.get("recipient") as string,
          phone: formData.get("phone") as string,
          addressLine: formData.get("addressLine") as string,
          note: formData.get("note") as string,
          isMain: item.isMain,
        };
      }
      return item;
    });

    console.log({ newAddress });

    const data = {
      address: newAddress,
    };
    try {
      await userServices.updateProfile(data);
      setProfile({ ...profile, address: newAddress });
      setSelectedEdit(null);
      showToaster("success", "Success edit address");
    } catch {
      showToaster("danger", "Failed edit address");
    }

    setIsLoading(false);
  };

  return (
    <Modal title="Change Address" onClose={() => setModalChangeAddress(false)}>
      <div className="p-4 w-full max-h-full">
        <div className="flex flex-col space-y-3 mb-3">
          {address?.map((item, idx) => (
            <Fragment key={idx}>
              <div
                className={`${
                  selectedAddress === idx
                    ? "border-gray-900"
                    : "border-gray-400"
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
                <div className="flex-1">
                  <h6 className="font-semibold">{item.recipient}</h6>
                  <p>{item.phone}</p>
                  <p>{item.addressLine}</p>
                  <p>{item.note}</p>
                </div>
                <div className="self-center mr-2 z-10 flex">
                  <button
                    disabled={isLoading || selectedAddress === idx}
                    onClick={(e) => handleDeleteCart(e, idx)}
                    className={`${
                      selectedAddress !== idx && "hover:text-red-500"
                    } text-gray-400 cursor-pointer p-1`}
                  >
                    <Icon icon="delete" size={22} />
                  </button>
                  <button
                    disabled={isLoading || item.isMain}
                    onClick={(e) => handleChangeMainAddress(e, idx)}
                    className={`${
                      item.isMain
                        ? "text-blue-600"
                        : "hover:text-blue-500 text-gray-400"
                    } cursor-pointer p-1`}
                  >
                    <Icon icon="main" size={20} />
                  </button>
                  <button
                    disabled={isLoading}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectedEdit == idx
                        ? setSelectedEdit(null)
                        : setSelectedEdit(idx);
                    }}
                    className={`${
                      selectedEdit == idx
                        ? "text-yellow-600"
                        : "hover:text-yellow-500 text-gray-400"
                    } cursor-pointer p-1`}
                  >
                    <Icon icon="edit" size={20} />
                  </button>
                </div>
              </div>
              <form
                onSubmit={(e) => handleEditAddress(e, idx)}
                className={idx == selectedEdit ? "" : "hidden"}
              >
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <InputField
                    name="recipient"
                    label="Recipient"
                    defaultValue={item.recipient}
                  />
                  <InputField
                    name="phone"
                    label="Phone"
                    defaultValue={item.phone}
                  />
                  <TextAreaField
                    name="addressLine"
                    label="Address Line"
                    className="col-span-2"
                    defaultValue={item.addressLine}
                  />
                  <TextAreaField
                    name="note"
                    label="Note"
                    className="col-span-2"
                    defaultValue={item.note}
                  />
                </div>
                <Button
                  variant="dark"
                  type="submit"
                  isLoading={isLoading}
                  className="w-full"
                >
                  Edit Address
                </Button>
              </form>
            </Fragment>
          ))}
        </div>
        <Button
          variant="dark"
          size="large"
          className="mb-3"
          onClick={() => setIsAddNew(!isAddNew)}
        >
          {isAddNew ? "Cancel" : "Add New Address"}
        </Button>
        <form
          onSubmit={(e) => handleAddAddress(e)}
          className={isAddNew ? "" : "hidden"}
        >
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <InputField name="recipient" label="Recipient" />
            <InputField name="phone" label="Phone" />
            <TextAreaField
              name="addressLine"
              label="Address Line"
              className="col-span-2"
            />
            <TextAreaField name="note" label="Note" className="col-span-2" />
          </div>
          <Button
            variant="dark"
            type="submit"
            isLoading={isLoading}
            className="w-full"
          >
            Add Address
          </Button>
        </form>
      </div>
    </Modal>
  );
}
