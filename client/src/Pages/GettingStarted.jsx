/* eslint-disable react/no-unescaped-entities */
import { NavLink, Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import useUserStore from "../userStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GettingStarted() {
  const handleNavigateToLogin = () => {
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <div>
      <Button variant="primary" onClick={handleNavigateToLogin} className="m-1">
        Let's get started
      </Button>
    </div>
  );
}
