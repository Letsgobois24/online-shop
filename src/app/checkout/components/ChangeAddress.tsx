import Button from "@/components/Elements/Button";
import { AddressType } from "@/types/user.type";
import React from "react";

type PropsType = {
  address?: AddressType;
  setModalChangeAddress: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ChangeAddress({
  address,
  setModalChangeAddress,
}: PropsType) {
  return (
    <div className="border border-gray-300 px-3 py-2 rounded-md">
      <h4 className="font-semibold mb-2">Shipping Address</h4>
      {address && (
        <>
          <h6>
            {address?.recipient} - {address?.phone}
          </h6>
          <p className="text-sm">{address?.addressLine}</p>
          <p className="text-sm mb-3">Note: {address?.note}</p>
        </>
      )}
      <Button
        onClick={() => setModalChangeAddress(true)}
        variant="dark"
        className="w-full"
      >
        {address ? "Change" : "Add"} Address
      </Button>
    </div>
  );
}
