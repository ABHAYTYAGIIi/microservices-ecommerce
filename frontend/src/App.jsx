import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "./components/UserCard";
import OrderCard from "./components/OrderCard";
import InventoryCard from "./components/InventoryCard";

const App = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, orderRes, invRes] = await Promise.all([
          axios.get("/api/users"),
          axios.get("/api/orders"),
          axios.get("/api/inventory"),
        ]);
        setUsers(userRes.data);
        setOrders(orderRes.data);
        setInventory(invRes.data);
      } catch (err) {
        console.error(err);
        setError("⚠️ Some services are currently unavailable. Please try again later.");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Microservices Dashboard</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="grid md:grid-cols-3 gap-4">
        <UserCard data={users} />
        <OrderCard data={orders} />
        <InventoryCard data={inventory} />
      </div>
    </div>
  );
};

export default App;

