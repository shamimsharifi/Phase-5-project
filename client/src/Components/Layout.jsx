import React from "react";
import CustomNavbar from "./CustomNavbar";

function Layout({ children }) {
  return (
    <div>
      <CustomNavbar />
      {children}
    </div>
  );
}

export default Layout;
