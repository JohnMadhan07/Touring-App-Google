import React from "react";
import UsersList from "./UsersList";
const Users = () => {
  const Users = [
    {
      id: "U1",
      name: "Madhan",
      email: "madhan@gmail.com",
      image: "Me.jpg",
      placecount: 1,
    },
    // { id: 2, name: "Ann", email: "Ann@gmail.com", placecount: 2 },
    // { id: 3, name: "Nandhu", email: "Nandhu@gmail.com", placecount: 1 },
  ];

  return <UsersList dummy_users={Users} />;
};

export default Users;
