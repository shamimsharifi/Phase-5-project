import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../userStore";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function CustomNavbar() {
  const { user, deleteUser } = useUserStore(); // Assuming the store returns a user object when logged in
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    fetch("/api/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        deleteUser();
        navigate("/login");
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  if (!user) {
    return null; // or return a different navbar for non-logged-in users
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">BrandName</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/home">
          Home
        </Nav.Link>
        {/* Additional navbar items here */}
      </Nav>
      <Button variant="outline-light" onClick={handleLogout}>
        Logout
      </Button>
    </Navbar>
  );
}

export default CustomNavbar;
