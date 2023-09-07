/* eslint-disable no-unused-vars */

import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useUserStore from "../userStore";
import UploadWidget from "../Components/UploadWidgets";

import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/home");
  };
  const { updateUser } = useUserStore();

  const handleBackToLogin = () => {
    window.location.href = "http://localhost:3000/login";
  };

  const [signupObj, setSignupObj] = useState({
    username: "",
    email: "",
    _password_hash: "",
  });

  const [image, setImage] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    const signObj = {
      ...signupObj,
      user_image: image,
    };

    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signObj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        updateUser(data);
        handleBackToHome();
      })
      .catch((error) => {
        console.log("error", error.message);
      });
  };

  return (
    <div>
      <Container style={{ height: "100vh", padding: "20px", width: "100vh" }}>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="border p-4 rounded">
              <Form onSubmit={handleSignup}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={signupObj.username}
                    onChange={(e) =>
                      setSignupObj({ ...signupObj, username: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={signupObj.email}
                    onChange={(e) =>
                      setSignupObj({ ...signupObj, email: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={signupObj._password_hash}
                    onChange={(e) =>
                      setSignupObj({
                        ...signupObj,
                        _password_hash: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group
                  controlId="formBasicUserRole"
                  style={{ marginBottom: "10px" }}
                ></Form.Group>
                <Form.Group controlId="formBasicUserImage">
                  <Form.Label>User Image</Form.Label>
                  <UploadWidget setImage={setImage} />
                </Form.Group>
                <Form.Group controlId="formBasicUserBio"></Form.Group>

                <Button variant="primary" type="submit" className="m-1 ">
                  Sign Up
                </Button>
                <Button
                  style={{ marginLeft: "5px" }}
                  variant="secondary"
                  onClick={handleBackToLogin}
                >
                  Back To Login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
