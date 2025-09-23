"use client";

import Button from "@/components/Elements/Button";
import Icon from "@/components/Elements/Icon";
import Modal from "@/components/Fragments/Modal";
import React, {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";
import { useToaster } from "@/context/ToasterContext";
import InputField from "@/components/Elements/Input/InputField";
import Select from "@/components/Elements/Input/Select";
import type { ProductType, StockType } from "@/types/product.type";
import InputFile from "@/components/Elements/Input/InputFile";
import Label from "@/components/Elements/Input/Label";
import productsServices from "@/services/products/services";
import Image from "next/image";
import TextAreaField from "@/components/Elements/Input/TextAreaField";

type PropTypes = {
  setUpdatedProduct: Dispatch<SetStateAction<ProductType | null>>;
  updatedProduct: ProductType | null;
  setUpdateData: Dispatch<SetStateAction<boolean>>;
};

export default function ModalUpdateProduct({
  setUpdatedProduct,
  updatedProduct,
  setUpdateData,
}: PropTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState<StockType[]>(
    updatedProduct?.stock || [{ size: 0, qty: 0 }]
  );
  const [changeImage, setChangeImage] = useState<File | null>(null);
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
    if (!changeImage) {
      formData.delete("product-image");
    }

    // Update data and upload image
    const res = await productsServices.updateProduct(
      updatedProduct?.id || "",
      formData
    );

    setUpdateData(true);
    showToaster(res.data.success ? "success" : "danger", res.data.message);
    setIsLoading(false);
  };

  return (
    <Modal title="Edit Product" onClose={() => setUpdatedProduct(null)}>
      <form className="p-4 md:p-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <InputField
              name="name"
              label="Name"
              className="text-sm"
              type="text"
              placeholder="Insert product name"
              defaultValue={updatedProduct?.name}
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
              defaultValue={updatedProduct?.price}
              required
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <Select
              name="category"
              label="Category"
              defaultValue={updatedProduct?.category}
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
              defaultValue={String(updatedProduct?.status)}
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
              className="mb-3 mx-auto border-gray-300 border-2"
              src={
                changeImage
                  ? URL.createObjectURL(changeImage)
                  : updatedProduct?.image || "/image/empty-image.png"
              }
            />
            <InputFile
              name="product-image"
              changeFile={changeImage}
              setChangeFile={setChangeImage}
              required={false}
            />
          </div>
          <div className="col-span-2">
            <TextAreaField
              name="description"
              label="Description"
              className="text-sm h-24"
              placeholder="Insert description product"
              defaultValue={updatedProduct?.description || ""}
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
                  defaultValue={item.size}
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
                  placeholder="Insert product qty"
                  defaultValue={item.qty}
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
        <Button
          type="submit"
          variant="warning"
          className="w-full"
          isLoading={isLoading}
        >
          <Icon icon="edit" size={18} />
          <span className="ml-1.5 font-semibold text-sm">Edit Product</span>
        </Button>
      </form>
    </Modal>
  );
}
