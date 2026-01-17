import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-[#fcfbfc]">
      <Navbar />

      {user && (
        <main className="w-full">
          {children}
        </main>
      )}
    </div>
  );
};

export default DashboardLayout;
