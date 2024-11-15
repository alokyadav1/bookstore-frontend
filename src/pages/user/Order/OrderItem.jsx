/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
function OrderItem({ item }) {
  console.log("item: ", item);
  return (
    <div className="flex flex-col items-start p-4 bg-white rounded shadow-sm border">
      <div className="text-xs text-gray-600 mb-2">{item.deliveredDate || "24 April 2024"}</div>
      <div className="text-sm text-gray-800 mb-4">{item.deliveryMessage || "Deliverd"}</div>
      <div className="relative flex items-center w-full">
        <div className="flex-shrink-0 w-24 h-24  mr-4 rounded">
          <img
            src={`https://covers.openlibrary.org/b/isbn/${item.book.isbn}-L.jpg`}
            alt={item.book.title}
            className=" object-cover w-20 h-full rounded-md border"
          />
        </div>
        <div className="flex flex-col">
          <div className="text-base font-semibold text-gray-800 mb-1">
            {item.book.title}<span className="text-xs bg-blue-500 text-white font-light px-1 rounded ml-2">{item.book.category}</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">Quantity: {item.quantity}</div>
          <div className="absolute top-0 right-0 text-lg font-bold px-1 bg-white text-zinc-400">&#8377;{item.book.price}</div>
          <div className="flex gap-4 items-center">
            <button className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">Buy it again</button>
            <button className="px-4 py-2 text-sm font-medium text-teal-600 bg-white border border-teal-600 rounded hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2">View your item</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
