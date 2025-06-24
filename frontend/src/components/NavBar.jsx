import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const NavBar = () => {
  const { logout } = useAuthStore();
  return (
    <div className="h-20 w-full bg-amber-600">
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default NavBar;
