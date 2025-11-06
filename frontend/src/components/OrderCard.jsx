import React from "react";

const OrderCard = ({ data }) => (
  <div className="bg-white shadow rounded-xl p-4">
    <h2 className="text-xl font-semibold mb-2">Orders</h2>
    {data.length ? (
      data.map((o, i) => <p key={i}>🛒 Order #{o.id}</p>)
    ) : (
      <p className="text-gray-500">No order data available</p>
    )}
  </div>
);

export default OrderCard;

