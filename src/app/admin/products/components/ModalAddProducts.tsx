"use client";

import Button from "@/components/Elements/Button";
import Modal from "@/components/Fragments/Modal";
import { useSession } from "next-auth/react";
import React, {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";
import { useToaster } from "@/context/ToasterContext";
import InputField from "@/components/Elements/Input/InputField";
import Select from "@/components/Elements/Input/Select";
import type { StockType } from "@/types/product.type";
import InputFile from "@/components/Elements/Input/InputFile";
import TextAreaField from "@/components/Elements/Input/TextAreaField";
import Label from "@/components/Elements/Input/Label";
import productsServices from "@/services/products/services";
import Image from "next/image";

type PropTypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setUpdateData: Dispatch<SetStateAction<boolean>>;
};

export default function ModalAddProduct({
  setModalAddProduct,
  setUpdateData,
}: PropTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState<StockType[]>([
    { size: 0, qty: 0 },
  ]);
  const [changeImage, setChangeImage] = useState<File | null>(null);
  const session = useSession();
  const { showToaster } = useToaster();

  const handleAddStock = (i: number, stock: "qty" | "size", value: number) => {
    const newStockCount = [...stockCount];
    newStockCount[i][stock] = value;
    setStockCount(newStockCount);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("stock", JSON.stringify(stockCount));
    formData.delete("size");
    formData.delete("qty");

    // Add data and upload image
    const res = await productsServices.addProduct(
      formData,
      session.data?.accessToken || ""
    );

    setIsLoading(false);
    setUpdateData(true);
    showToaster(res.data.success ? "success" : "danger", res.data.message);
  };

  return (
    <Modal title="Add Product" onClose={() => setModalAddProduct(false)}>
      <form className="p-4 md:p-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <InputField
              name="name"
              label="Name"
              className="text-sm"
              type="text"
              placeholder="Insert product name"
              required
            />
          </div>
          <div className="col-span-2">
            <InputField
              name="price"
              label="Price"
              className="text-sm"
              type="number"
              placeholder="Insert price"
              required
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Select
              name="category"
              label="Category"
              options={[
                { label: "Men", value: "men" },
                { label: "Women", value: "women" },
              ]}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Select
              name="status"
              label="Status"
              options={[
                { label: "Released", value: "true" },
                { label: "Not Released", value: "false" },
              ]}
            />
          </div>
          <div className="col-span-2">
            <Label name="product-image" label="Image" />
            <Image
              priority
              width={220}
              height={220}
              alt="Product Image"
              className="mb-3 mx-auto border-gray-300 border-2 rounded-md"
              src={
                changeImage
                  ? URL.createObjectURL(changeImage)
                  : "/image/empty-image.png"
              }
            />
            <InputFile
              name="product-image"
              changeFile={changeImage}
              setChangeFile={setChangeImage}
            />
          </div>
          <div className="col-span-2">
            <TextAreaField
              name="description"
              label="Description"
              className="text-sm h-24"
              placeholder="Insert description product"
            />
          </div>
          <label className="col-span-2 font-semibold" htmlFor="stock">
            Stock
          </label>
          {stockCount.map((item, i) => (
            <React.Fragment key={i}>
              <div>
                <InputField
                  label="Size"
                  name="size"
                  type="number"
                  placeholder="Insert product size"
                  required
                  onChange={(e) =>
                    handleAddStock(i, "size", Number(e.target.value))
                  }
                />
              </div>
              <div>
                <InputField
                  label="Qty"
                  name="qty"
                  type="number"
                  placeholder="Insert product size"
                  onChange={(e) =>
                    handleAddStock(i, "qty", Number(e.target.value))
                  }
                />
              </div>
            </React.Fragment>
          ))}
          <Button
            type="button"
            size="medium"
            onClick={() => setStockCount([...stockCount, { size: 0, qty: 0 }])}
          >
            <span className="mr-1.5 text-2xl">+</span>
            <span className="font-semibold text-sm">Add Stock</span>
          </Button>
        </div>
        <Button type="submit" className="w-full" isLoading={isLoading}>
          <span className="mr-1.5 text-2xl">+</span>
          <span className="font-semibold text-sm">Add Product</span>
        </Button>
      </form>
    </Modal>
  );
}
