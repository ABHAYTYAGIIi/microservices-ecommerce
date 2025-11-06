import React from "react";

const InventoryCard = ({ data }) => (
  <div className="bg-white shadow rounded-xl p-4">
    <h2 className="text-xl font-semibold mb-2">Inventory</h2>
    {data.length ? (
      data.map((item, i) => <p key={i}>📦 {item.name} ({item.stock})</p>)
    ) : (
      <p className="text-gray-500">No inventory data available</p>
    )}
  </div>
);

export default InventoryCard;

