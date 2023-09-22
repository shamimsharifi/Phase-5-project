import React from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../userStore";
import { useState } from "react";
function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorStatus, setErrrorStatus] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUserStore();

  const handleLogin = (e) => {
    e.preventDefault();
    const userObj = {
      username,
      password,
    };
    console.log(userObj);
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response error");
        }
        return response.json();
      })
      .then((data) => {
        updateUser(data);
        navigate("/home");
      })
      .catch((error) => {
        console.log("error", error.message);
        setErrrorStatus(!errorStatus);
        console.log(errorStatus);
      });
  };

  const backgroundStyle = {
    backgroundImage:
      "linear-gradient(rgba(50, 50, 50, 0.8), rgba(255, 255, 255, 0.8)), url(https://t4.ftcdn.net/jpg/03/65/86/37/240_F_365863785_GPd2tXRRDis66W8NTGYmBt7Bhxfcb09h.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    padding: "150px",
    backgroundSize: "cover",
  };

  return (
    <div style={backgroundStyle}>
      <div style={{ position: "relative", height: "100vh" }}>
        {errorStatus ? (
          <>
            {["danger"].map((variant) => (
              <Alert key={variant} variant={variant}>
                Invalid Username or Password. Click the link to Signup
                <Link style={{ color: "red" }} to="signup">
                  . JOIN NOW!
                </Link>
                .
              </Alert>
            ))}
          </>
        ) : (
          ""
        )}

        <Container
        // style={{
        //   top: "50%",
        //   left: "50%",
        // }}
        >
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <div
                className="border p-4 rounded"
                style={{ marginTop: "50%", width: "500px" }}
              >
                <Form>
                  <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{ height: "60px" }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ height: "60px" }}
                    />
                    <p style={{ color: "white", fontSize: "20px" }}>
                      Login or sign up
                    </p>
                  </Form.Group>
                  <Button
                    variant="secondary"
                    type="submit"
                    onClick={handleLogin}
                    className="m-1 "
                    style={{ width: "90px" }}
                  >
                    Login
                  </Button>
                  <Link
                    style={{ marginLeft: "5px" }}
                    className="btn btn-secondary"
                    variant="secondary"
                    to="/signup"
                    activeClassName="active"
                  >
                    Signup
                  </Link>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Login;
