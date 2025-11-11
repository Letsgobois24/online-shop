import Button from "@/components/Elements/Button";
import Icon from "@/components/Elements/Icon";
import Modal from "@/components/Fragments/Modal/Modal";
import productsServices from "@/services/products/services";
import { CartType } from "@/types/cart.type";
import { ProductType } from "@/types/product.type";
import { TransactionType } from "@/types/user.type";
import { convertToIDR } from "@/utils/currency";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropsType = {
  setDetailModal: Dispatch<SetStateAction<number | null>>;
  details: TransactionType;
};

export default function ModalDetailOrder({
  setDetailModal,
  details,
}: PropsType) {
  const [productCart, setProductCart] = useState<
    (CartType & ProductType)[] | []
  >([]);
  const cart = details.items;

  useEffect(() => {
    if (cart.length > 0) {
      const getProductImage = async () => {
        const missingItem = cart.some((item) =>
          productCart.some(
            (p) => p.product_id !== item.product_id || p.size !== item.size
          )
        );
        if (!missingItem) {
          const newCart = await Promise.all(
            cart.map(async (item) => {
              const res = await productsServices.getProduct(item.product_id);
              return { id: item.product_id, ...item, ...res.data.data };
            })
          );
          setProductCart(newCart);
        }
      };

      getProductImage();
    }
  }, [cart]);

  return (
    <Modal title="Detail Order" onClose={() => setDetailModal(null)}>
      <div className="p-4 md:p-5">
        <div className="grid gap-1 mb-4 grid-cols-3">
          {/* Order Data */}
          <h2 className="col-span-3 text-lg font-bold">Order Data</h2>
          <div>
            <h4 className="font-semibold text-sm">Order ID</h4>
            <p className="text-sm">{details.orderId}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Total</h4>
            <p>{convertToIDR(details.total)}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Status</h4>
            <p>{details.status}</p>
          </div>
          {/* Recipient Data */}
          <h2 className="col-span-3 text-lg font-bold mt-2">Recipient Data</h2>
          <div>
            <h4 className="font-semibold text-sm">Name</h4>
            <p>{details.address.recipient}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Phone</h4>
            <p>{details.address.phone}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Notes</h4>
            <p>{details.address.note}</p>
          </div>
          <div className="col-span-3">
            <h4 className="text-sm font-semibold">Address Line</h4>
            <p>{details.address.addressLine}</p>
          </div>
        </div>
        {/* Product Data */}
        <div className="mt-2">
          <h2 className="text-lg font-bold">Product Data</h2>
          {productCart.length > 0 ? (
            productCart.map((item) => (
              <div
                key={`${item.product_id}-${item.size}`}
                className="my-2 flex items-center space-x-3 border rounded-md py-1 px-2 border-gray-300"
              >
                <Image
                  src={item.image}
                  alt={item.name || "Product Image"}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <div className="flex-1">
                  <h5 className="font-semibold">{item.name}</h5>
                  <p className="text-sm">Size {item.size}</p>
                  <p className="text-sm">Quantity {item.qty}</p>
                </div>
                <p className="font-semibold">
                  {convertToIDR(item.price * item.qty)}
                </p>
              </div>
            ))
          ) : (
            <div className="flex justify-center my-2">
              <Icon icon="loading" size={24} />
            </div>
          )}
        </div>
        {/* Others Cost */}
        <div className="grid gap-1 mb-4 grid-cols-2">
          <h2 className="col-span-2 text-lg font-bold">Other Cost</h2>
          <div>
            <h4 className="font-semibold text-sm">Delivery</h4>
            <p className="text-sm">
              {convertToIDR(details.others?.delivery || 0)}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Tax</h4>
            <p>{convertToIDR(details.others?.tax || 0)}</p>
          </div>
        </div>

        <Button
          type="submit"
          variant="dark"
          className="mx-auto"
          size="medium"
          onClick={() => setDetailModal(null)}
        >
          <span className="font-semibold text-sm">Close</span>
        </Button>
      </div>
    </Modal>
  );
}
