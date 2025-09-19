import Button from "@/components/Elements/Button";
import Icon from "@/components/Elements/Icon";
import Modal from "@/components/Fragments/Modal";
import { useSession } from "next-auth/react";
import {
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";
import { useToaster } from "@/context/ToasterContext";
import { ProductType } from "@/types/product.type";
import productsServices from "@/services/products/services";

type PropTypes = {
  setDeletedProduct: Dispatch<SetStateAction<ProductType | null>>;
  deletedProduct: ProductType | null;
  setUpdateData: Dispatch<SetStateAction<boolean>>;
};

export default function ModalDeleteProduct({
  setDeletedProduct,
  deletedProduct,
  setUpdateData,
}: PropTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const { showToaster } = useToaster();

  const handleDeleteProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await productsServices.deleteProduct(
      deletedProduct?.id || "",
      session.data?.accessToken || ""
    );

    if (res.status === 200) {
      setDeletedProduct(null);
      setUpdateData(true);
    }
    setIsLoading(false);
    showToaster(res.data.success ? "success" : "danger", res.data.message);
  };

  return (
    <Modal onClose={() => setDeletedProduct(null)}>
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="p-4 md:p-5 text-center">
          <Icon
            icon="danger"
            size={48}
            className="mx-auto mb-4 text-gray-400"
          />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete product {deletedProduct?.name} ?
          </h3>
          <div className="flex justify-center space-x-4">
            <Button
              variant="danger"
              isLoading={isLoading}
              onClick={handleDeleteProduct}
              size="medium"
            >
              Yes, I&apos;m sure
            </Button>
            <Button
              variant="white"
              size="medium"
              onClick={() => setDeletedProduct(null)}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
