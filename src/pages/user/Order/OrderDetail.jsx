/* eslint-disable no-unused-vars */
import { useState } from "react";
import FullScreenModal from "../../../components/admin/Modal";
import Invoice from "../../../components/user/Invoice";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
function OrderDetails({ order }) {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const formatedDate = new Date(order.orderDate).toLocaleString(
        "en-US",
        {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }
    );
    console.log(formatedDate);

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const openInvoice = () => {
        navigate("/user/invoice", {
            state: {
                order
            }
        })
    }
    return (
        <>
            <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
                <Invoice order={order} />
            </FullScreenModal>
            <div className="flex gap-5 px-7 py-4 mt-5 w-full rounded shadow-sm bg-zinc-100 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                <div className="flex flex-auto gap-5 justify-between items-start px-0.5">
                    <div className="flex flex-col">
                        <div className="text-xs leading-4 text-zinc-400">Order placed</div>
                        <div className="mt-2 text-xs leading-5 text-zinc-900">
                            {formatedDate || 1}
                        </div>
                    </div>
                    <div className="flex flex-col self-stretch whitespace-nowrap">
                        <div className="text-xs leading-4 text-zinc-400">Total</div>
                        <div className="mt-2.5 text-xs leading-5 text-zinc-900 font-bold">
                            &#8377;{((order.totalAmount + order?.shipping_charges) - order?.discountPrice).toFixed(2)}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xs leading-4 text-zinc-400">Ship to</div>
                        <div className="mt-2 text-xs leading-5 text-zinc-900">
                            {order.shippingAddress || "Dombivli"}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col self-start">
                    <div className="text-xs leading-4 text-zinc-900">
                        order ID: #{order.orderId}
                    </div>
                    <div className="flex gap-5 justify-between mt-2.5 text-xs leading-5 text-slate-500">
                        <button>View order details</button>
                        <button onClick={openInvoice}>View invoice</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetails