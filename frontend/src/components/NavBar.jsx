import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router";

const NavBar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <div className="h-20 w-full flex items-center shadow ">
      <div className=" max-w-7xl mx-auto">
        <div className="flex space-x-8">
          <Link to="/">Home</Link>
          {authUser && <Link to="profile">Profile</Link>}
          <Link to="settings">Settings</Link>
          {authUser && <button onClick={logout}>Logout</button>}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
