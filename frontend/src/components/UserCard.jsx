import React from "react";

const UserCard = ({ data }) => (
  <div className="bg-white shadow rounded-xl p-4">
    <h2 className="text-xl font-semibold mb-2">Users</h2>
    {data.length ? (
      data.map((u, i) => <p key={i}>👤 {u.name}</p>)
    ) : (
      <p className="text-gray-500">No user data available</p>
    )}
  </div>
);

export default UserCard;

