import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ListingsCard from "./ListingsCard";

export default function Listings() {
  const [listingobj, setlistingobj] = useState([]);

  useEffect(() => {
    fetch(`/api/listings`)
      .then((response) => response.json())
      .then((data) => {
        setlistingobj(data);
      });
  }, []);

  const backgroundStyle = {
    backgroundImage:
      "linear-gradient(rgba(50, 50, 50, 0.8), rgba(255, 255, 255, 0.8)), url(https://t4.ftcdn.net/jpg/03/65/86/37/240_F_365863785_GPd2tXRRDis66W8NTGYmBt7Bhxfcb09h.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
    padding: "90px",
    backgroundSize: "cover",
  };

  return (
    <Container fluid style={backgroundStyle}>
      <Row className="d-flex flex-wrap">
        {listingobj.map((listing) => (
          <ListingsCard listing={listing} key={listing.id} />
        ))}
      </Row>
    </Container>
  );
}
