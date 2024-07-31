/* eslint-disable no-unused-vars */
import { useState } from "react";
import FullScreenModal from "../../../components/admin/Modal";
import Invoice from "../../../components/user/Invoice";
import { useNavigate } from "react-router-dom";
import OrderItem from "./OrderItem";

/* eslint-disable react/prop-types */
function OrderDetails({ order }) {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [expandOrder, setExpandOrder] = useState(false)
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
            <div className="flex flex-wrap gap-5 px-2 py-1 md:px-7 md:py-4 mt-5 border md:border-none rounded shadow-sm bg-zinc-100 md:bg-zinc-200 ">
                <div className="flex flex-auto gap-5 justify-between items-start">
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
                        order ID: <span className=" font-extrabold opacity-80">#{order.orderId}</span>
                    </div>
                    <div className="flex gap-5 justify-between mt-2.5 text-xs leading-5 text-slate-500">
                        <button onClick={() => setExpandOrder(!expandOrder)}>{expandOrder ? 'Hide' : "Show"} order details</button>
                        <button onClick={openInvoice}>View invoice</button>
                    </div>
                </div>
            </div>
            {/* order details */}
            {
                expandOrder && (
                    <div className="flex flex-col px-7 pt-3 pb-7 bg-white rounded max-md:px-5 max-md:max-w-full ">
                        <div className="space-y-1">
                            {order.orderDetail?.map((item, index) => (
                                <OrderItem key={index} item={item} />
                            ))}
                        </div>
                    </div>
                )
            }
        </>
    );
}

export default OrderDetails