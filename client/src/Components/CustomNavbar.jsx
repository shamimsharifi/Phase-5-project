import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../userStore";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function CustomNavbar() {
  const { user, deleteUser } = useUserStore();
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
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        // width: "100vw",
        width: "100%",
      }}
    >
      <Navbar
        // bg="dark"
        // variant="dark"
        // style={{ width: "100vw", height: "10vh" }}
        // className="justify-content-between"

        bg="dark"
        expand="lg"
        className="bg-body-tertiary"
      >
        <Navbar.Brand
          href="#home"
          style={{ fontSize: "35px", marginLeft: "20px" }}
        >
          BrandName
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto"
            style={{
              fontSize: "20px",
              padding: "10px",
            }}
          >
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/chatcomponent">
              Chats
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Your Profile
            </Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
