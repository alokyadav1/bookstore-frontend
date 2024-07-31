/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { useLocation } from 'react-router-dom';
import { toJpeg, toPng, toSvg } from 'html-to-image';
import download from 'downloadjs';
import { PDFDocument } from 'pdf-lib';

const Invoice = () => {
    const location = useLocation()
    const [order, setOrder] = useState(location.state.order)
    const invoiceRef = useRef(null)

    useEffect(() => {
        console.log("Invoice");
        setOrder(location.state.order)
    }, [location.state.order])


    console.log("invoice", order);

    const address = order.shippingAddress.split('/');
    const recipient = address[0];
    const addressLine = address[1];
    const mobile = address[2];


    const generatePDF = async () => {
        if (invoiceRef.current) {
            try {
                const dataUrl = await toPng(invoiceRef.current);

                // Convert dataUrl to Uint8Array
                const imgBytes = await fetch(dataUrl).then((res) => res.arrayBuffer());

                // Create a new PDF document
                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage();
                const { width, height } = page.getSize();

                // Embed the image into the PDF
                const image = await pdfDoc.embedPng(imgBytes);

                // Calculate scaling to fit the image within the page
                const scale = Math.min(width / image.width, height / image.height);
                const scaledWidth = (image.width * scale) - 20;
                const scaledHeight = image.height * scale;

                // Draw the image on the page
                page.drawImage(image, {
                    x: 10,
                    y: height - scaledHeight, // Adjust y position to place image correctly
                    width: scaledWidth,
                    height: scaledHeight,
                });

                // Save the PDF as a Blob
                const pdfBytes = await pdfDoc.save();

                // Download the PDF file
                // download(dataUrl, "invoice.png")
                download(pdfBytes, `invoice-${order?.orderId}.pdf`, 'application/pdf');
            } catch (error) {
                console.error('Error converting to PDF:', error);
            }
        }
    };

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return (
        <div>
            <div className="mt-2 overflow-x-auto px-[16px] py-[10px] mx-auto border flex justify-center w-screen md:w-fit bg-white shadow-md rounded" >
                <div ref={invoiceRef} className='w-[700px] min-w-[700px] max-w-[700px]'>
                    <div className='text-center text-4xl mb-5 font-bold'>
                        <span>Bookstore</span>
                    </div>
                    <div className="flex gap-x-5 justify-between mb-8">
                        <div className='border p-2 rounded-md'>
                            <div className="text-lg font-bold mb-1">Seller details:</div>
                            <div>FROM</div>
                            <div>XYZ Seller</div>
                            <div>123 Sell Street</div>
                            <div>Orange Country</div>
                        </div>
                        <div className='border p-2 rounded-md'>
                            <div className="text-lg font-bold mb-1">Shipping details:</div>
                            <div className='font-semibold'>{recipient}</div>
                            <div>{addressLine}</div>
                            <div>{mobile}</div>
                        </div>
                    </div>
                    <div className="mb-8 space-y-2">
                        <div>
                            <strong>Invoice No:</strong>
                            <span className='ml-2 bg-slate-100 p-1 rounded'>#{order.orderId}</span>
                        </div>
                        <div>
                            <strong>Invoice Date:</strong>
                            <span className='ml-2 bg-slate-100 p-1 rounded'>{new Date(order.orderDate).toLocaleDateString('en-US', options)}</span>
                        </div>
                    </div>
                    <table className="w-full text-left border-collapse mb-8">
                        <thead>
                            <tr>
                                <th className="border-b p-2">Item</th>
                                <th className="border-b p-2">QTY</th>
                                <th className="border-b p-2">Rate</th>
                                <th className="border-b p-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderDetail.map((item) => (
                                <tr key={item.orderDetailId}>
                                    <td className="border-b p-2">{item.book.title}</td>
                                    <td className="border-b p-2">{item.quantity}</td>
                                    <td className="border-b p-2">&#8377;{item.book.price.toFixed(2)}</td>
                                    <td className="border-b p-2">&#8377;{(item.book.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mb-8">
                        <div className="text-right">
                            <div><strong>Subtotal:</strong> &#8377;{order.totalAmount.toFixed(2)}</div>
                            <div><strong>Shipping Charges:</strong> &#8377;{order.shipping_charges.toFixed(2)}</div>
                            <div><strong>Discount:</strong> &#8377;{order.discountPrice.toFixed(2)}</div>
                            <hr className='p-1 ' />
                            <div className='text-xl font-bold'><strong>Grand Total:</strong> &#8377;{(order.totalAmount + order.shipping_charges - order.discountPrice).toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="mb-2 text-center text-2xl font-extrabold">
                        Thank You 🙏
                    </div>

                </div>

            </div>
            <div className='flex justify-center mt-2'>
                <button
                    onClick={generatePDF}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Download Invoice
                </button>
            </div>
        </div>
    );
};

export default Invoice;
