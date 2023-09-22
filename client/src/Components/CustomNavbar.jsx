import React from "react";
import { Link } from "react-router-dom";
import useUserStore from "../userStore";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

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
        width: "100%",
        zIndex: 1000,
        borderBottom: "1px solid #333",
      }}
    >
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{
          padding: "0 10px",
          display: "flex",
          justifyContent: "space-between", // Align items with space between them
          alignItems: "center", // Vertically center align items
        }}
      >
        <Navbar.Brand
          href="#home"
          style={{
            fontSize: "35px",
            fontWeight: "bold",
            color: "white",
            marginLeft: "10px",
          }}
        >
          Market Place
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* NavLinks */}
          <Nav
            className="me-auto"
            style={{
              fontSize: "18px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Nav.Link
              as={Link}
              to="/home"
              className="buttons"
              style={{
                margin: "0 10px",
                color: "white", // Initial color set to black
                textDecoration: "none",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profile"
              className="buttons"
              style={{
                margin: "0 10px",
                color: "white", // Initial color set to black
                textDecoration: "none",
              }}
            >
              Profile
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/chatcomponent"
              className="buttons"
              style={{
                margin: "0 10px",
                color: "white", // Initial color set to black
                textDecoration: "none",
              }}
            >
              Chat
            </Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form
            inline
            style={{ display: "flex", alignItems: "center", width: "500px" }}
          >
            {" "}
            {/* Vertically center align items */}
            <FormControl
              type="text"
              placeholder="Search by category"
              className="mr-sm-2"
              style={{ borderRadius: "15px", border: "1px solid #CCC" }}
            />
            <Button
              variant="outline-light"
              type="submit"
              style={{ borderRadius: "15px" }}
            >
              Search
            </Button>
          </Form>

          {/* Logout Button */}
          <Button
            variant="outline-light"
            onClick={handleLogout}
            style={{ borderRadius: "15px", marginLeft: "10px" }}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
