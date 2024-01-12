import React from "react";
import UsersItem from "./UsersItem";
import './UsersList.css'
const UsersList = (props) => {
  if (props.dummy_users.length === 0) {
    return (
      <div className="center">
        <h2>No User Found</h2>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {props.dummy_users.map((user) => (
        <UsersItem
          key={user.id}
          id={user.id}
          name={user.name}
          email={user.email}
          image={user.image}
          placecount={user.placecount}
        />
      ))}
    </ul>
  );
};
export default UsersList;
