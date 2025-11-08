"use client";

import Button from "@/components/Elements/Button";
import Modal from "@/components/Fragments/Modal/Modal";
import React, {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useRef,
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
import saveValidate, { type ErrorType } from "../utils/saveValidate";

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
  const [validate, setValidate] = useState<ErrorType>();
  const modalRef = useRef<HTMLDivElement>(null);
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
    const filteredStock = stockCount.filter((stock) => stock.qty || stock.size);
    formData.append("stock", JSON.stringify(filteredStock));
    formData.delete("size");
    formData.delete("qty");
    const validation = saveValidate(formData);
    if (validation) {
      setValidate(validation);
      setIsLoading(false);

      // Scroll ke bagian paling atas modal
      if (modalRef.current) {
        modalRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }

      return;
    }
    setValidate({});
    // Add data and upload image
    try {
      const res = await productsServices.addProduct(formData);

      showToaster("success", res.data.message);
    } catch (err: any) {
      showToaster("danger", err.response.data.message);
    }
    setIsLoading(false);
    setUpdateData(true);
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
              error={validate?.name}
            />
          </div>
          <div className="col-span-2">
            <InputField
              name="price"
              label="Price"
              className="text-sm"
              type="number"
              placeholder="Insert price"
              error={validate?.price}
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
              required={false}
              error={validate?.["product-image"]}
            />
          </div>
          <div className="col-span-2">
            <TextAreaField
              name="description"
              label="Description"
              className="text-sm h-24"
              placeholder="Insert description product"
              error={validate?.description}
            />
          </div>
          <label className="col-span-2 font-semibold" htmlFor="stock">
            Stock
          </label>
          {stockCount.map((item, idx) => (
            <React.Fragment key={idx}>
              <div>
                <InputField
                  label="Size"
                  name="size"
                  type="number"
                  placeholder="Insert product size"
                  error={validate?.stocks?.[idx]?.size}
                  onChange={(e) =>
                    handleAddStock(idx, "size", Number(e.target.value))
                  }
                />
              </div>
              <div>
                <InputField
                  label="Qty"
                  name="qty"
                  type="number"
                  placeholder="Insert product size"
                  error={validate?.stocks?.[idx]?.qty}
                  onChange={(e) =>
                    handleAddStock(idx, "qty", Number(e.target.value))
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
