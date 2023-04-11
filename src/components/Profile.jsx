import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [view, setView] = useState(EditProfile);
  return (
    <div className="profile__container">
      <ul>
        <li onClick={() => setView(EditProfile)} className="btn btn-primary">
          Edit Profile
        </li>
        <li onClick={() => setView(Orders)} className="btn btn-primary">
          Orders
        </li>
      </ul>
      <div>{view}</div>
    </div>
  );
};

export default Profile;

const EditProfile = () => {
  return <div>Edit Profile</div>;
};

const Orders = () => {
  return <div>Orders</div>;
};
