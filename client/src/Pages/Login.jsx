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
  // const backgroundImageURL =
  //   "https://i.pinimg.com/564x/30/ec/f3/30ecf302ac72d8bda2631fd4104aeaa9.jpg";

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
        // console.log("this is what we talkin bout", data);
        updateUser(data);
        navigate("/home");
      })
      .catch((error) => {
        console.log("error", error.message);
        setErrrorStatus(!errorStatus);
        console.log(errorStatus);
      });
  };

  return (
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
        style={{
          top: "50%",
          left: "50%",
        }}
      >
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="border p-4 rounded">
              <Form>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleLogin}
                  className="m-1 "
                >
                  Login
                </Button>
                <Link
                  style={{ marginLeft: "5px" }}
                  className="btn btn-secondary"
                  variant="secondary"
                  to="signup"
                  activeClassName="active"
                >
                  Signup
                </Link>
                {/* ========== HAVE SIGNUP FORM RENDER ON CLICK. ALSO HAVE OPPORTUNITY TO REGISTER A DOG UPON SIGNUP  */}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
