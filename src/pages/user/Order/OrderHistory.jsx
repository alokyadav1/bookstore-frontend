/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import OrderItem from "./OrderItem";
import OrderDetails from "./OrderDetail";
import Image from "../../../assets/img.png"
import axios from "../../../Axios/axios"
import Header from "../../../components/user/Header"

function OrderHistory() {
  // const orders = [
  //   {
  //     placedDate: "June 2, 2023",
  //     total: "$157.99",
  //     shipTo: "Irakli Lolashvili",
  //     orderNumber: "Order # 112-0822160-5390023",
  //   },
  //   {
  //     placedDate: "June 2, 2023",
  //     total: "$157.99",
  //     shipTo: "Irakli Lolashvili",
  //     orderNumber: "Order # 112-0822160-5390023",
  //   },
  // ];

  const orderItems = [
    {
      deliveredDate: "Delivered June 7",
      deliveryMessage:
        "Your package was delivered. It was handed directly to a resident.",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/bb888a8c41f43ca9737c0d0eac843e86910dc58891f1c62c5678b5b7a942aaa4?apiKey=9f77487837bf4515971f5e92222e87f9&",
      imageAlt: "Product Image",
      title:
        "ORICO M.2 NVMe SSD Enclosure, USB 3.1 Gen 2 (10 Gbps) to NVMe PCI-E M.2 SSD Case Support UASP for NVMe",
      returnMessage: "Return or replace items: Eligible through July 5, 2023",
      buyAgainIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c9ef429b3e74198d1b9ebf2975b09629bdfff6bb1de64405d735ab72a3706ec6?apiKey=9f77487837bf4515971f5e92222e87f9&",
    },
    {
      deliveredDate: "Delivered June 5",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0af9d5249bfdd648b65b53be2e386c8281af5cb770b4d17017a779e42d3e284e?apiKey=9f77487837bf4515971f5e92222e87f9&",
      imageAlt: "Product Image",
      title:
        "SAMSUNG 98O PRO SSD 2TB PCle NVMe Gen 4 Gaming M.2 Internal Solid State Drive Memory Card.",
      returnMessage: "Retum or replace items: Eligible through July 5, 2023",
      buyAgainIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1aec3989f8bd6c54607972de19333cca63d8fcf550382c355d26fe0a45a2f821?apiKey=9f77487837bf4515971f5e92222e87f9&",
      sellerImage: "https://cdn.builder.io/api/v1/image/assets/TEMP/5722bc449ce9948d92f42763291ae715d15fc5b9206530ba2f86baf5f1767aa9?apiKey=9f77487837bf4515971f5e92222e87f9&",
      sellerImageAlt: "Seller Image",
    },
  ];
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const [orders, setorders] = useState([])

  useEffect(() => {
    const fetchOrderHistory = async () => {
      const res = await axios.get("/api/orders/get-orders", {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`,
        }
      })
      setorders(res.data)
    }

    fetchOrderHistory()
  }, [currentUser.token])

  console.log("order: ", orders);

  return (
    <>
    <Header/>
      <div className="flex items-center justify-center font-medium mt-16">
        <div className="flex flex-col px-11 pt-5 bg-white border m-4 rounded shadow-sm md:w-2/3 md:max-w-2/3 max-md:px-5">
          <div className="flex gap-4 self-start text-xs leading-5 text-zinc-900">
            <div className="my-auto">Your Orders</div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b8054ff3fc038c98b2464096952a85d87f9410d03a469547224309f226c5ac80?apiKey=9f77487837bf4515971f5e92222e87f9&"
              alt=""
              className="shrink-0 w-9 border border-violet-600 border-solid aspect-[1.79]"
            />
          </div>
          {
            orders.length > 0 ? (
              <div>
                <div className="flex gap-5 justify-between mt-5 rounded-lg w-full max-md:flex-wrap max-md:max-w-full bg-zinc-100 p-1 ">
                  <div className="flex gap-0 bg-zinc-100 rounded-lg">
                    <div className="justify-center px-9 py-2.5 text-xs leading-5 whitespace-nowrap bg-white rounded-lg text-zinc-900 max-md:px-5">
                      Orders
                    </div>
                    <div className="flex gap-5 justify-between px-3.5 py-3 text-xs leading-4 text-gray-600 bg-zinc-100">
                      <button>Not Yet Shipped</button>
                      <button>Cancelled Orders</button>
                    </div>
                  </div>
                  <select name="time-period" id="time-period" className="flex gap-1.5 justify-center p-2.5 my-auto text-xs leading-5 rounded border border-solid bg-zinc-100 border-zinc-400 text-zinc-900 ">
                    <option value="1-month">Past 1 Month</option>
                    <option value="3-month">Past 3 Month</option>
                    <option value="All">All</option>
                  </select>
                </div>
                {orders.map((order, index) => (
                  <div className="mb-5">
                    <OrderDetails key={index} order={order} />
                  </div>

                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-96">
                <p className="font-extrabold text-4xl text-zinc-200">No order History</p>
              </div>
            )
          }

        </div>
      </div>
    </>
  );
}

export default OrderHistory;